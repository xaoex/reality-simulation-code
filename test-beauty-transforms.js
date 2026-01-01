/**
 * Beauty Transform Operations Tests
 * Tests for BST, BDT, BIT, BRT, BFT and their variants
 */

const assert = require('assert');
const {
  FourPartSituation,
  beautyTransformExample,
  advancedTemporalExample
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
// BST (Beauty Sequence Transform) Tests
// ============================================================================

function testBST() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  // Test basic BST
  const result = situation.bst((value, index) => value * 2);
  assert.strictEqual(result, 42, 'BST should double F(8) = 21 to 42');
  
  // Test preBST
  const preResult = situation.preBST((value, index) => value + index);
  assert.strictEqual(preResult, 20, 'preBST should add F(7) = 13 + 7 = 20');
  
  // Test postBST
  const postResult = situation.postBST((value, index) => value - 1);
  assert.strictEqual(postResult, 33, 'postBST should subtract 1 from F(9) = 34');
  
  // Test prepreBST
  const preprepResult = situation.prepreBST((value, index) => value * index);
  assert.strictEqual(preprepResult, 48, 'prepreBST should multiply F(6) = 8 * 6 = 48');
  
  console.log('  ✓ BST, preBST, postBST, prepreBST transforms');
}

// ============================================================================
// BDT (Beauty Differential Transform) Tests
// ============================================================================

function testBDT() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  // Test basic BDT
  const result = situation.bdt();
  assert.strictEqual(result.preDiff, 8, 'preDiff should be F(8) - F(7) = 21 - 13 = 8');
  assert.strictEqual(result.postDiff, 13, 'postDiff should be F(9) - F(8) = 34 - 21 = 13');
  assert.strictEqual(result.prepreDiff, 5, 'prepreDiff should be F(7) - F(6) = 13 - 8 = 5');
  assert.strictEqual(result.totalDiff, 26, 'totalDiff should be F(9) - F(6) = 34 - 8 = 26');
  
  // Test preBDT
  const preResult = situation.preBDT();
  assert.strictEqual(preResult.diff, 5, 'preBDT diff should be F(7) - F(6) = 5');
  assert.strictEqual(preResult.nextDiff, 8, 'preBDT nextDiff should be F(8) - F(7) = 8');
  
  // Test postBDT
  const postResult = situation.postBDT();
  assert.strictEqual(postResult.diff, 13, 'postBDT diff should be F(9) - F(8) = 13');
  assert.strictEqual(postResult.nextDiff, 21, 'postBDT nextDiff should be F(10) - F(9) = 21');
  
  console.log('  ✓ BDT, preBDT, postBDT differential transforms');
}

// ============================================================================
// BIT (Beauty Interpolation Transform) Tests
// ============================================================================

function testBIT() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  // Test basic BIT at midpoint
  const result = situation.bit(0.5);
  assert.strictEqual(result, 23.5, 'BIT(0.5) should interpolate midpoint between F(7)=13 and F(9)=34');
  
  // Test BIT at endpoints
  assert.strictEqual(situation.bit(0), 13, 'BIT(0) should equal pre state F(7)');
  assert.strictEqual(situation.bit(1), 34, 'BIT(1) should equal post state F(9)');
  
  // Test preBIT
  const preResult = situation.preBIT(0.5);
  assert.strictEqual(preResult, 14.5, 'preBIT(0.5) should interpolate between F(6)=8 and F(8)=21');
  
  // Test postBIT
  const postResult = situation.postBIT(0.5);
  assert.strictEqual(postResult, 38, 'postBIT(0.5) should interpolate between F(8)=21 and F(10)=55');
  
  // Test bounds checking
  try {
    situation.bit(1.5);
    assert.fail('BIT should throw error for t > 1');
  } catch (e) {
    assert(e.message.includes('must be in [0, 1]'), 'Should validate bounds');
  }
  
  console.log('  ✓ BIT, preBIT, postBIT interpolation transforms');
}

// ============================================================================
// BRT (Beauty Rate Transform) Tests
// ============================================================================

function testBRT() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  // Test basic BRT
  const result = situation.brt();
  assert.strictEqual(result.preRate, 8, 'preRate should be difference to pre');
  assert.strictEqual(result.postRate, 13, 'postRate should be difference to post');
  assert.strictEqual(result.acceleration, 5, 'acceleration should be change in rate');
  assert.strictEqual(result.avgRate, 10.5, 'avgRate should be average of rates');
  
  // Test preBRT
  const preResult = situation.preBRT();
  assert.strictEqual(preResult.rate, 5, 'preBRT rate should be F(7) - F(6)');
  assert.strictEqual(preResult.nextRate, 8, 'preBRT nextRate should be F(8) - F(7)');
  assert.strictEqual(preResult.acceleration, 3, 'preBRT acceleration should be 8 - 5');
  
  // Test postBRT
  const postResult = situation.postBRT();
  assert.strictEqual(postResult.rate, 13, 'postBRT rate should be F(9) - F(8)');
  assert.strictEqual(postResult.nextRate, 21, 'postBRT nextRate should be F(10) - F(9)');
  assert.strictEqual(postResult.acceleration, 8, 'postBRT acceleration should be 21 - 13');
  
  console.log('  ✓ BRT, preBRT, postBRT rate transforms');
}

