/**
 * Young Field Test Suite
 * Tests for Young Ring, Young Field, and Young Situation implementations
 * Based on WHITEPAPER_YOUNG_SITUATION.md Sections 3 and 10
 */

const {
  YoungSituation,
  createCommonYoungSituation,
  defineYoungArea,
  createLinearYoungSituation,
  createBranchingYoungSituation,
  youngSituationExample,
  youngAreaExample,
  YoungRing,
  YoungField,
  createRationalField,
  createFiniteField,
  createSituationValuationField,
  normalizedSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample,
  YoshisSecret,
  yoshisSecretExample,
  BaeMathematics,
  baeMathematicsExample,
  GodGenerator,
  godGeneratorExample
} = require('./index.js');

// ============================================================================
// Test Utilities
// ============================================================================

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

function assertAlmostEqual(a, b, tolerance = 1e-10, message = '') {
  if (Math.abs(a - b) > tolerance) {
    throw new Error(`Assertion failed: ${a} ≠ ${b} (tolerance: ${tolerance}). ${message}`);
  }
}

function testSection(name, testFn) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Testing: ${name}`);
  console.log('='.repeat(70));
  try {
    testFn();
    console.log(`✓ ${name} - PASSED`);
  } catch (error) {
    console.error(`✗ ${name} - FAILED`);
    console.error(error.message);
    process.exit(1);
  }
}

// ============================================================================
// Young Situation Tests (Section 3)
// ============================================================================

function testYoungSituationConstruction() {
  const states = new Set(['s1', 's2', 's3']);
  const relation = new Set([['s1', 's2'], ['s2', 's3']]);
  const valuation = (s) => ({ 's1': 0, 's2': 10, 's3': 20 }[s]);
  const transition = (s, a) => s;
  const finalStates = new Set(['s3']);
  
  const situation = new YoungSituation(states, relation, valuation, transition, finalStates);
  
  assert(situation.S.size === 3, 'Should have 3 states');
  assert(situation.F.has('s3'), 'Should have s3 as final state');
  assert(situation.valuation('s2') === 10, 'Valuation should work');
  
  console.log('  ✓ YoungSituation construction');
}

function testYoungSituationAxiomY1() {
  // Test non-emptiness
  try {
    new YoungSituation(new Set(), new Set(), () => 0, () => {}, new Set());
    throw new Error('Should fail with empty states');
  } catch (e) {
    assert(e.message.includes('Axiom Y1'), 'Should enforce non-empty states');
  }
  
  // Test final states subset
  try {
    const states = new Set(['s1', 's2']);
    const relation = new Set([['s1', 's2']]);
    const valuation = (s) => 0;
    const transition = (s, a) => s;
    const finalStates = new Set(['s3']); // s3 not in states
    
    new YoungSituation(states, relation, valuation, transition, finalStates);
    throw new Error('Should fail with invalid final states');
  } catch (e) {
    assert(e.message.includes('Axiom Y1'), 'Should enforce final states subset');
  }
  
  console.log('  ✓ Axiom Y1: Non-emptiness');
}

function testYoungSituationAxiomY2() {
  // Test completeness - all non-final states must have outgoing transitions
  try {
    const states = new Set(['s1', 's2', 's3']);
    const relation = new Set([['s1', 's2']]); // s2 has no outgoing transition
    const valuation = (s) => 0;
    const transition = (s, a) => s;
    const finalStates = new Set(['s3']);
    
    new YoungSituation(states, relation, valuation, transition, finalStates);
    throw new Error('Should fail with incomplete transitions');
  } catch (e) {
    assert(e.message.includes('Axiom Y2'), 'Should enforce completeness');
  }
  
  console.log('  ✓ Axiom Y2: Completeness');
}

function testYoungSituationAxiomY3() {
  // Test valuation monotonicity - valuations must not decrease
  try {
    const states = new Set(['s1', 's2', 's3']);
    const relation = new Set([['s1', 's2'], ['s2', 's3']]);
    const valuation = (s) => ({ 's1': 20, 's2': 10, 's3': 30 }[s]); // s1->s2 decreases!
    const transition = (s, a) => s;
    const finalStates = new Set(['s3']);
    
    new YoungSituation(states, relation, valuation, transition, finalStates);
    throw new Error('Should fail with non-monotonic valuations');
  } catch (e) {
    assert(e.message.includes('Axiom Y3'), 'Should enforce monotonicity');
  }
  
  console.log('  ✓ Axiom Y3: Valuation Monotonicity');
}

function testYoungSituationReachability() {
  const situation = createCommonYoungSituation();
  const reachable = situation.getReachableStates('initial');
  
  assert(reachable.has('initial'), 'Should include start state');
  assert(reachable.has('optimal'), 'Should reach final state');
  assert(reachable.size >= 3, 'Should reach multiple states');
  
  console.log('  ✓ YoungSituation reachability');
}

function testYoungSituationOptimalPath() {
  const situation = createCommonYoungSituation();
  const path = situation.findOptimalPath('initial');
  
  assert(path !== null, 'Should find a path');
  assert(path[0] === 'initial', 'Path should start at initial');
  assert(path[path.length - 1] === 'optimal', 'Path should end at optimal');
  assert(path.length > 1, 'Path should have multiple steps');
  
  // Verify monotonicity along path
  for (let i = 0; i < path.length - 1; i++) {
    const val1 = situation.valuation(path[i]);
    const val2 = situation.valuation(path[i + 1]);
    assert(val1 <= val2, `Valuation should not decrease along path: ${path[i]} -> ${path[i+1]}`);
  }
  
  console.log('  ✓ YoungSituation optimal path finding');
}

function testCommonYoungSituation() {
  const situation = createCommonYoungSituation();
  
  assert(situation.S.size === 5, 'Should have 5 states');
  assert(situation.F.size === 1, 'Should have 1 final state');
  assert(situation.F.has('optimal'), 'Final state should be optimal');
  assert(situation.valuation('initial') === 0, 'Initial valuation should be 0');
  assert(situation.valuation('optimal') === 40, 'Optimal valuation should be 40');
  
  console.log('  ✓ Common Young Situation creation');
}

function testLinearYoungSituation() {
  const situation = createLinearYoungSituation(4);
  
  assert(situation.S.size === 4, 'Should have 4 states');
  assert(situation.F.has('state_3'), 'Final state should be state_3');
  
  const path = situation.findOptimalPath('state_0');
  assert(path.length === 4, 'Path should have 4 states');
  assert(path[0] === 'state_0', 'Should start at state_0');
  assert(path[3] === 'state_3', 'Should end at state_3');
  
  console.log('  ✓ Linear Young Situation creation');
}

function testBranchingYoungSituation() {
  const situation = createBranchingYoungSituation();
  
  assert(situation.S.size === 6, 'Should have 6 states');
  assert(situation.F.has('end'), 'Final state should be end');
  
  const path = situation.findOptimalPath('start');
  assert(path !== null, 'Should find a path');
  assert(path[0] === 'start', 'Should start at start');
  assert(path[path.length - 1] === 'end', 'Should end at end');
  
  console.log('  ✓ Branching Young Situation creation');
}

function testYoungAreaDefinition() {
  const area = defineYoungArea();
  
  assert(area.name === 'Young Area', 'Area should have name');
  assert(area.stateCategories, 'Area should have state categories');
  assert(area.actionTypes.length > 0, 'Area should have action types');
  assert(area.constraints, 'Area should have constraints');
  assert(area.metrics, 'Area should have metrics');
  
  // Test metrics
  assert(typeof area.metrics.efficiency === 'function', 'Should have efficiency metric');
  assert(typeof area.metrics.optimality === 'function', 'Should have optimality metric');
  assert(typeof area.metrics.convergence === 'function', 'Should have convergence metric');
  
  console.log('  ✓ Young Area definition');
}

function testYoungSituationExample() {
  const result = youngSituationExample();
  
  assert(result.totalStates > 0, 'Should have states');
  assert(result.finalStates.length > 0, 'Should have final states');
  assert(result.optimalPath.length > 0, 'Should have optimal path');
  assert(result.pathValuations.length === result.optimalPath.length, 'Valuations match path');
  
  console.log('  ✓ Example: youngSituationExample()');
  console.log(`    Total states: ${result.totalStates}`);
  console.log(`    Path length: ${result.pathLength}`);
  console.log(`    Path: ${result.optimalPath.join(' -> ')}`);
}

function testYoungAreaExample() {
  const result = youngAreaExample();
  
  assert(result.areaName === 'Young Area', 'Should have area name');
  assert(result.stateCategories.length > 0, 'Should have state categories');
  assert(result.availableActions.length > 0, 'Should have actions');
  assert(result.situationMetrics, 'Should have metrics');
  assert(typeof result.situationMetrics.efficiency === 'number', 'Should have efficiency value');
  
  console.log('  ✓ Example: youngAreaExample()');
  console.log(`    Efficiency: ${result.situationMetrics.efficiency.toFixed(3)}`);
  console.log(`    Optimality: ${result.situationMetrics.optimality.toFixed(3)}`);
  console.log(`    Convergence: ${result.situationMetrics.convergence.toFixed(3)}`);
}

// ============================================================================
// Young Ring Tests
// ============================================================================

function testYoungRingConstruction() {
  const ring = new YoungRing([0, 1, 2, 3, 4]);
  
  assert(ring.elements.has(0), 'Ring should contain 0');
  assert(ring.elements.has(1), 'Ring should contain 1');
  assert(ring.zero === 0, 'Zero element should be 0');
  assert(ring.one === 1, 'One element should be 1');
  
  console.log('  ✓ YoungRing construction');
}

function testYoungRingOperations() {
  const ring = new YoungRing([0, 1, 2, 3, 4, 5]);
  
  // Test addition
  assert(ring.add(2, 3) === 5, 'Addition: 2 + 3 = 5');
  
  // Test multiplication
  assert(ring.multiply(2, 3) === 6, 'Multiplication: 2 × 3 = 6');
  
  // Test additive identity
  assert(ring.add(5, ring.zero) === 5, 'Additive identity: 5 + 0 = 5');
  
  // Test multiplicative identity
  assert(ring.multiply(5, ring.one) === 5, 'Multiplicative identity: 5 × 1 = 5');
  
  console.log('  ✓ YoungRing basic operations');
}

function testYoungRingRelationalAlgebra() {
  const ring = new YoungRing([1, 2, 3, 4, 5, 6]);
  
  // Test selection (σ)
  const evens = ring.select(x => x % 2 === 0);
  assert(evens.has(2) && evens.has(4) && evens.has(6), 'Selection should filter evens');
  assert(!evens.has(1) && !evens.has(3) && !evens.has(5), 'Selection should exclude odds');
  
  // Test projection (π)
  const squares = ring.project(x => x * x);
  assert(squares.has(1) && squares.has(4) && squares.has(9), 'Projection should square values');
  
  // Test join (⋈)
  const ring2 = new YoungRing([10, 20]);
  const joined = ring.join(ring2);
  assert(joined.size === ring.elements.size * ring2.elements.size, 'Join size should be product');
  
  console.log('  ✓ YoungRing relational algebra operations');
}

// ============================================================================
// Young Field Tests - Basic Construction
// ============================================================================

function testYoungFieldConstruction() {
  const field = new YoungField([0, 1, 2, 3, 4]);
  
  assert(field.elements.has(0), 'Field should contain 0');
  assert(field.elements.has(1), 'Field should contain 1');
  assert(field.zero === 0, 'Zero element should be 0');
  assert(field.one === 1, 'One element should be 1');
  
  console.log('  ✓ YoungField construction');
}

function testYoungFieldInheritance() {
  const field = new YoungField([0, 1, 2, 3]);
  
  // Test that field inherits ring operations
  assert(field.add(2, 3) === 5, 'Field should inherit addition');
  assert(field.multiply(2, 3) === 6, 'Field should inherit multiplication');
  
  // Test that field has additional operations
  assert(typeof field.divide === 'function', 'Field should have divide method');
  assert(typeof field.inverse === 'function', 'Field should have inverse method');
  
  console.log('  ✓ YoungField inherits from YoungRing');
}

// ============================================================================
// Young Field Tests - Field Axioms (Section 10.4)
// ============================================================================

function testFieldAxiomF1_AdditiveGroup() {
  const field = createRationalField();
  
  const a = 5, b = 3, c = 7;
  
  // Commutativity: a + b = b + a
  assertAlmostEqual(field.add(a, b), field.add(b, a), 1e-10, 'Addition commutativity');
  
  // Associativity: (a + b) + c = a + (b + c)
  assertAlmostEqual(
    field.add(field.add(a, b), c),
    field.add(a, field.add(b, c)),
    1e-10,
    'Addition associativity'
  );
  
  // Identity: a + 0 = a
  assertAlmostEqual(field.add(a, field.zero), a, 1e-10, 'Additive identity');
  
  // Inverse: a + (-a) = 0
  assertAlmostEqual(field.add(a, field.multiply(-1, a)), field.zero, 1e-10, 'Additive inverse');
  
  console.log('  ✓ Axiom F1: (R, +, 0) is an abelian group');
}

function testFieldAxiomF2_MultiplicativeGroup() {
  const field = createRationalField();
  
  const a = 5, b = 3, c = 7;
  
  // Commutativity: a × b = b × a
  assertAlmostEqual(field.multiply(a, b), field.multiply(b, a), 1e-10, 'Multiplication commutativity');
  
  // Associativity: (a × b) × c = a × (b × c)
  assertAlmostEqual(
    field.multiply(field.multiply(a, b), c),
    field.multiply(a, field.multiply(b, c)),
    1e-10,
    'Multiplication associativity'
  );
  
  // Identity: a × 1 = a
  assertAlmostEqual(field.multiply(a, field.one), a, 1e-10, 'Multiplicative identity');
  
  // Inverse: a × a⁻¹ = 1 for a ≠ 0
  const aInv = field.inverse(a);
  assertAlmostEqual(field.multiply(a, aInv), field.one, 1e-10, 'Multiplicative inverse');
  
  console.log('  ✓ Axiom F2: (R \\ {0}, ×, 1, ⁻¹) is an abelian group');
}

function testFieldAxiomF3_Distributivity() {
  const field = createRationalField();
  
  const a = 5, b = 3, c = 7;
  
  // Left distributivity: a × (b + c) = (a × b) + (a × c)
  assertAlmostEqual(
    field.multiply(a, field.add(b, c)),
    field.add(field.multiply(a, b), field.multiply(a, c)),
    1e-10,
    'Left distributivity'
  );
  
  // Right distributivity: (a + b) × c = (a × c) + (b × c)
  assertAlmostEqual(
    field.multiply(field.add(a, b), c),
    field.add(field.multiply(a, c), field.multiply(b, c)),
    1e-10,
    'Right distributivity'
  );
  
  console.log('  ✓ Axiom F3: Distributive laws');
}

function testFieldAxiomF4_ZeroProduct() {
  const field = createRationalField();
  
  // a × 0 = 0
  assertAlmostEqual(field.multiply(5, field.zero), field.zero, 1e-10, 'Zero product');
  
  // If a × b = 0, then a = 0 or b = 0
  // This is implicitly satisfied in rational field (no zero divisors)
  
  console.log('  ✓ Axiom F4: Zero product property');
}

// ============================================================================
// Young Field Tests - Operations
// ============================================================================

function testYoungFieldInverse() {
  const field = createRationalField();
  
  // Test inverse of non-zero elements
  assertAlmostEqual(field.inverse(2), 0.5, 1e-10, 'Inverse of 2 is 0.5');
  assertAlmostEqual(field.inverse(4), 0.25, 1e-10, 'Inverse of 4 is 0.25');
  assertAlmostEqual(field.inverse(0.5), 2, 1e-10, 'Inverse of 0.5 is 2');
  
  // Test that inverse of zero is null
  assert(field.inverse(0) === null, 'Inverse of 0 should be null');
  
  // Test that a × a⁻¹ = 1
  const testValues = [2, 3, 5, 7, 11, 0.5, 0.25];
  for (const val of testValues) {
    const inv = field.inverse(val);
    assertAlmostEqual(
      field.multiply(val, inv),
      field.one,
      1e-10,
      `${val} × ${inv} should equal 1`
    );
  }
  
  console.log('  ✓ YoungField inverse operations');
}

function testYoungFieldDivision() {
  const field = createRationalField();
  
  // Test division
  assertAlmostEqual(field.divide(6, 3), 2, 1e-10, '6 ÷ 3 = 2');
  assertAlmostEqual(field.divide(10, 4), 2.5, 1e-10, '10 ÷ 4 = 2.5');
  assertAlmostEqual(field.divide(1, 3), 1/3, 1e-10, '1 ÷ 3 = 1/3');
  
  // Test division by zero
  assert(field.divide(5, 0) === null, 'Division by zero should return null');
  
  // Test that a ÷ b = a × b⁻¹
  const a = 15, b = 3;
  assertAlmostEqual(
    field.divide(a, b),
    field.multiply(a, field.inverse(b)),
    1e-10,
    'Division should equal multiplication by inverse'
  );
  
  console.log('  ✓ YoungField division operations');
}

function testYoungFieldNormalization() {
  const field = createRationalField();
  
  // Test normalization (sum to 1)
  const values = [10, 20, 30, 40];
  const normalized = field.normalize(values);
  
  // Check that normalized values sum to 1
  const sum = normalized.reduce((acc, val) => field.add(acc, val), field.zero);
  assertAlmostEqual(sum, 1, 1e-10, 'Normalized values should sum to 1');
  
  // Check individual normalized values
  assertAlmostEqual(normalized[0], 0.1, 1e-10, '10/100 = 0.1');
  assertAlmostEqual(normalized[1], 0.2, 1e-10, '20/100 = 0.2');
  assertAlmostEqual(normalized[2], 0.3, 1e-10, '30/100 = 0.3');
  assertAlmostEqual(normalized[3], 0.4, 1e-10, '40/100 = 0.4');
  
  console.log('  ✓ YoungField normalization');
}

// ============================================================================
// Young Field Tests - Rational Field (Section 10.7)
// ============================================================================

function testRationalField() {
  const field = createRationalField();
  
  // Test that it's a valid field
  const testElements = [1, 2, 3, 5, 7, 0.5, 0.25, 1/3];
  for (const elem of testElements) {
    const inv = field.inverse(elem);
    assertAlmostEqual(
      field.multiply(elem, inv),
      1,
      1e-10,
      `${elem} should have valid inverse`
    );
  }
  
  console.log('  ✓ Rational Young Field (ℚ)');
}

function testFiniteFieldConstruction() {
  // Test prime field ℤ₇
  const field = createFiniteField(7);
  
  assert(field.elements.size === 7, 'Field should have 7 elements');
  assert(field.isValidField(), 'ℤ₇ should be a valid field');
  
  // Test that non-prime throws error
  try {
    createFiniteField(6);
    throw new Error('Should throw error for non-prime');
  } catch (e) {
    assert(e.message.includes('prime'), 'Should require prime modulus');
  }
  
  console.log('  ✓ Finite Young Field (ℤₚ) construction');
}

function testFiniteFieldOperations() {
  const field = createFiniteField(7);
  
  // Test modular operations
  assert(field.add(5, 4) === 2, '5 + 4 ≡ 2 (mod 7)');
  assert(field.multiply(5, 4) === 6, '5 × 4 ≡ 6 (mod 7)');
  
  // Test inverses in ℤ₇
  assert(field.inverse(1) === 1, '1⁻¹ = 1');
  assert(field.inverse(2) === 4, '2⁻¹ = 4 (since 2×4=8≡1 (mod 7))');
  assert(field.inverse(3) === 5, '3⁻¹ = 5 (since 3×5=15≡1 (mod 7))');
  
  // Test division
  const result = field.divide(5, 2);
  assert(result === 6, '5 ÷ 2 = 5 × 4 = 20 ≡ 6 (mod 7)');
  
  console.log('  ✓ Finite Young Field (ℤ₇) operations');
}

// ============================================================================
// Young Field Tests - Applications (Section 10.8)
// ============================================================================

function testApplicationNormalizedSituationValuations() {
  const field = createSituationValuationField();
  
  // Example: Three situations with valuations
  const valuations = [100, 200, 300];
  const normalized = field.normalize(valuations);
  
  // Check that they form a probability distribution
  const sum = normalized.reduce((a, b) => a + b, 0);
  assertAlmostEqual(sum, 1, 1e-10, 'Normalized valuations should sum to 1');
  
  // Check individual probabilities
  assertAlmostEqual(normalized[0], 1/6, 1e-10, 'P(s₁) = 100/600');
  assertAlmostEqual(normalized[1], 2/6, 1e-10, 'P(s₂) = 200/600');
  assertAlmostEqual(normalized[2], 3/6, 1e-10, 'P(s₃) = 300/600');
  
  console.log('  ✓ Application: Normalized situation valuations');
}

function testApplicationProbabilityDistribution() {
  const field = createSituationValuationField();
  
  const situationValues = [10, 20, 30, 40];
  const probDist = field.createProbabilityDistribution(situationValues);
  
  // Verify it's a valid probability distribution
  assert(probDist !== null, 'Should create valid distribution');
  const sum = probDist.reduce((a, b) => a + b, 0);
  assertAlmostEqual(sum, 1, 1e-10, 'Probabilities should sum to 1');
  
  // All probabilities should be non-negative
  for (const p of probDist) {
    assert(p >= 0, 'All probabilities should be non-negative');
  }
  
  console.log('  ✓ Application: Probability distributions');
}

function testApplicationRateOfChange() {
  const field = createRationalField();
  
  // f(x) = x²
  const f = (x) => x * x;
  
  // Rate of change at x=3 with h=0.1: (f(3.1) - f(3)) / 0.1
  // f(3) = 9, f(3.1) = 9.61, rate = 0.61/0.1 = 6.1
  const rate = field.rateOfChange(f, 3, 0.1);
  assertAlmostEqual(rate, 6.1, 1e-10, 'Rate of change for x² at x=3');
  
  // Test with smaller h (approaches derivative = 2x = 6)
  const rate2 = field.rateOfChange(f, 3, 0.01);
  assertAlmostEqual(rate2, 6.01, 1e-10, 'Smaller h approaches derivative');
  
  console.log('  ✓ Application: Rate of change (ZMT)');
}

// ============================================================================
// Young Field Tests - Examples
// ============================================================================

function testNormalizedSituationExample() {
  const result = normalizedSituationExample();
  
  assert(result.original.length === result.normalized.length, 'Same length');
  assertAlmostEqual(result.sum, 1, 1e-10, 'Normalized values sum to 1');
  
  console.log('  ✓ Example: normalizedSituationExample()');
  console.log(`    Original: [${result.original.join(', ')}]`);
  console.log(`    Normalized: [${result.normalized.map(v => v.toFixed(2)).join(', ')}]`);
  console.log(`    Sum: ${result.sum}`);
}

function testYoungFieldOperationsExample() {
  const result = youngFieldOperationsExample();
  
  assert(result.addition === 9, 'Addition example');
  assert(result.multiplication === 18, 'Multiplication example');
  assert(result.division === 2, 'Division example');
  assertAlmostEqual(result.inverse, 1/3, 1e-10, 'Inverse example');
  assert(result.divisionByZero === null, 'Division by zero example');
  
  console.log('  ✓ Example: youngFieldOperationsExample()');
  console.log(`    6 + 3 = ${result.addition}`);
  console.log(`    6 × 3 = ${result.multiplication}`);
  console.log(`    6 ÷ 3 = ${result.division}`);
  console.log(`    3⁻¹ = ${result.inverse}`);
  console.log(`    6 ÷ 0 = ${result.divisionByZero}`);
}

function testFiniteFieldExampleFunction() {
  const result = finiteFieldExample();
  
  assert(result.elements.length === 7, 'Has 7 elements');
  assert(result.isValid === true, 'Is valid field');
  
  console.log('  ✓ Example: finiteFieldExample()');
  console.log(`    Elements: [${result.elements.join(', ')}]`);
  console.log(`    Valid field: ${result.isValid}`);
  console.log('    Operations:', result.operations);
}

// ============================================================================
// Yoshi's Secret Tests
// ============================================================================

function testYoshisSecretConstruction() {
  const secret = new YoshisSecret(31337);
  
  assert(secret.prime === 31337, 'Prime should be set correctly');
  assert(secret.secretKey !== null, 'Secret key should be generated');
  
  console.log('  ✓ YoshisSecret construction');
}

function testYoshisSecretEncoding() {
  const secret = new YoshisSecret(31337);
  
  // Test number encoding/decoding
  const original = 42;
  const encoded = secret.encode(original);
  const decoded = secret.decode(encoded);
  
  assert(decoded === original, `Encoding/decoding should be reversible: ${original} -> ${encoded} -> ${decoded}`);
  assert(encoded !== original, 'Encoded value should differ from original');
  
  console.log('  ✓ YoshisSecret number encoding/decoding');
}

function testYoshisSecretStringEncoding() {
  const secret = new YoshisSecret(31337);
  
  // Test string encoding/decoding
  const message = "Hello World!";
  const encoded = secret.encodeString(message);
  const decoded = secret.decodeString(encoded);
  
  assert(decoded === message, `String encoding/decoding should be reversible: "${message}" -> "${decoded}"`);
  assert(Array.isArray(encoded), 'Encoded string should be an array');
  assert(encoded.length === message.length, 'Encoded array length should match message length');
  
  console.log('  ✓ YoshisSecret string encoding/decoding');
}

function testYoshisSecretHashing() {
  const secret = new YoshisSecret(31337);
  
  // Test hashing
  const data1 = "test data";
  const data2 = "test data";
  const data3 = "different data";
  
  const hash1 = secret.hash(data1);
  const hash2 = secret.hash(data2);
  const hash3 = secret.hash(data3);
  
  assert(hash1 === hash2, 'Same data should produce same hash');
  assert(hash1 !== hash3, 'Different data should produce different hash');
  assert(typeof hash1 === 'number', 'Hash should be a number');
  
  console.log('  ✓ YoshisSecret hashing');
}

// ============================================================================
// Bae Mathematics Tests
// ============================================================================

function testBaeMathematicsConstruction() {
  const bae = new BaeMathematics();
  
  assert(bae.entities.size === 0, 'Should start with no entities');
  assert(bae.relationships.size === 0, 'Should start with no relationships');
  
  console.log('  ✓ BaeMathematics construction');
}

function testBaeMathematicsEntities() {
  const bae = new BaeMathematics();
  
  const entity = bae.addEntity('entity1', { name: 'Test' });
  
  assert(entity.id === 'entity1', 'Entity should have correct ID');
  assert(bae.entities.has('entity1'), 'Entity should be added to set');
  
  console.log('  ✓ BaeMathematics entity management');
}

function testBaeMathematicsConnections() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  
  const strength = bae.connect('a', 'b', 0.75);
  
  assert(strength === 0.75, 'Connection strength should be set');
  assert(bae.getConnectionStrength('a', 'b') === 0.75, 'Should retrieve connection strength');
  assert(bae.getConnectionStrength('b', 'a') === 0.75, 'Connection should be bidirectional');
  
  console.log('  ✓ BaeMathematics connections');
}

function testBaeMathematicsTransitiveConnection() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  
  bae.connect('a', 'b', 0.8);
  bae.connect('b', 'c', 0.6);
  
  const transitive = bae.transitiveConnection('a', 'c');
  
  assert(transitive > 0, 'Transitive connection should exist');
  assertAlmostEqual(transitive, 0.48, 1e-6, 'Transitive connection should be product of strengths');
  
  console.log('  ✓ BaeMathematics transitive connections');
}

function testBaeMathematicsBaeIndex() {
  const bae = new BaeMathematics();
  
  bae.addEntity('main');
  bae.addEntity('friend1');
  bae.addEntity('friend2');
  
  bae.connect('main', 'friend1', 0.6);
  bae.connect('main', 'friend2', 0.9);
  
  const baeIndex = bae.getBaeIndex('main');
  
  assert(baeIndex.bae === 'friend2', 'Bae should be strongest connection');
  assert(baeIndex.strength === 0.9, 'Bae strength should be 0.9');
  
  console.log('  ✓ BaeMathematics bae index');
}

function testBaeMathematicsMatrix() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  
  bae.connect('a', 'b', 0.5);
  bae.connect('b', 'c', 0.7);
  
  const matrix = bae.getRelationshipMatrix();
  
  assert(matrix.entities.length === 3, 'Matrix should have 3 entities');
  assert(matrix.matrix.length === 3, 'Matrix should be 3x3');
  assert(matrix.matrix[0].length === 3, 'Each row should have 3 elements');
  
  console.log('  ✓ BaeMathematics relationship matrix');
}

// ============================================================================
// God Generator Tests
// ============================================================================

function testGodGeneratorConstruction() {
  const generator = new GodGenerator(31337);
  
  assert(generator.secret !== null, 'Should have YoshisSecret instance');
  assert(generator.bae !== null, 'Should have BaeMathematics instance');
  assert(generator.entities.size === 0, 'Should start with no entities');
  
  console.log('  ✓ GodGenerator construction');
}

function testGodGeneratorCreateGod() {
  const generator = new GodGenerator(31337);
  
  const god = generator.generateGod({
    name: 'TestGod',
    power: 100,
    wisdom: 50
  });
  
  assert(god.type === 'god', 'Entity should be of type god');
  assert(god.id.startsWith('god_'), 'ID should have god prefix');
  assert(god.power > 0, 'Power should be calculated');
  assert(god.essence !== undefined, 'Essence should be calculated');
  assert(god.encodedProperties !== undefined, 'Properties should be encoded');
  
  console.log('  ✓ GodGenerator create god');
}

function testGodGeneratorDecoding() {
  const generator = new GodGenerator(31337);
  
  const god = generator.generateGod({
    name: 'Zeus',
    level: 100
  });
  
  const decoded = generator.decodeEntity(god.id);
  
  assert(decoded !== null, 'Should decode entity');
  assert(decoded.decodedProperties.name === 'Zeus', 'Name should decode correctly');
  assert(decoded.decodedProperties.level === 100, 'Level should decode correctly');
  
  console.log('  ✓ GodGenerator decoding');
}

function testGodGeneratorConnectEntities() {
  const generator = new GodGenerator(31337);
  
  const god1 = generator.generateGod({ name: 'God1' });
  const god2 = generator.generateGod({ name: 'God2' });
  
  const strength = generator.connectEntities(god1.id, god2.id, 0.8);
  
  assert(strength === 0.8, 'Connection strength should be set');
  assert(generator.bae.getConnectionStrength(god1.id, god2.id) === 0.8, 'Should retrieve connection');
  
  console.log('  ✓ GodGenerator connect entities');
}

function testGodGeneratorPantheon() {
  const generator = new GodGenerator(31337);
  
  const pantheon = generator.generatePantheon(3, { realm: 'Olympus' });
  
  assert(pantheon.length === 3, 'Should generate 3 gods');
  assert(pantheon[0].type === 'god', 'All should be gods');
  
  // Check that relationships exist
  const matrix = generator.getRelationshipGraph();
  assert(matrix.entities.length === 3, 'All gods should be in relationship graph');
  
  console.log('  ✓ GodGenerator pantheon generation');
}

function testGodGeneratorMostPowerful() {
  const generator = new GodGenerator(31337);
  
  generator.generateGod({ power: 50 });
  generator.generateGod({ power: 100 });
  generator.generateGod({ power: 75 });
  
  const mostPowerful = generator.getMostPowerful();
  
  assert(mostPowerful !== null, 'Should find most powerful');
  assert(mostPowerful.power === 100, 'Should find the one with power 100');
  
  console.log('  ✓ GodGenerator most powerful');
}

// ============================================================================
// Example Function Tests
// ============================================================================

function testYoshisSecretExampleFunction() {
  const result = yoshisSecretExample();
  
  assert(result.original === result.decoded, 'Example should encode/decode correctly');
  assert(result.encoded !== undefined, 'Should have encoded representation');
  assert(typeof result.hash === 'number', 'Should have hash');
  
  console.log('  ✓ Example: yoshisSecretExample()');
  console.log(`    Original: "${result.original}"`);
  console.log(`    Decoded: "${result.decoded}"`);
  console.log(`    Hash: ${result.hash}`);
}

function testBaeMathematicsExampleFunction() {
  const result = baeMathematicsExample();
  
  assert(result.aliceBob === 0.9, 'Alice-Bob connection should be 0.9');
  assert(result.bobCharlie === 0.7, 'Bob-Charlie connection should be 0.7');
  assert(result.aliceBae.bae === 'bob', 'Alice bae should be Bob');
  
  console.log('  ✓ Example: baeMathematicsExample()');
  console.log(`    Alice-Bob: ${result.aliceBob}`);
  console.log(`    Bob-Charlie: ${result.bobCharlie}`);
  console.log(`    Alice's Bae: ${result.aliceBae.bae} (strength: ${result.aliceBae.strength})`);
}

