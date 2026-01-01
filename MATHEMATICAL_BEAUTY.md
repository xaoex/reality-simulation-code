# Mathematical Beauty: Four-Part Temporal Situation Framework

This document describes the Mathematical Beauty framework for modeling beautiful mathematical sequences and series with temporal awareness through a 4-part situation model.

## Overview

The **Mathematical Beauty** module implements the problem statement: "Define (pre) and (post) and 4 part situation for mathematical beauty involving series and sequences that are of mathematical beauty."

### Key Components

1. **Mathematical Beauty Series** - Classic beautiful sequences
   - Fibonacci sequence
   - Lucas numbers
   - Tribonacci sequence
   - Padovan sequence
   - Golden ratio (φ)

2. **Four-Part Temporal Situation** - Temporal state model
   - **prepre**: Historical context (t-2)
   - **pre**: Previous state (t-1)
   - **current**: Current state (t)
   - **post**: Next state (t+1)
   - **lore**: Accumulated wisdom from all states

3. **Young Situation Integration** - Model sequences as state transitions

## Mathematical Sequences

### Fibonacci Sequence

The most famous sequence in mathematics, where each number is the sum of the two preceding ones:

```
F(n) = F(n-1) + F(n-2)
F(0) = 0, F(1) = 1
```

**Sequence**: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...

**Mathematical Beauty**:
- Appears in nature (spiral shells, flower petals, tree branches)
- Converges to the golden ratio φ ≈ 1.618
- F(n) = φⁿ/√5 (rounded to nearest integer)

### Lucas Numbers

Similar recurrence to Fibonacci but with different initial conditions:

```
L(n) = L(n-1) + L(n-2)
L(0) = 2, L(1) = 1
```

**Sequence**: 2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199, 322...

**Mathematical Beauty**:
- Also converges to the golden ratio
- Related to Fibonacci: L(n) = F(n-1) + F(n+1)
- L(n)² - 5F(n)² = 4(-1)ⁿ

### Tribonacci Sequence

Extension where each term is the sum of the three preceding ones:

```
T(n) = T(n-1) + T(n-2) + T(n-3)
T(0) = 0, T(1) = 0, T(2) = 1
```

**Sequence**: 0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274...

**Mathematical Beauty**:
- Converges to tribonacci constant ≈ 1.839
- Generalizes Fibonacci to higher orders

### Padovan Sequence

A different recurrence pattern:

```
P(n) = P(n-2) + P(n-3)
P(0) = 1, P(1) = 1, P(2) = 1
```

**Sequence**: 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12, 16, 21, 28...

**Mathematical Beauty**:
- Converges to plastic number ≈ 1.324
- Related to Padovan triangle tiling

## Four-Part Temporal Situation Model

The four-part situation provides temporal awareness for mathematical sequences:

```
Timeline:  ... -> prepre -> pre -> current -> post -> ...
            (t-2)     (t-1)    (t)      (t+1)

Lore: Accumulated patterns and wisdom from all states
```

### Example: Fibonacci at Index 5

```javascript
const situation = new FourPartSituation('fibonacci', 5);

situation.prepre();   // F(3) = 2  (two states back)
situation.pre();      // F(4) = 3  (one state back)
situation.current();  // F(5) = 5  (current state)
situation.post();     // F(6) = 8  (next state)
situation.lore();     // Accumulated patterns
```

### Temporal Navigation

```javascript
// Move forward in time
situation.advance();
console.log(situation.current()); // Now at F(6) = 8

// Move backward in time
situation.rewind();
console.log(situation.current()); // Back to F(5) = 5

// Jump to specific index
situation.reset(10);
console.log(situation.current()); // F(10) = 55
```

### Lore Accumulation

The lore system tracks:
- Total generations computed
- Maximum sequence length generated
- Ratio patterns between consecutive terms
- Convergence behavior

```javascript
const lore = situation.lore();
console.log(lore.totalGenerations);  // Number of times generated
console.log(lore.maxLength);         // Longest sequence computed
console.log(lore.patterns);          // Array of ratios F(n+1)/F(n)
```

## Installation

```bash
npm install reality-simulation-code
```

## Usage Examples

### Basic Sequence Generation

```javascript
const { MathematicalBeauty } = require('reality-simulation-code');

const beauty = new MathematicalBeauty();

// Generate individual values
console.log(beauty.fibonacci(10));   // 55
console.log(beauty.lucas(10));       // 123
console.log(beauty.tribonacci(10));  // 81
console.log(beauty.padovan(10));     // 12

// Calculate golden ratio
console.log(beauty.goldenRatio(20)); // ~1.618034
```

### Four-Part Situation Usage

