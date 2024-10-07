from fastapi import FastAPI, HTTPException, Response
from fastapi.responses import FileResponse
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import logging
from scripts.crop_rotation_planner import generate_rotation_schedule
import os

app = FastAPI()

# Configure CORS to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Configure logging
logging.basicConfig(level=logging.INFO)

class CropRotationRequest(BaseModel):
    num_plots: int
    num_periods: int
    season: str
    soil_texture: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Crop Rotation Planner API"}

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/favicon.ico")

@app.post("/generate")
async def generate_crop_rotation(request: CropRotationRequest):
    try:
        output_file = generate_rotation_schedule(
            num_plots=request.num_plots,
            num_periods=request.num_periods,
            selected_season=request.season,
            selected_soil_texture=request.soil_texture
        )
        if not output_file or not os.path.exists(output_file):
            logging.error("Error generating crop rotation schedule: no output file")
            raise HTTPException(status_code=400, detail="Failed to generate crop rotation schedule")
        return FileResponse(output_file, media_type="image/png", filename="dynamic_crop_rotation.png")
    except Exception as e:
        logging.error(f"Error generating crop rotation schedule: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.options("/generate")
def options_generate():
    return Response(headers={"Allow": "POST, OPTIONS"})