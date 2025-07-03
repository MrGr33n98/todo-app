# Filename: backend/app/main.py
# Instructions for Copilot:
# 1. Import `FastAPI` and `CORSMiddleware`.
# 2. Import the `api_router` from `app.api.v1.api` and the `settings` from `app.core.config`.
# 3. Create a FastAPI app instance, setting the project name from the settings.
# 4. Configure CORS Middleware. This is the most important step to fix the "Failed to fetch" error.
#    - Check if `settings.BACKEND_CORS_ORIGINS` is set.
#    - Add `CORSMiddleware` to the app's middleware stack.
#    - Set `allow_origins` to the origins defined in the .env file.
#    - Set `allow_credentials` to True.
#    - Allow all methods (`["*"]`).
#    - Allow all headers (`["*"]`).
# 5. Include the `api_router` with a prefix of `settings.API_V1_STR`.
# 6. Add a root endpoint "/" that returns a simple welcome message for API health checks.

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to the TodoApp API"}
