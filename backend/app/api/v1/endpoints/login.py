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
