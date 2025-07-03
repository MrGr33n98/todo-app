# Filename: backend/app/schemas/token.py
# Instructions for Copilot:
# 1. Import `Optional` from `typing` and `BaseModel` from `pydantic`.
# 2. Create a `Token` schema for the login response.
#    - It should have `access_token`: str
#    - It should have `token_type`: str
# 3. Create a `TokenPayload` schema for the data stored inside the JWT.
#    - It should have `sub`: Optional[str] = None
#    - "sub" is the standard JWT claim for the subject (in our case, the username).

from typing import Optional
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
