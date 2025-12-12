# Release Guide - Reality Simulation Code

This document explains how to create official releases for npm and Docker packages.

## 📦 What Gets Published

### npm Package
- **Package name (npmjs.org)**: `reality-simulation-code`
- **Package name (GitHub Packages)**: `@xaoex/reality-simulation-code`
- **Current version**: 1.0.0
- **License**: XPSL-1.0 (XAOEX Public Source License)

### Docker Image
- **Image name**: `ghcr.io/xaoex/reality-simulation-code`
- **Tags**: `latest`, version tags (e.g., `v1.0.0`), branch tags, SHA tags
- **Base image**: node:20-alpine
- **Size**: ~135MB

## 🚀 Release Methods

### Method 1: Create a GitHub Release (Recommended for Versioned Releases)

This is the best method for creating official version releases.

1. **Create a new release on GitHub**:
   ```bash
   gh release create v1.0.0 \
     --title "v1.0.0 - Initial Public Release" \
     --notes "First official release under XPSL license"
   ```

2. **What happens automatically**:
   - npm package published to npmjs.org (if configured)
   - npm package published to GitHub Packages as `@xaoex/reality-simulation-code`
   - Docker image built and pushed to GitHub Container Registry
   - Version tag applied from release (e.g., `v1.0.0` → `1.0.0`)

3. **Version naming**:
   - Use semantic versioning: `v1.0.0`, `v1.1.0`, `v2.0.0`
   - Can also use: `release-1.0`, `release-2.0`

### Method 2: Push to Main/Production Branch

Automatically publishes on every push to `main` or `production` branches.

1. **Merge PR or push directly**:
   ```bash
   git checkout main
   git merge copilot/create-release-package-npm-docker
   git push origin main
   ```

2. **What happens automatically**:
   - npm package published with auto-incremented version (1.0.{build_number})
   - Docker image built and tagged as `latest`
   - Both packages automatically deployed

### Method 3: Manual Workflow Trigger

Manually trigger workflows for any branch.

