#!/bin/bash

set -e

echo "Testing NutriTrack API..."

echo ""
echo "1. Health check"

curl -f http://localhost:3000/api/health

echo ""

echo "2. Meals"

curl -f http://localhost:3000/api/meals

echo ""

echo "3. Pantry"

curl -f http://localhost:3000/api/pantry

echo ""

echo "4. Weights"

curl -f http://localhost:3000/api/weights

echo ""

echo "5. Dashboard"

curl -f http://localhost:3000/api/dashboard

echo ""

echo "API tests completed successfully."