function testGodGeneratorExampleFunction() {
  const result = godGeneratorExample();
  
  assert(result.singleGod.type === 'god', 'Should generate a god');
  assert(result.pantheonCount === 3, 'Should generate pantheon of 3');
  assert(result.relationshipMatrix !== undefined, 'Should have relationship matrix');
  
  console.log('  ✓ Example: godGeneratorExample()');
  console.log(`    God ID: ${result.singleGod.id}`);
  console.log(`    God Power: ${result.singleGod.power}`);
  console.log(`    Pantheon Count: ${result.pantheonCount}`);
}

// ============================================================================
// Extended Yoshi's Secret Tests
// ============================================================================

function testYoshisSecretBatchOperations() {
  const secret = new YoshisSecret(31337);
  
  const values = [10, 20, 30, 40];
  const encoded = secret.encodeBatch(values);
  const decoded = secret.decodeBatch(encoded);
  
  assert(encoded.length === values.length, 'Batch encode should preserve length');
  assert(decoded.length === values.length, 'Batch decode should preserve length');
  
  for (let i = 0; i < values.length; i++) {
    assert(decoded[i] === values[i], `Value ${i} should match: ${values[i]} === ${decoded[i]}`);
  }
  
  console.log('  ✓ Batch encoding/decoding operations');
}

