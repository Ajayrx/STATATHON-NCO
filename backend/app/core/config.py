from pydantic_settings import BaseSettings  

class Settings(BaseSettings):
    app_name: str = "Smart NCO Search"
    database_url: str = "sqlite:///./app/data/nco.db"
    model_name: str = "sentence-transformers/paraphrase-MiniLM-L6-v2"

    class Config:
        env_file = ".env"

settings = Settings()

