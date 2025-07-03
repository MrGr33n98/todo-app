# Filename: backend/app/schemas/user.py
# Instructions for Copilot:
# 1. Import `BaseModel` from `pydantic` and `Role` from `app.models.user`.
# 2. Create a base schema `UserBase` with the fields to be shared across schemas:
#    - `username`: str
#    - `role`: Role
# 3. Create `UserCreate` and `UserUpdate` schemas that inherit from `UserBase`. For this app, they can be simple pass-throughs.
# 4. Create `UserInDBBase` that inherits from `UserBase`.
#    - Add `id`: int
#    - Add a nested `Config` class with `from_attributes = True`.
# 5. Create the final `User` schema that inherits from `UserInDBBase`.
#    - This is the schema used for API responses to clients (it doesn't have the password).
# 6. Create the `UserInDB` schema that inherits from `UserInDBBase`.
#    - Add the `hashed_password`: str field.
#    - This schema represents the user object as it is stored in the database.

from pydantic import BaseModel
from app.models.user import Role # Import Role from the model

# Shared properties
class UserBase(BaseModel):
    username: str
    role: Role

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    pass

# Properties shared by models stored in DB
class UserInDBBase(UserBase):
    id: int

    class Config:
        from_attributes = True

# Properties to return to client
class User(UserInDBBase):
    pass

# Properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