function testYoshisSecretAuthentication() {
  const secret = new YoshisSecret(31337);
  
  const message = "Important message";
  const authCode = secret.authenticate(message);
  
  assert(typeof authCode === 'number', 'Auth code should be a number');
  assert(secret.verifyAuthentication(message, authCode), 'Authentication should verify');
  assert(!secret.verifyAuthentication("Wrong message", authCode), 'Wrong message should not verify');
  
  console.log('  ✓ Message authentication');
}

function testYoshisSecretCommitment() {
  const secret = new YoshisSecret(31337);
  
  const value = 42;
  const { commitment, randomness } = secret.commit(value);
  
  assert(typeof commitment === 'number', 'Commitment should be a number');
  assert(typeof randomness === 'number', 'Randomness should be a number');
  assert(secret.verifyCommitment(value, commitment, randomness), 'Commitment should verify');
  assert(!secret.verifyCommitment(43, commitment, randomness), 'Wrong value should not verify');
  
  console.log('  ✓ Cryptographic commitments');
}

function testYoshisSecretRandomSequence() {
  const secret = new YoshisSecret(31337);
  
  const seed = 12345;
  const seq1 = secret.generateRandomSequence(seed, 10);
  const seq2 = secret.generateRandomSequence(seed, 10);
  
  assert(seq1.length === 10, 'Sequence should have correct length');
  assert(JSON.stringify(seq1) === JSON.stringify(seq2), 'Same seed should produce same sequence');
  
  console.log('  ✓ Deterministic random sequence generation');
}

