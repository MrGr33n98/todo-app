# Filename: backend/app/api/v1/endpoints/users.py
# Instructions for Copilot:
# 1. Import necessary modules: `APIRouter`, `Depends`.
# 2. Import the `User` schema.
# 3. Import the `User` model.
# 4. Import the `get_current_active_user` dependency.
# 5. Create an `APIRouter` instance.
# 6. Define a GET endpoint at "/me".
#    - The response model should be `schemas.User`.
#    - This endpoint should depend on `get_current_active_user` to ensure only authenticated users can access it.
# 7. The function should simply return the `current_user` object provided by the dependency.

from fastapi import APIRouter, Depends

from app import models, schemas
from app.dependencies import get_current_active_user

router = APIRouter()

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    """
    Get current user.
    """
    return current_user
