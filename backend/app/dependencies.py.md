# Filename: backend/app/dependencies.py
# Instructions for Copilot:
# 1. Import necessary modules: `Depends`, `HTTPException`, `status`, `OAuth2PasswordBearer`.
# 2. Import `jwt` from `jose` for decoding and error handling.
# 3. Import `TokenPayload` schema.
# 4. Import `User` model.
# 5. Import `crud_user`.
# 6. Import `settings`.
# 7. Create an `OAuth2PasswordBearer` instance, pointing to the token URL (`/api/v1/login/token`).
# 8. Create the `get_current_user` dependency function:
#    - It should depend on the `oauth2_scheme` to get the token.
#    - Try to decode the JWT using the secret key and algorithm from settings.
#    - Extract the username from the token's "sub" claim.
#    - If decoding fails or the username is missing, raise a 401 Unauthorized exception.
#    - Use `crud_user.get_by_username` to fetch the user from the database.
#    - If the user is not found, raise a 401 Unauthorized exception.
#    - Return the user object.
# 9. Create the `get_current_active_user` dependency function:
#    - It should depend on `get_current_user`.
#    - For now, it just returns the user. In a real app, you might add a check for `user.is_active`.
#    - This function is the one that endpoints will typically depend on.

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError

from app import models, schemas
from app.core.config import settings
from app.crud import crud_user

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/token"
)

def get_current_user(token: str = Depends(reusable_oauth2)) -> models.User:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = crud_user.get_by_username(username=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_current_active_user(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    # In a real app, you would check if the user is active
    # if not current_user.is_active:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
