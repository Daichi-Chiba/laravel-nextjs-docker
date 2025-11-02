#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section header
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

# Start backend tests in watch mode
print_header "Starting Backend Tests in Watch Mode"
docker-compose exec backend php artisan test --watch &
BACKEND_PID=$!

# Start frontend tests in watch mode
print_header "Starting Frontend Tests in Watch Mode"
cd frontend && npm run test:watch &
FRONTEND_PID=$!

# Handle script termination
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT SIGTERM EXIT

# Wait for both processes
wait