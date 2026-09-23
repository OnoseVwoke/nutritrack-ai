#!/bin/bash

set -e

API_URL="${API_URL:-http://localhost:3002/api}"

echo "======================================"
echo "     NutriTrack API Tests"
echo "======================================"

echo ""
echo "1. Testing Health API..."
curl -f "$API_URL/health"
echo " ✅ Health API passed"

echo ""
echo "2. Testing Meals API..."
curl -f "$API_URL/meals"
echo " ✅ Meals API passed"

echo ""
echo "3. Testing Pantry API..."
curl -f "$API_URL/pantry"
echo " ✅ Pantry API passed"

echo ""
echo "4. Testing Weights API..."
curl -f "$API_URL/weights"
echo " ✅ Weights API passed"

echo ""
echo "5. Testing Dashboard API..."
curl -f "$API_URL/dashboard"
echo " ✅ Dashboard API passed"

echo ""
echo "======================================"
echo "   All API tests passed successfully!"
echo "======================================"