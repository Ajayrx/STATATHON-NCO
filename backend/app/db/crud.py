from sqlalchemy.orm import Session
from app.db.models import JobCode
from app.schemas.job import JobCreate

def create_job(db: Session, job: JobCreate):
    db_job = JobCode(nco_code=job.nco_code, title=job.title, description=job.description)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job