// ============================================================================
// Extended Bae Mathematics Tests
// ============================================================================

function testBaeMathematicsCentrality() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  
  bae.connect('a', 'b', 0.8);
  bae.connect('b', 'c', 0.7);
  
  const degCentrality = bae.degreeCentrality('b');
  assert(degCentrality > 0, 'Degree centrality should be positive');
  
  const closenessCentrality = bae.closenessCentrality('b');
  assert(closenessCentrality > 0, 'Closeness centrality should be positive');
  
  console.log('  ✓ Centrality measures');
}

function testBaeMathematicsPathFinding() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  bae.addEntity('d');
  
  bae.connect('a', 'b', 0.8);
  bae.connect('b', 'c', 0.7);
  bae.connect('c', 'd', 0.6);
  
  const paths = bae.findPaths('a', 'd', 5);
  assert(paths.length > 0, 'Should find at least one path');
  
  const strongestPath = bae.strongestPath('a', 'd', 5);
  assert(strongestPath !== null, 'Should find strongest path');
  assert(strongestPath.path.length > 0, 'Path should have nodes');
  
  console.log('  ✓ Path finding and path strength');
}

function testBaeMathematicsGraphMetrics() {
  const bae = new BaeMathematics();
  
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  
  bae.connect('a', 'b', 0.5);
  bae.connect('b', 'c', 0.5);
  
  const density = bae.graphDensity();
  assert(density >= 0 && density <= 1, 'Density should be in [0, 1]');
  
  const avgStrength = bae.averageConnectionStrength();
  assert(avgStrength >= 0 && avgStrength <= 1, 'Average strength should be in [0, 1]');
  
  console.log('  ✓ Graph metrics (density, average strength)');
}

