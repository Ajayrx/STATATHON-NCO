from fastapi import APIRouter, Body
from pydantic import BaseModel
from app.core.search_engine import search_jobs

router = APIRouter()

class SearchRequest(BaseModel):
    query: str

@router.post("/")
def search(request: SearchRequest):
    results = search_jobs(request.query)
    return results
