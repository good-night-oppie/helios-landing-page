#!/bin/bash
# Test all deployment URLs for demo readiness

echo "🔍 TESTING ALL DEPLOYMENT URLS FOR DEMO"
echo "======================================="

# Test URLs
AMPLIFY_URL="https://ddih2g8hls8px.amplifyapp.com"
CUSTOM_URL="https://helios.oppie.xyz"
GITHUB_PAGES_URL="https://good-night-oppie.github.io/helios-landing-page"

echo "1. Testing Amplify URL: $AMPLIFY_URL"
if curl -s -o /dev/null -w "%{http_code}" "$AMPLIFY_URL" | grep -q "200"; then
    echo "✅ Amplify: WORKING"
    echo "🎯 DEMO URL: $AMPLIFY_URL"
else
    echo "❌ Amplify: FAILED (404)"
fi

echo ""
echo "2. Testing Custom Domain: $CUSTOM_URL"
if curl -s -o /dev/null -w "%{http_code}" "$CUSTOM_URL" 2>/dev/null | grep -q "200"; then
    echo "✅ Custom Domain: WORKING"
    echo "🎯 DEMO URL: $CUSTOM_URL"
else
    echo "❌ Custom Domain: FAILED (SSL/DNS issue)"
fi

echo ""
echo "3. Testing GitHub Pages: $GITHUB_PAGES_URL"
if curl -s -o /dev/null -w "%{http_code}" "$GITHUB_PAGES_URL" | grep -q "200"; then
    echo "✅ GitHub Pages: WORKING"
    echo "🎯 DEMO URL: $GITHUB_PAGES_URL"
else
    echo "⏳ GitHub Pages: Not ready yet (may take 5-10 minutes)"
fi

echo ""
echo "🚨 IF ALL FAIL, RUN: ./deploy-s3-fallback.sh"
echo "======================================="