// ============================================================================
// BFT (Beauty Flow Transform) Tests
// ============================================================================

function testBFT() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  // Test basic BFT (comprehensive)
  const result = situation.bft();
  assert(result.states, 'BFT should include states');
  assert(result.differentials, 'BFT should include differentials');
  assert(result.rates, 'BFT should include rates');
  assert(result.ratios, 'BFT should include ratios');
  
  // Check ratio convergence towards golden ratio
  const ratio = result.ratios.convergence;
  assert(ratio > 1.6 && ratio < 1.62, 'Convergence ratio should approach φ ≈ 1.618');
  
  // Test preBFT
  const preResult = situation.preBFT();
  assert.strictEqual(preResult.state, 13, 'preBFT state should be F(7)');
  assert(preResult.differential, 'preBFT should include differential');
  assert(preResult.rate, 'preBFT should include rate');
  
  // Test postBFT
  const postResult = situation.postBFT();
  assert.strictEqual(postResult.state, 34, 'postBFT state should be F(9)');
  assert(postResult.differential, 'postBFT should include differential');
  assert(postResult.rate, 'postBFT should include rate');
  
  console.log('  ✓ BFT, preBFT, postBFT flow transforms');
}

// ============================================================================
// Advanced Operations Tests
// ============================================================================

function testAdvanceWithTransform() {
  const situation = new FourPartSituation('fibonacci', 8);
  
  const result = situation.advanceWithTransform('bft');
  
  assert(result.before, 'Should have before transform');
  assert(result.state, 'Should have new state');
  assert(result.after, 'Should have after transform');
  assert.strictEqual(result.state.current, 34, 'Should advance to F(9)');
  
  console.log('  ✓ advanceWithTransform operation');
}

function testMultiAdvance() {
  const situation = new FourPartSituation('fibonacci', 5);
  
  const results = situation.multiAdvance(3);
  
  assert.strictEqual(results.length, 3, 'Should have 3 results');
  assert.strictEqual(results[0].index, 5, 'First step at index 5');
  assert.strictEqual(results[1].index, 6, 'Second step at index 6');
  assert.strictEqual(results[2].index, 7, 'Third step at index 7');
  
  assert.strictEqual(results[0].state.current, 5, 'First step current is F(5)=5');
  assert.strictEqual(results[1].state.current, 8, 'Second step current is F(6)=8');
  assert.strictEqual(results[2].state.current, 13, 'Third step current is F(7)=13');
  
  console.log('  ✓ multiAdvance operation');
}

// ============================================================================
// Example Function Tests
// ============================================================================

function testBeautyTransformExample() {
  const result = beautyTransformExample();
  
  assert(result.transforms, 'Should have transforms');
  assert(result.transforms.bst, 'Should have BST transforms');
  assert(result.transforms.bdt, 'Should have BDT transforms');
  assert(result.transforms.bit, 'Should have BIT transforms');
  assert(result.transforms.brt, 'Should have BRT transforms');
  assert(result.transforms.bft, 'Should have BFT transforms');
  
  // Verify each transform has pre, current, post variants
  assert(result.transforms.bst.current !== undefined, 'BST current exists');
  assert(result.transforms.bst.pre !== undefined, 'BST pre exists');
  assert(result.transforms.bst.post !== undefined, 'BST post exists');
  
  console.log('  ✓ beautyTransformExample()');
}

function testAdvancedTemporalExample() {
  const result = advancedTemporalExample();
  
  assert(result.multiStep, 'Should have multiStep results');
  assert(result.advanceWithTransform, 'Should have advanceWithTransform result');
  assert(Array.isArray(result.multiStep), 'multiStep should be array');
  assert.strictEqual(result.multiStep.length, 3, 'Should have 3 steps');
  
  console.log('  ✓ advancedTemporalExample()');
}

// ============================================================================
// Run All Tests
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('BEAUTY TRANSFORM OPERATIONS TEST SUITE');
console.log('BST, BDT, BIT, BRT, BFT - Similar to ZMT/DMT design');
console.log('='.repeat(70));

// Transform Tests
testSection('BST (Beauty Sequence Transform)', testBST);
testSection('BDT (Beauty Differential Transform)', testBDT);
testSection('BIT (Beauty Interpolation Transform)', testBIT);
testSection('BRT (Beauty Rate Transform)', testBRT);
testSection('BFT (Beauty Flow Transform)', testBFT);

// Advanced Operations
testSection('advanceWithTransform', testAdvanceWithTransform);
testSection('multiAdvance', testMultiAdvance);

// Examples
testSection('Example: beautyTransformExample', testBeautyTransformExample);
testSection('Example: advancedTemporalExample', testAdvancedTemporalExample);

console.log('\n' + '='.repeat(70));
console.log('ALL BEAUTY TRANSFORM TESTS PASSED ✓');
console.log('='.repeat(70));
console.log('\nSummary:');
console.log('- BST: Sequence transforms (pre, post, prepre variants)');
console.log('- BDT: Differential transforms (pre, post variants)');
console.log('- BIT: Interpolation transforms (pre, post variants)');
console.log('- BRT: Rate transforms (pre, post variants)');
console.log('- BFT: Flow transforms (pre, post variants)');
console.log('- Advanced: advanceWithTransform, multiAdvance');
console.log('='.repeat(70));
