/**
 * Reality Simulation Code
 * SimSim Code & Contributions
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 * @see https://linktr.ee/oktays
 */

// ============================================================================
// Young Ring Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 10.1
// ============================================================================

/**
 * Young Ring - Abstract mathematical ring combining relational algebra
 * with group and ring theory foundations
 * 
 * A Young Ring is an algebraic structure Y = (R, +, ×, 0, 1) where:
 * - (R, +, 0) is an abelian group (additive structure)
 * - (R, ×, 1) is a monoid (multiplicative structure)
 * - Left Distribution: a × (b + c) = (a × b) + (a × c)
 * - Right Distribution: (a + b) × c = (a × c) + (b × c)
 */
class YoungRing {
  constructor(elements = [], addOp = null, mulOp = null, zeroVal = 0, oneVal = 1) {
    this.elements = new Set(elements);
    this.addOp = addOp || ((a, b) => a + b);
    this.mulOp = mulOp || ((a, b) => a * b);
    this.zero = zeroVal;
    this.one = oneVal;
  }

  /**
   * Addition operation in the ring
   */
  add(a, b) {
    return this.addOp(a, b);
  }

  /**
   * Multiplication operation in the ring
   */
  multiply(a, b) {
    return this.mulOp(a, b);
  }

  /**
   * Relational Algebra: Selection (σ)
   * Filter elements based on predicate
   */
  select(predicate) {
    return new Set([...this.elements].filter(predicate));
  }

  /**
   * Relational Algebra: Projection (π)
   * Map elements using a function
   */
  project(mapper) {
    return new Set([...this.elements].map(mapper));
  }

  /**
   * Relational Algebra: Join (⋈)
   * Combine with another ring's elements
   */
  join(otherRing) {
    const result = new Set();
    for (const a of this.elements) {
      for (const b of otherRing.elements) {
        result.add([a, b]);
      }
    }
    return result;
  }

  /**
   * Check if element is in the ring
   */
  contains(element) {
    return this.elements.has(element);
  }
}

// ============================================================================
// Young Field Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 10.3
// ============================================================================

/**
 * Young Field - Extension of Young Ring with multiplicative inverses
 * 
 * A Young Field is an algebraic structure F = (R, +, ×, 0, 1, ⁻¹) where:
 * - (R, +, 0) is an abelian group (additive structure)
 * - (R \ {0}, ×, 1, ⁻¹) is an abelian group (multiplicative structure excluding zero)
 * - Multiplicative Inverse: ∀a ∈ R \ {0} : ∃a⁻¹ ∈ R : a × a⁻¹ = 1
 * - Division operation: a ÷ b = a × b⁻¹ for b ≠ 0
 * 
 * This enables:
 * - Division operations
 * - Normalized situation valuations
 * - Probability distributions over situations
 * - Rate of change calculations
 */
class YoungField extends YoungRing {
  constructor(elements = [], addOp = null, mulOp = null, invOp = null, zeroVal = 0, oneVal = 1) {
    super(elements, addOp, mulOp, zeroVal, oneVal);
    this.invOp = invOp || ((a) => {
      if (a === this.zero) return null;
      return 1 / a;
    });
  }

  /**
   * Multiplicative inverse
   * Returns null for zero (no inverse exists)
   */
  inverse(a) {
    if (a === this.zero) {
      return null;
    }
    return this.invOp(a);
  }

  /**
   * Division operation
   * a ÷ b = a × b⁻¹ for b ≠ 0
   * Returns null if divisor is zero
   */
  divide(a, b) {
    if (b === this.zero) {
      return null; // Division by zero undefined
    }
    const bInverse = this.inverse(b);
    if (bInverse === null) {
      return null;
    }
    return this.multiply(a, bInverse);
  }

