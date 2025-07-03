# Sprint 2: Catch the Wave 🤙

**Objetivo:** Orquestrar os contêineres do backend e frontend com Docker Compose para desenvolvimento local.

## Tarefas

### 1. Configurar o Docker Compose

Crie o arquivo `docker-compose.yml` na raiz do projeto:

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: todo_api
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - TITLE=TodoApp

  frontend:
    # Para este exemplo, vamos simular um frontend simples que acessa a API.
    # Em um projeto real, você faria o build de um app Next.js/React.
    image: curlimages/curl:latest
    container_name: todo_frontend_tester
    depends_on:
      - backend
    # Este comando será executado após o backend estar pronto.
    command: >
      sh -c "
        echo 'Waiting for backend to be ready...';
        sleep 5;
        echo 'Pinging backend root...';
        curl -s http://backend:8000;
        echo '\\nDone.';
      "
```

### 2. Criar o README.md

Crie o arquivo `README.md` na raiz do projeto:

```markdown
# TodoApp - Aplicação de Lista de Tarefas

Este projeto contém uma API em FastAPI e um frontend em Next.js (simulado para fins de teste).

## Como Rodar Localmente

1. Clone o repositório.
2. Certifique-se de ter o Docker e o Docker Compose instalados.
3. Na raiz do projeto, execute:
   ```sh
   docker-compose up --build
   ```
4. A API estará acessível em `http://localhost:8000`.
```

### Entregável para a Demo:

- Execute `docker-compose up` no terminal.
- Mostre os logs dos dois contêineres iniciando.
- Acesse `http://localhost:8000` no navegador e veja a resposta da API.