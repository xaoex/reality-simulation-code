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

  /**
   * Situation Region Measure (Application to Young Situation)
   * Calculate the measure of a region defined by a Young Situation
   * Based on state valuations
   */
  situationRegionMeasure(situation) {
    if (!(situation instanceof YoungSituation)) {
      throw new Error('Argument must be a YoungSituation');
    }
    
    // Sum of state valuations gives the total measure
    return situation.totalValuation();
  }

  /**
   * Family Region Measure
   * Calculate total measure across a Young Family
   */
  familyRegionMeasure(family) {
    if (!(family instanceof YoungFamily)) {
      throw new Error('Argument must be a YoungFamily');
    }
    
    let totalMeasure = this.zero;
    for (const index of family.indexSet) {
      const situation = family.members(index);
      totalMeasure = this.add(totalMeasure, this.situationRegionMeasure(situation));
    }
    return totalMeasure;
  }

  /**
   * Bounded Region Area
   * Calculate area of region constrained by bounds
   */
  boundedRegionArea(situation, bound) {
    if (!(situation instanceof YoungSituation) || !(bound instanceof YoungBound)) {
      throw new Error('Arguments must be YoungSituation and YoungBound');
    }
    
    let boundedMeasure = this.zero;
    for (const state of situation.states) {
      if (bound.isValid(state, situation.valuation)) {
        boundedMeasure = this.add(boundedMeasure, situation.valuation(state));
      }
    }
    return boundedMeasure;
  }

  /**
   * Movement Trajectory Area
   * Calculate area under trajectory of movement application
   * Integrates valuation changes over movement sequence
   */
  movementTrajectoryArea(situation, movement, steps = 10) {
    if (!(situation instanceof YoungSituation) || !(movement instanceof YoungMovement)) {
      throw new Error('Arguments must be YoungSituation and YoungMovement');
    }
    
    let currentSituation = situation;
    let totalArea = this.zero;
    
    for (let i = 0; i < steps; i++) {
      const measure = this.situationRegionMeasure(currentSituation);
      totalArea = this.add(totalArea, measure);
      currentSituation = movement.apply(currentSituation);
    }
    
    return this.divide(totalArea, steps);
  }

  /**
   * Situation State Space Volume
   * Calculate volume of state space for multi-dimensional situations
   * Uses state valuations as dimensions
   */
  stateSpaceVolume(situation) {
    if (!(situation instanceof YoungSituation)) {
      throw new Error('Argument must be a YoungSituation');
    }
    
    const dimensions = [...situation.states].map(s => situation.valuation(s));
    return this.volumeNDimensional(dimensions);
  }

  /**
   * Interpolated Situation Area
   * Calculate area between two situations (like area between curves)
   * Useful for DMT (Differential Movement Transform) analysis
   */
  interpolatedSituationArea(situation1, situation2, t = 0.5) {
    if (!(situation1 instanceof YoungSituation) || !(situation2 instanceof YoungSituation)) {
      throw new Error('Arguments must be YoungSituation instances');
    }
    
    // Interpolate valuations between situations
    const interpolatedValuation = (state) => {
      const v1 = situation1.valuation(state);
      const v2 = situation2.valuation(state);
      return this.add(this.multiply(v1, this.add(this.one, this.multiply(-1, t))), 
                     this.multiply(v2, t));
    };
    
    let totalArea = this.zero;
    for (const state of situation1.states) {
      if (situation2.states.has(state)) {
        totalArea = this.add(totalArea, interpolatedValuation(state));
      }
    }
    
    return totalArea;
  }
}


// ============================================================================
// Young Situation Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 3
// ============================================================================

