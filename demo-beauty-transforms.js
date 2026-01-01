#!/usr/bin/env node

/**
 * Beauty Transform Operations Demo
 * 
 * Demonstrates BST, BDT, BIT, BRT, BFT and their variants
 * Following the ZMT/DMT design pattern
 * 
 * Run: node demo-beauty-transforms.js
 */

const {
  FourPartSituation,
  beautyTransformExample,
  advancedTemporalExample
} = require('./index');

console.log('\n' + '='.repeat(80));
console.log('BEAUTY TRANSFORM OPERATIONS DEMONSTRATION');
console.log('BST, BDT, BIT, BRT, BFT - Similar to ZMT/DMT Design Pattern');
console.log('='.repeat(80));

// ============================================================================
// Setup
// ============================================================================

const situation = new FourPartSituation('fibonacci', 8);

console.log('\n📍 CURRENT POSITION: Fibonacci Index 8');
console.log('-'.repeat(80));
console.log(`  prepre (t-2): F(6) = ${situation.prepre()}`);
console.log(`  pre    (t-1): F(7) = ${situation.pre()}`);
console.log(`  current (t):  F(8) = ${situation.current()}`);
console.log(`  post   (t+1): F(9) = ${situation.post()}`);

// ============================================================================
// 1. BST (Beauty Sequence Transform)
// ============================================================================

console.log('\n\n1️⃣  BST (Beauty Sequence Transform)');
console.log('━'.repeat(80));
console.log('Transform sequence values at different temporal positions\n');

// Current BST
const bstDouble = situation.bst((value, index) => value * 2);
console.log(`BST (double current):        F(8) = 21 → ${bstDouble}`);

const bstSquare = situation.bst((value, index) => value * value);
console.log(`BST (square current):        F(8) = 21 → ${bstSquare}`);

// Pre BST
const preBSTAdd = situation.preBST((value, index) => value + index);
console.log(`preBST (add index):          F(7) + 7 = 13 + 7 → ${preBSTAdd}`);

// Post BST
const postBSTSqrt = situation.postBST((value, index) => Math.sqrt(value).toFixed(2));
console.log(`postBST (sqrt):              √F(9) = √34 → ${postBSTSqrt}`);

// Prepre BST
const prepreBSTMult = situation.prepreBST((value, index) => value * index);
console.log(`prepreBST (multiply index):  F(6) × 6 = 8 × 6 → ${prepreBSTMult}`);

// ============================================================================
// 2. BDT (Beauty Differential Transform)
// ============================================================================

console.log('\n\n2️⃣  BDT (Beauty Differential Transform)');
console.log('━'.repeat(80));
console.log('Calculate differences between temporal states\n');

const bdt = situation.bdt();
console.log(`Current BDT:`);
console.log(`  preDiff:    F(8) - F(7) = 21 - 13 = ${bdt.preDiff}`);
console.log(`  postDiff:   F(9) - F(8) = 34 - 21 = ${bdt.postDiff}`);
console.log(`  prepreDiff: F(7) - F(6) = 13 - 8  = ${bdt.prepreDiff}`);
console.log(`  totalDiff:  F(9) - F(6) = 34 - 8  = ${bdt.totalDiff}`);

const preBDT = situation.preBDT();
console.log(`\npreBDT (centered on F(7)):`);
console.log(`  diff:     F(7) - F(6) = ${preBDT.diff}`);
console.log(`  nextDiff: F(8) - F(7) = ${preBDT.nextDiff}`);

const postBDT = situation.postBDT();
console.log(`\npostBDT (centered on F(9)):`);
console.log(`  diff:     F(9) - F(8)  = ${postBDT.diff}`);
console.log(`  nextDiff: F(10) - F(9) = ${postBDT.nextDiff}`);

console.log(`\n💡 Notice: Fibonacci property - next diff = current + previous!`);
console.log(`   ${bdt.prepreDiff} + ${bdt.preDiff} = ${bdt.prepreDiff + bdt.preDiff} = ${bdt.postDiff} ✓`);

// ============================================================================
// 3. BIT (Beauty Interpolation Transform)
// ============================================================================

console.log('\n\n3️⃣  BIT (Beauty Interpolation Transform)');
console.log('━'.repeat(80));
console.log('Interpolate between temporal states\n');

