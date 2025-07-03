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