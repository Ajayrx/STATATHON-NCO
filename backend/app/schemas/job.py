from pydantic import BaseModel
from typing import Optional

# Shared Base
class JobBase(BaseModel):
    nco_code: str
    title: str
    description: Optional[str] = None

# Create Schema
class JobCreate(BaseModel):
    nco_code: str
    title: str
    description: Optional[str] = None

# Update Schema (all fields optional)
class JobUpdate(BaseModel):
    nco_code: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None

# Output Schema
class JobOut(BaseModel):
    id: int
    nco_code: str
    title: str
    description: Optional[str] = None

    class Config:
        from_attributes = True  # ✅ Updated for Pydantic V2
