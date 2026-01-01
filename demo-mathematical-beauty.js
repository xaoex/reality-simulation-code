#!/usr/bin/env node

/**
 * Mathematical Beauty Demo
 * 
 * Demonstrates the four-part temporal situation model for beautiful sequences
 * 
 * Run: node demo-mathematical-beauty.js
 */

const {
  MathematicalBeauty,
  FourPartSituation,
  createBeautySituation,
  fourPartSituationExample,
  mathematicalBeautyExample,
  beautySituationExample
} = require('./index');

console.log('\n' + '='.repeat(70));
console.log('MATHEMATICAL BEAUTY DEMONSTRATION');
console.log('Four-Part Temporal Situation: prepre, pre, current, post, lore');
console.log('='.repeat(70));

// ============================================================================
// 1. Beautiful Sequences
// ============================================================================

console.log('\n1. BEAUTIFUL MATHEMATICAL SEQUENCES');
console.log('-'.repeat(70));

const beauty = new MathematicalBeauty();

console.log('\nFibonacci Sequence (first 15 numbers):');
const fibonacci = [];
for (let i = 0; i < 15; i++) {
  fibonacci.push(beauty.fibonacci(i));
}
console.log(fibonacci.join(', '));

console.log('\nLucas Numbers (first 15 numbers):');
const lucas = [];
for (let i = 0; i < 15; i++) {
  lucas.push(beauty.lucas(i));
}
console.log(lucas.join(', '));

console.log('\nTribonacci Sequence (first 15 numbers):');
const tribonacci = [];
for (let i = 0; i < 15; i++) {
  tribonacci.push(beauty.tribonacci(i));
}
console.log(tribonacci.join(', '));

console.log('\nGolden Ratio (φ) from Fibonacci convergence:');
const phi = beauty.goldenRatio(30);
console.log(`φ ≈ ${phi.toFixed(15)}`);
console.log(`Expected: 1.618033988749895`);
console.log(`Match: ${Math.abs(phi - 1.618033988749895) < 0.000001 ? '✓' : '✗'}`);

// ============================================================================
// 2. Four-Part Temporal Situation
// ============================================================================

console.log('\n\n2. FOUR-PART TEMPORAL SITUATION');
console.log('-'.repeat(70));

const situation = new FourPartSituation('fibonacci', 8);

console.log('\nAt Fibonacci index 8:');
console.log(`  prepre (t-2):  F(6) = ${situation.prepre()}`);
console.log(`  pre    (t-1):  F(7) = ${situation.pre()}`);
console.log(`  current (t):   F(8) = ${situation.current()}`);
console.log(`  post   (t+1):  F(9) = ${situation.post()}`);

console.log('\nTemporal Navigation:');
console.log('  Initial state: F(8) = ' + situation.current());

situation.advance();
console.log('  After advance: F(9) = ' + situation.current());

situation.advance();
console.log('  After advance: F(10) = ' + situation.current());

situation.rewind();
console.log('  After rewind:  F(9) = ' + situation.current());

situation.reset(5);
console.log('  After reset(5): F(5) = ' + situation.current());

// ============================================================================
// 3. Lore Accumulation
// ============================================================================

console.log('\n\n3. LORE ACCUMULATION (Pattern Tracking)');
console.log('-'.repeat(70));

// Generate some data to accumulate lore
const loreSituation = new FourPartSituation('fibonacci', 1);
for (let i = 0; i < 10; i++) {
  loreSituation.advance();
}

const lore = loreSituation.lore();
console.log('\nFibonacci Lore:');
console.log(`  Total generations: ${lore.totalGenerations}`);
console.log(`  Max length: ${lore.maxLength}`);
console.log(`  Ratio patterns (last 5):`);
const patterns = lore.patterns.slice(-5);
patterns.forEach((ratio, i) => {
  console.log(`    ${i + 1}. ${ratio.toFixed(6)} ${i === patterns.length - 1 ? '→ approaching φ' : ''}`);
});

