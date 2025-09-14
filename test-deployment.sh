#!/bin/bash

# Quick deployment test script
echo "🧪 TESTING HELIOS LANDING PAGE DEPLOYMENT..."

URLS=(
    "https://helios.oppie.xyz"
    "https://main.d2z7l3p5m6o8k9.amplifyapp.com"  # Replace with actual Amplify URL
    "http://helios-landing-fallback.s3-website-us-east-1.amazonaws.com"  # Fallback S3 URL
)

for url in "${URLS[@]}"; do
    echo ""
    echo "Testing: $url"

    # Test main page
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    if [ "$status" = "200" ]; then
        echo "✅ Main page: OK ($status)"
    else
        echo "❌ Main page: FAILED ($status)"
        continue
    fi

    # Test SPA routing
    spa_status=$(curl -s -o /dev/null -w "%{http_code}" "$url/access" || echo "000")
    if [ "$spa_status" = "200" ]; then
        echo "✅ SPA routing: OK ($spa_status)"
    else
        echo "❌ SPA routing: FAILED ($spa_status)"
    fi

    # Test static assets
    content=$(curl -s "$url" | grep -o 'static/js/main\.[a-z0-9]*\.js' | head -1)
    if [ ! -z "$content" ]; then
        asset_url="$url/$content"
        asset_status=$(curl -s -o /dev/null -w "%{http_code}" "$asset_url" || echo "000")
        if [ "$asset_status" = "200" ]; then
            echo "✅ JS assets: OK ($asset_status)"
        else
            echo "❌ JS assets: FAILED ($asset_status)"
        fi
    else
        echo "❌ JS assets: Not found in HTML"
    fi
done

echo ""
echo "🎯 Test complete! Check results above."