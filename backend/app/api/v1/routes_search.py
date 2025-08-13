from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from app.core.search_engine import search_jobs
from app.db import database, models

router = APIRouter()

class SearchRequest(BaseModel):
    query: str

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def search(request: SearchRequest, db: Session = Depends(get_db)):
    # Save search query to DB
    log_entry = models.SearchLog(query=request.query, timestamp=datetime.utcnow())
    db.add(log_entry)
    db.commit()

    # Perform the actual search
    results = search_jobs(request.query)
    return results
