from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from ai_engine import detect_platforms
from risk_engine import calculate_exposure, risk_level
from deletion_engine import generate_request
from compliance_engine import generate_status, compliance_score

app = FastAPI(title="PrivacyGuard API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------
# 1️⃣ Analyze Uploaded Email File
# -----------------------------------------
@app.post("/analyze")
async def analyze_email(file: UploadFile = File(...)):
    text = (await file.read()).decode("utf-8")

    df = detect_platforms(text)

    if df.empty:
        return {
            "platforms": [],
            "score": 0,
            "risk_level": "Low"
        }

    score = calculate_exposure(df)
    level = risk_level(score)

    return {
        "platforms": df.to_dict(orient="records"),
        "score": score,
        "risk_level": level
    }


# -----------------------------------------
# 2️⃣ Generate Deletion Request
# -----------------------------------------
@app.post("/generate-deletion")
async def generate_deletion_request(
    name: str = Form(...),
    email: str = Form(...),
    platform: str = Form(...)
):
    letter, request_id = generate_request(name, email, platform)

    return {
        "request_id": request_id,
        "letter": letter
    }


# -----------------------------------------
# 3️⃣ Compliance Tracking
# -----------------------------------------
@app.get("/compliance")
def compliance_tracking():
    status = generate_status()
    comp_score = compliance_score(status)

    return {
        "status": status,
        "compliance_score": comp_score
    }