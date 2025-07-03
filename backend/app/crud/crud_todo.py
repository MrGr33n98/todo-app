from typing import List, Optional, Dict, Any

from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate
from app.db.database import mock_db

def get(id: int) -> Optional[Todo]:
    for todo in mock_db["todos"]:
        if todo.id == id:
            return todo
    return None

def get_multi() -> List[Todo]:
    return mock_db["todos"]

def get_multi_by_owner(owner_id: int) -> List[Todo]:
    return [todo for todo in mock_db["todos"] if todo.owner_id == owner_id]

def create_with_owner(obj_in: TodoCreate, owner_id: int) -> Todo:
    new_id = max(todo.id for todo in mock_db["todos"]) + 1 if mock_db["todos"] else 1
    new_todo = Todo(
        id=new_id,
        title=obj_in.title,
        completed=obj_in.completed,
        owner_id=owner_id
    )
    mock_db["todos"].append(new_todo)
    return new_todo

def update(db_obj: Todo, obj_in: TodoUpdate) -> Todo:
    update_data = obj_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_obj, field, value)
    return db_obj

def remove(id: int) -> Optional[Todo]:
    todo_to_remove = get(id)
    if todo_to_remove:
        mock_db["todos"] = [todo for todo in mock_db["todos"] if todo.id != id]
    return todo_to_remove