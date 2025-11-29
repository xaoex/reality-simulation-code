# FREE-XX - Free Software & Offers Store

A comprehensive catalog of 100% free software, student offers, lifetime free deals, free trials, and subscription management for retro and modern computers.

## Overview

FREE-XX complements FOSS-XX by focusing on all types of free software availability:
- **100% Free Forever** - Software that is completely free with no restrictions
- **Student Offers** - Educational discounts and free licenses for students
- **Lifetime Free** - One-time purchase or registration for permanent access
- **Free Trials** - Time-limited trials with full functionality
- **Subscription Trials** - Trial periods for subscription-based software with recycling tracking

## Directory Structure

```
FREE-XX/
├── index.json           # Main catalog index
├── index.js             # JavaScript API module
├── offers/              # Current free offers and deals
├── trials/              # Free trial software listings
├── student/             # Student discount and free programs
├── lifetime/            # Lifetime free licenses
└── metadata/            # Software metadata files
```

## Categories

### Free Types
- `free-forever` - 100% free with no time limits or feature restrictions
- `freemium` - Free base version with optional paid upgrades
- `student-free` - Free for verified students
- `student-discount` - Discounted pricing for students
- `lifetime-free` - Free after one-time registration
- `trial-unlimited` - Unlimited trial with some restrictions
- `trial-timed` - Time-limited full access trial
- `subscription-trial` - Trial period for subscription services

## Usage

### JavaScript API

```javascript
const { freexx } = require('reality-simulation-code');

// Initialize the store
freexx.init();

// List all free software
const allFree = freexx.listFree();

// Get student offers
const studentDeals = freexx.getStudentOffers();

// Get lifetime free software
const lifetimeFree = freexx.getLifetimeFree();

// Get active trials
const trials = freexx.getTrials();

// Search free software
const results = freexx.search('office');

// Get trial recycling info
const recycling = freexx.getTrialRecycling('app.id');
```

## Metadata Format

```json
{
  "id": "com.example.app",
  "name": "Example App",
  "summary": "A great free application",
  "description": "Full description of the application",
  "freeType": "free-forever",
  "studentOffer": {
    "available": true,
    "discount": "100%",
    "verification": "edu-email",
    "link": "https://example.com/students"
  },
  "trial": {
    "available": true,
    "duration": "30 days",
    "features": "full",
    "recyclable": true,
    "recycleMethod": "new-email"
  },
  "platforms": ["windows", "macos", "linux"],
  "categories": ["office", "productivity"]
}
```

## Contributing

Submit new free software entries by creating metadata files in the appropriate directories.

## License

MIT License - Part of Reality Simulation Code by xaoex

## Links

- [FOSS-XX](../FOSS-XX/) - Free and Open Source Software Store
- [xaoex](https://linktr.ee/xaoex)
- [oktays](https://linktr.ee/oktays)
