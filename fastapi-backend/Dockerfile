# Use slim image since we don't need utility packages (3.15-slim is not out yet)
FROM python:3.14-slim

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

# Run the application and bind 0.0.0.0 to allow external traffic
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
