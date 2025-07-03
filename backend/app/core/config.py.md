# Filename: backend/app/core/config.py
# Instructions for Copilot:
# 1. Import `List` and `Optional` from `typing`, and `BaseSettings` from `pydantic_settings`.
# 2. Create a class `Settings` that inherits from `BaseSettings`.
# 3. Define the API prefix `API_V1_STR` as "/api/v1".
# 4. Define `PROJECT_NAME` as "TodoApp".
# 5. Define the JWT settings from the environment variables:
#    - `SECRET_KEY`: str
#    - `ALGORITHM`: str
#    - `ACCESS_TOKEN_EXPIRE_MINUTES`: int
# 6. Define the CORS origins setting:
#    - `BACKEND_CORS_ORIGINS`: a list of strings.
# 7. Define a `Config` nested class inside `Settings` to specify the env file.
#    - `env_file = ".env"`
# 8. Create a single instance of `Settings` named `settings` to be imported by other parts of the app.

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
