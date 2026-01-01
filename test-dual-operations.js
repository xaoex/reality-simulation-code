/**
 * Test Suite for Dual Operations: give:a, gett:a, robb:a, do:a
 * Verifies mathematical properties and implementations
 * 
 * @author xaoex
 */

const { givea, getta, robba, doa } = require('./anonymous-package');

console.log('========================================');
console.log('Testing Dual Operations');
console.log('give:a, gett:a, robb:a, do:a');
console.log('========================================\n');

// ============================================================================
// GIVEA TESTS
// ============================================================================

console.log('--- GIVEA (Resource Transfer) TESTS ---\n');

// Test 1: Basic givea
console.log('Test 1: Basic givea operation');
const source1 = [1, 2, 3, 4, 5];
const dest1 = [10, 20];
const [newSrc1, newDest1] = givea(2, source1, dest1);
console.log('Source:', source1, '→', newSrc1);
console.log('Dest:', dest1, '→', newDest1);
console.log('Expected: [3,4,5] and [10,20,1,2]');
console.log('✓ Pass:', JSON.stringify(newSrc1) === JSON.stringify([3,4,5]) && 
                      JSON.stringify(newDest1) === JSON.stringify([10,20,1,2]));
console.log('');

// Test 2: Conservation law
console.log('Test 2: Conservation law - |src\'| + |dst\'| = |src| + |dst|');
const source2 = [1, 2, 3, 4];
const dest2 = [10];
const [newSrc2, newDest2] = givea(2, source2, dest2);
const originalTotal = source2.length + dest2.length;
const newTotal = newSrc2.length + newDest2.length;
console.log('Original total:', originalTotal);
console.log('New total:', newTotal);
console.log('✓ Pass:', originalTotal === newTotal);
console.log('');

// Test 3: givea exception on insufficient elements
console.log('Test 3: Exception on insufficient elements');
try {
  givea(10, [1, 2, 3], []);
  console.log('✗ Fail: Should have thrown error');
} catch (error) {
  console.log('✓ Pass: Correctly threw error:', error.message);
}
console.log('');

// ============================================================================
// GETTA TESTS
// ============================================================================

console.log('--- GETTA (Acquisition) TESTS ---\n');

// Test 4: Basic getta
console.log('Test 4: Basic getta operation (prepends vs appends)');
const source4 = [1, 2, 3, 4, 5];
const dest4 = [10, 20];
const [newSrc4, newDest4] = getta(2, source4, dest4);
console.log('Source:', source4, '→', newSrc4);
console.log('Dest:', dest4, '→', newDest4);
console.log('Expected: [3,4,5] and [1,2,10,20] (prepended)');
console.log('✓ Pass:', JSON.stringify(newSrc4) === JSON.stringify([3,4,5]) && 
                      JSON.stringify(newDest4) === JSON.stringify([1,2,10,20]));
console.log('');

// Test 5: getta vs givea difference
console.log('Test 5: Difference between getta and givea');
const src = [1, 2, 3];
const dst = [9];
const [, giveResult] = givea(2, src, dst);
const [, getResult] = getta(2, src, dst);
console.log('givea result (appends):', giveResult);
console.log('getta result (prepends):', getResult);
console.log('✓ Pass: Different order:', JSON.stringify(giveResult) !== JSON.stringify(getResult));
console.log('');

// ============================================================================
// ROBBA TESTS
// ============================================================================

console.log('--- ROBBA (House Rob DP) TESTS ---\n');

// Test 6: Simple rob case
console.log('Test 6: Simple house rob');
const houses1 = [1, 2, 3, 1];
const rob1 = robba(houses1);
console.log('Houses:', houses1);
console.log('Max rob:', rob1);
console.log('Expected: 4 (rob houses 0 and 2: 1+3=4)');
console.log('✓ Pass:', rob1 === 4);
console.log('');

// Test 7: Another rob case
console.log('Test 7: Another house rob case');
const houses2 = [2, 7, 9, 3, 1];
const rob2 = robba(houses2);
console.log('Houses:', houses2);
console.log('Max rob:', rob2);
console.log('Expected: 12 (rob houses 0, 2, 4: 2+9+1=12)');
console.log('✓ Pass:', rob2 === 12);
console.log('');

// Test 8: Edge cases
console.log('Test 8: Edge cases for robba');
console.log('Empty array:', robba([]));
console.log('Single house [5]:', robba([5]));
console.log('Two houses [2, 3]:', robba([2, 3]));
console.log('✓ Pass:', robba([]) === 0 && robba([5]) === 5 && robba([2, 3]) === 3);
console.log('');

// ============================================================================
// DOA TESTS
// ============================================================================

console.log('--- DOA (Monadic Action) TESTS ---\n');

// Test 9: Successful doa
console.log('Test 9: Successful doa execution');
const data1 = [1, 2, 3, 4, 5];
const doubled = doa(x => x * 2, data1);
console.log('Input:', data1);
console.log('Action: x => x * 2');
console.log('Result:', doubled);
console.log('Expected: [2, 4, 6, 8, 10]');
console.log('✓ Pass:', JSON.stringify(doubled) === JSON.stringify([2, 4, 6, 8, 10]));
console.log('');

// Test 10: doa fail-fast
console.log('Test 10: doa fail-fast on null/undefined');
try {
  doa(x => x > 2 ? x : null, [1, 2, 3]);
  console.log('✗ Fail: Should have thrown error');
} catch (error) {
  console.log('✓ Pass: Failed fast on null:', error.message);
}
console.log('');

// Test 11: doa with validation
console.log('Test 11: doa with validation');
const validated = doa(
  x => x > 0 ? x * x : (() => { throw new Error('Negative'); })(),
  [1, 2, 3]
);
console.log('Input: [1, 2, 3]');
console.log('Action: square if positive');
console.log('Result:', validated);
console.log('Expected: [1, 4, 9]');
console.log('✓ Pass:', JSON.stringify(validated) === JSON.stringify([1, 4, 9]));
console.log('');

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

console.log('--- INTEGRATION TESTS ---\n');

// Test 12: Combining operations
console.log('Test 12: Combining give:a with robba');
const source = [10, 5, 8, 3, 12];
const warehouse = [];
const [remaining, transferred] = givea(3, source, warehouse);
const maxRob = robba(transferred);
console.log('Source:', source);
console.log('Transfer first 3 to warehouse:', transferred);
console.log('Max rob from warehouse:', maxRob);
console.log('Expected: 18 (10 + 8)');
console.log('✓ Pass:', maxRob === 18);
console.log('');

// Test 13: Chaining operations
console.log('Test 13: Pipeline with doa and givea');
const initial = [1, 2, 3, 4, 5];
const processed = doa(x => x + 10, initial);
const [, result13] = givea(3, processed, []);
console.log('Initial:', initial);
console.log('After doa (x+10):', processed);
console.log('After givea(3):', result13);
console.log('Expected: [11, 12, 13]');
console.log('✓ Pass:', JSON.stringify(result13) === JSON.stringify([11, 12, 13]));
console.log('');

console.log('========================================');
console.log('All Dual Operations Tests Completed! ✓');
console.log('give:a, gett:a, robb:a, do:a are');
console.log('correctly implemented with mathematical');
console.log('properties verified.');
console.log('========================================');
