from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db import models, crud, database
from app.schemas.job import JobCreate, JobUpdate, JobOut
from app.schemas.search import SearchLog

# ⬇ Add these imports
from app.core.index_builder import rebuild_faiss_index
from app.core import search_engine

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[JobOut])
def get_all_jobs(db: Session = Depends(get_db)):
    return crud.get_all_jobs(db)

@router.post("/", response_model=JobOut)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    created_job = crud.create_job(db, job)
    if not created_job:
        raise HTTPException(status_code=400, detail="Job creation failed, possibly due to duplicate or invalid data.")

    # 🔄 Rebuild FAISS and reload memory
    rebuild_faiss_index()
    search_engine.load_index_and_data()

    return created_job

@router.put("/{job_id}", response_model=JobOut)
def update_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db)):
    updated_job = crud.update_job(db, job_id, job)
    if not updated_job:
        raise HTTPException(status_code=404, detail="Job not found or update failed.")

    # 🔄 Rebuild FAISS and reload memory
    rebuild_faiss_index()
    search_engine.load_index_and_data()

    return updated_job

@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    crud.delete_job(db, job_id)

    # 🔄 Rebuild FAISS and reload memory
    rebuild_faiss_index()
    search_engine.load_index_and_data()

    return {"message": "Job deleted successfully"}

@router.get("/search-logs", response_model=list[SearchLog])
def get_search_logs(
    skip: int = Query(0, ge=0), 
    limit: int = Query(50, ge=1, le=100), 
    db: Session = Depends(get_db)
):
    logs = crud.get_search_logs(db, skip=skip, limit=limit)
    return logs
