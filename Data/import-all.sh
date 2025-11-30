#!/bin/bash

# Sanity Portfolio Data Import Script
# This script imports all dummy data files into your Sanity dataset

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default dataset name
DATASET=${1:-production}

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Sanity Portfolio Data Import Script             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if sanity CLI is installed
if ! command -v sanity &> /dev/null; then
    echo -e "${RED}❌ Error: Sanity CLI is not installed.${NC}"
    echo -e "${YELLOW}Please install it with: npm install -g @sanity/cli${NC}"
    exit 1
fi

# Check if we're in the Data directory
if [ ! -f "skills.ndjson" ]; then
    echo -e "${YELLOW}⚠️  Not in the Data directory. Attempting to navigate...${NC}"
    if [ -d "Data" ]; then
        cd Data
        echo -e "${GREEN}✓ Found Data directory${NC}"
    else
        echo -e "${RED}❌ Error: Cannot find Data directory with .ndjson files${NC}"
        exit 1
    fi
fi

echo -e "${BLUE}Dataset: ${DATASET}${NC}"
echo -e "${BLUE}Import Mode: Replace existing documents${NC}"
echo ""

# Confirm before proceeding
read -p "$(echo -e ${YELLOW}Continue with import? This will replace existing documents. [y/N]: ${NC})" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Import cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Starting import...${NC}"
echo ""

# Array of files in the correct import order
FILES=(
    "skills.ndjson"
    "profile.ndjson"
    "education.ndjson"
    "experience.ndjson"
    "projects.ndjson"
    "blog.ndjson"
    "services.ndjson"
    "achievements.ndjson"
    "certifications.ndjson"
    "testimonials.ndjson"
    "navigation.ndjson"
    "siteSettings.ndjson"
    "contact.ndjson"
)

TOTAL=${#FILES[@]}
CURRENT=0

# Import each file
for FILE in "${FILES[@]}"; do
    CURRENT=$((CURRENT + 1))
    if [ -f "$FILE" ]; then
        echo -e "${BLUE}[$CURRENT/$TOTAL] Importing ${FILE}...${NC}"
        
        if sanity dataset import "$FILE" "$DATASET" --replace 2>&1 | grep -v "^npm"; then
            echo -e "${GREEN}✓ Successfully imported ${FILE}${NC}"
        else
            echo -e "${RED}✗ Failed to import ${FILE}${NC}"
            exit 1
        fi
        echo ""
    else
        echo -e "${YELLOW}⚠️  Warning: ${FILE} not found, skipping...${NC}"
        echo ""
    fi
done

echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✓ Import Complete!                              ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Visit your Sanity Studio to verify the data"
echo -e "  2. Upload images to documents with image fields"
echo -e "  3. Customize the content with your actual information"
echo -e "  4. Test your frontend application"
echo ""
echo -e "${GREEN}Happy building! 🚀${NC}"

