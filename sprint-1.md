# Sprint 1: Paddle Out 🌊

**Objetivo:** Construir uma API básica com FastAPI, containerizá-la com Docker e configurar um pipeline de CI para build.

## Tarefas

### 1. Criar a Aplicação FastAPI

Crie o arquivo `backend/main.py`:

```python
# backend/main.py
from fastapi import FastAPI

app = FastAPI(title="TodoApp API")

@app.get("/", tags=["Root"])
def read_root():
    """Retorna uma mensagem de status simples."""
    return {"status": "ok", "message": "Welcome to TodoApp API!"}
```
Crie também o `backend/requirements.txt`:
```
fastapi
uvicorn[standard]
```

### 2. Criar o Dockerfile

Crie o arquivo `backend/Dockerfile`:

```dockerfile
# backend/Dockerfile
# Estágio de build para instalar dependências
FROM python:3.11-slim as builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Estágio final
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /app /app
COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 3. Configurar o Pipeline de CI

Crie o arquivo `.github/workflows/ci.yml`:

```yaml
# .github/workflows/ci.yml
name: Build and Test API

on:
  push:
    branches: [ "main" ]
    paths:
      - 'backend/**'
  pull_request:
    branches: [ "main" ]
    paths:
      - 'backend/**'

jobs:
  build-api:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t todo-api:latest ./backend
          echo "Docker image built successfully!"
```

### Entregável para a Demo:

- Execute um `push` para o GitHub e mostre o log verde da Action passando (build bem-sucedido).