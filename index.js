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

  // Young Ring and Young Field classes
  YoungRing,
  YoungField,

  // Factory functions
  createRationalField,
  createFiniteField,
  createSituationValuationField,

  // Example functions
  normalizedSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample
};
