# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:** Node.js, Python 3.9 and Docker (optional for containers)

### Frontend

1. Install dependencies: `npm install`
2. Create a `.env.local` file and set `GEMINI_API_KEY` with your Gemini API key
3. Start the frontend: `npm run dev`

### Backend

1. Install the Python dependencies: `pip install -r backend/requirements.txt`
2. Create `backend/.env` with the following variables:
   - `SECRET_KEY` – JWT signing key
   - `ALGORITHM` – hashing algorithm used by the app
   - `ACCESS_TOKEN_EXPIRE_MINUTES` – token expiration
   - `BACKEND_CORS_ORIGINS` – comma separated list of allowed origins
3. Start the API from the `backend` folder:
   `uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload`

### Docker Compose

The repository also includes a `docker-compose.yml` (generated from `docker-compose.yml.md`).
Use it to build and run the backend container:

```bash
docker-compose up --build
```

Environment variables are loaded from `backend/.env` when using Compose.

## Multi-Sprint Workflow

Development is organised into multiple sprints. Each `sprint-*.md` file documents
the goals and deliverables for that stage. Reading these files shows how the
project evolved from setup through deployment.
