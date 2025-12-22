#!/bin/bash
# DEBUG SCRIPT FOR USER
# usage: ./debug-backend.sh

ENDPOINT=$(grep NEXT_PUBLIC_ORDERS_ENDPOINT .env.local | cut -d '=' -f2)
SECRET=$(grep NEXT_PUBLIC_ORDERS_SHARED_SECRET .env.local | cut -d '=' -f2)

echo "--- DIAGNOSTIC START ---"
echo "Targeting Endpoint: $ENDPOINT"
echo "Using Secret: $SECRET"
echo "Sending test request..."

# Send request
RESPONSE=$(curl -s -L -X GET "$ENDPOINT?auth=$SECRET&payload=%7B%22test%22%3Atrue%7D")

echo ""
echo "--- SERVER RESPONSE ---"
echo "$RESPONSE"
echo "-----------------------"
echo ""

if [[ "$RESPONSE" == *"receivedAuth"* ]]; then
  echo "✅ GOOD NEWS: The server is running the NEW code."
  if [[ "$RESPONSE" == *"Unauthorized"* ]]; then
     echo "❌ BUT: The secret does not match. Check for spaces or typos in the Apps Script."
  else
     echo "✅ SUCCESS: The backend accepted the data."
  fi
elif [[ "$RESPONSE" == *"Unauthorized"* ]]; then
  echo "⚠️ ISSUE DETECTED: The server returned a generic 'Unauthorized' error."
  echo "    This proves the server is still running the OLD CODE."
  echo "    ACTION REQUIRED: You MUST Create a 'New Version' in Apps Script deployment."
else
  echo "❓ UNKNOWN STATE: Check the response JSON above."
fi
