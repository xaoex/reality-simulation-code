# Young Field Implementation

This document provides usage examples and documentation for the **Young Field** implementation, based on the formal mathematical definitions in [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md) Section 10.

## Overview

The **Young Field** is an extension of the **Young Ring** that adds multiplicative inverses, enabling division operations and advanced applications like:
- Normalized situation valuations
- Probability distributions over situations
- Rate of change calculations for ZMT (Zeit Movement Transform)
- DMT (Differential Movement Transform) interpolation weights

## Mathematical Foundation

### Young Ring (Definition 10.1)

A Young Ring is an algebraic structure **Y** = (R, +, ×, 0, 1) where:
- **(R, +, 0)** is an abelian group (additive structure)
- **(R, ×, 1)** is a monoid (multiplicative structure)
- Distributive laws hold
- Extended with relational algebra operations (σ, π, ⋈)

### Young Field (Definition 10.3)

A Young Field is an extension **F** = (R, +, ×, 0, 1, ⁻¹) where:
- **(R, +, 0)** is an abelian group
- **(R \ {0}, ×, 1, ⁻¹)** is an abelian group
- Every non-zero element has a multiplicative inverse
- Division operation: **a ÷ b = a × b⁻¹** for b ≠ 0

## Installation

```bash
npm install reality-simulation-code
```

## Usage

### Basic Import

```javascript
const {
  YoungRing,
  YoungField,
  createRationalField,
  createFiniteField,
  createSituationValuationField,
  normalizedSituationExample,
  ungFieldOperationsExample,
  finiteFieldExample
} = require('reality-simulation-code');
```

## Examples

### 1. Creating a Rational Young Field

The rational numbers ℚ form a Young Field with standard operations:

```javascript
const field = createRationalField();

// Basic operations
console.log(field.add(5, 3));          // 8
console.log(field.multiply(5, 3));     // 15
console.log(field.divide(6, 3));       // 2
console.log(field.inverse(4));         // 0.25

// Division by zero returns null
console.log(field.divide(5, 0));       // null
```

### 2. Finite Young Field (ℤₚ)

The integers modulo a prime p form a finite Young Field:

```javascript
const field = createFiniteField(7);

console.log([...field.elements]);      // [0, 1, 2, 3, 4, 5, 6]
console.log(field.add(5, 4));          // 2 (mod 7)
console.log(field.multiply(5, 4));     // 6 (mod 7)
console.log(field.divide(5, 2));       // 6 (since 2⁻¹ = 4, and 5×4=20≡6)
console.log(field.inverse(3));         // 5 (since 3×5=15≡1)

// Verify it's a valid field
console.log(field.isValidField());     // true
```

### 3. Normalized Situation Valuations (Application 10.1)

Convert situation valuations to a probability distribution:

```javascript
const field = createSituationValuationField();

// Situation valuations
const valuations = [100, 200, 300, 400];

// Normalize to probability distribution (sum = 1)
const probabilities = field.normalize(valuations);

console.log(probabilities);
// [0.1, 0.2, 0.3, 0.4]

// Or use the convenience method
const probDist = field.createProbabilityDistribution(valuations);
console.log(probDist.reduce((a, b) => a + b, 0));  // 1.0
```

### 4. Rate of Change for ZMT (Application 10.3)

Calculate rate of change for Zeit Movement Transform:

```javascript
const field = createRationalField();

// Define a function (e.g., situation valuation over time)
const situationValue = (t) => t * t;  // Quadratic growth

// Calculate rate of change at t=3 with step h=0.1
const rate = field.rateOfChange(situationValue, 3, 0.1);
console.log(rate);  // ≈ 6.1 (approaches derivative 2t = 6 as h→0)

// Smaller step size for better approximation
const rateSmallH = field.rateOfChange(situationValue, 3, 0.01);
console.log(rateSmallH);  // ≈ 6.01
```

### 5. Custom Young Ring

Create a custom Young Ring with custom operations:

```javascript
const customRing = new YoungRing(
  [0, 1, 2, 3, 4, 5],                    // elements
  (a, b) => (a + b) % 6,                 // addition mod 6
  (a, b) => (a * b) % 6,                 // multiplication mod 6
  0,                                      // zero element
  1                                       // one element
);

console.log(customRing.add(4, 5));      // 3 (mod 6)
console.log(customRing.multiply(3, 4)); // 0 (mod 6)

// Relational algebra operations
const evens = customRing.select(x => x % 2 === 0);
console.log([...evens]);                // [0, 2, 4]

const squares = customRing.project(x => (x * x) % 6);
console.log([...squares]);              // [0, 1, 4, 3, 4, 1]
```

### 6. Custom Young Field

Create a custom Young Field with custom operations:

```javascript
const customField = new YoungField(
  [0, 1, 2, 3, 4],                       // elements
  (a, b) => a + b,                       // addition
  (a, b) => a * b,                       // multiplication
  (a) => a === 0 ? null : 1 / a,        // inverse
  0,                                     // zero
  1                                      // one
);

console.log(customField.divide(10, 4));         // 2.5
console.log(customField.inverse(0.5));          // 2
console.log(customField.normalize([1, 2, 3]));  // [0.167, 0.333, 0.5]
```

### 7. Young Ring Relational Algebra

Apply relational algebra operations (Section 10.1):

```javascript
const ring1 = new YoungRing([1, 2, 3, 4, 5]);
const ring2 = new YoungRing([10, 20]);

// Selection (σ): Filter elements
const evens = ring1.select(x => x % 2 === 0);
console.log([...evens]);  // [2, 4]

// Projection (π): Transform elements
const squares = ring1.project(x => x * x);
console.log([...squares]);  // [1, 4, 9, 16, 25]

// Join (⋈): Cartesian product
const joined = ring1.join(ring2);
console.log(joined.size);  // 10 (5 × 2)
console.log([...joined].slice(0, 3));  // [[1,10], [1,20], [2,10], ...]
```