/**
 * Young Situation - Formal definition from Young Situation framework
 * 
 * A Young Situation is a tuple Y = (S, R, σ, δ, F) where:
 * - S is a finite set of states (situation configurations)
 * - R ⊆ S × S is a relation over states (transitions)
 * - σ: S → ℝ≥0 is a valuation function (situation measure)
 * - δ: S × A → S is a transition function for action set A
 * - F ⊆ S is the set of final (optimized) states
 * 
 * @param {Set} states - Finite set of states
 * @param {Set} relations - Set of (state, state) transition pairs
 * @param {Function} valuation - Function mapping states to non-negative reals
 * @param {Function} transition - Function: (state, action) => newState
 * @param {Set} finalStates - Set of final/optimized states
 */
class YoungSituation {
  constructor(states = new Set(), relations = new Set(), valuation = null, transition = null, finalStates = new Set()) {
    this.states = states;
    this.relations = relations;
    this.valuation = valuation || ((s) => 0);
    this.transition = transition || ((s, a) => s);
    this.finalStates = finalStates;
  }

  /**
   * Check if situation satisfies axioms (non-emptiness, final states subset)
   */
  isValid() {
    return this.states.size > 0 && 
           [...this.finalStates].every(f => this.states.has(f));
  }

  /**
   * Get total valuation of the situation
   */
  totalValuation() {
    return [...this.states].reduce((sum, s) => sum + this.valuation(s), 0);
  }

  /**
   * Check if state is reachable from another state
   */
  isReachable(from, to) {
    const visited = new Set();
    const queue = [from];
    
    while (queue.length > 0) {
      const current = queue.shift();
      if (current === to) return true;
      if (visited.has(current)) continue;
      visited.add(current);
      
      for (const [s1, s2] of this.relations) {
        if (s1 === current && !visited.has(s2)) {
          queue.push(s2);
        }
      }
    }
    return false;
  }
}

// ============================================================================
// Young Family Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 4
// ============================================================================

/**
 * Young Family - Indexed collection of Young Situations with hierarchical structure
 * 
 * A Family F = {Yᵢ}ᵢ∈I where:
 * - I is an index set
 * - Each Yᵢ is a Young Situation
 * - π: I → I ∪ {⊥} defines parent relationships
 * - β: I × I → Bool defines sibling relationships
 * 
 * @param {Set} indexSet - Set of indices
 * @param {Function} members - Function mapping index to YoungSituation
 * @param {Function} parent - Function mapping index to parent index (null for root)
 * @param {Function} sibling - Function checking if two indices are siblings
 */
class YoungFamily {
  constructor(indexSet = new Set(), members = null, parent = null, sibling = null) {
    this.indexSet = indexSet;
    this.members = members || ((i) => new YoungSituation());
    this.parent = parent || ((i) => null);
    this.sibling = sibling || ((i, j) => false);
  }

  /**
   * Get root elements (those with no parent)
   */
  roots() {
    return new Set([...this.indexSet].filter(i => this.parent(i) === null));
  }

  /**
   * Get descendants of an index
   */
  descendants(index) {
    const result = new Set();
    const queue = [index];
    
    while (queue.length > 0) {
      const current = queue.shift();
      for (const i of this.indexSet) {
        if (this.parent(i) === current) {
          result.add(i);
          queue.push(i);
        }
      }
    }
    return result;
  }

  /**
   * Check if family is well-founded (acyclic parent relationships)
   */
  isWellFounded() {
    for (const i of this.indexSet) {
      const visited = new Set();
      let current = i;
      while (current !== null) {
        if (visited.has(current)) return false; // Cycle detected
        visited.add(current);
        current = this.parent(current);
      }
    }
    return true;
  }
}

// ============================================================================
// Young Bound Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 5
// ============================================================================

/**
 * Young Bound - Bounds on situation valuations
 * 
 * A Bound B = (L, U, C) where:
 * - L: S → ℝ is a lower bound function
 * - U: S → ℝ is an upper bound function
 * - C ⊆ S × S is a constraint set
 * 
 * Satisfying: ∀s ∈ S : L(s) ≤ σ(s) ≤ U(s)
 * 
 * @param {Function} lowerBound - Function mapping states to lower bounds
 * @param {Function} upperBound - Function mapping states to upper bounds
 * @param {Set} constraints - Set of (state, state) constraint pairs
 */
