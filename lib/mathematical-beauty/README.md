# Mathematical Beauty

A module for generating beautiful mathematical sequences and series with temporal awareness through a 4-part situation model.

## Overview

This module provides:

1. **Mathematical Beauty Series** - Classic beautiful sequences like Fibonacci, Lucas, Tribonacci, and Padovan
2. **Four-Part Temporal Situation** - A temporal state model with `prepre`, `pre`, `current`, `post`, and `lore`
3. **Young Situation Integration** - Model sequence progression as state transitions
4. **Golden Ratio Calculation** - Convergence to φ (phi) through Fibonacci ratios

## Mathematical Sequences

### Fibonacci Sequence
The classic sequence where each number is the sum of the two preceding ones:
```
F(n) = F(n-1) + F(n-2)
F(0) = 0, F(1) = 1
Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
```

### Lucas Numbers
Similar to Fibonacci but with different initial values:
```
L(n) = L(n-1) + L(n-2)
L(0) = 2, L(1) = 1
Sequence: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123...
```

### Tribonacci Sequence
Each number is the sum of the three preceding ones:
```
T(n) = T(n-1) + T(n-2) + T(n-3)
T(0) = 0, T(1) = 0, T(2) = 1
Sequence: 0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81...
```

### Padovan Sequence
```
P(n) = P(n-2) + P(n-3)
P(0) = 1, P(1) = 1, P(2) = 1
Sequence: 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16...
```

## Four-Part Situation Model

The temporal awareness model provides:

- **prepre**: Historical context (t-2)
- **pre**: Previous state (t-1)
- **current**: Current state (t)
- **post**: Next state (t+1)
- **lore**: Accumulated wisdom and patterns from all states

## Usage

### Basic Sequence Generation

```javascript
const { MathematicalBeauty } = require('reality-simulation-code');

const beauty = new MathematicalBeauty();

// Generate Fibonacci numbers
console.log(beauty.fibonacci(10)); // 55
console.log(beauty.fibonacci(15)); // 610

// Generate Lucas numbers
console.log(beauty.lucas(10)); // 123

// Generate Tribonacci numbers
console.log(beauty.tribonacci(10)); // 81

// Generate Padovan numbers
console.log(beauty.padovan(10)); // 12

// Calculate golden ratio
console.log(beauty.goldenRatio(20)); // ~1.618034
```

### Four-Part Situation

```javascript
const { FourPartSituation } = require('reality-simulation-code');

// Create a situation at Fibonacci index 5
const situation = new FourPartSituation('fibonacci', 5);

// Get all parts
const parts = situation.getAllParts();
console.log(parts);
// {
//   prepre: 2,    // F(3)
//   pre: 3,       // F(4)
//   current: 5,   // F(5)
//   post: 8,      // F(6)
//   lore: { ... } // Accumulated patterns
// }

// Advance to next state
situation.advance();
console.log(situation.current()); // 8 (now at F(6))

// Rewind to previous state
situation.rewind();
console.log(situation.current()); // 5 (back to F(5))
```

### Temporal Navigation

```javascript
const situation = new FourPartSituation('lucas', 7);

// Access individual temporal states
console.log(situation.prepre());  // L(5) = 11
console.log(situation.pre());     // L(6) = 18
console.log(situation.current()); // L(7) = 29
console.log(situation.post());    // L(8) = 47

// Get lore (accumulated wisdom)
const lore = situation.lore();
console.log(lore.totalGenerations);
console.log(lore.patterns); // Ratios between consecutive terms
```

### Young Situation Integration

```javascript
const { createBeautySituation } = require('reality-simulation-code');

// Create a Young Situation for Fibonacci sequence
const situation = createBeautySituation('fibonacci', 10);

// Find optimal path from start to end
const path = situation.findOptimalPath('n0');
console.log(path); // ['n0', 'n1', 'n2', ..., 'n10']

// Get valuations along the path
path.forEach(state => {
  console.log(`${state}: ${situation.valuation(state)}`);
});
// n0: 0
// n1: 1
// n2: 1
// n3: 2
// n4: 3
// n5: 5
// ...
```

