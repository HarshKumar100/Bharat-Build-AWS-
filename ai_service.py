import os
import io
import base64
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from fastapi import FastAPI, File, UploadFile, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="BinWise / KabaadSeJugaad EfficientNet Waste AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "efficientnet_waste_best.pt")

print(f"Loading EfficientNetB0 Waste Classifier from {MODEL_PATH} on {DEVICE}...")

# Build architecture
model = models.efficientnet_b0(weights=None)
in_features = model.classifier[1].in_features
model.classifier = nn.Sequential(
    nn.Dropout(p=0.4, inplace=True),
    nn.Linear(in_features, 512),
    nn.ReLU(),
    nn.Dropout(p=0.3),
    nn.Linear(512, 2)
)

checkpoint = None
if os.path.exists(MODEL_PATH):
    checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)
    model.load_state_dict(checkpoint["model_state_dict"])
    print(f"Loaded weights from Epoch {checkpoint.get('epoch', 'N/A')} (Val Acc: {checkpoint.get('val_acc', 0):.2f}%)")
else:
    print(f"Warning: {MODEL_PATH} not found, model initialized with unweighted state.")

model = model.to(DEVICE)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225]),
])

class PredictBase64Request(BaseModel):
    image_base64: str
    filename: Optional[str] = None

def run_inference_on_pil(img: Image.Image):
    img = img.convert("RGB")
    tensor = transform(img).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        logits = model(tensor)
        probs = torch.softmax(logits, dim=1).squeeze().tolist()
    
    # Class index: 0 -> O (Organic), 1 -> R (Recyclable)
    organic_prob = probs[0]
    recyclable_prob = probs[1]
    
    is_organic = organic_prob > recyclable_prob
    pred_class = "Organic" if is_organic else "Recyclable"
    confidence = max(organic_prob, recyclable_prob) * 100.0

    return {
        "prediction": pred_class,
        "is_organic": is_organic,
        "stage1": "BIODEGRADABLE" if is_organic else "NON-BIODEGRADABLE",
        "confidence": round(confidence, 2),
        "probabilities": {
            "Organic": round(organic_prob * 100, 2),
            "Recyclable": round(recyclable_prob * 100, 2)
        },
        "model": "EfficientNetB0 Transfer Learning (PyTorch)",
        "device": str(DEVICE)
    }

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "BinWise Waste AI Classification API",
        "device": str(DEVICE),
        "model_loaded": checkpoint is not None,
        "checkpoint_epoch": checkpoint.get("epoch") if checkpoint else None,
        "checkpoint_val_acc": checkpoint.get("val_acc") if checkpoint else None
    }

@app.post("/predict")
async def predict_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        img = Image.open(io.BytesIO(content))
        result = run_inference_on_pil(img)
        result["filename"] = file.filename
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image processing error: {str(e)}")

@app.post("/predict-base64")
async def predict_base64(req: PredictBase64Request):
    try:
        b64_str = req.image_base64
        if "," in b64_str:
            b64_str = b64_str.split(",", 1)[1]
        decoded = base64.b64decode(b64_str)
        img = Image.open(io.BytesIO(decoded))
        result = run_inference_on_pil(img)
        if req.filename:
            result["filename"] = req.filename
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Base64 image processing error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ai_service:app", host="0.0.0.0", port=8000, reload=False)
