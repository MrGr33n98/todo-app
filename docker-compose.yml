# Filename: docker-compose.yml
# Instructions for Copilot:
# 1. Create a `docker-compose.yml` file in the project's root directory.
# 2. Define a version '3.8' for the compose file.
# 3. Create a service named `backend`.
# 4. Configure the `backend` service to build from the `backend` directory.
#    - The `context` should be `./backend`.
#    - The `dockerfile` should be `Dockerfile`.
# 5. Load environment variables for the backend service from the `./backend/.env` file.
# 6. Map port 8000 of the container to port 8000 on the host machine.
# 7. Add a `command` to run the FastAPI application using uvicorn:
#    - It should be `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`.

version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    env_file:
      - ./backend/.env
    ports:
      - "8000:8000"
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
