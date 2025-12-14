# Young Field Module

Extension of Young Ring with multiplicative inverses and division operations.

## Overview

Young Field extends Young Ring by adding multiplicative inverses, enabling division operations. This makes it a complete field structure suitable for normalized valuations, probability distributions, and rate of change calculations.

## Mathematical Definition

A Young Field is an algebraic structure `F = (R, +, ×, 0, 1, ⁻¹)` where:
- `(R, +, 0)` is an abelian group (additive structure)
- `(R \ {0}, ×, 1, ⁻¹)` is an abelian group (multiplicative structure excluding zero)
- **Multiplicative Inverse**: `∀a ∈ R \ {0} : ∃a⁻¹ ∈ R : a × a⁻¹ = 1`
- **Division**: `a ÷ b = a × b⁻¹` for `b ≠ 0`

## API

### Classes

#### `YoungField`

Extends `YoungRing` with field operations.

```javascript
const field = new YoungField(elements, addOp, mulOp, invOp, zeroVal, oneVal);
```

**Additional Methods:**
- `inverse(a)` - Calculate multiplicative inverse (returns `null` for zero)
- `divide(a, b)` - Division operation (returns `null` if divisor is zero)
- `isValidField()` - Verify field axioms
- `normalize(values)` - Normalize array to sum to 1 (probability distribution)
- `rateOfChange(f, x, h)` - Calculate rate of change
- `createProbabilityDistribution(values)` - Create normalized probability distribution

### Factory Functions

#### `createRationalField()`

Creates the field of rational numbers (ℚ) with standard operations.

```javascript
const field = createRationalField();
console.log(field.divide(10, 3)); // 3.333...
```

#### `createFiniteField(p)`

Creates a finite field ℤₚ where p is prime (integers modulo p).

```javascript
const field = createFiniteField(7);
console.log(field.divide(5, 2)); // 6 (mod 7)
console.log(field.inverse(3));   // 5 (since 3×5=15≡1 mod 7)
```

#### `createSituationValuationField()`

Creates a field specifically for situation valuations (uses rational field).

```javascript
const field = createSituationValuationField();
const valuations = [10, 20, 30, 40];
const probabilities = field.createProbabilityDistribution(valuations);
```

### Examples

#### `normalizedSituationExample()`

Demonstrates normalization of situation valuations to probability distribution.

```javascript
const result = normalizedSituationExample();
console.log(result.original);    // [10, 20, 30, 40]
console.log(result.normalized);  // [0.1, 0.2, 0.3, 0.4]
console.log(result.sum);         // 1.0
```

#### `youngFieldOperationsExample()`

Demonstrates basic field operations.

```javascript
const result = youngFieldOperationsExample();
console.log(result.addition);       // 9
console.log(result.multiplication); // 18
console.log(result.division);       // 2
console.log(result.inverse);        // 0.333...
```

#### `finiteFieldExample()`

Demonstrates finite field operations in ℤ₇.

```javascript
const result = finiteFieldExample();
console.log(result.elements);    // [0, 1, 2, 3, 4, 5, 6]
console.log(result.isValid);     // true
console.log(result.operations);  // Modular arithmetic results
```

## Usage Examples

### Basic Operations

```javascript
const { createRationalField } = require('reality-simulation-code');

const field = createRationalField();

// Basic arithmetic
const sum = field.add(5, 3);           // 8
const product = field.multiply(4, 7);  // 28
const quotient = field.divide(10, 4);  // 2.5
const inv = field.inverse(2);          // 0.5

// Safe division
const result = field.divide(10, 0);    // null (division by zero)
```

### Probability Distributions

```javascript
const { createSituationValuationField } = require('reality-simulation-code');

const field = createSituationValuationField();

// Normalize situation valuations to probabilities
const situationValues = [100, 200, 300, 400];
const probabilities = field.normalize(situationValues);

console.log(probabilities); // [0.1, 0.2, 0.3, 0.4]
console.log(probabilities.reduce((a, b) => a + b, 0)); // 1.0
```

### Finite Field Arithmetic

```javascript
const { createFiniteField } = require('reality-simulation-code');

// Create field ℤ₇ (integers mod 7)
const field = createFiniteField(7);

// Modular arithmetic
console.log(field.add(5, 4));        // 2 (mod 7)
console.log(field.multiply(3, 5));   // 1 (mod 7)
console.log(field.divide(6, 2));     // 3 (mod 7)

// Inverse operations
console.log(field.inverse(3));       // 5 (since 3×5≡1 mod 7)
console.log(field.multiply(3, field.inverse(3))); // 1

// Validate field structure
console.log(field.isValidField());   // true
```

### Rate of Change

```javascript
const { createRationalField } = require('reality-simulation-code');

const field = createRationalField();

// Define a function
const f = x => x * x;

// Calculate rate of change (derivative approximation)
const rate = field.rateOfChange(f, 3, 0.001);
console.log(rate); // Approximately 6 (derivative of x² at x=3 is 2x=6)
```

## Inheritance

Young Field extends Young Ring, inheriting all ring operations and adding field-specific capabilities like division and inverse.

```javascript
const { YoungField } = require('reality-simulation-code');

const field = new YoungField();
// Has all YoungRing methods plus field operations
console.log(field instanceof YoungRing); // true (if imported)
```

## Applications

- **Normalized Valuations**: Convert situation values to probability distributions
- **Rate Calculations**: Compute rates of change and derivatives
- **Cryptography**: Finite fields are used in Yoshi's Secret module
- **Division Safety**: Handle division by zero gracefully with null returns

## References

- See `WHITEPAPER_YOUNG_SITUATION.md` Section 10.3 for formal mathematical definitions
- See `YOUNG_FIELD.md` for comprehensive usage guide
- See Young Ring module for base functionality
- See Yoshi's Secret module for cryptographic applications
