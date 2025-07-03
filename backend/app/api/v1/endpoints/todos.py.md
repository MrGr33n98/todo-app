# Filename: backend/app/api/v1/endpoints/todos.py
# Instructions for Copilot:
# 1. Import necessary modules: `List`, `APIRouter`, `Depends`, `HTTPException`.
# 2. Import schemas for `Todo`, `TodoCreate`, and `TodoUpdate`.
# 3. Import `User` model.
# 4. Import `crud_todo` for database operations.
# 5. Import `get_current_active_user` dependency.
# 6. Create an `APIRouter` instance.
# 7. Implement GET "/": Read All Todos (Admin only)
#    - It should depend on `get_current_active_user`.
#    - Check if the user's role is "admin". If not, raise a 403 Forbidden error.
#    - Call `crud_todo.get_multi()` to get all todos.
# 8. Implement GET "/me": Read User's Own Todos
#    - Call `crud_todo.get_multi_by_owner()` to get todos for the current user.
# 9. Implement POST "/": Create a new Todo
#    - The body should be a `schemas.TodoCreate`.
#    - Call `crud_todo.create_with_owner()` to create the todo, passing the current user's ID as the owner.
# 10. Implement PUT "/{id}": Update a Todo
#    - Get the todo by ID using `crud_todo.get()`.
#    - If the todo doesn't exist, raise a 404 Not Found error.
#    - If the user is not an admin and not the owner of the todo, raise a 403 Forbidden error.
#    - Call `crud_todo.update()` to update the todo.
# 11. Implement DELETE "/{id}": Delete a Todo
#    - Get the todo by ID using `crud_todo.get()`.
#    - If the todo doesn't exist, raise a 404 Not Found error.
#    - If the user is not an admin and not the owner of the todo, raise a 403 Forbidden error.
#    - Call `crud_todo.remove()` to delete the todo.
#    - Return the deleted todo.

from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app import models, schemas
from app.crud import crud_todo
from app.dependencies import get_current_active_user

router = APIRouter()

@router.get("/", response_model=List[schemas.Todo])
def read_todos(current_user: models.User = Depends(get_current_active_user)):
    """
    Retrieve all todos. Admin only.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    todos = crud_todo.get_multi()
    return todos

@router.get("/me", response_model=List[schemas.Todo])
def read_own_todos(current_user: models.User = Depends(get_current_active_user)):
    """
    Retrieve todos for the current user.
    """
    todos = crud_todo.get_multi_by_owner(owner_id=current_user.id)
    return todos

@router.post("/", response_model=schemas.Todo)
def create_todo(
    *,
    todo_in: schemas.TodoCreate,
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Create new todo.
    """
    todo = crud_todo.create_with_owner(obj_in=todo_in, owner_id=current_user.id)
    return todo

@router.put("/{id}", response_model=schemas.Todo)
def update_todo(
    *,
    id: int,
    todo_in: schemas.TodoUpdate,
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Update a todo.
    """
    todo = crud_todo.get(id=id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if todo.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    todo = crud_todo.update(db_obj=todo, obj_in=todo_in)
    return todo

@router.delete("/{id}", response_model=schemas.Todo)
def delete_todo(
    *,
    id: int,
    current_user: models.User = Depends(get_current_active_user)
):
    """
    Delete a todo.
    """
    todo = crud_todo.get(id=id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    if todo.owner_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    todo = crud_todo.remove(id=id)
    return todo