class YoungBound {
  constructor(lowerBound = null, upperBound = null, constraints = new Set()) {
    this.lowerBound = lowerBound || ((s) => -Infinity);
    this.upperBound = upperBound || ((s) => Infinity);
    this.constraints = constraints;
  }

  /**
   * Check if valuation respects bounds
   */
  isValid(state, valuation) {
    const val = valuation(state);
    return this.lowerBound(state) <= val && val <= this.upperBound(state);
  }

  /**
   * Check if bound is tight at state
   */
  isTight(state, valuation) {
    const val = valuation(state);
    return Math.abs(val - this.lowerBound(state)) < 1e-10 || 
           Math.abs(val - this.upperBound(state)) < 1e-10;
  }

  /**
   * Get bound width at state
   */
  width(state) {
    return this.upperBound(state) - this.lowerBound(state);
  }
}

// ============================================================================
// Young Movement Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 6
// ============================================================================

/**
 * Young Movement - Group of transformations on Young Situations
 * 
 * A Movement M = (G, ∘, e, ⁻¹) where:
 * - G is a set of transformations on Young Situations
 * - ∘: G × G → G is composition
 * - e is identity transformation
 * - ⁻¹: G → G is inverse operation
 * 
 * @param {Function} transformation - Function: YoungSituation → YoungSituation
 */
class YoungMovement {
  constructor(transformation = null) {
    this.transformation = transformation || ((y) => y);
  }

  /**
   * Compose with another movement
   */
  compose(other) {
    return new YoungMovement((y) => other.transformation(this.transformation(y)));
  }

  /**
   * Apply movement to a Young Situation
   */
  apply(situation) {
    return this.transformation(situation);
  }

  /**
   * Identity movement (returns situation unchanged)
   */
  static identity() {
    return new YoungMovement((y) => y);
  }

  /**
   * Optimization movement generator (O)
   * Transforms situation toward optimal states
   */
  static optimize() {
    return new YoungMovement((y) => {
      // Move valuations toward final states
      const newValuation = (s) => {
        if (y.finalStates.has(s)) {
          return y.valuation(s) * 1.1; // Increase valuation of final states
        }
        return y.valuation(s) * 0.9; // Decrease others
      };
      return new YoungSituation(y.states, y.relations, newValuation, y.transition, y.finalStates);
    });
  }

  /**
   * Exploration movement generator (E)
   * Expands the state space
   */
  static explore() {
    return new YoungMovement((y) => {
      // Uniform valuation exploration
      const newValuation = (s) => {
        const total = y.totalValuation();
        return total / y.states.size;
      };
      return new YoungSituation(y.states, y.relations, newValuation, y.transition, y.finalStates);
    });
  }

