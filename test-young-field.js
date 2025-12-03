/**
 * Young Field Test Suite
 * Tests for Young Ring, Young Field, and Young Area implementations
 * Based on WHITEPAPER_YOUNG_SITUATION.md Section 10
 */

const {
  YoungRing,
  YoungField,
  YoungArea,
  createRationalField,
  createFiniteField,
  createSituationValuationField,
  createEuclideanArea,
  createSituationAreaField,
  normalizedSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample,
  geometricAreasExample,
  integrationExample,
  volumeOfRevolutionExample,
  nDimensionalVolumeExample
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
// Young Area Tests - Basic Construction
// ============================================================================

function testYoungAreaConstruction() {
  const area = new YoungArea([0, 1, 2, 3, 4]);
  
  assert(area.elements.has(0), 'Area should contain 0');
  assert(area.elements.has(1), 'Area should contain 1');
  assert(area.zero === 0, 'Zero element should be 0');
  assert(area.one === 1, 'One element should be 1');
  
  console.log('  ✓ YoungArea construction');
}

function testYoungAreaInheritance() {
  const area = createEuclideanArea();
  
  // Test that area inherits field operations
  assert(area.add(2, 3) === 5, 'Area should inherit addition');
  assert(area.multiply(2, 3) === 6, 'Area should inherit multiplication');
  assert(area.divide(6, 2) === 3, 'Area should inherit division');
  
  // Test that area has additional operations
  assert(typeof area.measure === 'function', 'Area should have measure method');
  assert(typeof area.integrate === 'function', 'Area should have integrate method');
  assert(typeof area.rectangleArea === 'function', 'Area should have rectangleArea method');
  
  console.log('  ✓ YoungArea inherits from YoungField');
}

// ============================================================================
// Young Area Tests - Measure Operations
// ============================================================================

function testYoungAreaMeasure() {
  const area = createEuclideanArea();
  
  // Test 1D measure (length)
  assertAlmostEqual(area.measure(5), 5, 1e-10, 'Measure of interval [0,5]');
  assertAlmostEqual(area.measure(-3), 3, 1e-10, 'Measure handles negative values');
  
  // Test 2D measure (area)
  assertAlmostEqual(area.measure([3, 4]), 12, 1e-10, 'Measure of 3×4 rectangle');
  assertAlmostEqual(area.measure([2.5, 3.5]), 8.75, 1e-10, 'Measure of 2.5×3.5 rectangle');
  
  // Test circle measure
  const circleRegion = { type: 'circle', radius: 2 };
  assertAlmostEqual(area.measure(circleRegion), Math.PI * 4, 1e-10, 'Measure of circle with r=2');
  
  // Test interval measure
  const intervalRegion = { type: 'interval', start: 1, end: 5 };
  assertAlmostEqual(area.measure(intervalRegion), 4, 1e-10, 'Measure of interval [1,5]');
  
  console.log('  ✓ YoungArea measure operations');
}

function testYoungAreaGeometricShapes() {
  const area = createEuclideanArea();
  
  // Rectangle
  assertAlmostEqual(area.rectangleArea(5, 3), 15, 1e-10, 'Rectangle area 5×3 = 15');
  assertAlmostEqual(area.rectangleArea(2.5, 4), 10, 1e-10, 'Rectangle area 2.5×4 = 10');
  
  // Circle
  assertAlmostEqual(area.circleArea(1), Math.PI, 1e-10, 'Circle area πr² with r=1');
  assertAlmostEqual(area.circleArea(2), Math.PI * 4, 1e-10, 'Circle area πr² with r=2');
  
  // Triangle
  assertAlmostEqual(area.triangleArea(6, 4), 12, 1e-10, 'Triangle area (6×4)/2 = 12');
  assertAlmostEqual(area.triangleArea(5, 8), 20, 1e-10, 'Triangle area (5×8)/2 = 20');
  
  // Ellipse
  assertAlmostEqual(area.ellipseArea(3, 2), Math.PI * 6, 1e-10, 'Ellipse area π×3×2');
  assertAlmostEqual(area.ellipseArea(1, 1), Math.PI, 1e-10, 'Ellipse (circle) area π×1×1');
  
  console.log('  ✓ YoungArea geometric shape areas');
}

// ============================================================================
// Young Area Tests - Integration
// ============================================================================

function testYoungAreaIntegration() {
  const area = createEuclideanArea();
  
  // Test constant function: ∫₀² 3 dx = 3×2 = 6
  const constant = area.integrate((x) => 3, 0, 2);
  assertAlmostEqual(constant, 6, 0.01, 'Integral of constant 3 from 0 to 2');
  
  // Test linear function: ∫₀⁴ x dx = [x²/2]₀⁴ = 8
  const linear = area.integrate((x) => x, 0, 4);
  assertAlmostEqual(linear, 8, 0.01, 'Integral of x from 0 to 4');
  
  // Test quadratic: ∫₀² x² dx = [x³/3]₀² = 8/3 ≈ 2.667
  const quadratic = area.integrate((x) => x * x, 0, 2);
  assertAlmostEqual(quadratic, 8/3, 0.01, 'Integral of x² from 0 to 2');
  
  // Test sine: ∫₀ᵖⁱ sin(x) dx = 2
  const sine = area.integrate((x) => Math.sin(x), 0, Math.PI);
  assertAlmostEqual(sine, 2, 0.01, 'Integral of sin(x) from 0 to π');
  
  console.log('  ✓ YoungArea integration operations');
}

function testYoungAreaUnderCurve() {
  const area = createEuclideanArea();
  
  // Area under f(x) = 2 from 0 to 5
  const constant = area.areaUnderCurve((x) => 2, 0, 5);
  assertAlmostEqual(constant, 10, 0.01, 'Area under constant function');
  
  // Area under f(x) = x from 0 to 4 (triangle)
  const triangle = area.areaUnderCurve((x) => x, 0, 4);
  assertAlmostEqual(triangle, 8, 0.01, 'Area under linear function (triangle)');
  
  // Area under parabola
  const parabola = area.areaUnderCurve((x) => x * x, 0, 3);
  assertAlmostEqual(parabola, 9, 0.1, 'Area under parabola x²');
  
  console.log('  ✓ YoungArea areaUnderCurve');
}

function testYoungAreaVolumeOfRevolution() {
  const area = createEuclideanArea();
  
  // Rotate f(x) = r (constant) around x-axis from 0 to h
  // Creates cylinder: V = πr²h
  const r = 2, h = 5;
  const cylinder = area.volumeOfRevolution((x) => r, 0, h);
  assertAlmostEqual(cylinder, Math.PI * r * r * h, 0.1, 'Volume of cylinder');
  
  // Rotate f(x) = x around x-axis from 0 to r
  // Creates cone: V = πr³/3
  const r2 = 3;
  const cone = area.volumeOfRevolution((x) => x, 0, r2);
  assertAlmostEqual(cone, Math.PI * r2 * r2 * r2 / 3, 0.1, 'Volume of cone');
  
  console.log('  ✓ YoungArea volumeOfRevolution');
}

function testYoungAreaNDimensional() {
  const area = createEuclideanArea();
  
  // 1D: line segment
  assertAlmostEqual(area.volumeNDimensional([5]), 5, 1e-10, '1D volume (length)');
  
  // 2D: rectangle
  assertAlmostEqual(area.volumeNDimensional([3, 4]), 12, 1e-10, '2D volume (area)');
  
  // 3D: box
  assertAlmostEqual(area.volumeNDimensional([2, 3, 4]), 24, 1e-10, '3D volume');
  
  // 4D: hypercube
  assertAlmostEqual(area.volumeNDimensional([2, 2, 2, 2]), 16, 1e-10, '4D volume');
  
  // Empty dimensions (0-dimensional point) should return 1 (empty product convention)
  assertAlmostEqual(area.volumeNDimensional([]), 1, 1e-10, 'Empty dimensions = 1 (empty product)');
  
  console.log('  ✓ YoungArea N-dimensional volumes');
}

// ============================================================================
// Young Area Tests - Validation
// ============================================================================

function testYoungAreaValidation() {
  const area = createEuclideanArea();
  
  // Check that it's a valid area (and valid field)
  assert(area.isValidArea(), 'Euclidean area should be valid');
  assert(area.isValidField(), 'Euclidean area should also be a valid field');
  
  // Test field axioms still hold
  const a = 5, b = 3;
  assertAlmostEqual(area.add(a, b), area.add(b, a), 1e-10, 'Addition commutative');
  assertAlmostEqual(area.multiply(a, b), area.multiply(b, a), 1e-10, 'Multiplication commutative');
  
  const inv = area.inverse(a);
  assertAlmostEqual(area.multiply(a, inv), 1, 1e-10, 'Multiplicative inverse');
  
  console.log('  ✓ YoungArea validation');
}

// ============================================================================
// Young Area Tests - Factory Functions
// ============================================================================

function testEuclideanAreaFactory() {
  const area = createEuclideanArea();
  
  assert(area instanceof YoungArea, 'Should create YoungArea instance');
  assert(area.isValidArea(), 'Should be valid area');
  
  // Test basic operations work
  assertAlmostEqual(area.rectangleArea(2, 3), 6, 1e-10, 'Rectangle area');
  assertAlmostEqual(area.circleArea(1), Math.PI, 1e-10, 'Circle area');
  
  console.log('  ✓ createEuclideanArea factory');
}

function testSituationAreaFieldFactory() {
  const area = createSituationAreaField();
  
  assert(area instanceof YoungArea, 'Should create YoungArea instance');
  assert(area.isValidArea(), 'Should be valid area');
  
  console.log('  ✓ createSituationAreaField factory');
}

// ============================================================================
// Young Area Tests - Examples
// ============================================================================

function testGeometricAreasExample() {
  const result = geometricAreasExample();
  
  assertAlmostEqual(result.rectangle, 15, 1e-10, 'Rectangle example');
  assertAlmostEqual(result.circle, Math.PI * 4, 0.001, 'Circle example');
  assertAlmostEqual(result.triangle, 12, 1e-10, 'Triangle example');
  assertAlmostEqual(result.ellipse, Math.PI * 6, 0.001, 'Ellipse example');
  
  console.log('  ✓ Example: geometricAreasExample()');
  console.log(`    Rectangle (5×3): ${result.rectangle}`);
  console.log(`    Circle (r=2): ${result.circle.toFixed(3)}`);
  console.log(`    Triangle (b=6,h=4): ${result.triangle}`);
  console.log(`    Ellipse (a=3,b=2): ${result.ellipse.toFixed(3)}`);
}

function testIntegrationExample() {
  const result = integrationExample();
  
  assertAlmostEqual(result.quadratic, 8/3, 0.01, 'Quadratic integral');
  assertAlmostEqual(result.sine, 2, 0.01, 'Sine integral');
  assertAlmostEqual(result.linear, 8, 0.01, 'Linear integral');
  
  console.log('  ✓ Example: integrationExample()');
  console.log(`    ∫₀² x² dx: ${result.quadratic}`);
  console.log(`    ∫₀ᵖⁱ sin(x) dx: ${result.sine}`);
  console.log(`    Area under f(x)=x: ${result.linear}`);
}

function testVolumeOfRevolutionExample() {
  const result = volumeOfRevolutionExample();
  
  assertAlmostEqual(result.cone, Math.PI * 8 / 3, 0.1, 'Cone volume');
  assertAlmostEqual(result.sphere, 4 * Math.PI / 3, 0.1, 'Sphere volume');
  
  console.log('  ✓ Example: volumeOfRevolutionExample()');
  console.log(`    Cone volume: ${result.cone}`);
  console.log(`    Sphere volume: ${result.sphere}`);
}

function testNDimensionalVolumeExample() {
  const result = nDimensionalVolumeExample();
  
  assert(result.line === 5, 'Line length');
  assert(result.rectangle === 12, 'Rectangle area');
  assert(result.box === 24, 'Box volume');
  assert(result.hypercube === 16, 'Hypercube 4D volume');
  
  console.log('  ✓ Example: nDimensionalVolumeExample()');
  console.log(`    1D (line): ${result.line}`);
  console.log(`    2D (rectangle): ${result.rectangle}`);
  console.log(`    3D (box): ${result.box}`);
  console.log(`    4D (hypercube): ${result.hypercube}`);
}

// ============================================================================
// Run All Tests
// ============================================================================

function runAllTests() {
  console.log('\n' + '='.repeat(70));
  console.log('YOUNG FIELD & YOUNG AREA TEST SUITE');
  console.log('Based on WHITEPAPER_YOUNG_SITUATION.md Section 10');
  console.log('='.repeat(70));

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

  // Young Area Tests
  testSection('Young Area Construction', testYoungAreaConstruction);
  testSection('Young Area Inheritance', testYoungAreaInheritance);
  testSection('Young Area Measure', testYoungAreaMeasure);
  testSection('Young Area Geometric Shapes', testYoungAreaGeometricShapes);
  testSection('Young Area Integration', testYoungAreaIntegration);
  testSection('Young Area Under Curve', testYoungAreaUnderCurve);
  testSection('Young Area Volume of Revolution', testYoungAreaVolumeOfRevolution);
  testSection('Young Area N-Dimensional', testYoungAreaNDimensional);
  testSection('Young Area Validation', testYoungAreaValidation);

  // Young Area Factory Functions
  testSection('Euclidean Area Factory', testEuclideanAreaFactory);
  testSection('Situation Area Field Factory', testSituationAreaFieldFactory);

  // Young Area Examples
  testSection('Example: Geometric Areas', testGeometricAreasExample);
  testSection('Example: Integration', testIntegrationExample);
  testSection('Example: Volume of Revolution', testVolumeOfRevolutionExample);
  testSection('Example: N-Dimensional Volume', testNDimensionalVolumeExample);

  console.log('\n' + '='.repeat(70));
  console.log('ALL TESTS PASSED ✓');
  console.log('='.repeat(70) + '\n');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
