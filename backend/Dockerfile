# Filename: backend/Dockerfile
# Instructions for Copilot:
# 1. Start from the official Python 3.9 slim base image.
# 2. Set the working directory inside the container to `/app`.
# 3. Set the `PYTHONUNBUFFERED` environment variable to `1` to ensure logs are sent straight to the terminal.
# 4. Copy the `requirements.txt` file into the working directory.
# 5. Run pip to install all the dependencies listed in `requirements.txt`.
# 6. Copy the rest of the application code (the `app` directory) into the working directory.

FROM python:3.9-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./app ./app
