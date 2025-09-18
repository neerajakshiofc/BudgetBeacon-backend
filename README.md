---

## 🐳 Running Locally with Docker

You can run the backend service locally using Docker by following these steps:

### 🔧 Prerequisites

* [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
* A `.env` file with all necessary environment variables (e.g., DB credentials, API keys).

### 📦 Build the Docker Image

```bash
docker build -t budget-backend .
```

This command builds a Docker image named `budget-backend` using the Dockerfile in your project root.

### ▶️ Run the Docker Container

```bash
docker run -p 5000:5000 --env-file .env budget-backend
```

* `-p 5000:5000`: Maps the container’s port 5000 to your local machine’s port 5000.
* `--env-file .env`: Loads environment variables from the `.env` file.
* `budget-backend`: The name of the Docker image to run.

### ✅ After Running

Once the container is up, your backend service will be available at:

```
http://localhost:5000
```

You can test the API endpoints using tools like Postman, curl, or directly from your frontend.

---


