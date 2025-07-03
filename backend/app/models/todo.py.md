# Filename: backend/app/models/todo.py
# Instructions for Copilot:
# 1. Import `BaseModel` from `pydantic`.
# 2. Create a `Todo` model that inherits from `BaseModel`.
# 3. This will be the internal data model for a todo item.
# 4. Define `id`: int
# 5. Define `title`: str
# 6. Define `completed`: bool
# 7. Define `owner_id`: int

from pydantic import BaseModel

class Todo(BaseModel):
    id: int
    title: str
    completed: bool
    owner_id: int
