# Filename: backend/app/api/v1/api.py
# Instructions for Copilot:
# 1. Import `APIRouter` from `fastapi`.
# 2. Import the routers from the `login`, `users`, and `todos` endpoint files.
# 3. Create an instance of `APIRouter`.
# 4. Include the `login_router`, tagging it with "login".
# 5. Include the `users_router`, prefixing it with "/users" and tagging it with "users".
# 6. Include the `todos_router`, prefixing it with "/todos" and tagging it with "todos".
# This file acts as an aggregator for all version 1 API routes.

from fastapi import APIRouter

from app.api.v1.endpoints import login, users, todos

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(todos.router, prefix="/todos", tags=["todos"])
