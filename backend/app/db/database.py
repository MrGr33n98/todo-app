from app.models.user import UserInDB
from app.models.todo import Todo
from app.core.security import get_password_hash

# This is a mock database. In a real application, you would use a proper database connection.
mock_db = {
    "users": [
        UserInDB(
            id=1,
            username="john",
            hashed_password=get_password_hash("password123"),
            role="user"
        ),
        UserInDB(
            id=2,
            username="admin",
            hashed_password=get_password_hash("adminpassword"),
            role="admin"
        ),
        UserInDB(
            id=3,
            username="maria",
            hashed_password=get_password_hash("pass"),
            role="user"
        ),
    ],
    "todos": [
        Todo(id=1, title="Create a Next.js app", completed=True, owner_id=1),
        Todo(id=2, title="Implement RBAC", completed=False, owner_id=1),
        Todo(id=3, title="Review all user tasks", completed=False, owner_id=2),
        Todo(id=4, title="Add admin dashboard", completed=True, owner_id=2),
        Todo(id=5, title="Test permissions", completed=False, owner_id=3),
        Todo(id=6, title="Deploy the app", completed=False, owner_id=1),
    ],
}
