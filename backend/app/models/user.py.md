# Filename: backend/app/models/user.py
# Instructions for Copilot:
# 1. Import `Enum` and `BaseModel` from standard libraries.
# 2. Create a `Role` Enum that inherits from `str` and `Enum`.
#    - Define "admin" and "user" as the possible roles.
# 3. Create a `User` model that inherits from `BaseModel`.
#    - This will be the internal data model for a user.
#    - Define `id`: int
#    - Define `username`: str
#    - Define `role`: Role
# 4. Create a `UserInDB` model that inherits from `User`.
#    - Add the `hashed_password`: str field.
#    - This model represents the complete user object as stored in the database.

from enum import Enum
from pydantic import BaseModel

class Role(str, Enum):
    admin = "admin"
    user = "user"

class User(BaseModel):
    id: int
    username: str
    role: Role

class UserInDB(User):
    hashed_password: str
