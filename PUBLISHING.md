# Publishing Guide - xaoex Packages to GitHub Packages

This guide explains how to publish the xaoex packages (npm and Docker) to GitHub Packages.

## 📦 What Gets Published

### npm Package
- **Package name**: `@xaoex/reality-simulation-code`
- **Registry**: GitHub Packages (npm.pkg.github.com)
- **Workflow**: `.github/workflows/npm-github-packages.yml`

### Docker Image
- **Image name**: `ghcr.io/xaoex/reality-simulation-code`
- **Registry**: GitHub Container Registry
- **Workflow**: `.github/workflows/docker-publish.yml`

## 🚀 Publishing Methods

### Method 1: Merge to Main/Production (Recommended)

The easiest way to publish packages is to merge this PR to the `main` or `production` branch.

1. **Merge the PR**:
   ```bash
   # On GitHub, merge the PR "Create comprehensive xaoex package"
   # Or using gh CLI:
   gh pr merge --merge
   ```

2. **Automatic Publishing**:
   - When code is pushed to `main` or `production`, workflows automatically trigger
   - npm package is published to GitHub Packages
   - Docker image is built and pushed to GitHub Container Registry

3. **Verify Publication**:
   - npm: https://github.com/orgs/xaoex/packages?repo_name=reality-simulation-code
   - Docker: https://github.com/xaoex/reality-simulation-code/pkgs/container/reality-simulation-code

### Method 2: Create a Release

Create a GitHub release to trigger package publishing with semantic versioning.

1. **Create a Release**:
   ```bash
   # Using gh CLI
   gh release create v1.0.0 --title "v1.0.0 - Complete xaoex Package" --notes "Initial release of comprehensive xaoex package"
   
   # Or on GitHub:
   # Go to Releases → Draft a new release → Create tag v1.0.0
   ```

2. **Automatic Publishing**:
   - Both npm and Docker workflows trigger on release
   - Version is automatically set from the release tag
   - Packages are published with the release version

3. **Version Tags**:
   - Use semantic versioning: `v1.0.0`, `v1.1.0`, `v2.0.0`
   - Can also use: `release-1.0`, `release-2.0`

### Method 3: Manual Workflow Trigger

Manually trigger the workflows from the GitHub Actions tab or using the provided script.

#### Using GitHub UI

