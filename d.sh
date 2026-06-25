#!/usr/bin/env bash
set -euo pipefail

SEARCH_TEXT=""
REPLACE_TEXT=""
PUSH=false

if [[ "${1:-}" == "--push" ]]; then
    PUSH=true
fi

echo "==> Checking repository"
git rev-parse --git-dir >/dev/null

echo "==> Creating backup bundle"
git bundle create ../repo-backup-$(date +%Y%m%d-%H%M%S).bundle --all

echo "==> Checking git-filter-repo"
if ! command -v git-filter-repo >/dev/null 2>&1; then
    echo "git-filter-repo not found."
    echo "Install with:"
    echo "  pip install git-filter-repo"
    exit 1
fi

TMP_REPLACE_FILE="$(mktemp)"
printf '%s==>%s\n' "$SEARCH_TEXT" "$REPLACE_TEXT" > "$TMP_REPLACE_FILE"

echo "==> Rewriting file contents and commit messages"

git filter-repo \
    --force \
    --replace-text "$TMP_REPLACE_FILE" \
    --commit-callback "
commit.message = commit.message.replace(
    b'${SEARCH_TEXT}',
    b'${REPLACE_TEXT}'
)
"

rm -f "$TMP_REPLACE_FILE"

echo
echo "==> Verifying file contents"

if git grep -n "$SEARCH_TEXT" >/dev/null 2>&1; then
    echo "WARNING: '$SEARCH_TEXT' still found in current files"
else
    echo "No occurrences found in current files"
fi

echo
echo "==> Checking commit messages"

if git log --all --format='%B' | grep -q "$SEARCH_TEXT"; then
    echo "WARNING: '$SEARCH_TEXT' still found in commit messages"
else
    echo "No occurrences found in commit messages"
fi

if $PUSH; then
    echo
    echo "==> Force pushing rewritten history"
    git push --force --all origin
    git push --force --tags origin
    echo "Push complete"
else
    echo
    echo "History rewritten locally."
    echo "Review the repository before pushing."
    echo
    echo "To push:"
    echo "  git push --force --all origin"
    echo "  git push --force --tags origin"
fi
