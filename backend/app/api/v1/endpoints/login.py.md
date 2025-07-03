# Filename: backend/app/api/v1/endpoints/login.py
# Instructions for Copilot:
# 1. Import necessary modules: `timedelta`, `APIRouter`, `Depends`, `HTTPException`, `status`, `OAuth2PasswordRequestForm`.
# 2. Import `user` and `token` schemas.
# 3. Import `crud` functions for user authentication.
# 4. Import `security` functions for creating access tokens.
# 5. Create an `APIRouter` instance.
# 6. Define a POST endpoint at "/login/token".
#    - The response model should be `schemas.Token`.
#    - Use `Depends(OAuth2PasswordRequestForm)` to get username and password from the form data.
# 7. Authenticate the user using `crud.user.authenticate`.
#    - If authentication fails, raise an `HTTPException` with status 401 and an "Incorrect username or password" detail.
# 8. If authentication is successful, create an access token using `security.create_access_token`.
#    - The token's subject should be the user's username.
# 9. Return a dictionary containing the `access_token` and `token_type`.

from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app import schemas
from app.core import security
from app.core.config import settings
from app.crud import crud_user

router = APIRouter()

@router.post("/login/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = crud_user.authenticate(
        username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
