# Young Concepts in Discrete Mathematics

This document provides comprehensive documentation for Young-related concepts in Discrete Mathematics, including **Young Diagrams**, **Young Tableaux**, **Young Lattice**, and **Young's Rule**.

## Overview

The "Young" concepts in discrete mathematics are named after Alfred Young (1873–1940), a British mathematician who made fundamental contributions to representation theory and combinatorics. These structures are central to:

- **Combinatorics**: Counting and enumerating structures
- **Representation Theory**: Studying symmetry groups and their representations
- **Algebraic Geometry**: Schubert calculus and intersection theory
- **Probability Theory**: Random partitions and card shuffling
- **Computer Science**: Algorithm design and data structures

## Table of Contents

1. [Young Diagram](#young-diagram)
2. [Young Tableau](#young-tableau)
3. [Young Lattice](#young-lattice)
4. [Young's Rule](#youngs-rule)
5. [Applications](#applications)
6. [Examples](#examples)
7. [API Reference](#api-reference)

---

## Young Diagram

### Definition

A **Young Diagram** is a graphical representation of an integer partition. It consists of left-justified rows of boxes, where row lengths form a non-increasing sequence.

### Mathematical Definition

Given a partition λ = (λ₁, λ₂, ..., λₖ) where λ₁ ≥ λ₂ ≥ ... ≥ λₖ > 0, the Young Diagram is:

```
□□...□  (λ₁ boxes)
□□...□  (λ₂ boxes)
...
□□...□  (λₖ boxes)
```

### Example

The partition [4, 3, 1] gives the diagram:
```
****
***
*
```

### Key Operations

1. **Size**: Sum of all parts: |λ| = λ₁ + λ₂ + ... + λₖ

2. **Conjugate (Transpose)**: Flip the diagram along the main diagonal
   - Example: [4, 3, 1] → [3, 2, 2, 1]

3. **Containment**: λ ⊆ μ if λᵢ ≤ μᵢ for all i
   - Used for partial ordering in Young Lattice

4. **Successors/Predecessors**: Add/remove one box while maintaining the partition property

### Usage

```javascript
const { YoungDiagram } = require('reality-simulation-code');

// Create a diagram
const diagram = new YoungDiagram([4, 3, 1]);

console.log(diagram.size());          // 8
console.log(diagram.numRows());       // 3
console.log(diagram.numColumns());    // 4

// Get conjugate (transpose)
const conjugate = diagram.conjugate();
console.log(conjugate.toArray());     // [3, 2, 2, 1]

// Check containment
const smaller = new YoungDiagram([3, 2, 1]);
console.log(diagram.contains(smaller)); // true

// Get all ways to add one box
const successors = diagram.successors();
console.log(successors.length);       // Number of valid ways to add a box
```

---

## Young Tableau

### Definition

A **Young Tableau** is a Young Diagram where each box contains a number, satisfying:

- **Standard Young Tableau**: 
  - Numbers 1, 2, ..., n appear exactly once
  - Rows are strictly increasing (left to right)
  - Columns are strictly increasing (top to bottom)

- **Semi-Standard Young Tableau**:
  - Numbers can repeat
  - Rows are weakly increasing
  - Columns are strictly increasing

### Mathematical Significance

Young Tableaux correspond to:
- Irreducible representations of symmetric groups Sₙ
- Basis vectors in representation spaces
- Standard tableaux count: given by the **hook length formula**

### Example

Standard Young Tableau of shape [3, 2, 1]:
```
1 2 5
3 4
6
```

### Robinson-Schensted Correspondence

The Robinson-Schensted algorithm establishes a bijection between:
- Permutations of {1, 2, ..., n}
- Pairs of standard Young Tableaux of the same shape

This is fundamental in representation theory and has applications in longest increasing subsequence problems.

### Usage

```javascript
const { YoungTableau, createStandardTableauFromPermutation } = require('reality-simulation-code');

// Create a standard tableau
const tableau = new YoungTableau([
  [1, 2, 5],
  [3, 4],
  [6]
], true);

console.log(tableau.isValid());       // true
console.log(tableau.size());          // 6
console.log(tableau.shape().toArray()); // [3, 2, 1]

// Get reading word (bottom-to-top, right-to-left)
console.log(tableau.readingWord());   // [6, 5, 4, 3, 2, 1]

// Robinson-Schensted insertion
const permutation = [3, 1, 4, 2];
const rsTableau = createStandardTableauFromPermutation(permutation);
console.log(rsTableau.toString());
```

---

## Young Lattice

### Definition

The **Young Lattice** is the partially ordered set (poset) of all integer partitions, ordered by inclusion of their Young Diagrams.

### Structure

- **Levels**: Level n contains all partitions of n
- **Covering Relations**: λ covers μ if λ is obtained from μ by adding exactly one box
- **Maximal Chains**: Correspond to standard Young Tableaux

### Partition Function

The number of partitions of n, denoted p(n), grows rapidly:

| n | p(n) | Example Partitions |
|---|------|-------------------|
| 0 | 1    | [] |
| 1 | 1    | [1] |
| 2 | 2    | [2], [1,1] |
| 3 | 3    | [3], [2,1], [1,1,1] |
| 4 | 5    | [4], [3,1], [2,2], [2,1,1], [1,1,1,1] |
| 5 | 7    | ... |

### Applications

- **Representation Theory**: Characters of symmetric groups
- **Combinatorics**: Counting problems and generating functions
- **Statistical Mechanics**: Crystal bases and quantum groups

### Usage

```javascript
const { YoungLattice } = require('reality-simulation-code');

const lattice = new YoungLattice();

// Get all partitions of n
const partitions4 = lattice.getLevel(4);
console.log(partitions4.length);      // 5

// Count partitions (partition function)
console.log(lattice.countPartitions(5)); // 7

// Get covering relations at level n
const relations = lattice.getCoveringRelations(3);
for (const [lower, upper] of relations) {
  console.log(`${lower.toArray()} → ${upper.toArray()}`);
}

// Get Hasse diagram structure
const hasse = lattice.getHasseDiagram(4);
console.log(`Nodes: ${hasse.nodes.length}`);
console.log(`Edges: ${hasse.edges.length}`);
```

---

## Young's Rule

### Definition

**Young's Rule** (also known as the Littlewood-Richardson rule) describes how to decompose tensor products of irreducible representations of symmetric groups.

### Hook Length Formula

The dimension of the irreducible representation corresponding to partition λ is:

```
dim(V_λ) = n! / ∏(i,j) h(i,j)
```

where h(i,j) is the **hook length** at position (i,j):
- Hook length = arm length + leg length + 1
- Arm: boxes to the right in the same row
- Leg: boxes below in the same column

### Example

For partition [3, 2, 1]:
```
Diagram:       Hook lengths:
□□□            5 4 2
□□              3 2
□               1
```

Dimension = 6! / (5×4×2×3×2×1) = 720 / 240 = 16

### Self-Conjugate Partitions

A partition is **self-conjugate** if it equals its own conjugate. These correspond to:
- Orthogonal representations
- Spin representations in physics
- Special combinatorial structures

### Usage

```javascript
const { YoungsRule } = require('reality-simulation-code');

// Calculate dimension using hook length formula
const dimension = YoungsRule.hookLengthFormula([3, 2, 1]);
console.log(dimension);               // 16

// Check if partition is self-conjugate
console.log(YoungsRule.isSelfConjugate([2, 2]));  // true
console.log(YoungsRule.isSelfConjugate([3, 1]));  // false

// Compute tensor product (simplified version)
const result = YoungsRule.tensorProduct([2], [2]);
console.log([...result.entries()]);   // Partitions of 4 with multiplicities
```

---

## Applications

### 1. Representation Theory

Young concepts provide a concrete realization of abstract representation theory:

```javascript
const { YoungTableau, YoungsRule } = require('reality-simulation-code');

// Standard Young Tableaux of shape λ form a basis for V_λ
const partition = [3, 2, 1];
const dimension = YoungsRule.hookLengthFormula(partition);
console.log(`Irrep of S_6 labeled by [3,2,1] has dimension ${dimension}`);
```

### 2. Symmetric Function Theory

Schur functions are indexed by partitions and form a basis for symmetric functions:

```javascript
const { YoungDiagram } = require('reality-simulation-code');

// Partitions parametrize Schur functions
const lambda = new YoungDiagram([3, 2]);
console.log(`Schur function s_{${lambda.toArray()}} corresponds to this shape`);
```

### 3. Combinatorial Algorithms

Robinson-Schensted correspondence and tableau algorithms:

```javascript
const { createStandardTableauFromPermutation } = require('reality-simulation-code');

// Find longest increasing subsequence via Robinson-Schensted
const permutation = [3, 1, 4, 1, 5, 9, 2, 6];
const tableau = createStandardTableauFromPermutation(permutation);
const shape = tableau.shape();

// Length of longest increasing subsequence = first row length
console.log(`LIS length: ${shape.toArray()[0]}`);
```

### 4. Probability and Random Matrices

Random partitions arise in:
- Random matrix theory
- Card shuffling (riffle shuffles)
- Crystal growth models

```javascript
const { YoungLattice } = require('reality-simulation-code');

const lattice = new YoungLattice();
const partitions = lattice.getLevel(10);

// Plancherel measure: probability of each partition
for (const partition of partitions) {
  const dim = YoungsRule.hookLengthFormula(partition.toArray());
  const prob = (dim * dim) / factorial(10);
  console.log(`P(${partition.toArray()}) = ${prob}`);
}
```

---

## Examples

### Example 1: Enumerate All Partitions

```javascript
const { partitionsExample } = require('reality-simulation-code');

const result = partitionsExample(5);
for (const [n, partitions] of Object.entries(result)) {
  console.log(`n=${n}: ${partitions.map(p => `[${p}]`).join(', ')}`);
}
```

Output:
```
n=0: [[]]
n=1: [[1]]
n=2: [[2], [1,1]]
n=3: [[3], [2,1], [1,1,1]]
n=4: [[4], [3,1], [2,2], [2,1,1], [1,1,1,1]]
n=5: [[5], [4,1], [3,2], [3,1,1], [2,2,1], [2,1,1,1], [1,1,1,1,1]]
```

### Example 2: Young Diagram Operations

```javascript
const { youngDiagramExample } = require('reality-simulation-code');

const result = youngDiagramExample();
console.log('Partition:', result.partition);
console.log('Size:', result.size);
console.log('Dimensions:', result.rows, 'x', result.cols);
console.log('\nDiagram:');
console.log(result.ascii);
console.log('\nConjugate:', result.conjugate);
console.log('Successors:', result.successors);
console.log('Predecessors:', result.predecessors);
```

### Example 3: Standard Young Tableau

```javascript
const { youngTableauExample } = require('reality-simulation-code');

const result = youngTableauExample();
console.log('Shape:', result.shape);
console.log('Size:', result.size);
console.log('Valid?', result.valid);
console.log('\nTableau:');
console.log(result.ascii);
console.log('\nReading word:', result.readingWord);
```

### Example 4: Hook Length Formula

```javascript
const { hookLengthExample } = require('reality-simulation-code');

const result = hookLengthExample();
console.log('Hook Length Formula Results:');
for (const [partition, data] of Object.entries(result)) {
  console.log(`[${partition}]: dimension = ${data.dimension}`);
}
```

### Example 5: Young Lattice Structure

```javascript
const { youngLatticeExample } = require('reality-simulation-code');

const result = youngLatticeExample(4);
console.log('Partition Function p(n):');
for (const {n, count, partitions} of result.partitionCounts) {
  console.log(`p(${n}) = ${count}: ${partitions.map(p => `[${p}]`).join(', ')}`);
}
```

---

## API Reference

### YoungDiagram

#### Constructor
```javascript
new YoungDiagram(partition: Array<number>)
```

#### Methods
- `size()`: Returns the sum of the partition
- `numRows()`: Returns the number of rows
- `numColumns()`: Returns the number of columns (length of first row)
- `conjugate()`: Returns the conjugate (transpose) diagram
- `contains(other: YoungDiagram)`: Checks if this diagram contains another
- `successors()`: Returns array of diagrams obtained by adding one box
- `predecessors()`: Returns array of diagrams obtained by removing one box
- `toString()`: Returns ASCII representation
- `toArray()`: Returns the partition as an array
- `equals(other: YoungDiagram)`: Checks equality

### YoungTableau

#### Constructor
```javascript
new YoungTableau(filling: Array<Array<number>>, standard: boolean = false)
```

#### Methods
- `shape()`: Returns the underlying YoungDiagram
- `size()`: Returns the number of boxes
- `isValid()`: Validates the tableau (checks row/column increasing properties)
- `get(row, col)`: Gets value at position
- `set(row, col, value)`: Sets value at position
- `toString()`: Returns ASCII representation with numbers
- `readingWord()`: Returns the reading word (bottom-to-top, right-to-left)
- `insertValue(value)`: Performs Robinson-Schensted insertion

### YoungLattice

#### Constructor
```javascript
new YoungLattice()
```

#### Methods
- `getLevel(n)`: Returns all YoungDiagrams at level n (partitions of n)
- `countPartitions(n)`: Returns p(n), the number of partitions of n
- `getCoveringRelations(n)`: Returns covering relations between levels n-1 and n
- `getHasseDiagram(n)`: Returns Hasse diagram structure up to level n
- `generatePartitions(n, max)`: Generates all partitions of n with parts ≤ max

### YoungsRule

#### Static Methods
- `hookLengthFormula(partition)`: Computes dimension using hook length formula
- `tensorProduct(lambda, mu)`: Computes tensor product decomposition (simplified)
- `isSelfConjugate(partition)`: Checks if partition equals its conjugate

### Factory Functions

- `createStandardTableauFromPermutation(permutation)`: Robinson-Schensted correspondence

### Example Functions

- `partitionsExample(n)`: Generates all partitions up to n
- `youngDiagramExample()`: Demonstrates YoungDiagram operations
- `youngTableauExample()`: Creates and validates a sample tableau
- `hookLengthExample()`: Computes dimensions for sample partitions
- `youngLatticeExample(n)`: Demonstrates lattice structure

---

## Mathematical Background

### Partition Theory

An **integer partition** of n is a way of writing n as a sum of positive integers, where order doesn't matter:

```
5 = 5 = 4+1 = 3+2 = 3+1+1 = 2+2+1 = 2+1+1+1 = 1+1+1+1+1
```

The 7 partitions of 5 correspond to 7 ways to arrange 5 identical objects.

### Representation Theory Connection

For the symmetric group Sₙ:
- Irreducible representations ↔ Partitions of n
- Dimension of representation ↔ Hook length formula
- Character values ↔ Symmetric functions

This deep connection is why Young concepts are so important in algebra and combinatorics.

### Generating Functions

The generating function for partitions is:

```
∏(k≥1) 1/(1-xᵏ) = Σ p(n)xⁿ
```

This leads to asymptotics: p(n) ~ exp(π√(2n/3)) / (4n√3) as n → ∞

---

## References

1. **William Fulton** - *Young Tableaux* (Cambridge University Press, 1997)
2. **Bruce Sagan** - *The Symmetric Group* (Springer, 2001)
3. **Stanley, Richard P.** - *Enumerative Combinatorics, Volume 2* (Cambridge, 1999)
4. **Knuth, Donald E.** - *The Art of Computer Programming, Vol. 3: Sorting and Searching*
5. **xaoex** - *WHITEPAPER_YOUNG_SITUATION.md* (Young Ring and Young Field foundations)

---

## Integration with Young Ring and Young Field

The Young discrete math concepts complement the existing **Young Ring** and **Young Field** implementations:

- **Young Ring**: Algebraic structure for situation optimization
- **Young Field**: Extension with division and normalized valuations
- **Young Diagrams/Tableaux**: Combinatorial structures for discrete mathematics
- **Young Lattice**: Ordered structure for partition enumeration

Together, these form a comprehensive framework for both algebraic and combinatorial approaches to optimization, representation theory, and discrete mathematics.

See also:
- [YOUNG_FIELD.md](YOUNG_FIELD.md) - Young Field implementation and usage
- [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md) - Mathematical foundations

---

## Testing

Run the comprehensive test suite:

```bash
npm test                              # Run Young Field tests
node test-young-discrete-math.js      # Run Young Discrete Math tests
```

Both test suites verify:
- Correctness of all operations
- Mathematical properties and axioms
- Edge cases and boundary conditions
- Integration between components

---

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*For the complete framework including algebraic structures (Young Ring and Young Field), see [YOUNG_FIELD.md](YOUNG_FIELD.md) and [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md).*
