from fastapi import APIRouter, HTTPException
from app.db import crud, models, database
from app.schemas.job import JobCreate
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/")
def add_job(job: JobCreate):
    db: Session = database.SessionLocal()
    try:
        new_job = crud.create_job(db, job)
        return {"success": True, "job_id": new_job.id}
    finally:
        db.close()
