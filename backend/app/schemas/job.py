from pydantic import BaseModel

class JobCreate(BaseModel):
    nco_code: str
    title: str
    description: str