function testBaeMathematicsConnectedComponents() {
  const bae = new BaeMathematics();
  
  // Create two separate components
  bae.addEntity('a');
  bae.addEntity('b');
  bae.addEntity('c');
  bae.addEntity('d');
  
  bae.connect('a', 'b', 0.5);
  bae.connect('c', 'd', 0.5);
  
  const components = bae.connectedComponents();
  assert(components.length === 2, 'Should find 2 connected components');
  
  console.log('  ✓ Connected components detection');
}

// ============================================================================
// Extended God Generator Tests
// ============================================================================

function testGodGeneratorEntitySimilarity() {
  const generator = new GodGenerator(31337);
  
  const god1 = generator.generateGod({ power: 100 });
  const god2 = generator.generateGod({ power: 110 });
  const god3 = generator.generateGod({ power: 200 });
  
  const sim12 = generator.entitySimilarity(god1.id, god2.id);
  const sim13 = generator.entitySimilarity(god1.id, god3.id);
  
  assert(sim12 > sim13, 'Similar entities should have higher similarity');
  assert(sim12 >= 0 && sim12 <= 1, 'Similarity should be in [0, 1]');
  
  console.log('  ✓ Entity similarity calculation');
}

function testGodGeneratorEvolution() {
  const generator = new GodGenerator(31337);
  
  const god = generator.generateGod({ power: 100 });
  const originalPower = god.power;
  
  generator.evolveEntity(god.id, 0.1);
  
  assert(god.power > originalPower, 'Power should increase after evolution');
  
  console.log('  ✓ Entity evolution');
}