```javascript
const { FourPartSituation } = require('reality-simulation-code');

// Create situation for Fibonacci at index 7
const situation = new FourPartSituation('fibonacci', 7);

// Get all parts at once
const parts = situation.getAllParts();
console.log(parts);
// {
//   prepre: 5,     // F(5)
//   pre: 8,        // F(6)
//   current: 13,   // F(7)
//   post: 21,      // F(8)
//   lore: { ... }  // Accumulated patterns
// }

// Navigate through time
situation.advance();  // Move to F(8)
situation.rewind();   // Back to F(7)
```

### Young Situation Integration

```javascript
const { createBeautySituation } = require('reality-simulation-code');

// Create a Young Situation for Fibonacci sequence
const situation = createBeautySituation('fibonacci', 10);

// Find optimal path from start to end
const path = situation.findOptimalPath('n0');
console.log(path);
// ['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10']

// Get valuations (sequence values)
path.forEach(state => {
  const value = situation.valuation(state);
  const index = parseInt(state.substring(1));
  console.log(`F(${index}) = ${value}`);
});
// F(0) = 0
// F(1) = 1
// F(2) = 1
// F(3) = 2
// ...
// F(10) = 55
```

### Multiple Sequence Types

```javascript
const { FourPartSituation } = require('reality-simulation-code');

// Fibonacci
const fib = new FourPartSituation('fibonacci', 10);
console.log(fib.current()); // 55

// Lucas
const luc = new FourPartSituation('lucas', 10);
console.log(luc.current()); // 123

// Tribonacci
const tri = new FourPartSituation('tribonacci', 10);
console.log(tri.current()); // 81

// Padovan
const pad = new FourPartSituation('padovan', 10);
console.log(pad.current()); // 12
```

## Example Functions

### Four-Part Situation Example

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

### Mathematical Beauty Example

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

### Beauty Situation Example

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
//     ...
//     { state: 'n8', value: 21, isFinal: true }
//   ],
//   pathLength: 9
// }
```

## Testing

Run the comprehensive test suite:

```bash
node test-mathematical-beauty.js
```

The test suite validates:
- All sequence generation (Fibonacci, Lucas, Tribonacci, Padovan)
- Golden ratio calculation
- Four-part situation (prepre, pre, current, post, lore)
- Temporal navigation (advance, rewind, reset)
- Young Situation integration
- All example functions

## API Reference

### MathematicalBeauty Class

#### Constructor
```javascript
new MathematicalBeauty()
```

#### Methods
- `fibonacci(n)` - Generate nth Fibonacci number
- `lucas(n)` - Generate nth Lucas number
- `tribonacci(n)` - Generate nth Tribonacci number
- `padovan(n)` - Generate nth Padovan number
- `goldenRatio(iterations)` - Calculate golden ratio
- `getLore(sequenceName)` - Get lore for sequence
- `getAllLore()` - Get all accumulated lore

### FourPartSituation Class

#### Constructor
```javascript
new FourPartSituation(sequenceType = 'fibonacci', startIndex = 0)
```

Parameters:
- `sequenceType` - 'fibonacci', 'lucas', 'tribonacci', or 'padovan'
- `startIndex` - Starting position in sequence

#### Methods
- `prepre()` - Get value at t-2
- `pre()` - Get value at t-1
- `current()` - Get value at t
- `post()` - Get value at t+1
- `lore()` - Get accumulated wisdom
- `getAllParts()` - Get all parts as object
- `advance()` - Move to next state
- `rewind()` - Move to previous state
- `reset(index)` - Jump to specific index

### Factory Functions

- `createBeautySituation(sequenceType, length)` - Create Young Situation for sequence
- `fourPartSituationExample()` - Run four-part example
- `mathematicalBeautyExample()` - Run beauty example
- `beautySituationExample()` - Run situation example

## Mathematical Properties

### Golden Ratio (φ)

```
φ = (1 + √5) / 2 ≈ 1.618033988749895
```

Properties:
- φ² = φ + 1
- 1/φ = φ - 1
- lim(n→∞) F(n+1)/F(n) = φ
- lim(n→∞) L(n+1)/L(n) = φ

### Convergence

All sequences demonstrate convergence behavior:
- Fibonacci → Golden ratio (φ)
- Lucas → Golden ratio (φ)
- Tribonacci → Tribonacci constant (~1.839)
- Padovan → Plastic number (~1.324)

## Integration with Young Field

The module integrates with Young Field for:
- Division operations in ratio calculations
- Field-based transformations
- Normalized probability distributions

## Architecture

```
mathematical-beauty/
├── index.js          # Main module implementation
├── README.md         # Detailed usage guide
└── (integrated with)
    ├── young-field/  # Field operations
    └── young-situation/  # State modeling
```

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*"In mathematics, beauty is truth made visible through patterns and sequences."*
