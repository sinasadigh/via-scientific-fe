# React + TypeScript + Vite App

This project is a React + TypeScript + Vite app that can be easily run using Docker Compose.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>

1- Navigate to the project directory:
cd <project-directory>

2- Create a .env file in the root of the project:
VITE_API_BASE_URL=http://x.xyz.com

3- Build and run the app using Docker Compose:
docker-compose up --build

4-Open your browser and visit http://localhost:3000 to access the application.

Stopping the App
To stop the application and shut down the Docker containers, use:
docker-compose down

Configuration
The VITE_API_BASE_URL environment variable in the .env file controls the base URL for API requests. Update it according to your API endpoint.
Additional Information
For development purposes, you can use the npm run dev script to run the application without Docker. Ensure that Node.js is installed on your machine.

Customize the Dockerfile and Docker Compose configuration as needed for your specific requirements.

