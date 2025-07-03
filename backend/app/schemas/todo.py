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
