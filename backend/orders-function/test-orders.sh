#!/usr/bin/env zsh
# Quick test script to POST a sample order to local server or deployed function.
# Usage:
#   ./test-orders.sh http://localhost:8080
#   ./test-orders.sh https://<cloud-function-url>

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <endpoint-url>"
  exit 1
fi

endpoint="$1"
shared_secret="${SHARED_SECRET:-orders-secret-elhaj-2025}"

payload='{
  "entityType": "company",
  "companyName": "Acme GmbH",
  "country": "DE",
  "email": "test@example.com",
  "phone": "+49 30 123456",
  "productName": "Copper",
  "productDetails": "Grade A",
  "budget": "10000",
  "contactMethod": "email",
  "locale": "en",
  "userAgent": "curl"
}'

curl -sS -i \
  -X POST "$endpoint" \
  -H "Content-Type: application/json" \
  -H "X-Auth: $shared_secret" \
  --data "$payload"
