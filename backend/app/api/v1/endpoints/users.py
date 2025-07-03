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
