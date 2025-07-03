# Filename: backend/app/core/security.py
# Instructions for Copilot:
# 1. Import `datetime`, `timedelta`, `Optional` from `typing`.
# 2. Import `jwt` from `jose` and `passlib.context`.
# 3. Import `settings` from `app.core.config`.
# 4. Create a `CryptContext` instance for password hashing.
#    - Use the "bcrypt" scheme.
#    - Mark "bcrypt" as deprecated="auto" for automatic updates.
# 5. Create a function `verify_password` that takes a plain password and a hashed password and returns a boolean.
#    - It should use `pwd_context.verify()`.
# 6. Create a function `get_password_hash` that takes a password and returns its hash.
#    - It should use `pwd_context.hash()`.
# 7. Create a function `create_access_token` that takes `data: dict` and an optional `expires_delta`.
#    - It should create a copy of the data.
#    - Calculate the expiration time. If `expires_delta` is not provided, set a default of 15 minutes.
#    - Update the data copy with the "exp" claim.
#    - Encode the data into a JWT using `jwt.encode()`, the secret key, and the algorithm from settings.
#    - Return the encoded token.

from datetime import datetime, timedelta
from typing import Optional

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt
