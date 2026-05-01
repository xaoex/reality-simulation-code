#!/bin/bash
# Publish xaoex packages to GitHub Packages
# This script helps publish npm and Docker packages to GitHub Packages

set -e

echo "======================================================================"
echo "Publishing xaoex packages to GitHub Packages"
echo "======================================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}Current branch:${NC}"
git branch --show-current
echo ""

echo -e "${BLUE}Package information:${NC}"
echo "Name: $(node -p "require('./package.json').name")"
echo "Version: $(node -p "require('./package.json').version")"
echo ""

# Check if we're on main or production branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "production" ]]; then
    echo -e "${YELLOW}Warning: Not on main or production branch${NC}"
    echo "Current branch: $CURRENT_BRANCH"
    echo ""
    echo "To publish packages, u have three options:"
    echo ""
    echo -e "${GREEN}Option 1: Merge this PR to main/production${NC}"
    echo "  - Merge the PR to main or production branch"
    echo "  - Workflows will automatically publish packages on push"
    echo ""
    echo -e "${GREEN}Option 2: Create a release${NC}"
    echo "  - Create a GitHub release with a version tag (e.g., v1.0.0)"
    echo "  - Workflows will automatically publish packages"
    echo ""
    echo -e "${GREEN}Option 3: Manual workflow trigger${NC}"
    echo "  - Go to Actions tab in GitHub"
    echo "  - Select 'Publish npm to GitHub Packages' or 'Publish Docker Package'"
    echo "  - Click 'Run workflow' and select ur branch"
    echo ""
    echo "Or run this script with --trigger flag to trigger workflows:"
    echo "  ./publish-packages.sh --trigger"
    exit 1
fi

# If --trigger flag is provided, trigger the workflows
if [[ "$1" == "--trigger" ]]; then
    echo -e "${GREEN}Triggering package publishing workflows...${NC}"
    echo ""

    echo "Triggering npm GitHub Packages workflow..."
    gh workflow run npm-github-packages.yml

    echo "Triggering Docker publish workflow..."
    gh workflow run dockergithubpackage.yml

    echo ""
    echo -e "${GREEN}✓ Workflows triggered successfully!${NC}"
    echo ""
    echo "Check workflow status:"
    echo "  gh run list --workflow=npm-github-packages.yml"
    echo "  gh run list --workflow=dockergithubpackage.yml"
    echo ""
    echo "Or visit: https://github.com/xaoex/reality-simulation-code/actions"
    exit 0
fi

echo -e "${GREEN}Ready to publish packages!${NC}"
echo ""
echo "Run with --trigger flag to trigger workflows:"
echo "  ./publish-packages.sh --trigger"
