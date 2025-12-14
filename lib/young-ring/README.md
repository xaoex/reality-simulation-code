# Young Ring Module

Abstract mathematical ring combining relational algebra with group and ring theory.

## Overview

Young Ring is an algebraic structure that combines foundational concepts from group theory and ring theory with relational algebra operations, enabling powerful mathematical modeling for dynamic enterprise systems.

## Mathematical Definition

A Young Ring is an algebraic structure `Y = (R, +, ×, 0, 1)` where:
- `(R, +, 0)` is an abelian group (additive structure)
- `(R, ×, 1)` is a monoid (multiplicative structure)
- **Left Distribution**: `a × (b + c) = (a × b) + (a × c)`
- **Right Distribution**: `(a + b) × c = (a × c) + (b × c)`

## API

### Classes

#### `YoungRing`

Main class representing a Young Ring.

```javascript
const ring = new YoungRing(elements, addOp, mulOp, zeroVal, oneVal);
```

**Constructor Parameters:**
- `elements` - Array of elements in the ring (optional)
- `addOp` - Addition operation function (default: standard addition)
- `mulOp` - Multiplication operation function (default: standard multiplication)
- `zeroVal` - Zero element (default: 0)
- `oneVal` - One element (default: 1)

**Methods:**

##### Ring Operations
- `add(a, b)` - Addition operation
- `multiply(a, b)` - Multiplication operation
- `contains(element)` - Check if element is in the ring

##### Relational Algebra Operations
- `select(predicate)` - Selection (σ) - filter elements based on predicate
- `project(mapper)` - Projection (π) - map elements using a function
- `join(otherRing)` - Join (⋈) - combine with another ring's elements

## Usage Example

```javascript
const { YoungRing } = require('reality-simulation-code');

// Create a simple ring
const ring = new YoungRing(
  [0, 1, 2, 3, 4],
  (a, b) => (a + b) % 5,  // Modular addition
  (a, b) => (a * b) % 5,  // Modular multiplication
  0,
  1
);

// Ring operations
console.log(ring.add(3, 4));      // 2 (mod 5)
console.log(ring.multiply(3, 4)); // 2 (mod 5)

// Relational algebra
const evens = ring.select(x => x % 2 === 0);
console.log([...evens]); // [0, 2, 4]

const doubled = ring.project(x => x * 2);
console.log([...doubled]); // [0, 2, 4, 6, 8]
```

## Advanced Usage

### Combining Rings

```javascript
const ring1 = new YoungRing([1, 2, 3]);
const ring2 = new YoungRing(['a', 'b']);

// Join creates cartesian product
const joined = ring1.join(ring2);
console.log([...joined]); // [[1,'a'], [1,'b'], [2,'a'], [2,'b'], [3,'a'], [3,'b']]
```

### Custom Operations

```javascript
// Create a ring with custom operations
const customRing = new YoungRing(
  [0, 1, 2, 3],
  (a, b) => Math.max(a, b),        // Max as "addition"
  (a, b) => Math.min(a, b),        // Min as "multiplication"
  0,                                // Zero element
  3                                 // One element (max value)
);
```

## Inheritance

Young Ring serves as the base class for Young Field, which extends it with multiplicative inverses and division operations.

## References

- See `WHITEPAPER_YOUNG_SITUATION.md` Section 10.1 for formal mathematical definitions
- See Young Field module for extended capabilities
