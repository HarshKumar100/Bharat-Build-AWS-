"""
BinWise - EfficientNetB0 Waste Classifier Training Script
=========================================================
Dataset : Kaggle Waste Classification Data
  TRAIN/O : 12,565 images  (Organic)
  TRAIN/R :  9,999 images  (Recyclable)
  TEST/O  :  1,401 images
  TEST/R  :  1,112 images
Output  : model/efficientnet_waste.pt + model/efficientnet_waste.onnx
"""

import os, time, json, copy
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
from torch.amp import GradScaler, autocast
from pathlib import Path

# ── CONFIG ────────────────────────────────────────────────
DATASET_DIR = Path("DATASET")
TRAIN_DIR   = DATASET_DIR / "TRAIN"
TEST_DIR    = DATASET_DIR / "TEST"
MODEL_DIR   = Path("model")
MODEL_DIR.mkdir(exist_ok=True)

EPOCHS         = 8
BATCH_SIZE     = 64
LR             = 2e-3
NUM_WORKERS    = 0      # Windows safe: 0 (no subprocess spawn issues)
IMG_SIZE       = 224
UNFREEZE_EPOCH = 3

# ── MAIN GUARD (required on Windows for multiprocessing) ──
if __name__ == '__main__':

    DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"\n{'='*60}")
    print(f"  BinWise EfficientNetB0 Trainer")
    print(f"  Device : {DEVICE}")
    if DEVICE.type == "cuda":
        print(f"  GPU    : {torch.cuda.get_device_name(0)}")
        vram = torch.cuda.get_device_properties(0).total_memory / 1e9
        print(f"  VRAM   : {vram:.1f} GB")
    print(f"{'='*60}\n")

    # ── TRANSFORMS ──────────────────────────────────────────
    train_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.RandomVerticalFlip(p=0.2),
        transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2, hue=0.05),
        transforms.RandomRotation(degrees=20),
        transforms.RandomAffine(degrees=0, translate=(0.1, 0.1)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std =[0.229, 0.224, 0.225]),
    ])
    val_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std =[0.229, 0.224, 0.225]),
    ])

    # ── DATASETS ────────────────────────────────────────────
    print("Loading datasets...")
    train_dataset = datasets.ImageFolder(TRAIN_DIR, transform=train_transform)
    val_dataset   = datasets.ImageFolder(TEST_DIR,  transform=val_transform)
    print(f"  Train : {len(train_dataset):,} images  Classes: {train_dataset.classes}")
    print(f"  Test  : {len(val_dataset):,} images\n")

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True,
                              num_workers=NUM_WORKERS, pin_memory=(DEVICE.type=="cuda"))
    val_loader   = DataLoader(val_dataset,   batch_size=BATCH_SIZE, shuffle=False,
                              num_workers=NUM_WORKERS, pin_memory=(DEVICE.type=="cuda"))

    # ── MODEL ───────────────────────────────────────────────
    print("Building EfficientNetB0 (ImageNet pretrained)...")
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1)

    # Freeze backbone for warmup
    for param in model.features.parameters():
        param.requires_grad = False

    # Custom classifier head
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.4, inplace=True),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.Dropout(p=0.3),
        nn.Linear(512, 2)  # O=Organic, R=Recyclable
    )
    model = model.to(DEVICE)
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    print(f"  Trainable: {trainable:,} / Total: {total:,}\n")

    # ── LOSS / OPTIMIZER / SCHEDULER ────────────────────────
    class_counts = [12565, 9999]
    total_c = sum(class_counts)
    weights  = torch.tensor([total_c / c for c in class_counts]).to(DEVICE)
    criterion = nn.CrossEntropyLoss(weight=weights)

    optimizer = optim.AdamW(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=LR, weight_decay=1e-4
    )
    scheduler = optim.lr_scheduler.OneCycleLR(
        optimizer, max_lr=LR,
        steps_per_epoch=len(train_loader), epochs=EPOCHS
    )
    scaler = GradScaler("cuda" if DEVICE.type == "cuda" else "cpu")

    # ── TRAINING LOOP ────────────────────────────────────────
    history = {"train_loss": [], "train_acc": [], "val_loss": [], "val_acc": []}
    best_val_acc   = 0.0
    best_model_wts = copy.deepcopy(model.state_dict())

    print(f"Starting {EPOCHS} epoch training on {DEVICE.type.upper()}...\n")

    for epoch in range(1, EPOCHS + 1):
        t0 = time.time()

        # Unfreeze backbone at UNFREEZE_EPOCH
        if epoch == UNFREEZE_EPOCH:
            print(f"\n  [Epoch {epoch}] Unfreezing backbone for fine-tuning...")
            for param in model.features.parameters():
                param.requires_grad = True
            for g in optimizer.param_groups:
                g['lr'] = LR * 0.1

        # ── Train ──
        model.train()
        run_loss, run_correct = 0.0, 0
        for i, (images, labels) in enumerate(train_loader):
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            optimizer.zero_grad()
            with autocast("cuda" if DEVICE.type == "cuda" else "cpu"):
                out  = model(images)
                loss = criterion(out, labels)
            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
            scheduler.step()
            _, preds   = torch.max(out, 1)
            run_loss   += loss.item() * images.size(0)
            run_correct += (preds == labels).sum().item()
            if (i + 1) % 60 == 0:
                print(f"  Epoch {epoch:02d} | Batch {i+1:3d}/{len(train_loader)} "
                      f"| Loss: {run_loss/max(run_correct,1):.4f}", end="\r")

        train_loss = run_loss / len(train_dataset)
        train_acc  = run_correct / len(train_dataset) * 100

        # ── Validate ──
        model.eval()
        val_loss_sum, val_correct = 0.0, 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(DEVICE), labels.to(DEVICE)
                with autocast("cuda" if DEVICE.type == "cuda" else "cpu"):
                    out  = model(images)
                    loss = criterion(out, labels)
                _, preds  = torch.max(out, 1)
                val_loss_sum += loss.item() * images.size(0)
                val_correct  += (preds == labels).sum().item()

        val_loss = val_loss_sum / len(val_dataset)
        val_acc  = val_correct  / len(val_dataset) * 100
        elapsed  = time.time() - t0

        history["train_loss"].append(train_loss)
        history["train_acc"].append(train_acc)
        history["val_loss"].append(val_loss)
        history["val_acc"].append(val_acc)

        marker = " << BEST" if val_acc > best_val_acc else ""
        print(f"  Epoch {epoch:02d}/{EPOCHS} | "
              f"Train {train_acc:.2f}% loss {train_loss:.4f} | "
              f"Val {val_acc:.2f}% loss {val_loss:.4f} | "
              f"{elapsed:.1f}s{marker}")

        if val_acc > best_val_acc:
            best_val_acc   = val_acc
            best_model_wts = copy.deepcopy(model.state_dict())
            torch.save({
                "epoch": epoch,
                "model_state_dict": best_model_wts,
                "val_acc": best_val_acc,
                "classes": train_dataset.classes,
                "class_to_idx": train_dataset.class_to_idx,
            }, MODEL_DIR / "efficientnet_waste_best.pt")

    # ── EXPORT ──────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"  Training done!  Best Val Accuracy: {best_val_acc:.2f}%")
    print(f"{'='*60}\n")

    model.load_state_dict(best_model_wts)
    model.eval()

    # PyTorch checkpoint
    torch.save({
        "model_state_dict": best_model_wts,
        "val_acc": best_val_acc,
        "classes": train_dataset.classes,
        "class_to_idx": train_dataset.class_to_idx,
        "history": history,
    }, MODEL_DIR / "efficientnet_waste.pt")
    print("  Saved: model/efficientnet_waste.pt")

    # ONNX export
    dummy = torch.randn(1, 3, IMG_SIZE, IMG_SIZE).to(DEVICE)
    torch.onnx.export(
        model, dummy,
        str(MODEL_DIR / "efficientnet_waste.onnx"),
        input_names=["input"], output_names=["output"],
        dynamic_axes={"input": {0: "batch"}, "output": {0: "batch"}},
        opset_version=17
    )
    print("  Saved: model/efficientnet_waste.onnx")

    # Class info JSON
    class_info = {
        "classes": train_dataset.classes,
        "class_to_idx": train_dataset.class_to_idx,
        "idx_to_class": {str(v): k for k, v in train_dataset.class_to_idx.items()},
        "labels": {"O": "Organic (Biodegradable)", "R": "Recyclable (Non-Biodegradable)"},
        "best_val_accuracy": round(best_val_acc, 2),
        "input_size": IMG_SIZE,
        "normalization": {"mean": [0.485, 0.456, 0.406], "std": [0.229, 0.224, 0.225]}
    }
    with open(MODEL_DIR / "class_info.json", "w") as f:
        json.dump(class_info, f, indent=2)
    print("  Saved: model/class_info.json")

    with open(MODEL_DIR / "training_history.json", "w") as f:
        json.dump(history, f, indent=2)
    print("  Saved: model/training_history.json")
    print("\n  All done! model/ folder ready.\n")
