from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class JobCode(Base):
    __tablename__ = "job_codes"
    id = Column(Integer, primary_key=True, index=True)
    nco_code = Column(String(20), unique=True, index=True)
    title = Column(String(255))
    description = Column(Text)

class SearchLog(Base):
    __tablename__ = "search_logs"
    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(255))
    timestamp = Column(DateTime, default=datetime.utcnow)
