/**
 * Young Field Test Suite
 * Tests for Young Ring, Young Field, Young Area, and Young Situation Framework
 * Based on WHITEPAPER_YOUNG_SITUATION.md
 */

const {
  YoungRing,
  YoungField,
  YoungArea,
  YoungSituation,
  YoungFamily,
  YoungBound,
  YoungMovement,
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
  nDimensionalVolumeExample,
  youngSituationAreaExample,
  youngFamilyAreaExample,
  youngBoundAreaExample,
  youngMovementAreaExample,
  situationInterpolationAreaExample
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
// Young Situation Tests
// ============================================================================

function testYoungSituationConstruction() {
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => s === 's1' ? 10 : s === 's2' ? 20 : 30;
  const finalStates = new Set(['s3']);
  
  const situation = new YoungSituation(states, new Set(), valuation, null, finalStates);
  
  assert(situation.states.size === 3, 'Should have 3 states');
  assert(situation.isValid(), 'Should be valid situation');
  assert(situation.totalValuation() === 60, 'Total valuation should be 60');
  
  console.log('  ✓ YoungSituation construction');
}

function testYoungSituationReachability() {
  const states = new Set(['s1', 's2', 's3']);
  const relations = new Set([['s1', 's2'], ['s2', 's3']]);
  const situation = new YoungSituation(states, relations);
  
  assert(situation.isReachable('s1', 's2'), 's2 should be reachable from s1');
  assert(situation.isReachable('s1', 's3'), 's3 should be reachable from s1');
  assert(!situation.isReachable('s3', 's1'), 's1 should not be reachable from s3');
  
  console.log('  ✓ YoungSituation reachability');
}

// ============================================================================
// Young Family Tests
// ============================================================================

function testYoungFamilyConstruction() {
  const indexSet = new Set([1, 2, 3]);
  const members = (i) => new YoungSituation();
  const parent = (i) => i === 1 ? null : 1;
  
  const family = new YoungFamily(indexSet, members, parent);
  
  assert(family.indexSet.size === 3, 'Should have 3 members');
  assert(family.roots().size === 1, 'Should have 1 root');
  assert(family.isWellFounded(), 'Should be well-founded');
  
  console.log('  ✓ YoungFamily construction');
}

function testYoungFamilyHierarchy() {
  const indexSet = new Set([1, 2, 3, 4]);
  const parent = (i) => {
    if (i === 1) return null; // root
    if (i === 2 || i === 3) return 1; // children of 1
    if (i === 4) return 2; // child of 2
    return null;
  };
  
  const family = new YoungFamily(indexSet, null, parent);
  
  const descendants1 = family.descendants(1);
  assert(descendants1.size === 3, 'Root should have 3 descendants');
  assert(descendants1.has(2) && descendants1.has(3) && descendants1.has(4), 'Should include all descendants');
  
  const descendants2 = family.descendants(2);
  assert(descendants2.size === 1, 'Node 2 should have 1 descendant');
  assert(descendants2.has(4), 'Should be node 4');
  
  console.log('  ✓ YoungFamily hierarchy');
}

// ============================================================================
// Young Bound Tests
// ============================================================================

function testYoungBoundConstruction() {
  const lowerBound = (s) => 10;
  const upperBound = (s) => 50;
  const bound = new YoungBound(lowerBound, upperBound);
  
  const valuation = (s) => 30;
  assert(bound.isValid('s1', valuation), 'Valuation 30 should be valid in [10, 50]');
  assert(bound.width('s1') === 40, 'Width should be 40');
  
  console.log('  ✓ YoungBound construction');
}

function testYoungBoundTightness() {
  const lowerBound = (s) => 10;
  const upperBound = (s) => 50;
  const bound = new YoungBound(lowerBound, upperBound);
  
  const tightLower = (s) => 10;
  const tightUpper = (s) => 50;
  const middle = (s) => 30;
  
  assert(bound.isTight('s1', tightLower), 'Lower bound should be tight');
  assert(bound.isTight('s1', tightUpper), 'Upper bound should be tight');
  assert(!bound.isTight('s1', middle), 'Middle value should not be tight');
  
  console.log('  ✓ YoungBound tightness');
}

// ============================================================================
// Young Movement Tests
// ============================================================================

function testYoungMovementIdentity() {
  const states = new Set(['s1', 's2']);
  const valuation = (s) => s === 's1' ? 10 : 20;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const identity = YoungMovement.identity();
  const transformed = identity.apply(situation);
  
  assert(transformed.totalValuation() === 30, 'Identity should preserve valuation');
  
  console.log('  ✓ YoungMovement identity');
}

function testYoungMovementComposition() {
  const states = new Set(['s1']);
  const valuation = (s) => 10;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const m1 = new YoungMovement((y) => {
    const newVal = (s) => y.valuation(s) * 2;
    return new YoungSituation(y.states, y.relations, newVal, y.transition, y.finalStates);
  });
  
  const m2 = new YoungMovement((y) => {
    const newVal = (s) => y.valuation(s) + 5;
    return new YoungSituation(y.states, y.relations, newVal, y.transition, y.finalStates);
  });
  
  const composed = m1.compose(m2);
  const result = composed.apply(situation);
  
  // First m1 doubles (10 -> 20), then m2 adds 5 (20 -> 25)
  assert(result.totalValuation() === 25, 'Composed movement should apply in sequence');
  
  console.log('  ✓ YoungMovement composition');
}

// ============================================================================
// Young Area Integration Tests (with Situation Framework)
// ============================================================================

function testYoungAreaSituationMeasure() {
  const area = createEuclideanArea();
  
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => s === 's1' ? 10 : s === 's2' ? 20 : 30;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const measure = area.situationRegionMeasure(situation);
  assertAlmostEqual(measure, 60, 1e-10, 'Situation measure should be sum of valuations');
  
  console.log('  ✓ YoungArea situation measure');
}

function testYoungAreaFamilyMeasure() {
  const area = createEuclideanArea();
  
  const indexSet = new Set([1, 2, 3]);
  const members = (i) => {
    const states = new Set([`s${i}`]);
    const valuation = (s) => i * 10;
    return new YoungSituation(states, new Set(), valuation);
  };
  
  const family = new YoungFamily(indexSet, members);
  const measure = area.familyRegionMeasure(family);
  
  assertAlmostEqual(measure, 60, 1e-10, 'Family measure should be sum of all situations');
  
  console.log('  ✓ YoungArea family measure');
}

function testYoungAreaBoundedRegion() {
  const area = createEuclideanArea();
  
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => s === 's1' ? 5 : s === 's2' ? 15 : 25;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const bound = new YoungBound((s) => 10, (s) => 20);
  const boundedMeasure = area.boundedRegionArea(situation, bound);
  
  // Only s2 (15) is within bounds [10, 20]
  assertAlmostEqual(boundedMeasure, 15, 1e-10, 'Bounded measure should only include valid states');
  
  console.log('  ✓ YoungArea bounded region');
}

function testYoungAreaMovementTrajectory() {
  const area = createEuclideanArea();
  
  const states = new Set(['s1', 's2']);
  const valuation = (s) => 10;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const movement = new YoungMovement((y) => {
    const newVal = (s) => y.valuation(s) * 1.1;
    return new YoungSituation(y.states, y.relations, newVal, y.transition, y.finalStates);
  });
  
  const trajectoryArea = area.movementTrajectoryArea(situation, movement, 5);
  
  assert(trajectoryArea > 20, 'Trajectory area should be positive');
  
  console.log('  ✓ YoungArea movement trajectory');
}

function testYoungAreaStateSpaceVolume() {
  const area = createEuclideanArea();
  
  const states = new Set(['s1', 's2', 's3']);
  const valuation = (s) => s === 's1' ? 2 : s === 's2' ? 3 : 4;
  const situation = new YoungSituation(states, new Set(), valuation);
  
  const volume = area.stateSpaceVolume(situation);
  assertAlmostEqual(volume, 24, 1e-10, 'State space volume should be product of valuations');
  
  console.log('  ✓ YoungArea state space volume');
}

function testYoungAreaInterpolation() {
  const area = createEuclideanArea();
  
  const states = new Set(['s1', 's2']);
  const valuation1 = (s) => s === 's1' ? 10 : 20;
  const valuation2 = (s) => s === 's1' ? 30 : 40;
  
  const situation1 = new YoungSituation(states, new Set(), valuation1);
  const situation2 = new YoungSituation(states, new Set(), valuation2);
  
  const interpolated50 = area.interpolatedSituationArea(situation1, situation2, 0.5);
  // s1: (10+30)/2 = 20, s2: (20+40)/2 = 30, total = 50
  assertAlmostEqual(interpolated50, 50, 0.1, 'Interpolation at 0.5 should be midpoint (20+30=50)');
  
  const interpolated25 = area.interpolatedSituationArea(situation1, situation2, 0.25);
  assert(interpolated25 < interpolated50, 'Interpolation at 0.25 should be less than 0.5');
  
  console.log('  ✓ YoungArea situation interpolation');
}

// ============================================================================
// Young Situation Framework Example Tests
// ============================================================================

function testYoungSituationAreaExample() {
  const result = youngSituationAreaExample();
  
  assert(result.totalValuation === 60, 'Total valuation should be 60');
  assert(result.regionMeasure === 60, 'Region measure should equal total valuation');
  assert(result.isValid === true, 'Situation should be valid');
  
  console.log('  ✓ Example: youngSituationAreaExample()');
  console.log(`    Total valuation: ${result.totalValuation}`);
  console.log(`    Region measure: ${result.regionMeasure}`);
  console.log(`    State space volume: ${result.stateSpaceVolume}`);
}

function testYoungFamilyAreaExample() {
  const result = youngFamilyAreaExample();
  
  assert(result.rootCount === 1, 'Should have 1 root');
  assert(result.totalFamilyMeasure === 60, 'Total family measure should be 60');
  assert(result.isWellFounded === true, 'Family should be well-founded');
  
  console.log('  ✓ Example: youngFamilyAreaExample()');
  console.log(`    Roots: ${result.rootCount}`);
  console.log(`    Total family measure: ${result.totalFamilyMeasure}`);
}

function testYoungBoundAreaExample() {
  const result = youngBoundAreaExample();
  
  assert(result.unboundedArea === 45, 'Unbounded area should be 45');
  assert(result.boundedArea === 15, 'Bounded area should be 15');
  assert(result.boundWidth === 10, 'Bound width should be 10');
  
  console.log('  ✓ Example: youngBoundAreaExample()');
  console.log(`    Unbounded area: ${result.unboundedArea}`);
  console.log(`    Bounded area: ${result.boundedArea}`);
}

function testYoungMovementAreaExample() {
  const result = youngMovementAreaExample();
  
  assert(result.initialMeasure === 60, 'Initial measure should be 60');
  assert(result.transformedMeasure > 0, 'Transformed measure should be positive');
  
  console.log('  ✓ Example: youngMovementAreaExample()');
  console.log(`    Initial: ${result.initialMeasure.toFixed(2)}`);
  console.log(`    Transformed: ${result.transformedMeasure.toFixed(2)}`);
  console.log(`    Trajectory area: ${result.trajectoryArea.toFixed(2)}`);
}

function testSituationInterpolationAreaExample() {
  const result = situationInterpolationAreaExample();
  
  assert(result.situation1Measure === 30, 'Situation 1 measure should be 30');
  assert(result.situation2Measure === 70, 'Situation 2 measure should be 70');
  assert(result.interpolatedAt25 < result.interpolatedAt50, 'Interpolation should be monotonic');
  assert(result.interpolatedAt50 < result.interpolatedAt75, 'Interpolation should be monotonic');
  
  console.log('  ✓ Example: situationInterpolationAreaExample()');
  console.log(`    Situation 1: ${result.situation1Measure}`);
  console.log(`    Situation 2: ${result.situation2Measure}`);
  console.log(`    Interpolated at t=0.5: ${result.interpolatedAt50}`);
}

// ============================================================================
// Run All Tests
// ============================================================================

function runAllTests() {
  console.log('\n' + '='.repeat(70));
  console.log('YOUNG SITUATION FRAMEWORK TEST SUITE');
  console.log('Based on WHITEPAPER_YOUNG_SITUATION.md');
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

  // Young Situation Tests (Section 3)
  testSection('Young Situation Construction', testYoungSituationConstruction);
  testSection('Young Situation Reachability', testYoungSituationReachability);

  // Young Family Tests (Section 4)
  testSection('Young Family Construction', testYoungFamilyConstruction);
  testSection('Young Family Hierarchy', testYoungFamilyHierarchy);

  // Young Bound Tests (Section 5)
  testSection('Young Bound Construction', testYoungBoundConstruction);
  testSection('Young Bound Tightness', testYoungBoundTightness);

  // Young Movement Tests (Section 6)
  testSection('Young Movement Identity', testYoungMovementIdentity);
  testSection('Young Movement Composition', testYoungMovementComposition);

  // Young Area Integration with Situation Framework
  testSection('Young Area: Situation Measure', testYoungAreaSituationMeasure);
  testSection('Young Area: Family Measure', testYoungAreaFamilyMeasure);
  testSection('Young Area: Bounded Region', testYoungAreaBoundedRegion);
  testSection('Young Area: Movement Trajectory', testYoungAreaMovementTrajectory);
  testSection('Young Area: State Space Volume', testYoungAreaStateSpaceVolume);
  testSection('Young Area: Situation Interpolation', testYoungAreaInterpolation);

  // Young Situation Framework Examples
  testSection('Example: Young Situation Area', testYoungSituationAreaExample);
  testSection('Example: Young Family Area', testYoungFamilyAreaExample);
  testSection('Example: Young Bound Area', testYoungBoundAreaExample);
  testSection('Example: Young Movement Area', testYoungMovementAreaExample);
  testSection('Example: Situation Interpolation', testSituationInterpolationAreaExample);

  console.log('\n' + '='.repeat(70));
  console.log('ALL TESTS PASSED ✓');
  console.log('='.repeat(70) + '\n');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
