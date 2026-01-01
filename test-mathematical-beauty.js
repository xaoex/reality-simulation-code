/**
 * Mathematical Beauty Tests
 * 
 * Tests for mathematical beauty series, sequences, and 4-part situation
 */

const assert = require('assert');
const {
  MathematicalBeauty,
  FourPartSituation,
  createBeautySituation,
  fourPartSituationExample,
  mathematicalBeautyExample,
  beautySituationExample
} = require('./index');

function testSection(name, testFn) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Testing: ${name}`);
  console.log('='.repeat(70));
  try {
    testFn();
    console.log(`✓ ${name} - PASSED`);
  } catch (error) {
    console.error(`✗ ${name} - FAILED`);
    console.error(error);
    throw error;
  }
}

// ============================================================================
// Mathematical Beauty Series Tests
// ============================================================================

function testFibonacciSequence() {
  const beauty = new MathematicalBeauty();
  
  // Test known Fibonacci values
  assert.strictEqual(beauty.fibonacci(0), 0, 'F(0) should be 0');
  assert.strictEqual(beauty.fibonacci(1), 1, 'F(1) should be 1');
  assert.strictEqual(beauty.fibonacci(2), 1, 'F(2) should be 1');
  assert.strictEqual(beauty.fibonacci(3), 2, 'F(3) should be 2');
  assert.strictEqual(beauty.fibonacci(4), 3, 'F(4) should be 3');
  assert.strictEqual(beauty.fibonacci(5), 5, 'F(5) should be 5');
  assert.strictEqual(beauty.fibonacci(10), 55, 'F(10) should be 55');
  assert.strictEqual(beauty.fibonacci(15), 610, 'F(15) should be 610');
  
  console.log('  ✓ Fibonacci sequence generation');
}

function testLucasNumbers() {
  const beauty = new MathematicalBeauty();
  
  // Test known Lucas values
  assert.strictEqual(beauty.lucas(0), 2, 'L(0) should be 2');
  assert.strictEqual(beauty.lucas(1), 1, 'L(1) should be 1');
  assert.strictEqual(beauty.lucas(2), 3, 'L(2) should be 3');
  assert.strictEqual(beauty.lucas(3), 4, 'L(3) should be 4');
  assert.strictEqual(beauty.lucas(4), 7, 'L(4) should be 7');
  assert.strictEqual(beauty.lucas(5), 11, 'L(5) should be 11');
  assert.strictEqual(beauty.lucas(10), 123, 'L(10) should be 123');
  
  console.log('  ✓ Lucas numbers generation');
}

function testTribonacciSequence() {
  const beauty = new MathematicalBeauty();
  
  // Test known Tribonacci values
  assert.strictEqual(beauty.tribonacci(0), 0, 'T(0) should be 0');
  assert.strictEqual(beauty.tribonacci(1), 0, 'T(1) should be 0');
  assert.strictEqual(beauty.tribonacci(2), 1, 'T(2) should be 1');
  assert.strictEqual(beauty.tribonacci(3), 1, 'T(3) should be 1');
  assert.strictEqual(beauty.tribonacci(4), 2, 'T(4) should be 2');
  assert.strictEqual(beauty.tribonacci(5), 4, 'T(5) should be 4');
  assert.strictEqual(beauty.tribonacci(10), 81, 'T(10) should be 81');
  
  console.log('  ✓ Tribonacci sequence generation');
}

function testPadovanSequence() {
  const beauty = new MathematicalBeauty();
  
  // Test known Padovan values
  assert.strictEqual(beauty.padovan(0), 1, 'P(0) should be 1');
  assert.strictEqual(beauty.padovan(1), 1, 'P(1) should be 1');
  assert.strictEqual(beauty.padovan(2), 1, 'P(2) should be 1');
  assert.strictEqual(beauty.padovan(3), 2, 'P(3) should be 2');
  assert.strictEqual(beauty.padovan(4), 2, 'P(4) should be 2');
  assert.strictEqual(beauty.padovan(5), 3, 'P(5) should be 3');
  assert.strictEqual(beauty.padovan(10), 12, 'P(10) should be 12');
  
  console.log('  ✓ Padovan sequence generation');
}

function testGoldenRatio() {
  const beauty = new MathematicalBeauty();
  
  const phi = beauty.goldenRatio(20);
  const expectedPhi = (1 + Math.sqrt(5)) / 2;
  
  // Should be close to the golden ratio
  assert(Math.abs(phi - expectedPhi) < 0.001, 'Golden ratio should converge to φ');
  assert(phi > 1.618 && phi < 1.619, 'Golden ratio should be approximately 1.618');
  
  console.log(`  ✓ Golden ratio calculation: ${phi.toFixed(6)}`);
}

// ============================================================================
// Four-Part Situation Tests
// ============================================================================

function testFourPartSituationBasic() {
  const situation = new FourPartSituation('fibonacci', 5);
  
  // At index 5, Fibonacci sequence is: ..., 2, 3, 5, 8, ...
  assert.strictEqual(situation.prepre(), 2, 'prepre should be F(3) = 2');
  assert.strictEqual(situation.pre(), 3, 'pre should be F(4) = 3');
  assert.strictEqual(situation.current(), 5, 'current should be F(5) = 5');
  assert.strictEqual(situation.post(), 8, 'post should be F(6) = 8');
  
  console.log('  ✓ Four-part situation (prepre, pre, current, post)');
}

function testFourPartSituationNavigation() {
  const situation = new FourPartSituation('fibonacci', 5);
  
  // Advance to next state
  situation.advance();
  assert.strictEqual(situation.current(), 8, 'After advance, current should be 8');
  
  // Rewind to previous state
  situation.rewind();
  assert.strictEqual(situation.current(), 5, 'After rewind, current should be 5');
  
  // Reset to a specific index
  situation.reset(10);
  assert.strictEqual(situation.current(), 55, 'After reset to 10, current should be 55');
  
  console.log('  ✓ Four-part situation navigation (advance, rewind, reset)');
}

function testFourPartSituationLore() {
  const situation = new FourPartSituation('fibonacci', 5);
  
  // Generate some data to build lore
  situation.current();
  situation.advance();
  situation.advance();
  
  const lore = situation.lore();
  assert(lore !== null, 'Lore should exist');
  assert(lore.totalGenerations > 0, 'Lore should track generations');
  
  console.log('  ✓ Four-part situation lore accumulation');
}

function testFourPartSituationLucas() {
  const situation = new FourPartSituation('lucas', 7);
  
  // At index 7, Lucas sequence is: ..., 11, 18, 29, 47, ...
  assert.strictEqual(situation.prepre(), 11, 'prepre should be L(5) = 11');
  assert.strictEqual(situation.pre(), 18, 'pre should be L(6) = 18');
  assert.strictEqual(situation.current(), 29, 'current should be L(7) = 29');
  assert.strictEqual(situation.post(), 47, 'post should be L(8) = 47');
  
  console.log('  ✓ Four-part situation with Lucas numbers');
}

// ============================================================================
// Young Situation Integration Tests
// ============================================================================

function testBeautySituation() {
  const situation = createBeautySituation('fibonacci', 8);
  
  // Should have correct number of states
  assert.strictEqual(situation.S.size, 9, 'Should have 9 states (n0 to n8)');
  
  // Should have final state
  assert(situation.isFinal('n8'), 'n8 should be final state');
  assert(!situation.isFinal('n0'), 'n0 should not be final state');
  
  // Should have correct valuations
  assert.strictEqual(situation.valuation('n0'), 0, 'n0 should have valuation 0');
  assert.strictEqual(situation.valuation('n5'), 5, 'n5 should have valuation 5');
  assert.strictEqual(situation.valuation('n8'), 21, 'n8 should have valuation 21');
  
  console.log('  ✓ Young Situation for mathematical beauty');
}

function testBeautySituationOptimalPath() {
  const situation = createBeautySituation('fibonacci', 8);
  
  const path = situation.findOptimalPath('n0');
  
  assert(Array.isArray(path), 'Path should be an array');
  assert.strictEqual(path.length, 9, 'Path should have 9 steps');
  assert.strictEqual(path[0], 'n0', 'Path should start at n0');
  assert.strictEqual(path[8], 'n8', 'Path should end at n8');
  
  console.log('  ✓ Optimal path finding in beauty situation');
}

// ============================================================================
// Example Function Tests
// ============================================================================

function testFourPartSituationExample() {
  const result = fourPartSituationExample();
  
  assert(result.initialState, 'Should have initialState');
  assert(result.afterAdvance1, 'Should have afterAdvance1');
  assert(result.afterAdvance2, 'Should have afterAdvance2');
  assert(result.afterRewind, 'Should have afterRewind');
  assert.strictEqual(result.sequenceType, 'fibonacci', 'Should use fibonacci');
  
  // Verify states have all parts
  assert(result.initialState.prepre !== undefined, 'Should have prepre');
  assert(result.initialState.pre !== undefined, 'Should have pre');
  assert(result.initialState.current !== undefined, 'Should have current');
  assert(result.initialState.post !== undefined, 'Should have post');
  
  console.log('  ✓ fourPartSituationExample()');
}

function testMathematicalBeautyExample() {
  const result = mathematicalBeautyExample();
  
  assert(Array.isArray(result.fibonacci), 'Should have fibonacci array');
  assert(Array.isArray(result.lucas), 'Should have lucas array');
  assert(Array.isArray(result.tribonacci), 'Should have tribonacci array');
  assert(Array.isArray(result.padovan), 'Should have padovan array');
  assert(typeof result.goldenRatio === 'number', 'Should have goldenRatio');
  
  // Verify sequence lengths
  assert.strictEqual(result.fibonacci.length, 11, 'Fibonacci should have 11 values');
  assert.strictEqual(result.lucas.length, 11, 'Lucas should have 11 values');
  
  console.log('  ✓ mathematicalBeautyExample()');
  console.log(`    Golden ratio: ${result.goldenRatio.toFixed(6)}`);
}

function testBeautySituationExample() {
  const result = beautySituationExample();
  
  assert.strictEqual(result.sequenceType, 'fibonacci', 'Should use fibonacci');
  assert(Array.isArray(result.path), 'Should have path');
  assert(Array.isArray(result.valuations), 'Should have valuations');
  assert.strictEqual(result.pathLength, 9, 'Path should have length 9');
  
  // Verify valuations
  assert.strictEqual(result.valuations[0].value, 0, 'First value should be 0');
  assert.strictEqual(result.valuations[8].value, 21, 'Last value should be 21');
  
  console.log('  ✓ beautySituationExample()');
  console.log(`    Path: ${result.path.join(' -> ')}`);
}

// ============================================================================
// Run All Tests
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('MATHEMATICAL BEAUTY TEST SUITE');
console.log('Four-Part Situation: pre, post, current, lore, prepre');
console.log('='.repeat(70));

// Mathematical Beauty Series
testSection('Fibonacci Sequence', testFibonacciSequence);
testSection('Lucas Numbers', testLucasNumbers);
testSection('Tribonacci Sequence', testTribonacciSequence);
testSection('Padovan Sequence', testPadovanSequence);
testSection('Golden Ratio', testGoldenRatio);

// Four-Part Situation
testSection('Four-Part Situation Basic', testFourPartSituationBasic);
testSection('Four-Part Situation Navigation', testFourPartSituationNavigation);
testSection('Four-Part Situation Lore', testFourPartSituationLore);
testSection('Four-Part Situation Lucas', testFourPartSituationLucas);

// Young Situation Integration
testSection('Beauty Situation', testBeautySituation);
testSection('Beauty Situation Optimal Path', testBeautySituationOptimalPath);

// Example Functions
testSection('Example: Four-Part Situation', testFourPartSituationExample);
testSection('Example: Mathematical Beauty', testMathematicalBeautyExample);
testSection('Example: Beauty Situation', testBeautySituationExample);

console.log('\n' + '='.repeat(70));
console.log('ALL MATHEMATICAL BEAUTY TESTS PASSED ✓');
console.log('='.repeat(70));
console.log('\nSummary:');
console.log('- Mathematical sequences: Fibonacci, Lucas, Tribonacci, Padovan');
console.log('- Four-part temporal model: prepre, pre, current, post, lore');
console.log('- Young Situation integration for beauty series');
console.log('- Golden ratio convergence');
console.log('='.repeat(70));
