import csv
from pathlib import Path
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from . import models
from app.schemas.job import JobCreate, JobUpdate
from app.core.index_builder import rebuild_faiss_index

# ✅ Always lowercase headers
CSV_PATH = Path("app/data/nco2015_job_reference.csv")
CSV_HEADER = ["nco_code", "title"]

def append_job_to_csv(nco_code: str, title: str):
    """Append new job to CSV with consistent lowercase headers."""
    nco_code = nco_code.strip()
    title = title.strip()
    file_exists = CSV_PATH.exists()

    # If file exists but has wrong headers, rewrite them correctly
    if not file_exists:
        with open(CSV_PATH, mode="w", newline='', encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(CSV_HEADER)

    with open(CSV_PATH, mode="a", newline='', encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([nco_code, title])

def remove_job_from_csv(nco_code: str):
    """Remove a job from CSV by NCO code."""
    if not CSV_PATH.exists():
        return
    nco_code = nco_code.strip()
    rows = []
    with open(CSV_PATH, mode="r", newline='', encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["nco_code"].strip() != nco_code:
                rows.append(row)
    with open(CSV_PATH, mode="w", newline='', encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_HEADER)
        writer.writeheader()
        writer.writerows(rows)

def get_all_jobs(db: Session):
    return db.query(models.JobCode).all()

def create_job(db: Session, job: JobCreate):
    """Create job in DB, append to CSV, and rebuild FAISS index."""
    try:
        clean_data = {
            "nco_code": job.nco_code.strip(),
            "title": job.title.strip()
        }

        new_job = models.JobCode(**clean_data)
        db.add(new_job)
        db.commit()
        db.refresh(new_job)

        append_job_to_csv(new_job.nco_code, new_job.title)
        rebuild_faiss_index()
        return new_job

    except IntegrityError:
        db.rollback()
        print(f"⚠️ Duplicate NCO code: {job.nco_code.strip()}")
        return None
    except Exception as e:
        db.rollback()
        print(f"❌ Error creating job: {e}")
        return None

def update_job(db: Session, job_id: int, job: JobUpdate):
    db_job = db.query(models.JobCode).filter(models.JobCode.id == job_id).first()
    if not db_job:
        return None
    for key, value in job.dict(exclude_unset=True).items():
        setattr(db_job, key, value.strip() if isinstance(value, str) else value)
    try:
        db.commit()
        db.refresh(db_job)
        rebuild_faiss_index()
        return db_job
    except Exception as e:
        db.rollback()
        print(f"❌ Error updating job: {e}")
        return None

def delete_job(db: Session, job_id: int):
    db_job = db.query(models.JobCode).filter(models.JobCode.id == job_id).first()
    if db_job:
        try:
            remove_job_from_csv(db_job.nco_code)
            db.delete(db_job)
            db.commit()
            rebuild_faiss_index()
        except Exception as e:
            db.rollback()
            print(f"❌ Error deleting job: {e}")

def get_search_logs(db: Session, skip: int = 0, limit: int = 50):
    """
    Retrieve search logs from the database with pagination.
    """
    return (
        db.query(models.SearchLog)
        .order_by(models.SearchLog.timestamp.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