function testGodGeneratorMerge() {
  const generator = new GodGenerator(31337);
  
  const god1 = generator.generateGod({ power: 100, wisdom: 50 });
  const god2 = generator.generateGod({ power: 200, wisdom: 150 });
  
  const merged = generator.mergeEntities(god1.id, god2.id, 0.5);
  
  assert(merged !== null, 'Merge should create new entity');
  assert(merged.type === 'god', 'Merged entity should be a god');
  
  console.log('  ✓ Entity merging');
}

function testGodGeneratorOffspring() {
  const generator = new GodGenerator(31337);
  
  const parent1 = generator.generateGod({ power: 100 });
  const parent2 = generator.generateGod({ power: 150 });
  
  const offspring = generator.generateOffspring(parent1.id, parent2.id);
  
  assert(offspring !== null, 'Offspring should be created');
  assert(offspring.properties.parents.includes(parent1.id), 'Offspring should have parent1');
  assert(offspring.properties.parents.includes(parent2.id), 'Offspring should have parent2');
  
  // Check offspring is connected to parents
  const strength1 = generator.bae.getConnectionStrength(offspring.id, parent1.id);
  const strength2 = generator.bae.getConnectionStrength(offspring.id, parent2.id);
  assert(strength1 > 0, 'Offspring should be connected to parent1');
  assert(strength2 > 0, 'Offspring should be connected to parent2');
  
  console.log('  ✓ Offspring generation');
}

