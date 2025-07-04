# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and update the values (e.g. set your `GEMINI_API_KEY`).
3. Run the app:
   `npm run dev`

## Run with Docker Compose

**Prerequisites:** Docker and Python 3.9+

1. Copy `.env.example` to both `.env` and `backend/.env`:
   ```sh
   cp .env.example .env
   cp .env.example backend/.env
   ```
2. Start all services:
   ```sh
   docker-compose up --build
   ```
   The API will be available at `http://localhost:8000`.
3. To run the unit tests inside the backend container:
   ```sh
   docker-compose exec backend pytest
   ```
