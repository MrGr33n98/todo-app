# Filename: backend/app/crud/crud_todo.py
# Instructions for Copilot:
# 1. Import `List`, `Optional`, `Dict`, `Any` from `typing`.
# 2. Import `Todo` model and `TodoCreate`, `TodoUpdate` schemas.
# 3. Import the `mock_db` from `app.db.database`.
# 4. Implement `get(id: int)`: Find and return a todo by its ID.
# 5. Implement `get_multi()`: Return the entire list of todos.
# 6. Implement `get_multi_by_owner(owner_id: int)`: Return a list of todos filtered by `owner_id`.
# 7. Implement `create_with_owner(obj_in: TodoCreate, owner_id: int)`:
#    - Generate a new ID (e.g., max existing ID + 1).
#    - Create a new `Todo` instance using data from `obj_in` and the `owner_id`.
#    - Append the new todo to the `mock_db["todos"]` list.
#    - Return the newly created todo.
# 8. Implement `update(db_obj: Todo, obj_in: TodoUpdate)`:
#    - Update the `db_obj`'s fields with the data from `obj_in`.
#    - Return the updated `db_obj`.
# 9. Implement `remove(id: int)`:
#    - Find the todo to remove by ID.
#    - If found, remove it from the `mock_db["todos"]` list.
#    - Return the removed todo.

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