// ============================================================================
// 4. Multiple Sequence Types
// ============================================================================

console.log('\n\n4. COMPARING DIFFERENT SEQUENCES');
console.log('-'.repeat(70));

const sequences = ['fibonacci', 'lucas', 'tribonacci', 'padovan'];
console.log('\nAt index 10:');

sequences.forEach(seqType => {
  const sit = new FourPartSituation(seqType, 10);
  const parts = sit.getAllParts();
  console.log(`\n${seqType.toUpperCase()}:`);
  console.log(`  prepre: ${parts.prepre}, pre: ${parts.pre}, current: ${parts.current}, post: ${parts.post}`);
});

// ============================================================================
// 5. Young Situation Integration
// ============================================================================

console.log('\n\n5. YOUNG SITUATION INTEGRATION');
console.log('-'.repeat(70));

const beautySit = createBeautySituation('fibonacci', 12);

console.log('\nFibonacci as Young Situation:');
console.log(`  Total states: ${beautySit.S.size}`);
console.log(`  Final state: ${Array.from(beautySit.F)[0]}`);

const path = beautySit.findOptimalPath('n0');
console.log(`\nOptimal path (${path.length} steps):`);
console.log('  ' + path.join(' → '));

console.log('\nValuations along the path:');
path.forEach(state => {
  const value = beautySit.valuation(state);
  const isFinal = beautySit.isFinal(state);
  console.log(`  ${state}: ${value.toString().padStart(3)}${isFinal ? ' (final)' : ''}`);
});

// ============================================================================
// 6. Run Example Functions
// ============================================================================

console.log('\n\n6. EXAMPLE FUNCTIONS OUTPUT');
console.log('-'.repeat(70));

console.log('\nfourPartSituationExample():');
const ex1 = fourPartSituationExample();
console.log(`  Initial state - current: ${ex1.initialState.current}`);
console.log(`  After 2 advances - current: ${ex1.afterAdvance2.current}`);
console.log(`  After rewind - current: ${ex1.afterRewind.current}`);

console.log('\nmathematicalBeautyExample():');
const ex2 = mathematicalBeautyExample();
console.log(`  Fibonacci (first 5): ${ex2.fibonacci.slice(0, 5).join(', ')}`);
console.log(`  Lucas (first 5): ${ex2.lucas.slice(0, 5).join(', ')}`);
console.log(`  Golden ratio: ${ex2.goldenRatio.toFixed(6)}`);

console.log('\nbeautySituationExample():');
const ex3 = beautySituationExample();
console.log(`  Sequence type: ${ex3.sequenceType}`);
console.log(`  Path length: ${ex3.pathLength}`);
console.log(`  Final value: ${ex3.valuations[ex3.valuations.length - 1].value}`);

// ============================================================================
// Summary
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));
console.log('\nMathematical Beauty Framework provides:');
console.log('  ✓ Beautiful sequences: Fibonacci, Lucas, Tribonacci, Padovan');
console.log('  ✓ Four-part temporal model: prepre, pre, current, post, lore');
console.log('  ✓ Temporal navigation: advance, rewind, reset');
console.log('  ✓ Lore accumulation for pattern tracking');
console.log('  ✓ Young Situation integration for state modeling');
console.log('  ✓ Golden ratio convergence calculation');
console.log('\nProblem Statement Fulfilled:');
console.log('  ✓ Defined (pre) and (post) for temporal states');
console.log('  ✓ Defined 4-part situation: prepre, pre, current, post');
console.log('  ✓ Added lore for accumulated wisdom');
console.log('  ✓ Implemented mathematical beauty series & sequences');
console.log('  ✓ Integrated with Young Situation framework');
console.log('='.repeat(70));
console.log('\nFor complete documentation, see MATHEMATICAL_BEAUTY.md\n');
