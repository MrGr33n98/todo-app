from typing import List, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "TodoApp"

    # JWT Settings
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # CORS Settings
    BACKEND_CORS_ORIGINS: List[str] = []

    class Config:
        env_file = ".env"

settings = Settings()