## Examples

### Example 1: Four-Part Situation

```javascript
const { fourPartSituationExample } = require('reality-simulation-code');

const result = fourPartSituationExample();
console.log(result);
// {
//   initialState: { prepre: 2, pre: 3, current: 5, post: 8, lore: {...} },
//   afterAdvance1: { prepre: 3, pre: 5, current: 8, post: 13, lore: {...} },
//   afterAdvance2: { prepre: 5, pre: 8, current: 13, post: 21, lore: {...} },
//   afterRewind: { prepre: 3, pre: 5, current: 8, post: 13, lore: {...} },
//   sequenceType: 'fibonacci',
//   demonstration: 'Four-part temporal situation model for mathematical beauty'
// }
```

### Example 2: All Beautiful Sequences

```javascript
const { mathematicalBeautyExample } = require('reality-simulation-code');

const result = mathematicalBeautyExample();
console.log(result);
// {
//   fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
//   lucas: [2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123],
//   tribonacci: [0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81],
//   padovan: [1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12],
//   goldenRatio: 1.618033988749895,
//   lore: { ... }
// }
```

### Example 3: Beauty Situation

```javascript
const { beautySituationExample } = require('reality-simulation-code');

const result = beautySituationExample();
console.log(result);
// {
//   sequenceType: 'fibonacci',
//   path: ['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'],
//   valuations: [
//     { state: 'n0', value: 0, isFinal: false },
//     { state: 'n1', value: 1, isFinal: false },
//     { state: 'n2', value: 1, isFinal: false },
//     ...
//     { state: 'n8', value: 21, isFinal: true }
//   ],
//   pathLength: 9
// }
```

## API Reference

### MathematicalBeauty

#### Constructor
```javascript
new MathematicalBeauty()
```

#### Methods

- **`fibonacci(n)`** - Generate nth Fibonacci number
- **`lucas(n)`** - Generate nth Lucas number
- **`tribonacci(n)`** - Generate nth Tribonacci number
- **`padovan(n)`** - Generate nth Padovan number
- **`goldenRatio(iterations)`** - Calculate golden ratio using Fibonacci convergence
- **`getLore(sequenceName)`** - Get accumulated lore for a sequence type
- **`getAllLore()`** - Get all accumulated lore

### FourPartSituation

#### Constructor
```javascript
new FourPartSituation(sequenceType = 'fibonacci', startIndex = 0)
```

#### Methods

- **`prepre()`** - Get the state at t-2
- **`pre()`** - Get the state at t-1
- **`current()`** - Get the state at t
- **`post()`** - Get the state at t+1
- **`lore()`** - Get accumulated wisdom
- **`getAllParts()`** - Get all parts as an object
- **`advance()`** - Move to the next state
- **`rewind()`** - Move to the previous state
- **`reset(index)`** - Reset to a specific index

### Factory Functions

- **`createBeautySituation(sequenceType, length)`** - Create a Young Situation for a sequence
- **`fourPartSituationExample()`** - Run four-part situation example
- **`mathematicalBeautyExample()`** - Run mathematical beauty example
- **`beautySituationExample()`** - Run beauty situation example

## Mathematical Properties

### Golden Ratio (φ)

The golden ratio emerges from the Fibonacci sequence:
```
φ = lim(n→∞) F(n+1) / F(n) ≈ 1.618033988749895
```

Properties:
- φ² = φ + 1
- 1/φ = φ - 1
- φ = (1 + √5) / 2

### Lore Accumulation

The lore system tracks:
- Total number of generations
- Maximum sequence length generated
- Ratio patterns between consecutive terms
- Convergence towards characteristic ratios

## Integration with Young Field

Mathematical Beauty uses Young Field operations for:
- Division operations in golden ratio calculation
- Normalization of sequence ratios
- Field-based transformations

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*"Beauty in mathematics is seeing the truth with clarity." - From curiosity to pattern discovery.*
