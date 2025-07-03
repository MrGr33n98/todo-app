# Filename: backend/app/schemas/todo.py
# Instructions for Copilot:
# 1. Import `Optional` from `typing` and `BaseModel` from `pydantic`.
# 2. Create a base schema `TodoBase` with the common fields:
#    - `title`: str
#    - `completed`: bool (default to False)
# 3. Create a `TodoCreate` schema that inherits from `TodoBase`.
#    - This schema is used when creating a new todo.
# 4. Create a `TodoUpdate` schema that inherits from `TodoBase`.
#    - Make all fields optional, as a client might only update one field at a time.
# 5. Create a `TodoInDBBase` schema that inherits from `TodoBase`.
#    - Add `id`: int
#    - Add `owner_id`: int
# 6. Create the final `Todo` schema that inherits from `TodoInDBBase`.
#    - This is the schema that will be used for API responses.
#    - Add a nested `Config` class with `from_attributes = True` (or `orm_mode = True` for Pydantic v1) to allow creating the schema from ORM objects.

from typing import Optional

from pydantic import BaseModel

# Shared properties
class TodoBase(BaseModel):
    title: str
    completed: bool = False

# Properties to receive on item creation
class TodoCreate(TodoBase):
    pass

# Properties to receive on item update
class TodoUpdate(TodoBase):
    title: Optional[str] = None
    completed: Optional[bool] = None

# Properties shared by models stored in DB
class TodoInDBBase(TodoBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

# Properties to return to client
class Todo(TodoInDBBase):
    pass
