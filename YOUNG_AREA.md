# Young Area Implementation

This document provides usage examples and documentation for the **Young Area** implementation, an extension of **Young Field** with measure theory.

## Overview

The **Young Area** extends the **Young Field** by adding measure-theoretic operations, enabling:
- Area calculations for geometric regions
- Integration over intervals and regions
- Volume computations in multiple dimensions
- Measure theory applications in situation analysis

## Mathematical Foundation

### Young Ring → Young Field → Young Area

The progression builds as follows:

1. **Young Ring** (Definition 10.1): Basic algebraic structure with addition and multiplication
2. **Young Field** (Definition 10.3): Adds multiplicative inverses (division)
3. **Young Area**: Adds measure theory (area, integration, volume)

### Young Area Definition

A Young Area is an algebraic structure **A** = (F, μ, ∫) where:
- **F** is a Young Field (providing arithmetic operations)
- **μ: Ω → ℝ≥0** is a measure function (assigns area/measure to regions)
- **∫: (Ω → F) × Ω → F** is an integration operation

**Properties:**
- Inherits all field properties (addition, multiplication, division)
- Non-negative measure: **μ(Ω) ≥ 0**
- Empty set measure: **μ(∅) = 0**
- Additivity: For disjoint regions A, B: **μ(A ∪ B) = μ(A) + μ(B)**

## Installation

```bash
npm install reality-simulation-code
```

## Usage

### Basic Import

```javascript
const {
  YoungArea,
  createEuclideanArea,
  createSituationAreaField,
  geometricAreasExample,
  integrationExample,
  volumeOfRevolutionExample,
  nDimensionalVolumeExample
} = require('reality-simulation-code');
```

## Examples

### 1. Creating a Euclidean Young Area

The standard 2D Euclidean space with Lebesgue measure:

```javascript
const area = createEuclideanArea();

// Basic field operations still work
console.log(area.add(5, 3));          // 8
console.log(area.multiply(5, 3));     // 15
console.log(area.divide(6, 3));       // 2
```

### 2. Measuring Regions

Calculate the measure (area) of various regions:

```javascript
const area = createEuclideanArea();

// 1D measure (length)
console.log(area.measure(5));         // 5

// 2D measure (rectangle area)
console.log(area.measure([3, 4]));    // 12

// Circle measure
const circle = { type: 'circle', radius: 2 };
console.log(area.measure(circle));    // π × 4 ≈ 12.566

// Interval measure
const interval = { type: 'interval', start: 1, end: 5 };
console.log(area.measure(interval));  // 4
```

### 3. Geometric Shape Areas

Calculate areas for common geometric shapes:

```javascript
const area = createEuclideanArea();

// Rectangle: width × height
console.log(area.rectangleArea(5, 3));       // 15

// Circle: πr²
console.log(area.circleArea(2));             // π × 4 ≈ 12.566

// Triangle: (base × height) / 2
console.log(area.triangleArea(6, 4));        // 12

// Ellipse: πab
console.log(area.ellipseArea(3, 2));         // π × 6 ≈ 18.849
```

### 4. Integration

Integrate functions over intervals:

```javascript
const area = createEuclideanArea();

// Integrate f(x) = x² from 0 to 2
// ∫₀² x² dx = [x³/3]₀² = 8/3 ≈ 2.667
const result1 = area.integrate((x) => x * x, 0, 2);
console.log(result1);  // ≈ 2.667

// Integrate f(x) = sin(x) from 0 to π
// ∫₀ᵖⁱ sin(x) dx = 2
const result2 = area.integrate((x) => Math.sin(x), 0, Math.PI);
console.log(result2);  // ≈ 2.0

// Integrate with custom step size for accuracy
const result3 = area.integrate((x) => x * x, 0, 2, 10000);
console.log(result3);  // More accurate
```

### 5. Area Under Curve

Calculate the area under a curve (always non-negative):

```javascript
const area = createEuclideanArea();

// Area under f(x) = x from 0 to 4
// Forms a triangle with area = 8
const triangleArea = area.areaUnderCurve((x) => x, 0, 4);
console.log(triangleArea);  // 8

// Area under parabola f(x) = x²
const parabolaArea = area.areaUnderCurve((x) => x * x, 0, 3);
console.log(parabolaArea);  // 9
```

### 6. Region Area Between Curves

Calculate the area of a region bounded by two curves:

