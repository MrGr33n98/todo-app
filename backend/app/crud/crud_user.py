from typing import Optional

from app.models.user import UserInDB
from app.db.database import mock_db
from app.core.security import verify_password

def get_by_username(username: str) -> Optional[UserInDB]:
    """
    Get a user by their username from the mock database.
    """
    for user in mock_db["users"]:
        if user.username == username:
            return user
    return None

def authenticate(username: str, password: str) -> Optional[UserInDB]:
    """
    Authenticate a user.
    """
    user = get_by_username(username=username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user