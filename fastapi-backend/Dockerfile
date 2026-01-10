# Use slim image since we don't need utility packages
# Change from 3.14-slim to 3.11-slim for compatibility with pinned requirements
FROM python:3.11-slim

# Create a non-privileged user and leave all the GECOS fields (Name, Phone, etc.) blank.
RUN adduser --disabled-password --gecos "" fastapi-user

WORKDIR /app

# Copy requirements first to leverage cache layers
COPY requirements.txt .

# Install dependencies and don't add any cache to keep image small
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Give the non-privileged user ownership of the app directory
RUN chown -R fastapi-user:fastapi-user /app

# Switch to non-privileged user
USER fastapi-user

# Expose the port
EXPOSE 8000

# Run the application with gunicorn + uvicorn workers to utilize more CPU cores
# -w : worker processes
# -k : use uvicorn's async worker class
CMD ["gunicorn", "main:app", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]