1. Go to the [Actions tab](https://github.com/xaoex/reality-simulation-code/actions)
2. Select the workflow:
   - `Publish npm to GitHub Packages` for npm
   - `Publish Docker Image` for Docker
3. Click **Run workflow**
4. Select the branch: `copilot/create-package-for-xaoex`
5. Click **Run workflow** button

#### Using the Publish Script

We've provided a helper script for easy publishing:

```bash
# From the repository root
./publish-packages.sh --trigger
```

This script will:
- Check if u're on the right branch
- Trigger both npm and Docker publishing workflows
- Provide status check commands

#### Using gh CLI Directly

```bash
# Trigger npm publishing
gh workflow run npm-github-packages.yml --ref copilot/create-package-for-xaoex

# Trigger Docker publishing
gh workflow run docker-publish.yml --ref copilot/create-package-for-xaoex

# Check workflow status
gh run list --workflow=npm-github-packages.yml --limit 1
gh run list --workflow=docker-publish.yml --limit 1

# View logs
gh run view --log
```

## 📋 Prerequisites

Before publishing, ensure:

1. **GitHub Token**: Workflows use `GITHUB_TOKEN` (automatically provided)
2. **Permissions**: Repository needs packages write permissions
3. **Branch**: On `main`, `production`, or triggering workflow manually
4. **Tests**: All tests passing (run `npm test`)
5. **Docker**: Dockerfile builds successfully (run `docker build .`)

## ✅ Verification After Publishing

### Verify npm Package

1. **Check GitHub Packages**:
   ```bash
   # Visit: https://github.com/orgs/xaoex/packages?repo_name=reality-simulation-code
   ```

2. **Install and test**:
   ```bash
   # Configure npm to use GitHub Packages
   echo "@xaoex:registry=https://npm.pkg.github.com" >> ~/.npmrc
   
   # Authenticate (if needed)
   npm login --registry=https://npm.pkg.github.com --scope=@xaoex
   
   # Install package
   npm install @xaoex/reality-simulation-code
   
   # Test import
   node -e "const pkg = require('@xaoex/reality-simulation-code'); console.log('Package loaded successfully');"
   ```

### Verify Docker Image

1. **Check GitHub Container Registry**:
   ```bash
   # Visit: https://github.com/xaoex/reality-simulation-code/pkgs/container/reality-simulation-code
   ```

2. **Pull and test**:
   ```bash
   # Pull image
   docker pull ghcr.io/xaoex/reality-simulation-code:latest
   
   # Run container
   docker run --rm ghcr.io/xaoex/reality-simulation-code:latest
   
   # Run demo
   docker run --rm ghcr.io/xaoex/reality-simulation-code:latest node demo.js
   ```

## 🔄 Updating Packages

To update packages with new changes:

1. **Update version** in `package.json`:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

2. **Commit and push**:
   ```bash
   git add package.json
   git commit -m "Bump version to $(node -p require('./package.json').version)"
   git push
   ```

3. **Publish** using one of the methods above

## 🐛 Troubleshooting

### Workflow Fails - Authentication Error

**Issue**: `npm ERR! 401 Unauthorized` or Docker login fails

**Solution**:
- Check repository permissions (Settings → Actions → General)
- Ensure workflows have "Read and write permissions"
- Verify `GITHUB_TOKEN` has packages scope

### Workflow Fails - Package Already Exists

**Issue**: Package version already published

**Solution**:
- Update version in `package.json`
- Or delete existing package version in GitHub Packages UI
- Re-run workflow

### Package Not Visible

**Issue**: Package published but not visible

**Solution**:
- Check package visibility settings (should be public)
- Go to package settings → Change visibility
- Wait a few minutes for indexing

### Docker Build Fails

**Issue**: Docker build fails in workflow

**Solution**:
- Test locally: `docker build -t test .`
- Check Dockerfile syntax
- Verify all COPY sources exist
- Check .dockerignore isn't excluding needed files

## 📊 Current Package Status

After this PR is merged and published:

- **npm Package**: 
  - Name: `@xaoex/reality-simulation-code`
  - Version: 1.0.0 (+ build number)
  - Size: ~55 KB
  - Location: https://github.com/orgs/xaoex/packages

- **Docker Image**:
  - Name: `ghcr.io/xaoex/reality-simulation-code`
  - Tags: `latest`, `copilot-create-package-for-xaoex` (branch), `sha-XXXXXXX`
  - Size: ~135 MB
  - Location: https://github.com/xaoex/reality-simulation-code/pkgs/container/reality-simulation-code

## 📚 Related Documentation

- [PACKAGE.md](PACKAGE.md) - Complete package usage guide
- [RELEASE_NOTES.md](RELEASE_NOTES.md) - Release information
- [README.md](README.md) - Quick start guide
- [GitHub Packages Docs](https://docs.github.com/en/packages)

## 🎯 Quick Command Reference

```bash
# Trigger publishing (easiest)
./publish-packages.sh --trigger

# Or manually with gh CLI
gh workflow run npm-github-packages.yml
gh workflow run docker-publish.yml

# Check status
gh run list --limit 5

# View specific run
gh run view <run-id> --log

# Test npm package locally
npm pack --dry-run

# Test Docker build locally
docker build -t xaoex/reality-simulation-code:test .
docker run --rm xaoex/reality-simulation-code:test node demo.js
```

---

**Ready to publish?** Choose ur method above and let's get the packages live! 🚀
