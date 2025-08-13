from pydantic import BaseModel
from datetime import datetime

class SearchLog(BaseModel):
    id: int
    query: str
    timestamp: datetime

    class Config:
        orm_mode = True
