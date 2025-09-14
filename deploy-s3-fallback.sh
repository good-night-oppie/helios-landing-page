#!/bin/bash
# Emergency S3 deployment script for demo
# Usage: ./deploy-s3-fallback.sh

set -e

echo "🚨 EMERGENCY S3 DEPLOYMENT FOR DEMO 🚨"

# Check if build exists
if [ ! -d "build" ]; then
    echo "Building project..."
    npm run build
fi

# Create bucket name with timestamp
BUCKET_NAME="helios-demo-$(date +%s)"
REGION="us-east-1"

echo "Creating S3 bucket: $BUCKET_NAME"

# Create bucket
aws s3api create-bucket --bucket $BUCKET_NAME --region $REGION || {
    echo "Failed to create bucket, trying with different name..."
    BUCKET_NAME="helios-emergency-$(openssl rand -hex 4)"
    aws s3api create-bucket --bucket $BUCKET_NAME --region $REGION
}

# Enable static website hosting
aws s3api put-bucket-website --bucket $BUCKET_NAME --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
}'

# Set bucket policy for public read
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
    }]
}'

# Upload files
echo "Uploading build files..."
aws s3 sync build/ s3://$BUCKET_NAME/ --delete

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Website URL: $WEBSITE_URL"
echo "📝 Bucket: $BUCKET_NAME"

# Test the deployment
echo "Testing deployment..."
curl -I "$WEBSITE_URL" || echo "⚠️ Site may take a moment to be available"

echo "🎯 DEMO URL READY: $WEBSITE_URL"