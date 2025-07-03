# Filename: backend/app/crud/crud_user.py
# Instructions for Copilot:
# 1. Import `Optional` from `typing`.
# 2. Import the `UserInDB` model from `app.models.user`.
# 3. Import the mock database `mock_db` from `app.db.database`.
# 4. Import the `verify_password` utility from `app.core.security`.
# 5. Create a function `get_by_username` that takes a username string.
#    - It should iterate through the "users" table in `mock_db`.
#    - If a user with the matching username is found, return the user object.
#    - If not found, return `None`.
# 6. Create a function `authenticate` that takes a username and a password.
#    - Call `get_by_username` to get the user.
#    - If the user is not found, return `None`.
#    - If the user is found, call `verify_password` to check if the provided password matches the user's hashed password.
#    - If the password does not match, return `None`.
#    - If the password matches, return the user object.

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