## Pre-built Examples

The library includes three example functions demonstrating Young Field usage:

### Example 1: Normalized Situations

```javascript
const result = normalizedSituationExample();
console.log(result);
// {
//   original: [10, 20, 30, 40],
//   normalized: [0.1, 0.2, 0.3, 0.4],
//   sum: 1
// }
```

### Example 2: Field Operations

```javascript
const result = ungFieldOperationsExample();
console.log(result);
// {
//   addition: 9,
//   multiplication: 18,
//   division: 2,
//   inverse: 0.333...,
//   divisionByZero: null
// }
```

### Example 3: Finite Field

```javascript
const result = finiteFieldExample();
console.log(result);
// {
//   elements: [0, 1, 2, 3, 4, 5, 6],
//   isValid: true,
//   operations: {
//     '5 + 4': 2,
//     '5 × 4': 6,
//     '5 ÷ 2': 6,
//     'inverse(3)': 5
//   }
// }
```

## Field Axioms Verification

All Young Fields satisfy the field axioms (Section 10.4):

### Axiom F1: Additive Group
```javascript
const field = createRationalField();
const a = 5, b = 3;

// Commutativity: a + b = b + a
console.log(field.add(a, b) === field.add(b, a));  // true

// Identity: a + 0 = a
console.log(field.add(a, field.zero) === a);  // true
```

### Axiom F2: Multiplicative Group
```javascript
// Multiplicative inverse: a × a⁻¹ = 1
const inv = field.inverse(a);
console.log(field.multiply(a, inv) === field.one);  // true
```

### Axiom F3: Distributivity
```javascript
const c = 7;
// a × (b + c) = (a × b) + (a × c)
console.log(
  field.multiply(a, field.add(b, c)) ===
  field.add(field.multiply(a, b), field.multiply(a, c))
);  // true
```

## Applications in Young Situation Framework

### 1. Normalized Valuations (Theorem 10.1)

```javascript
// Given Young Situations with valuations
const situations = [
  { id: 's1', value: 100 },
  { id: 's2', value: 200 },
  { id: 's3', value: 300 }
];

const field = createSituationValuationField();
const values = situations.map(s => s.value);
const normalized = field.normalize(values);

// Assign probabilities
situations.forEach((s, i) => {
  s.probability = normalized[i];
});

console.log(situations);
// [
//   { id: 's1', value: 100, probability: 0.167 },
//   { id: 's2', value: 200, probability: 0.333 },
//   { id: 's3', value: 300, probability: 0.5 }
// ]
```

### 2. Movement Interpolation Weights (Application 10.4)

```javascript
// Calculate interpolation weight for DMT
const field = createRationalField();

function interpolationWeight(t) {
  return field.divide(t, field.add(1, t));
}

console.log(interpolationWeight(0));    // 0
console.log(interpolationWeight(1));    // 0.5
console.log(interpolationWeight(3));    // 0.75
```

## API Reference

### YoungRing

#### Constructor
```javascript
new YoungRing(elements, addOp, mulOp, zeroVal, oneVal)
```

#### Methods
- `add(a, b)` - Addition operation
- `multiply(a, b)` - Multiplication operation
- `select(predicate)` - Relational selection (σ)
- `project(mapper)` - Relational projection (π)
- `join(otherRing)` - Relational join (⋈)
- `contains(element)` - Check membership

### YoungField (extends YoungRing)

#### Constructor
```javascript
new YoungField(elements, addOp, mulOp, invOp, zeroVal, oneVal)
```

#### Additional Methods
- `inverse(a)` - Multiplicative inverse (returns null for zero)
- `divide(a, b)` - Division operation (returns null if b is zero)
- `isValidField()` - Verify field axioms
- `normalize(values)` - Normalize array to sum to 1
- `rateOfChange(f, x, h)` - Calculate (f(x+h) - f(x)) / h
- `createProbabilityDistribution(values)` - Create normalized probability distribution

### Factory Functions

- `createRationalField()` - Creates ℚ (rational numbers)
- `createFiniteField(p)` - Creates ℤₚ (integers mod p, p must be prime)
- `createSituationValuationField()` - Creates field for situation valuations

### Example Functions

- `normalizedSituationExample()` - Demonstrates normalization
- `ungFieldOperationsExample()` - Demonstrates basic operations
- `finiteFieldExample()` - Demonstrates finite field operations

## Testing

Run the comprehensive test suite:

```bash
npm test
```

The test suite verifies:
- Young Ring construction and operations
- Young Field axioms (F1-F5)
- Relational algebra operations
- Rational and finite fields
- All applications from Section 10.8
- All examples from Section 10.7

## Mathematical Theorems Implemented

### Theorem 10.2: Young Field Forms a Commutative Field
All Young Fields satisfy field axioms with commutative operations.

### Theorem 10.3: Young Ring to Young Field Extension
Any Young Ring without zero divisors can be extended to a Young Field via field of fractions construction.

See [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md) Section 10 for complete formal definitions and proofs.

## References

- **Whitepaper:** [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md)
- **Section 10:** Young Ring Integration
- **Section 10.3:** Young Field Definition
- **Section 10.4:** Field Axioms
- **Section 10.7:** Young Field Examples
- **Section 10.8:** Applications of Young Field

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*For the complete mathematical foundation and formal proofs, see the [Young Situation White Paper](WHITEPAPER_YOUNG_SITUATION.md).*
