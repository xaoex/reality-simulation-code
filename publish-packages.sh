#!/bin/bash
# ===========================================================================
# xaoex | reality-simulation-code | publish-packages.sh
# Enterprise Package Publishing Script
# Authorized operator: xaoex / professoroakz only
# ===========================================================================

set -e

# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo ""
echo "==========================================================================="
echo "  xaoex :: reality-simulation-code :: publish-packages"
echo "  Enterprise Package Publisher — v1.31337dbp ok741s release"
echo "==========================================================================="
echo ""

# ---------------------------------------------------------------------------
# Authorization check — only the repository owner may publish
# ---------------------------------------------------------------------------
AUTHORIZED_USERS=("professoroakz" "xaoex")
CURRENT_GH_USER=""

if command -v gh &>/dev/null; then
    CURRENT_GH_USER=$(gh api user --jq '.login' 2>/dev/null || true)
fi

if [ -n "$CURRENT_GH_USER" ]; then
    AUTHORIZED=false
    for u in "${AUTHORIZED_USERS[@]}"; do
        if [[ "$CURRENT_GH_USER" == "$u" ]]; then
            AUTHORIZED=true
            break
        fi
    done
    if [ "$AUTHORIZED" = false ]; then
        echo -e "${RED}[DENIED]  Unauthorized operator: $CURRENT_GH_USER${NC}"
        echo ""
        echo "  This script is restricted to the repository owner."
        echo "  Authorized operators: ${AUTHORIZED_USERS[*]}"
        echo ""
        exit 1
    fi
    echo -e "${GREEN}[AUTH]    Operator authenticated: $CURRENT_GH_USER${NC}"
fi

# ---------------------------------------------------------------------------
# Package info
# ---------------------------------------------------------------------------
PKG_NAME=$(node -p "require('./package.json').name")
PKG_VERSION=$(node -p "require('./package.json').version")
CURRENT_BRANCH=$(git branch --show-current)

echo -e "${BLUE}[INFO]    Package  : $PKG_NAME${NC}"
echo -e "${BLUE}[INFO]    Version  : $PKG_VERSION${NC}"
echo -e "${BLUE}[INFO]    Branch   : $CURRENT_BRANCH${NC}"
echo ""

# ---------------------------------------------------------------------------
# Branch check
# ---------------------------------------------------------------------------
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "production" ]]; then
    echo -e "${YELLOW}[WARN]    Not on main or production branch.${NC}"
    echo ""
    echo "  Publishing options:"
    echo ""
    echo -e "  ${GREEN}1. Merge PR to main/production${NC}"
    echo "     Workflows publish automatically on push."
    echo ""
    echo -e "  ${GREEN}2. Create a GitHub release${NC}"
    echo "     gh release create v$PKG_VERSION"
    echo ""
    echo -e "  ${GREEN}3. Manual workflow dispatch${NC}"
    echo "     ./publish-packages.sh --trigger"
    echo ""
    if [[ "$1" != "--trigger" ]]; then
        exit 1
    fi
fi

# ---------------------------------------------------------------------------
# Trigger workflows
# ---------------------------------------------------------------------------
if [[ "$1" == "--trigger" ]]; then
    echo -e "${GREEN}[TRIGGER] Dispatching package publishing workflows...${NC}"
    echo ""

    echo -e "${BLUE}[npm]     Triggering: npm-github-packages.yml${NC}"
    gh workflow run npm-github-packages.yml

    echo -e "${BLUE}[Docker]  Triggering: dockergithubpackage.yml${NC}"
    gh workflow run dockergithubpackage.yml

    echo ""
    echo -e "${GREEN}[OK]      Workflows dispatched successfully.${NC}"
    echo ""
    echo "  Monitor status:"
    echo "    gh run list --workflow=npm-github-packages.yml"
    echo "    gh run list --workflow=dockergithubpackage.yml"
    echo ""
    echo "  Actions: https://github.com/xaoex/reality-simulation-code/actions"
    echo ""
    exit 0
fi

echo -e "${GREEN}[READY]   Package publishing ready.${NC}"
echo ""
echo "  Run with --trigger to dispatch workflows:"
echo "    ./publish-packages.sh --trigger"
echo ""
