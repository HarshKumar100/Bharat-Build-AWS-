import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os, glob, random

MODEL_PATH = r'model/efficientnet_waste_best.pt'
checkpoint = torch.load(MODEL_PATH, map_location='cpu')

print('=== CHECKPOINT KEYS ===')
print(list(checkpoint.keys()))
print()

if 'val_acc' in checkpoint:
    print(f'Best Val Accuracy saved: {checkpoint["val_acc"]:.4f}')
if 'epoch' in checkpoint:
    print(f'Saved at Epoch: {checkpoint["epoch"]}')
if 'classes' in checkpoint:
    print(f'Classes: {checkpoint["classes"]}')
if 'class_to_idx' in checkpoint:
    print(f'class_to_idx: {checkpoint["class_to_idx"]}')
print()

# Rebuild model
model = models.efficientnet_b0(weights=None)
in_features = model.classifier[1].in_features
model.classifier = nn.Sequential(
    nn.Dropout(p=0.4, inplace=True),
    nn.Linear(in_features, 512),
    nn.ReLU(),
    nn.Dropout(p=0.3),
    nn.Linear(512, 2)
)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()

final_bias = model.classifier[4].bias.detach().tolist()
print(f'Final layer bias [O=0, R=1]: {[round(b,4) for b in final_bias]}')
print()

# Test on actual images from dataset
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

print('=== LIVE PREDICTIONS ON DATASET IMAGES ===')
for true_label, folder in [('O (Organic)', 'DATASET/TEST/O'), ('R (Recyclable)', 'DATASET/TEST/R')]:
    files = glob.glob(f'{folder}/*.jpg') + glob.glob(f'{folder}/*.png') + glob.glob(f'{folder}/*.jpeg')
    if not files:
        print(f'No files found in {folder}')
        continue
    sample = random.sample(files, min(5, len(files)))
    correct = 0
    for f in sample:
        img = Image.open(f).convert('RGB')
        tensor = transform(img).unsqueeze(0)
        with torch.no_grad():
            logits = model(tensor)
            probs = torch.softmax(logits, dim=1).squeeze().tolist()
        pred_idx = probs.index(max(probs))
        pred_class = ['O', 'R'][pred_idx]
        true_class = 'O' if 'O (Organic)' in true_label else 'R'
        status = 'CORRECT' if pred_class == true_class else 'WRONG'
        if pred_class == true_class:
            correct += 1
        print(f'  [{status}] True={true_class} | Pred={pred_class} | P(O)={probs[0]:.3f} P(R)={probs[1]:.3f} | {os.path.basename(f)}')
    print(f'  Accuracy on these 5 {true_label} samples: {correct}/5\n')
