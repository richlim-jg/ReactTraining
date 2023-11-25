# Description: Start Development
This document explains from the way of making the application development environment to run your source code on Docker for React learning.

## Preprocessing: Install Node.js
Node.js is the requrired middleware for the following tasks. Download it here[https://nodejs.org/en/download] and install into your PC.

## Preprocessing: Install Docker Desktop
### Enable WSL2
WSL2 is prerequisite to run Docker desktop. No need to install anything just turn to enable on your Windows because Windows 10 and 11 already equipped WSL2.

### Docker Desktop
Install Docker desktop here[https://www.docker.com/products/docker-desktop/].

## Make a frontend environment
Create frontend(React) project by vite.
```
> npm create vite@latest
```
Type project name "frontend".
```
? Project name: › frontend
```
Choose React
```
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others
```
Choose TypeScript
```
❯   TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC
```

## Make a backend environment
### Install composer
Composer is the requrired middleware to make Laravel project. Download it here[https://getcomposer.org] and install into your PC.

### Create a backend project
Run composer to make the Laravel project for backend.
```
> composer create-project laravel/laravel backend --prefer-dist
```

## Implement application

## Build Development Docker image
Copy frontend dockerfile to the frontend folder.
```
> cp ./docker/frontend/Dockerfile ./frontend/
```

Copy backend dockerfile to the backend folder.
```
> cp ./docker/backend/Dockerfile ./backend/
```

### Build docker images
Build frontend and backend docker images.
```
> cp .env.dev .env && docker compose -f ./docker-compose.dev.yaml build --no-cache
```

### Run docker instances
Boot frontend and backend instances.
```
> docker compose -f ./docker-compose.dev.yaml up -d
```

Type "http://localhost:3000" on your browser to check your application before submitting to reviewers.
