#!/bin/bash

# Emergency S3 Deployment Fallback Script
# Use this if AWS Amplify deployment fails

set -e

BUCKET_NAME="helios-landing-fallback"
REGION="us-east-1"
DISTRIBUTION_ID=""  # CloudFront distribution ID (if applicable)

echo "🚨 EMERGENCY S3 DEPLOYMENT STARTING..."

# Ensure build directory exists and is complete
if [ ! -d "build" ]; then
    echo "❌ Build directory not found. Running npm run build..."
    npm run build
fi

# Verify critical files exist
if [ ! -f "build/index.html" ]; then
    echo "❌ index.html not found in build directory"
    exit 1
fi

if [ ! -f "build/static/js/main.d7865a3f.js" ]; then
    echo "❌ Main JS file not found. Re-running build..."
    rm -rf build/
    npm run build
fi

echo "✅ Build verification complete"

# Create S3 bucket if it doesn't exist
echo "📦 Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME --region $REGION 2>/dev/null || echo "Bucket already exists"

# Configure bucket for static website hosting
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Upload files with proper MIME types
echo "🚀 Uploading files to S3..."
aws s3 sync build/ s3://$BUCKET_NAME \
    --delete \
    --region $REGION \
    --metadata-directive REPLACE \
    --cache-control "public, max-age=86400" \
    --exclude "*.map"

# Set proper MIME types for JS and CSS
aws s3 cp build/static/js/ s3://$BUCKET_NAME/static/js/ \
    --recursive \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000"

aws s3 cp build/static/css/ s3://$BUCKET_NAME/static/css/ \
    --recursive \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000"

# Make bucket publicly readable
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
        }
    ]
}'

# Get the website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Website URL: $WEBSITE_URL"
echo ""
echo "📋 Next steps if needed:"
echo "1. Update DNS to point to: $WEBSITE_URL"
echo "2. Set up CloudFront for HTTPS and better performance"
echo "3. Configure custom domain"

# Invalidate CloudFront cache if distribution exists
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "♻️  Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
fi

echo "🎯 EMERGENCY DEPLOYMENT READY FOR DEMO!"