  /**
   * Check if this is a valid field
   * Every non-zero element must have a multiplicative inverse
   */
  isValidField() {
    for (const element of this.elements) {
      if (element !== this.zero) {
        const inv = this.inverse(element);
        if (inv === null) return false;
        // Check that element × inverse = 1
        if (Math.abs(this.multiply(element, inv) - this.one) > 1e-10) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Normalize a set of values (sum to 1)
   * Used for probability distributions over situations
   */
  normalize(values) {
    const sum = values.reduce((acc, val) => this.add(acc, val), this.zero);
    // Check for zero sum with tolerance for floating point
    if (Math.abs(sum - this.zero) < 1e-10) return null;
    return values.map(val => this.divide(val, sum));
  }

  /**
   * Calculate rate of change: (f(x + h) - f(x)) / h
   */
  rateOfChange(f, x, h) {
    if (h === this.zero) return null;
    const fx = f(x);
    const fxh = f(this.add(x, h));
    const diff = this.add(fxh, this.multiply(-1, fx));
    return this.divide(diff, h);
  }

  /**
   * Create a probability distribution over situations
   * Normalizes valuations to sum to 1
   */
  createProbabilityDistribution(situationValuations) {
    return this.normalize(situationValuations);
  }
}

// ============================================================================
// Young Area Implementation
// Based on Young Field with Measure Theory Extension
// ============================================================================

/**
 * Young Area - Extension of Young Field with measure theory
 * 
 * A Young Area is an algebraic structure A = (F, μ, ∫) where:
 * - F is a Young Field (providing arithmetic operations)
 * - μ: Ω → ℝ≥0 is a measure function (assigns area/measure to regions)
 * - ∫: (Ω → F) × Ω → F is an integration operation
 * 
 * This enables:
 * - Area calculations for geometric regions
 * - Integration over intervals
 * - Measure-theoretic computations
 * - Volume and higher-dimensional measure
 * 
 * @param {Array} elements - Set of elements in the area (can be infinite, so often empty)
 * @param {Function} addOp - Addition operation: (a, b) => a + b
 * @param {Function} mulOp - Multiplication operation: (a, b) => a * b
 * @param {Function} invOp - Inverse operation: (a) => 1/a (returns null for zero)
 * @param {Function} measureOp - Measure operation: (region) => non-negative measure
 * @param {Number} zeroVal - Zero element (additive identity)
 * @param {Number} oneVal - One element (multiplicative identity)
 */
class YoungArea extends YoungField {
  constructor(elements = [], addOp = null, mulOp = null, invOp = null, measureOp = null, zeroVal = 0, oneVal = 1) {
    super(elements, addOp, mulOp, invOp, zeroVal, oneVal);
    this.tolerance = 1e-10; // Numerical tolerance for floating point comparisons
    this.measureOp = measureOp || ((region) => {
      // Default measure: length/area depending on region type
      if (typeof region === 'number') {
        return Math.abs(region); // 1D measure (length)
      } else if (Array.isArray(region) && region.length === 2) {
        // 2D rectangular region [width, height]
        return Math.abs(region[0] * region[1]);
      } else if (region.type === 'circle') {
        // Circle area: πr²
        return Math.PI * region.radius * region.radius;
      } else if (region.type === 'interval') {
        // Interval [a, b]
        return Math.abs(region.end - region.start);
      }
      return 0;
    });
  }

  /**
   * Measure function: μ(Ω) → ℝ≥0
   * Assigns a non-negative measure (area) to a region
   */
  measure(region) {
    const m = this.measureOp(region);
    return m < 0 ? 0 : m; // Ensure non-negative
  }

  /**
   * Rectangle area: width × height
   */
  rectangleArea(width, height) {
    return this.multiply(Math.abs(width), Math.abs(height));
  }

  /**
   * Circle area: πr²
   */
  circleArea(radius) {
    const r2 = this.multiply(radius, radius);
    return this.multiply(Math.PI, r2);
  }

  /**
   * Triangle area: (base × height) / 2
   */
  triangleArea(base, height) {
    const area = this.multiply(base, height);
    return this.divide(area, 2);
  }

  /**
   * Ellipse area: πab (where a, b are semi-axes)
   */
  ellipseArea(semiMajor, semiMinor) {
    const ab = this.multiply(semiMajor, semiMinor);
    return this.multiply(Math.PI, ab);
  }

  /**
   * Integration over an interval [a, b]
   * Uses Riemann sum approximation with midpoint rule: ∫ᵃᵇ f(x)dx ≈ Σ f(xᵢ)Δx
   * 
   * @param {Function} f - Function to integrate
   * @param {Number} start - Start of interval (a)
   * @param {Number} end - End of interval (b)
   * @param {Number} numSteps - Number of steps for Riemann sum (default: 1000)
   * @returns {Number} Approximate integral value
   */
  integrate(f, start, end, numSteps = 1000) {
    if (start === end) return this.zero;
    
    const a = Math.min(start, end);
    const b = Math.max(start, end);
    const h = this.divide(this.add(b, this.multiply(-1, a)), numSteps);
    
    let sum = this.zero;
    for (let i = 0; i < numSteps; i++) {
      const x = this.add(a, this.multiply(h, i + 0.5)); // Midpoint rule
      const fx = f(x);
      sum = this.add(sum, fx);
    }
    
    const result = this.multiply(sum, h);
    return start > end ? this.multiply(-1, result) : result;
  }

  /**
   * Area under curve from a to b
   * Equivalent to ∫ᵃᵇ f(x)dx for non-negative f
   */
  areaUnderCurve(f, start, end, numSteps = 1000) {
    return Math.abs(this.integrate(f, start, end, numSteps));
  }

  /**
   * Surface area of a region defined by parametric functions
   * For 2D: area of region bounded by curves
   */
  regionArea(lowerBound, upperBound, start, end, numSteps = 1000) {
    const f = (x) => this.add(upperBound(x), this.multiply(-1, lowerBound(x)));
    return this.areaUnderCurve(f, start, end, numSteps);
  }

  /**
   * Volume of revolution around x-axis
   * V = π ∫ᵃᵇ [f(x)]² dx
   */
  volumeOfRevolution(f, start, end, numSteps = 1000) {
    const fSquared = (x) => {
      const fx = f(x);
      return this.multiply(fx, fx);
    };
    const integral = this.integrate(fSquared, start, end, numSteps);
    return this.multiply(Math.PI, integral);
  }

  /**
   * N-dimensional measure (volume)
   * For N-dimensional rectangular region
   * Note: Empty dimensions array (0-dimensional point) returns 1 (empty product convention)
   */
  volumeNDimensional(dimensions) {
    if (!Array.isArray(dimensions) || dimensions.length === 0) return this.one;
    return dimensions.reduce((acc, dim) => this.multiply(acc, Math.abs(dim)), this.one);
  }

  /**
   * Check if this is a valid Young Area
   * Must be a valid field and have a valid measure function
   */
  isValidArea() {
    // Check field properties
    if (!this.isValidField()) return false;
    
    // Check measure properties: μ(∅) = 0
    const emptyMeasure = this.measure(0);
    if (Math.abs(emptyMeasure - this.zero) > this.tolerance) return false;
    
    return true;
  }
}

// ============================================================================
// Young Field Factory Functions
// ============================================================================

/**
 * Create a Rational Young Field (ℚ)
 * The field of rational numbers with standard operations
 */
function createRationalField() {
  return new YoungField(
    [], // Can be infinite, so we don't enumerate
    (a, b) => a + b,      // addition
    (a, b) => a * b,      // multiplication
    (a) => a === 0 ? null : 1 / a,  // inverse
    0,  // zero
    1   // one
  );
}

/**
 * Create a Finite Young Field (ℤₚ for prime p)
 * The field of integers modulo p
 */
function createFiniteField(p) {
  // Check if p is prime
  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  if (!isPrime(p)) {
    throw new Error(`p must be prime to form a field. Got ${p}`);
  }

  const elements = Array.from({ length: p }, (_, i) => i);
  
  return new YoungField(
    elements,
    (a, b) => (a + b) % p,        // modular addition
    (a, b) => (a * b) % p,        // modular multiplication
    (a) => {                       // modular inverse using Extended Euclidean Algorithm
      if (a === 0) return null;
      // Extended Euclidean algorithm for modular inverse
      // Find x such that (a * x) % p = 1
      let [old_r, r] = [a, p];
      let [old_s, s] = [1, 0];
      
      while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        [old_r, r] = [r, old_r - quotient * r];
        [old_s, s] = [s, old_s - quotient * s];
      }
      
      // old_r is the GCD, should be 1 for prime p
      if (old_r !== 1) return null;
      
      // Normalize to positive result
      return ((old_s % p) + p) % p;
    },
    0,  // zero
    1   // one
  );
}

/**
 * Create a Situation Valuation Field
 * Field of situation valuations supporting arithmetic operations
 */
function createSituationValuationField() {
  return createRationalField(); // Uses rational field for valuations
}

// ============================================================================
// Young Area Factory Functions
// ============================================================================

/**
 * Create a Euclidean Young Area (ℝ² with standard measure)
 * Standard 2D area with real numbers and Lebesgue measure
 */
function createEuclideanArea() {
  return new YoungArea(
    [], // Infinite set (reals)
    (a, b) => a + b,      // addition
    (a, b) => a * b,      // multiplication
    (a) => a === 0 ? null : 1 / a,  // inverse
    (region) => {
      // Lebesgue measure for various region types
      if (typeof region === 'number') {
        return Math.abs(region); // 1D measure
      } else if (Array.isArray(region)) {
        // N-dimensional box
        return region.reduce((acc, dim) => acc * Math.abs(dim), 1);
      } else if (region.type === 'circle') {
        return Math.PI * region.radius * region.radius;
      } else if (region.type === 'interval') {
        return Math.abs(region.end - region.start);
      }
      return 0;
    },
    0,  // zero
    1   // one
  );
}

/**
 * Create a Situation Area Field
 * Area field for situation regions and valuations
 */
function createSituationAreaField() {
  return createEuclideanArea();
}

// ============================================================================
// Young Field Examples and Demonstrations
// ============================================================================

/**
 * Example: Normalized Situation Valuations
 * Given situation values, compute normalized probabilities
 */
function normalizedSituationExample() {
  const field = createSituationValuationField();
  
  // Example situation valuations
  const situationValues = [10, 20, 30, 40];
  
  // Normalize to get probability distribution
  const probabilities = field.createProbabilityDistribution(situationValues);
  
  return {
    original: situationValues,
    normalized: probabilities,
    sum: probabilities.reduce((a, b) => a + b, 0)
  };
}

/**
 * Example: Young Field Operations
 * Demonstrate basic field operations
 */
function youngFieldOperationsExample() {
  const field = createRationalField();
  
  const a = 6;
  const b = 3;
  
  return {
    addition: field.add(a, b),           // 9
    multiplication: field.multiply(a, b), // 18
    division: field.divide(a, b),        // 2
    inverse: field.inverse(b),           // 1/3
    divisionByZero: field.divide(a, 0)   // null
  };
}

/**
 * Example: Finite Field Operations (ℤ₇)
 */
function finiteFieldExample() {
  const field = createFiniteField(7);
  
  return {
    elements: Array.from(field.elements),
    isValid: field.isValidField(),
    operations: {
      '5 + 4': field.add(5, 4),           // 2 (mod 7)
      '5 × 4': field.multiply(5, 4),      // 6 (mod 7)
      '5 ÷ 2': field.divide(5, 2),        // 6 (since 2⁻¹ = 4 in ℤ₇, 5×4=20≡6)
      'inverse(3)': field.inverse(3)      // 5 (since 3×5=15≡1)
    }
  };
}

// ============================================================================
// Young Area Examples and Demonstrations
// ============================================================================

/**
 * Example: Geometric Areas
 * Demonstrate area calculations for common shapes
 */
function geometricAreasExample() {
  const area = createEuclideanArea();
  
  return {
    rectangle: area.rectangleArea(5, 3),        // 15
    circle: area.circleArea(2),                  // π × 4 ≈ 12.566
    triangle: area.triangleArea(6, 4),           // 12
    ellipse: area.ellipseArea(3, 2)             // π × 6 ≈ 18.849
  };
}

/**
 * Example: Integration
 * Demonstrate integration and area under curve
 */
function integrationExample() {
  const area = createEuclideanArea();
  
  // f(x) = x² from 0 to 2
  // ∫₀² x² dx = [x³/3]₀² = 8/3 ≈ 2.667
  const quadratic = area.integrate((x) => x * x, 0, 2);
  
  // f(x) = sin(x) from 0 to π
  // ∫₀ᵖⁱ sin(x) dx = [-cos(x)]₀ᵖⁱ = 2
  const sine = area.integrate((x) => Math.sin(x), 0, Math.PI);
  
  // Area under f(x) = x from 0 to 4
  // Forms a triangle with area = 8
  const linear = area.areaUnderCurve((x) => x, 0, 4);
  
  return {
    quadratic: Math.round(quadratic * 1000) / 1000,  // ≈ 2.667
    sine: Math.round(sine * 1000) / 1000,            // ≈ 2.000
    linear: Math.round(linear * 1000) / 1000          // ≈ 8.000
  };
}

/**
 * Example: Volume of Revolution
 * Demonstrate volume calculations using rotation
 */
function volumeOfRevolutionExample() {
  const area = createEuclideanArea();
  
  // Rotate f(x) = x around x-axis from x=0 to x=2
  // V = π ∫₀² x² dx = π × 8/3 ≈ 8.378
  const cone = area.volumeOfRevolution((x) => x, 0, 2);
  
  // Rotate f(x) = √(r² - x²) (semicircle) around x-axis
  // Creates a sphere: V = (4/3)πr³
  const r = 1;
  const sphere = area.volumeOfRevolution(
    (x) => Math.sqrt(Math.max(0, r*r - x*x)), 
    -r, 
    r
  );
  
  return {
    cone: Math.round(cone * 1000) / 1000,        // ≈ 8.378
    sphere: Math.round(sphere * 1000) / 1000     // ≈ 4.189 (≈ 4π/3)
  };
}

/**
 * Example: N-Dimensional Volume
 * Demonstrate volume calculations in higher dimensions
 */
function nDimensionalVolumeExample() {
  const area = createEuclideanArea();
  
  return {
    line: area.volumeNDimensional([5]),                    // 5 (length)
    rectangle: area.volumeNDimensional([3, 4]),            // 12 (area)
    box: area.volumeNDimensional([2, 3, 4]),              // 24 (volume)
    hypercube: area.volumeNDimensional([2, 2, 2, 2])      // 16 (4D volume)
  };
}

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  name: 'reality-simulation-code',
  version: '1.0.0',
  description: 'Reality Simulation Codebase - SimSim Code & Contributions',
  author: 'xaoex',
  
  // Original functions
  init: function() {
    console.log('Reality Simulation Code initialized');
    return true;
  },
  
  info: function() {
    return {
      name: this.name,
      version: this.version,
      author: this.author,
      links: [
        'https://linktr.ee/xaoex',
        'https://linktr.ee/oktays'
      ]
    };
  },

  // Young Ring, Young Field, and Young Area classes
  YoungRing,
  YoungField,
  YoungArea,

  // Factory functions
  createRationalField,
  createFiniteField,
  createSituationValuationField,
  createEuclideanArea,
  createSituationAreaField,

  // Example functions
  normalizedSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample,
  geometricAreasExample,
  integrationExample,
  volumeOfRevolutionExample,
  nDimensionalVolumeExample
};