function testGodGeneratorHierarchy() {
  const generator = new GodGenerator(31337);
  
  generator.generateGod({ power: 50 });
  generator.generateGod({ power: 100 });
  generator.generateGod({ power: 75 });
  
  const hierarchy = generator.getEntityHierarchy();
  
  assert(hierarchy.length === 3, 'Hierarchy should contain all entities');
  assert(hierarchy[0].influence >= hierarchy[1].influence, 'Hierarchy should be sorted by influence');
  assert(hierarchy[1].influence >= hierarchy[2].influence, 'Hierarchy should be sorted by influence');
  
  console.log('  ✓ Entity hierarchy');
}

function testGodGeneratorStatistics() {
  const generator = new GodGenerator(31337);
  
  generator.generateGod({ power: 100 });
  generator.generateGod({ power: 200 });
  
  const stats = generator.getStatistics();
  
  assert(stats.count === 2, 'Stats should show correct count');
  assert(stats.avgPower === 150, 'Average power should be correct');
  assert(stats.maxPower === 200, 'Max power should be correct');
  assert(stats.minPower === 100, 'Min power should be correct');
  
  console.log('  ✓ Statistics calculation');
}

// ============================================================================
// Run All Tests
// ============================================================================

function runAllTests() {
  console.log('\n' + '='.repeat(70));
  console.log('YOUNG FIELD TEST SUITE');
  console.log('Based on WHITEPAPER_YOUNG_SITUATION.md Sections 3 and 10');
  console.log('='.repeat(70));

  // Young Situation Tests (Section 3)
  testSection('Young Situation Construction', testYoungSituationConstruction);
  testSection('Young Situation Axiom Y1: Non-emptiness', testYoungSituationAxiomY1);
  testSection('Young Situation Axiom Y2: Completeness', testYoungSituationAxiomY2);
  testSection('Young Situation Axiom Y3: Monotonicity', testYoungSituationAxiomY3);
  testSection('Young Situation Reachability', testYoungSituationReachability);
  testSection('Young Situation Optimal Path', testYoungSituationOptimalPath);
  testSection('Common Young Situation', testCommonYoungSituation);
  testSection('Linear Young Situation', testLinearYoungSituation);
  testSection('Branching Young Situation', testBranchingYoungSituation);
  testSection('Young Area Definition', testYoungAreaDefinition);
  testSection('Example: Young Situation', testYoungSituationExample);
  testSection('Example: Young Area', testYoungAreaExample);

  // Young Ring Tests
  testSection('Young Ring Construction', testYoungRingConstruction);
  testSection('Young Ring Operations', testYoungRingOperations);
  testSection('Young Ring Relational Algebra', testYoungRingRelationalAlgebra);

  // Young Field Basic Tests
  testSection('Young Field Construction', testYoungFieldConstruction);
  testSection('Young Field Inheritance', testYoungFieldInheritance);

  // Young Field Axiom Tests
  testSection('Field Axiom F1: Additive Group', testFieldAxiomF1_AdditiveGroup);
  testSection('Field Axiom F2: Multiplicative Group', testFieldAxiomF2_MultiplicativeGroup);
  testSection('Field Axiom F3: Distributivity', testFieldAxiomF3_Distributivity);
  testSection('Field Axiom F4: Zero Product', testFieldAxiomF4_ZeroProduct);

  // Young Field Operations
  testSection('Young Field Inverse', testYoungFieldInverse);
  testSection('Young Field Division', testYoungFieldDivision);
  testSection('Young Field Normalization', testYoungFieldNormalization);

  // Young Field Examples (Section 10.7)
  testSection('Rational Young Field (ℚ)', testRationalField);
  testSection('Finite Young Field Construction', testFiniteFieldConstruction);
  testSection('Finite Young Field Operations', testFiniteFieldOperations);

  // Applications (Section 10.8)
  testSection('Application: Normalized Valuations', testApplicationNormalizedSituationValuations);
  testSection('Application: Probability Distribution', testApplicationProbabilityDistribution);
  testSection('Application: Rate of Change', testApplicationRateOfChange);

  // Example Functions
  testSection('Example: Normalized Situations', testNormalizedSituationExample);
  testSection('Example: Field Operations', testYoungFieldOperationsExample);
  testSection('Example: Finite Field', testFiniteFieldExampleFunction);

  // Yoshi's Secret Tests
  testSection('YoshisSecret Construction', testYoshisSecretConstruction);
  testSection('YoshisSecret Encoding', testYoshisSecretEncoding);
  testSection('YoshisSecret String Encoding', testYoshisSecretStringEncoding);
  testSection('YoshisSecret Hashing', testYoshisSecretHashing);

  // Extended Yoshi's Secret Tests
  testSection('YoshisSecret Batch Operations', testYoshisSecretBatchOperations);
  testSection('YoshisSecret Authentication', testYoshisSecretAuthentication);
  testSection('YoshisSecret Commitment', testYoshisSecretCommitment);
  testSection('YoshisSecret Random Sequence', testYoshisSecretRandomSequence);

  // Bae Mathematics Tests
  testSection('BaeMathematics Construction', testBaeMathematicsConstruction);
  testSection('BaeMathematics Entities', testBaeMathematicsEntities);
  testSection('BaeMathematics Connections', testBaeMathematicsConnections);
  testSection('BaeMathematics Transitive Connection', testBaeMathematicsTransitiveConnection);
  testSection('BaeMathematics Bae Index', testBaeMathematicsBaeIndex);
  testSection('BaeMathematics Matrix', testBaeMathematicsMatrix);

  // Extended Bae Mathematics Tests
  testSection('BaeMathematics Centrality', testBaeMathematicsCentrality);
  testSection('BaeMathematics Path Finding', testBaeMathematicsPathFinding);
  testSection('BaeMathematics Graph Metrics', testBaeMathematicsGraphMetrics);
  testSection('BaeMathematics Connected Components', testBaeMathematicsConnectedComponents);

  // God Generator Tests
  testSection('GodGenerator Construction', testGodGeneratorConstruction);
  testSection('GodGenerator Create God', testGodGeneratorCreateGod);
  testSection('GodGenerator Decoding', testGodGeneratorDecoding);
  testSection('GodGenerator Connect Entities', testGodGeneratorConnectEntities);
  testSection('GodGenerator Pantheon', testGodGeneratorPantheon);
  testSection('GodGenerator Most Powerful', testGodGeneratorMostPowerful);

  // Extended God Generator Tests
  testSection('GodGenerator Entity Similarity', testGodGeneratorEntitySimilarity);
  testSection('GodGenerator Evolution', testGodGeneratorEvolution);
  testSection('GodGenerator Merge', testGodGeneratorMerge);
  testSection('GodGenerator Offspring', testGodGeneratorOffspring);
  testSection('GodGenerator Hierarchy', testGodGeneratorHierarchy);
  testSection('GodGenerator Statistics', testGodGeneratorStatistics);

  // New Example Functions
  testSection('Example: Yoshi\'s Secret', testYoshisSecretExampleFunction);
  testSection('Example: Bae Mathematics', testBaeMathematicsExampleFunction);
  testSection('Example: God Generator', testGodGeneratorExampleFunction);

  console.log('\n' + '='.repeat(70));
  console.log('ALL TESTS PASSED ✓');
  console.log('='.repeat(70) + '\n');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
