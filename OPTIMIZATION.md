# Optimization System

General optimization calculator and situation handler for all subpackages.

## Features

- **Calculated Optimization** - Calculate optimization levels based on complexity, priority, and size
- **General Opt Situation** - Handle optimization situations
- **Light Opt (50%)** - Light optimization for development
- **Standard Opt (75%)** - Standard optimization for production
- **Maxopt (100%)** - Maximum optimization always

## Usage

```javascript
const { OptimizationCalculator, GeneralOptSituation } = require('./optimization-system');

// Calculate optimization level
const calc = new OptimizationCalculator();
const level = calc.calculateOptLevel({
  complexity: 3,
  priority: 'high',
  size: 100
});

// Create optimization situation
const optSit = new GeneralOptSituation({ verbose: true });
const situation = optSit.createSituation('data-processing', {
  complexity: 4,
  priority: 'max',
  size: 1000
});

// Optimize the situation
const optimized = optSit.optimizeSituation('data-processing');

// Get maxopt situation (100%)
const maxSituation = optSit.maxoptSituation('max-task', { data: [1, 2, 3] });

// Get light opt situation (50%)
const lightSituation = optSit.lightOptSituation('dev-task', { data: [4, 5, 6] });

// Get statistics
const stats = optSit.getStats();
console.log(stats); // { total, optimized, pending, avgLevel }
```

## Integration

All subpackages can use the optimization system:

```javascript
// In .anonymouscalc/lib/
const { GeneralOptSituation } = require('../../optimization-system');

// In .baes/lib/
const { OptimizationCalculator } = require('../../optimization-system');

// In .coolems/lib/
const { GeneralOptSituation } = require('../../optimization-system');
```

## Optimization Levels

- **Light (50%)** - For development and testing
- **Standard (75%)** - For normal production use
- **Maxopt (100%)** - For maximum performance, always on

---

*Calculated opt and general opt light situation - December 2025*