console.log(`Current BIT (between F(7)=13 and F(9)=34):`);
console.log(`  t=0.00:  ${situation.bit(0).toFixed(2)} (at pre)`);
console.log(`  t=0.25:  ${situation.bit(0.25).toFixed(2)}`);
console.log(`  t=0.50:  ${situation.bit(0.5).toFixed(2)} (midpoint)`);
console.log(`  t=0.75:  ${situation.bit(0.75).toFixed(2)}`);
console.log(`  t=1.00:  ${situation.bit(1).toFixed(2)} (at post)`);

console.log(`\npreBIT (between F(6)=8 and F(8)=21):`);
console.log(`  t=0.50:  ${situation.preBIT(0.5).toFixed(2)} (midpoint)`);

console.log(`\npostBIT (between F(8)=21 and F(10)=55):`);
console.log(`  t=0.50:  ${situation.postBIT(0.5).toFixed(2)} (midpoint)`);

// ============================================================================
// 4. BRT (Beauty Rate Transform)
// ============================================================================

console.log('\n\n4️⃣  BRT (Beauty Rate Transform)');
console.log('━'.repeat(80));
console.log('Calculate rates of change and acceleration\n');

const brt = situation.brt();
console.log(`Current BRT:`);
console.log(`  preRate:      ${brt.preRate.toFixed(2)} (rate from F(7) to F(8))`);
console.log(`  postRate:     ${brt.postRate.toFixed(2)} (rate from F(8) to F(9))`);
console.log(`  acceleration: ${brt.acceleration.toFixed(2)} (change in rate)`);
console.log(`  avgRate:      ${brt.avgRate.toFixed(2)} (average rate)`);

const preBRT = situation.preBRT();
console.log(`\npreBRT (centered on F(7)):`);
console.log(`  rate:         ${preBRT.rate} → ${preBRT.nextRate}`);
console.log(`  acceleration: ${preBRT.acceleration}`);

const postBRT = situation.postBRT();
console.log(`\npostBRT (centered on F(9)):`);
console.log(`  rate:         ${postBRT.rate} → ${postBRT.nextRate}`);
console.log(`  acceleration: ${postBRT.acceleration}`);

console.log(`\n💡 Rate is increasing! Fibonacci grows with acceleration.`);

// ============================================================================
// 5. BFT (Beauty Flow Transform)
// ============================================================================

console.log('\n\n5️⃣  BFT (Beauty Flow Transform)');
console.log('━'.repeat(80));
console.log('Comprehensive analysis combining all transforms\n');

const bft = situation.bft();
console.log(`Current BFT (complete flow analysis):`);
console.log(`\n  States:`);
console.log(`    prepre: ${bft.states.prepre}, pre: ${bft.states.pre}, current: ${bft.states.current}, post: ${bft.states.post}`);

console.log(`\n  Differentials:`);
console.log(`    preDiff: ${bft.differentials.preDiff}, postDiff: ${bft.differentials.postDiff}`);

console.log(`\n  Rates:`);
console.log(`    preRate: ${bft.rates.preRate}, postRate: ${bft.rates.postRate}, acceleration: ${bft.rates.acceleration}`);

console.log(`\n  Ratios (converging to golden ratio φ ≈ 1.618):`);
console.log(`    preRatio:    ${bft.ratios.preRatio.toFixed(6)} (F(8)/F(7))`);
console.log(`    postRatio:   ${bft.ratios.postRatio.toFixed(6)} (F(9)/F(8))`);
console.log(`    convergence: ${bft.ratios.convergence.toFixed(6)}`);

const phi = (1 + Math.sqrt(5)) / 2;
console.log(`    φ (actual):  ${phi.toFixed(6)}`);
console.log(`    error:       ${Math.abs(bft.ratios.convergence - phi).toFixed(6)}`);

const preBFT = situation.preBFT();
console.log(`\npreBFT (flow at F(7)):`);
console.log(`  state: ${preBFT.state}, ratio: ${preBFT.ratio.toFixed(6)}`);

const postBFT = situation.postBFT();
console.log(`\npostBFT (flow at F(9)):`);
console.log(`  state: ${postBFT.state}, ratio: ${postBFT.ratio.toFixed(6)}`);

