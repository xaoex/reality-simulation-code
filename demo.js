#!/usr/bin/env node

/**
 * Demo: Reality Simulation Code
 * 
 * This demo showcases Young Situation, Young Field, and Young Ring
 */

const {
  createCommonYoungSituation,
  createLinearYoungSituation,
  createRationalField,
  createFiniteField,
  youngSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample
} = require('./index.js');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║          Reality Simulation Code - Core Demo                 ║');
console.log('║   Young Situation, Young Ring, and Young Field               ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');

// ============================================================================
// Part 1: Young Situation
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 1: Young Situation - Dynamic Enterprise Modeling       │');
console.log('└─────────────────────────────────────────────────────────────┘');

const situation = createCommonYoungSituation(['start', 'middle', 'end']);
console.log('\n📊 Created Common Young Situation');
console.log(`   States: ${Array.from(situation.S).join(', ')}`);
console.log(`   Final States: ${Array.from(situation.F).join(', ')}`);

const linear = createLinearYoungSituation(3);
console.log('\n🔗 Created Linear Young Situation');
console.log(`   States: ${Array.from(linear.S).join(', ')}`);

// Run example
console.log('\n🎯 Running Young Situation Example:');
const exampleResult = youngSituationExample();
console.log(`   Created situation with ${exampleResult.stateCount} states`);

// ============================================================================
// Part 2: Young Field
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 2: Young Field - Mathematical Field Operations         │');
console.log('└─────────────────────────────────────────────────────────────┘');

const field = createRationalField();
console.log('\n📐 Created Rational Field');

const a = 5;
const b = 3;
console.log(`\n🔢 Basic Operations on ${a} and ${b}:`);
console.log(`   Addition: ${field.add(a, b)}`);
console.log(`   Multiplication: ${field.multiply(a, b)}`);
console.log(`   Division: ${field.divide(a, b).toFixed(4)}`);

const values = [1, 2, 3, 4, 5];
const normalized = field.normalize(values);
console.log(`\n📊 Normalized values [${values.join(', ')}]:`);
console.log(`   Result: [${normalized.map(v => v.toFixed(3)).join(', ')}]`);

// Finite Field
const finiteField = createFiniteField(7);
console.log('\n🔢 Created Finite Field (mod 7)');
console.log(`   5 + 4 = ${finiteField.add(5, 4)} (mod 7)`);
console.log(`   6 × 6 = ${finiteField.multiply(6, 6)} (mod 7)`);

// Run example
console.log('\n🎯 Running Young Field Example:');
const fieldExample = youngFieldOperationsExample();
console.log(`   Sum: ${fieldExample.sum}`);
console.log(`   Product: ${fieldExample.product}`);
console.log(`   Division: ${fieldExample.division.toFixed(4)}`);

// ============================================================================
// Finale
// ============================================================================

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║                     Demo Complete! ✨                         ║');
console.log('║                                                               ║');
console.log('║  Reality Simulation Code - Dynamic Enterprise Framework      ║');
console.log('║                    - xaoex, 2025                              ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
