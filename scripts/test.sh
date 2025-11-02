#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section header
print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}\n"
}

# Function to check if tests passed
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 tests passed${NC}"
        return 0
    else
        echo -e "${RED}✗ $1 tests failed${NC}"
        return 1
    fi
}

# Initialize error counter
ERRORS=0

# Backend Tests
print_header "Running Backend Tests"
docker-compose exec -T backend php artisan test
if ! check_result "Backend"; then
    ((ERRORS++))
fi

# Frontend Tests
print_header "Running Frontend Tests"
cd frontend && npm test
if ! check_result "Frontend"; then
    ((ERRORS++))
fi

# Final results
echo -e "\n${BLUE}=== Test Results ===${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}All test suites passed!${NC}"
    exit 0
else
    echo -e "${RED}$ERRORS test suite(s) failed${NC}"
    exit 1
fi