```javascript
const area = createEuclideanArea();

// Area between y = x² and y = x from 0 to 1
const lowerBound = (x) => x * x;
const upperBound = (x) => x;
const regionArea = area.regionArea(lowerBound, upperBound, 0, 1);
console.log(regionArea);  // 1/6 ≈ 0.167
```

### 7. Volume of Revolution

Rotate a curve around the x-axis to create a 3D solid:

```javascript
const area = createEuclideanArea();

// Rotate f(x) = x around x-axis from 0 to 2
// Creates a cone: V = πr²h/3 = π(4)(2)/3 ≈ 8.378
const coneVolume = area.volumeOfRevolution((x) => x, 0, 2);
console.log(coneVolume);  // ≈ 8.378

// Rotate f(x) = 2 (constant) around x-axis from 0 to 5
// Creates a cylinder: V = πr²h = π(4)(5) ≈ 62.832
const cylinderVolume = area.volumeOfRevolution((x) => 2, 0, 5);
console.log(cylinderVolume);  // ≈ 62.832

// Rotate f(x) = √(r² - x²) (semicircle) around x-axis
// Creates a sphere: V = (4/3)πr³
const r = 1;
const sphereVolume = area.volumeOfRevolution(
  (x) => Math.sqrt(Math.max(0, r*r - x*x)),
  -r,
  r
);
console.log(sphereVolume);  // ≈ 4.189 (≈ 4π/3)
```

### 8. N-Dimensional Volume

Calculate volume in multiple dimensions:

```javascript
const area = createEuclideanArea();

// 1D: Line segment (length)
console.log(area.volumeNDimensional([5]));           // 5

// 2D: Rectangle (area)
console.log(area.volumeNDimensional([3, 4]));        // 12

// 3D: Box (volume)
console.log(area.volumeNDimensional([2, 3, 4]));     // 24

// 4D: Hypercube (4D volume)
console.log(area.volumeNDimensional([2, 2, 2, 2])); // 16
```

### 9. Custom Young Area

Create a custom Young Area with custom measure function:

```javascript
const customArea = new YoungArea(
  [],                                    // elements (infinite)
  (a, b) => a + b,                      // addition
  (a, b) => a * b,                      // multiplication
  (a) => a === 0 ? null : 1 / a,       // inverse
  (region) => {
    // Custom measure function
    if (region.type === 'custom') {
      return region.value * 2;
    }
    return 0;
  },
  0,                                    // zero
  1                                     // one
);

// Use custom measure
const customRegion = { type: 'custom', value: 5 };
console.log(customArea.measure(customRegion));  // 10
```

## Pre-built Examples

The library includes example functions demonstrating Young Area usage:

### Example 1: Geometric Areas

```javascript
const result = geometricAreasExample();
console.log(result);
// {
//   rectangle: 15,
//   circle: 12.566...,
//   triangle: 12,
//   ellipse: 18.849...
// }
```

### Example 2: Integration

```javascript
const result = integrationExample();
console.log(result);
// {
//   quadratic: 2.667,  // ∫₀² x² dx
//   sine: 2.000,       // ∫₀ᵖⁱ sin(x) dx
//   linear: 8.000      // Area under f(x)=x
// }
```

### Example 3: Volume of Revolution

```javascript
const result = volumeOfRevolutionExample();
console.log(result);
// {
//   cone: 8.378,       // π × 8/3
//   sphere: 4.189      // 4π/3
// }
```

### Example 4: N-Dimensional Volume

```javascript
const result = nDimensionalVolumeExample();
console.log(result);
// {
//   line: 5,           // 1D
//   rectangle: 12,     // 2D
//   box: 24,           // 3D
//   hypercube: 16      // 4D
// }
```

## Applications in Young Situation Framework

### 1. Situation Region Analysis

Calculate the measure of situation regions:

```javascript
const area = createSituationAreaField();

// Define situation regions
const situations = [
  { id: 's1', bounds: [10, 20] },
  { id: 's2', bounds: [15, 25] },
  { id: 's3', bounds: [20, 35] }
];

// Calculate region sizes
situations.forEach(s => {
  const region = { 
    type: 'interval', 
    start: s.bounds[0], 
    end: s.bounds[1] 
  };
  s.measure = area.measure(region);
});

console.log(situations);
// [
//   { id: 's1', bounds: [10, 20], measure: 10 },
//   { id: 's2', bounds: [15, 25], measure: 10 },
//   { id: 's3', bounds: [20, 35], measure: 15 }
// ]
```