  /**
   * Constraint movement generator (C)
   * Applies constraints to valuations
   */
  static constrain(bound) {
    return new YoungMovement((y) => {
      const newValuation = (s) => {
        const val = y.valuation(s);
        return Math.max(bound.lowerBound(s), Math.min(val, bound.upperBound(s)));
      };
      return new YoungSituation(y.states, y.relations, newValuation, y.transition, y.finalStates);
    });
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
// Young Situation, Family, Bound, Movement Examples
// ============================================================================

/**
 * Example: Young Situation with Area Calculation
 */
function youngSituationAreaExample() {
  const area = createEuclideanArea();
  
  // Create a Young Situation with 3 states
  const states = new Set(['s1', 's2', 's3']);
  const relations = new Set([['s1', 's2'], ['s2', 's3']]);
  const valuation = (s) => {
    if (s === 's1') return 10;
    if (s === 's2') return 20;
    if (s === 's3') return 30;
    return 0;
  };
  const finalStates = new Set(['s3']);
  
  const situation = new YoungSituation(states, relations, valuation, null, finalStates);
  
  return {
    totalValuation: situation.totalValuation(),
    regionMeasure: area.situationRegionMeasure(situation),
    isValid: situation.isValid(),
    stateSpaceVolume: area.stateSpaceVolume(situation)
  };
}

/**
 * Example: Young Family with Hierarchical Measure
 */
function youngFamilyAreaExample() {
  const area = createEuclideanArea();
  
  // Create a family with parent-child relationships
  const indexSet = new Set([1, 2, 3]);
  const members = (i) => {
    const states = new Set([`s${i}`]);
    const valuation = (s) => i * 10;
    return new YoungSituation(states, new Set(), valuation, null, states);
  };
  const parent = (i) => i === 1 ? null : 1; // 1 is root, 2 and 3 are children
  
  const family = new YoungFamily(indexSet, members, parent);
  
  return {
    rootCount: family.roots().size,
    totalFamilyMeasure: area.familyRegionMeasure(family),
    isWellFounded: family.isWellFounded()
  };
}

/**
 * Example: Young Bound with Constrained Area
 */
function youngBoundAreaExample() {
  const area = createEuclideanArea();
  
  // Create situation
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => {
    if (s === 's1') return 5;
    if (s === 's2') return 15;
    if (s === 's3') return 25;
    return 0;
  };
  const situation = new YoungSituation(states, new Set(), valuation);
  
  // Create bounds
  const bound = new YoungBound(
    (s) => 10,  // Lower bound
    (s) => 20   // Upper bound
  );
  
  return {
    unboundedArea: area.situationRegionMeasure(situation),
    boundedArea: area.boundedRegionArea(situation, bound),
    s2IsTight: bound.isTight('s2', valuation),
    boundWidth: bound.width('s1')
  };
}

/**
 * Example: Young Movement with Trajectory Analysis
 */
function youngMovementAreaExample() {
  const area = createEuclideanArea();
  
  // Create initial situation
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => {
    if (s === 's1') return 10;
    if (s === 's2') return 20;
    if (s === 's3') return 30;
    return 0;
  };
  const finalStates = new Set(['s3']);
  const situation = new YoungSituation(states, new Set(), valuation, null, finalStates);
  
  // Apply optimization movement
  const optimizeMovement = YoungMovement.optimize();
  const transformedSituation = optimizeMovement.apply(situation);
  
  return {
    initialMeasure: area.situationRegionMeasure(situation),
    transformedMeasure: area.situationRegionMeasure(transformedSituation),
    trajectoryArea: area.movementTrajectoryArea(situation, optimizeMovement, 5)
  };
}

/**
 * Example: Situation Interpolation with DMT
 */
function situationInterpolationAreaExample() {
  const area = createEuclideanArea();
  
  // Create two situations
  const states = new Set(['s1', 's2']);
  
  const valuation1 = (s) => s === 's1' ? 10 : 20;
  const situation1 = new YoungSituation(states, new Set(), valuation1);
  
  const valuation2 = (s) => s === 's1' ? 30 : 40;
  const situation2 = new YoungSituation(states, new Set(), valuation2);
  
  return {
    situation1Measure: area.situationRegionMeasure(situation1),
    situation2Measure: area.situationRegionMeasure(situation2),
    interpolatedAt25: area.interpolatedSituationArea(situation1, situation2, 0.25),
    interpolatedAt50: area.interpolatedSituationArea(situation1, situation2, 0.5),
    interpolatedAt75: area.interpolatedSituationArea(situation1, situation2, 0.75)
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
  
  // Young Situation Framework classes
  YoungSituation,
  YoungFamily,
  YoungBound,
  YoungMovement,

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
  nDimensionalVolumeExample,
  youngSituationAreaExample,
  youngFamilyAreaExample,
  youngBoundAreaExample,
  youngMovementAreaExample,
  situationInterpolationAreaExample
};
