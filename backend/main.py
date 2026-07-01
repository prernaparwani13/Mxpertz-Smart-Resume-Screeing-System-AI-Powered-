from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
import traceback

from parser import parse_resume
from matcher import analyze_resume

app = FastAPI(title="AI Smart Resume Screening API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchResult(BaseModel):
    resume_name: str
    score: float
    matched_skills: List[str]
    missing_skills: List[str]
    explanation: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Smart Resume Screening API"}

@app.post("/match", response_model=List[MatchResult])
async def match_resumes(
    job_description: str = Form(...),
    resumes: List[UploadFile] = File(...)
):
    if not job_description or job_description.strip() == "":
        raise HTTPException(status_code=400, detail="Job description cannot be empty")
        
    if not resumes:
        raise HTTPException(status_code=400, detail="At least one resume must be uploaded")

    results = []
    
    for resume in resumes:
        try:
            # Read file bytes
            file_bytes = await resume.read()
            
            # Extract text
            resume_text = parse_resume(resume.filename, file_bytes)
            
            if not resume_text.strip():
                # If we couldn't extract any text, add a dummy result with 0 score
                results.append(MatchResult(
                    resume_name=resume.filename,
                    score=0,
                    matched_skills=[],
                    missing_skills=[],
                    explanation="Failed to extract readable text from this file."
                ))
                continue
                
            # Analyze resume against JD
            analysis = analyze_resume(job_description, resume_text)
            
            # Create result object
            result = MatchResult(
                resume_name=resume.filename,
                score=analysis["score"],
                matched_skills=analysis["matched_skills"],
                missing_skills=analysis["missing_skills"],
                explanation=analysis["explanation"]
            )
            results.append(result)
            
        except ValueError as ve:
            # Handle unsupported file types gracefully
            results.append(MatchResult(
                resume_name=resume.filename,
                score=0,
                matched_skills=[],
                missing_skills=[],
                explanation=str(ve)
            ))
        except Exception as e:
            # Catch unexpected errors during parsing or matching
            print(f"Error processing {resume.filename}: {e}")
            traceback.print_exc()
            results.append(MatchResult(
                resume_name=resume.filename,
                score=0,
                matched_skills=[],
                missing_skills=[],
                explanation=f"An error occurred while processing this file."
            ))

    # Sort results by score descending
    results.sort(key=lambda x: x.score, reverse=True)
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