### 2. Movement Integration

Integrate movement valuations over time:

```javascript
const area = createEuclideanArea();

// Define movement valuation function
const movementValue = (t) => Math.sin(t) + 2;

// Integrate over time interval [0, 2π]
const totalValue = area.integrate(movementValue, 0, 2 * Math.PI);
console.log(totalValue);  // Total movement value over period
```

### 3. Multi-dimensional Situation Space

Calculate volume in high-dimensional situation spaces:

```javascript
const area = createEuclideanArea();

// Situation defined by 4 parameters
const situationDimensions = [
  3,   // complexity
  5,   // value
  2,   // risk
  4    // time
];

const situationVolume = area.volumeNDimensional(situationDimensions);
console.log(situationVolume);  // 120 (3×5×2×4)
```

## API Reference

### YoungArea (extends YoungField)

#### Constructor
```javascript
new YoungArea(elements, addOp, mulOp, invOp, measureOp, zeroVal, oneVal)
```

#### Measure Methods
- `measure(region)` - Calculate the measure (area) of a region
- `rectangleArea(width, height)` - Area of rectangle
- `circleArea(radius)` - Area of circle (πr²)
- `triangleArea(base, height)` - Area of triangle
- `ellipseArea(semiMajor, semiMinor)` - Area of ellipse

#### Integration Methods
- `integrate(f, start, end, numSteps)` - Riemann integral ∫ᵃᵇ f(x)dx
- `areaUnderCurve(f, start, end, numSteps)` - Non-negative area under curve
- `regionArea(lowerBound, upperBound, start, end, numSteps)` - Area between curves
- `volumeOfRevolution(f, start, end, numSteps)` - Volume from rotating f around x-axis

#### Volume Methods
- `volumeNDimensional(dimensions)` - N-dimensional rectangular volume

#### Validation
- `isValidArea()` - Verify area axioms and properties

### Factory Functions

- `createEuclideanArea()` - Creates standard Euclidean space with Lebesgue measure
- `createSituationAreaField()` - Creates area field for situation analysis

### Example Functions

- `geometricAreasExample()` - Demonstrates geometric shape areas
- `integrationExample()` - Demonstrates integration operations
- `volumeOfRevolutionExample()` - Demonstrates volume calculations
- `nDimensionalVolumeExample()` - Demonstrates N-dimensional volumes

## Mathematical Properties

### Measure Properties

All Young Areas satisfy the measure axioms:

1. **Non-negativity**: μ(Ω) ≥ 0 for all regions Ω
2. **Null empty set**: μ(∅) = 0
3. **Additivity**: μ(A ∪ B) = μ(A) + μ(B) for disjoint A, B
4. **Monotonicity**: If A ⊆ B, then μ(A) ≤ μ(B)

### Integration Properties

The integration operation satisfies:

1. **Linearity**: ∫(af + bg) = a∫f + b∫g
2. **Additivity**: ∫ₐᶜ f = ∫ₐᵇ f + ∫ᵇᶜ f
3. **Monotonicity**: If f ≤ g, then ∫f ≤ ∫g
4. **Fundamental Theorem**: If F' = f, then ∫ₐᵇ f = F(b) - F(a)

## Testing

Run the comprehensive test suite:

```bash
npm test
```

The test suite verifies:
- Young Area construction and inheritance
- Measure operations for various region types
- Geometric shape area calculations
- Integration operations
- Volume of revolution
- N-dimensional volumes
- All examples from the API

## Relationship to Young Ring and Young Field

```
Young Ring
    ↓ (add multiplicative inverses)
Young Field
    ↓ (add measure theory)
Young Area
```

**Young Area** builds upon **Young Field**, which builds upon **Young Ring**:

- **Young Ring**: Addition, multiplication, relational algebra
- **Young Field**: + Division, normalization, rate of change
- **Young Area**: + Measure, integration, volume, N-dimensional analysis

All three maintain backward compatibility—every Young Area is a Young Field, and every Young Field is a Young Ring.

## References

- **Young Ring:** [YOUNG_FIELD.md](YOUNG_FIELD.md) Section: Young Ring
- **Young Field:** [YOUNG_FIELD.md](YOUNG_FIELD.md)
- **Whitepaper:** [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md)
- **Section 10:** Young Ring Integration

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*Young Area extends the Young Situation framework with measure theory, enabling geometric and analytical computations over situation spaces.*