#### Via GitHub UI:
1. Go to [Actions tab](https://github.com/xaoex/reality-simulation-code/actions)
2. Select workflow:
   - "Publish npm to GitHub Packages" for npm
   - "Publish Docker Image" for Docker
3. Click "Run workflow"
4. Select branch and click "Run workflow"

#### Via gh CLI:
```bash
# Trigger npm publishing
gh workflow run npm-github-packages.yml

# Trigger Docker publishing
gh workflow run docker-publish.yml

# Check workflow status
gh run list --limit 5

# View specific run logs
gh run view --log
```

#### Via provided script:
```bash
./publish-packages.sh --trigger
```

## 📋 Prerequisites

Before publishing:

1. **GitHub Token**: Workflows use `GITHUB_TOKEN` (automatically provided)
2. **NPM Token** (for npmjs.org): Add `NPM_TOKEN` secret in repository settings if publishing to npmjs.org
3. **Permissions**: Repository needs packages write permissions
   - Go to Settings → Actions → General → Workflow permissions
   - Select "Read and write permissions"
4. **Tests**: All tests must pass
   ```bash
   npm test
   ```
5. **Docker**: Dockerfile must build successfully
   ```bash
   docker build -t test .
   ```

## ✅ Verification After Publishing

### Verify npm Package (GitHub Packages)

1. **View package**:
   - Visit: https://github.com/orgs/xaoex/packages?repo_name=reality-simulation-code
   - Or: https://github.com/xaoex/reality-simulation-code/pkgs/npm/reality-simulation-code

2. **Install and test**:
   ```bash
   # Configure npm to use GitHub Packages
   echo "@xaoex:registry=https://npm.pkg.github.com" >> ~/.npmrc
   
   # Authenticate
   npm login --registry=https://npm.pkg.github.com --scope=@xaoex
   
   # Install package
   npm install @xaoex/reality-simulation-code
   
   # Test import
   node -e "const pkg = require('@xaoex/reality-simulation-code'); console.log('✓ Package loaded');"
   ```

### Verify npm Package (npmjs.org)

1. **View package**:
   - Visit: https://www.npmjs.com/package/reality-simulation-code

2. **Install and test**:
   ```bash
   npm install reality-simulation-code
   
   node -e "const pkg = require('reality-simulation-code'); console.log('✓ Package loaded');"
   ```

### Verify Docker Image

1. **View package**:
   - Visit: https://github.com/xaoex/reality-simulation-code/pkgs/container/reality-simulation-code

2. **Pull and test**:
   ```bash
   # Pull image
   docker pull ghcr.io/xaoex/reality-simulation-code:latest
   
   # Run container
   docker run --rm ghcr.io/xaoex/reality-simulation-code:latest
   
   # Run demo
   docker run --rm ghcr.io/xaoex/reality-simulation-code:latest node demo.js
   ```

3. **Check image details**:
   ```bash
   # Inspect image
   docker inspect ghcr.io/xaoex/reality-simulation-code:latest
   
   # View image labels
   docker inspect ghcr.io/xaoex/reality-simulation-code:latest | grep -A 10 Labels
   ```

## 🔄 Updating Package Version

### For npm (package.json):

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major

# Specific version
npm version 1.2.3

# Commit and push
git push origin main --follow-tags
```

### For Docker:

Docker versions are automatically determined from:
- Git tags (e.g., `v1.0.0` → tag `1.0.0`)
- Branch names (e.g., `main` → tag `latest`)
- Commit SHAs (e.g., `abc123` → tag `sha-abc123`)

## 📊 Available Workflows

### 1. npm-publish.yml
- **Publishes to**: npmjs.org
- **Triggers**: release, workflow_dispatch
- **Requires**: NPM_TOKEN secret

### 2. npm-github-packages.yml  
- **Publishes to**: GitHub Packages
- **Triggers**: release, push (main/production), tags (v*, release-*), workflow_dispatch
- **Package name**: `@xaoex/reality-simulation-code`

### 3. docker-publish.yml
- **Publishes to**: GitHub Container Registry (ghcr.io)
- **Triggers**: release, push (main/production), tags (v*, release-*), workflow_dispatch
- **Image**: `ghcr.io/xaoex/reality-simulation-code`

### 4. dockergithubpackage.yml
- **Publishes to**: GitHub Container Registry (ghcr.io)
- **Triggers**: release, push (main/production/seed), tags (v*, release-*), PR, workflow_dispatch
- **Legacy workflow** - consider using docker-publish.yml instead

## 🐛 Troubleshooting

### Workflow Fails - Authentication Error

**Issue**: `npm ERR! 401 Unauthorized` or Docker login fails

**Solution**:
- Check repository permissions: Settings → Actions → General
- Ensure "Read and write permissions" is selected
- For npmjs.org: Add NPM_TOKEN to repository secrets
- For GitHub Packages: GITHUB_TOKEN is automatic

### Package Version Already Exists

**Issue**: Cannot publish - version already exists

**Solution**:
```bash
# Update version
npm version patch

# Or manually edit package.json
# Then commit and push
git add package.json
git commit -m "Bump version"
git push
```

### Package Not Visible

**Issue**: Package published but not showing up

**Solution**:
- Check package visibility: Package → Settings → Change visibility
- Make package public if needed
- Wait a few minutes for indexing

### Docker Build Fails

**Issue**: Docker build fails in workflow

**Solution**:
```bash
# Test locally
docker build -t test .

# Check logs
docker build --progress=plain -t test .

# Verify all files exist
ls -la LICENSE README.md index.js demo.js
```

## 📚 Related Documentation

- [README.md](README.md) - Quick start guide
- [PACKAGE.md](PACKAGE.md) - Complete package usage guide
- [PUBLISHING.md](PUBLISHING.md) - Detailed publishing guide
- [LICENSE](LICENSE) - XPSL-1.0 license terms

## 🎯 Quick Command Reference

```bash
# Test package locally
npm pack
npm install ./reality-simulation-code-1.0.0.tgz

# Test Docker locally
docker build -t xaoex/reality-simulation-code:latest .
docker run --rm xaoex/reality-simulation-code:latest node demo.js

# Trigger workflows
gh workflow run npm-github-packages.yml
gh workflow run docker-publish.yml

# Check workflow status
gh run list --workflow=npm-github-packages.yml --limit 5
gh run list --workflow=docker-publish.yml --limit 5

# View workflow logs
gh run view --log

# Create release
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes"

# List releases
gh release list
```

## 🎨 Package Features

✅ **npm Package**:
- Small size (~56KB packed, ~210KB unpacked)
- All necessary files included
- TypeScript-friendly (JSDoc comments)
- Works with both CommonJS and ES modules
- Includes comprehensive documentation

✅ **Docker Image**:
- Small size (~135MB)
- Based on Alpine Linux (minimal)
- Runs as non-root user (security)
- Health check included
- Multi-stage build for optimization
- Includes all documentation

---

**Ready to release?** 🚀

Choose your method above and publish the xaoex reality simulation code to the world!

For commercial licensing inquiries:
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

For you kiddo, Oktay eternally through aeons.