// ============================================================================
// 6. Advanced Operations
// ============================================================================

console.log('\n\n6️⃣  Advanced Temporal Operations');
console.log('━'.repeat(80));

// Reset and try advanceWithTransform
situation.reset(6);
console.log('\nadvanceWithTransform:');
console.log(`  Starting at index ${situation.currentIndex}`);

const advResult = situation.advanceWithTransform('bft');
console.log(`  Before advance: convergence ratio = ${advResult.before.ratios.convergence.toFixed(6)}`);
console.log(`  After advance:  convergence ratio = ${advResult.after.ratios.convergence.toFixed(6)}`);
console.log(`  New current state: F(${situation.currentIndex}) = ${situation.current()}`);

// Reset and try multiAdvance
situation.reset(5);
console.log('\nmultiAdvance (3 steps):');
const multiResults = situation.multiAdvance(3);
multiResults.forEach((result, i) => {
  console.log(`  Step ${i}: F(${result.index}) = ${result.state.current}, ratio = ${result.transform.ratios.convergence.toFixed(6)}`);
});

// ============================================================================
// 7. Transform Composition Example
// ============================================================================

console.log('\n\n7️⃣  Transform Composition');
console.log('━'.repeat(80));
console.log('Combining transforms for complex analysis\n');

situation.reset(10);

// Step 1: Get differential
const diff = situation.bdt();
console.log(`Step 1 - Differential at F(10):`);
console.log(`  preDiff: ${diff.preDiff}, postDiff: ${diff.postDiff}`);

// Step 2: Calculate rate
const rate = situation.brt();
console.log(`\nStep 2 - Rate analysis:`);
console.log(`  acceleration: ${rate.acceleration}`);

// Step 3: Interpolate for prediction
const predicted = situation.bit(0.5);
console.log(`\nStep 3 - Predict intermediate value:`);
console.log(`  Between F(9)=${situation.pre()} and F(11)=${situation.post()}`);
console.log(`  Interpolated: ${predicted.toFixed(2)}`);

// Step 4: Transform for analysis
const transformed = situation.bst((v, i) => v / i);
console.log(`\nStep 4 - Normalize by index:`);
console.log(`  F(10) / 10 = ${situation.current()} / 10 = ${transformed.toFixed(2)}`);

// Step 5: Complete flow
const completeFlow = situation.bft();
console.log(`\nStep 5 - Complete flow shows convergence:`);
console.log(`  Ratio F(11)/F(10) = ${completeFlow.ratios.convergence.toFixed(6)}`);
console.log(`  Very close to φ = ${phi.toFixed(6)} ✓`);

// ============================================================================
// Summary
// ============================================================================

console.log('\n\n' + '='.repeat(80));
console.log('SUMMARY: Beauty Transform Operations');
console.log('='.repeat(80));

console.log('\n✅ Transform Types:');
console.log('  • BST - Beauty Sequence Transform (value transformations)');
console.log('  • BDT - Beauty Differential Transform (differences)');
console.log('  • BIT - Beauty Interpolation Transform (interpolation)');
console.log('  • BRT - Beauty Rate Transform (rates & acceleration)');
console.log('  • BFT - Beauty Flow Transform (comprehensive analysis)');

console.log('\n✅ Temporal Variants:');
console.log('  • Each transform has pre, post, and prepre variants');
console.log('  • Enables analysis across entire temporal window');
console.log('  • Following ZMT/DMT design pattern from whitepaper');

console.log('\n✅ Advanced Operations:');
console.log('  • advanceWithTransform - Move with tracking');
console.log('  • multiAdvance - Multi-step progression');
console.log('  • Transform composition - Complex analysis');

console.log('\n✅ Applications:');
console.log('  • Sequence analysis and pattern discovery');
console.log('  • Rate and acceleration studies');
console.log('  • Convergence detection (e.g., to golden ratio)');
console.log('  • Predictive interpolation');
console.log('  • Time series analysis');

console.log('\n' + '='.repeat(80));
console.log('For complete documentation, see BEAUTY_TRANSFORMS.md');
console.log('For tests, run: node test-beauty-transforms.js');
console.log('='.repeat(80) + '\n');
