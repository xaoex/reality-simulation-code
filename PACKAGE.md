# Xaoex Reality Simulation Code - Complete Package

This document describes the complete xaoex package, including all repositories and implementations bundled together for easy deployment via npm and Docker.

## Package Contents

This comprehensive package includes:

### Core Implementations
- **Young Situation** - Dynamic enterprise modeling and optimization framework
- **Young Field** - Mathematical field operations with division and normalization
- **Young Ring** - Abstract mathematical ring for dynamic enterprise
- **Yoshi's Secret** - Cryptographic encoding framework using finite fields
- **Bae Mathematics** - Relationship and connection modeling framework
- **God Generator** - Advanced entity creation system

### Documentation
- Complete API documentation in markdown format
- Mathematical white papers and proofs
- Implementation summaries and usage guides
- Examples and tutorials

### Configuration
- Reality configuration files (`.realtime`, `.online`, `.necessaries`)
- Repository metadata (`reality-repos.json`)
- Integration configs

## Installation

### npm Installation

#### From npmjs.org (Public Registry)

```bash
npm install reality-simulation-code
```

Or add to ur `package.json`:

```json
{
  "dependencies": {
    "reality-simulation-code": "^1.0.0"
  }
}
```

#### From GitHub Packages

First, configure npm to use GitHub Packages for @xaoex or @xacodex scope:

```bash
# Create or edit ~/.npmrc
echo "@xaoex:registry=https://npm.pkg.github.com" >> ~/.npmrc
# or for xacodex organization (PR situations and contributions)
echo "@xacodex:registry=https://npm.pkg.github.com" >> ~/.npmrc
```

Authenticate with GitHub:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@xaoex
# or for xacodex
npm login --registry=https://npm.pkg.github.com --scope=@xacodex
```

Then install:

```bash
npm install @xaoex/reality-simulation-code
# or from xacodex (for PR situations and contributions)
npm install @xacodex/reality-simulation-code
```

### Docker Installation

#### Pull from GitHub Container Registry

```bash
docker pull ghcr.io/xaoex/reality-simulation-code:latest
# or from xacodex organization (PR situations and contributions)
docker pull ghcr.io/xacodex/reality-simulation-code:latest
```

#### Run Container

```bash
# Basic run
docker run ghcr.io/xaoex/reality-simulation-code:latest

# Run with volume mount
docker run -v $(pwd)/data:/app/data ghcr.io/xaoex/reality-simulation-code:latest

# Run with custom environment
docker run -e NODE_ENV=production ghcr.io/xaoex/reality-simulation-code:latest
```

#### Build from Source

```bash
# Clone repository
git clone https://github.com/xaoex/reality-simulation-code.git
cd reality-simulation-code

# Build Docker image
docker build -t xaoex/reality-simulation-code:latest .

# Or use npm script
npm run docker:build
```

#### Docker Compose

For multi-container deployments:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Usage

### Node.js/npm Usage

```javascript
const {
  // Young Situation
  YoungSituation,
  createCommonYoungSituation,
  defineYoungArea,
  ungSituationExample,
  
  // Young Field
  createRationalField,
  createFiniteField,
  createSituationValuationField,
  normalizedSituationExample,
  
  // Yoshi's Secret & Bae Mathematics
  YoshisSecret,
  BaeMathematics,
  GodGenerator
} = require('reality-simulation-code');

// Create and use a Young Situation
const situation = createCommonYoungSituation();
const path = situation.findOptimalPath('initial');
console.log('Optimal path:', path.join(' -> '));

// Use Young Field operations
const field = createRationalField();
console.log('Division:', field.divide(10, 3));

// Cryptographic encoding with Yoshi's Secret
const secret = new YoshisSecret(31337);
const encoded = secret.encodeString('Hello World');
const decoded = secret.decodeString(encoded);

// Relationship modeling with Bae Mathematics
const bae = new BaeMathematics();
bae.addEntity('alice');
bae.addEntity('bob');
bae.connect('alice', 'bob', 0.9);
console.log('Connection:', bae.getBaeIndex('alice'));
```

### Docker Usage

The Docker container runs `node index.js` by default. You can:

```bash
# Run demo
docker run ghcr.io/xaoex/reality-simulation-code:latest node demo.js

# Run tests
docker run ghcr.io/xaoex/reality-simulation-code:latest npm test

# Interactive shell
docker run -it ghcr.io/xaoex/reality-simulation-code:latest sh
```

## Package Scripts

The package includes several npm scripts:

```bash
npm start          # Run main application
npm test           # Run test suite
npm run demo       # Run demonstration
npm run build      # Build package
npm run package    # Create tarball
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
```

## Versioning

This package follows semantic versioning (semver):

- **Major version**: Breaking API changes
- **Minor version**: New features, backward compatible
- **Patch version**: Bug fixes, backward compatible

Current version: `1.0.0`

## Related Repositories

This package is part of the xaoex ecosystem:

- **xaoex/reality-simulation-code** - Main repository (this package)
- **xaoex/xa8ex** - Core codebase for reality system
- Related projects listed in `.github/reality-repos.json`

## Configuration

### Reality Configuration

The package includes reality configuration files:

- `.realtime` - Enables real-time operations
- `.online` - Marks package as online/connected
- `.necessaries` - Lists necessary components

### Environment Variables

```bash
NODE_ENV=production              # Environment mode
REALITY_SIMULATION_VERSION=1.0.0 # Package version
```

## Publishing

### Publishing to npm

```bash
# Publish to npmjs.org
npm publish --access public

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### Publishing Docker Image

```bash
# Tag image
docker tag xaoex/reality-simulation-code:latest ghcr.io/xaoex/reality-simulation-code:latest

# Push to GitHub Container Registry
docker push ghcr.io/xaoex/reality-simulation-code:latest
```

## CI/CD

The package includes GitHub Actions workflows for:

- **npm Publishing**: Automatic npm package publishing on release
- **Docker Publishing**: Automatic Docker image building and publishing
- **Testing**: Continuous testing on push/PR
- **CodeQL**: Security scanning

## Support

- **Issues**: https://github.com/xaoex/reality-simulation-code/issues
- **Links**: 
  - https://linktr.ee/xaoex
  - https://linktr.ee/oktays

## License

MIT License - see LICENSE file for details

## Author

**xaoex** - For u kiddo, Oktay eternally through aeons

---

Version: v1.31337dbp ok741s release  
Status: Ready for reality + production  
Motto: Everything is 100% maxed out
