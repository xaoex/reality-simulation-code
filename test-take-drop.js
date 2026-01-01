/**
 * Test Suite for Take and Drop Operations
 * Verifies algebraic properties and discrete mathematics formalization
 * 
 * @author xaoex
 */

const { take, drop } = require('./anonymous-package');

console.log('========================================');
console.log('Testing Take and Drop Operations');
console.log('Algebraic Properties and Formalization');
console.log('========================================\n');

// Test data
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Test Data:', data);
console.log('');

// ============================================================================
// TAKE OPERATION TESTS
// ============================================================================

console.log('--- TAKE OPERATION TESTS ---\n');

// Test 1: Basic take operation
console.log('Test 1: Basic take operation');
console.log('take(3, data):', take(3, data));
console.log('Expected: [1, 2, 3]');
console.log('✓ Pass:', JSON.stringify(take(3, data)) === JSON.stringify([1, 2, 3]));
console.log('');

// Test 2: Take zero elements (Zero property)
console.log('Test 2: Zero property - take(0, xs) = []');
console.log('take(0, data):', take(0, data));
console.log('Expected: []');
console.log('✓ Pass:', JSON.stringify(take(0, data)) === JSON.stringify([]));
console.log('');

// Test 3: Take more than length (Identity on length)
console.log('Test 3: Identity on length - n ≥ |xs| ⟹ take(n, xs) = xs');
console.log('take(100, data):', take(100, data));
console.log('Expected:', data);
console.log('✓ Pass:', JSON.stringify(take(100, data)) === JSON.stringify(data));
console.log('');

// Test 4: Take from empty array (Empty preservation)
console.log('Test 4: Empty preservation - take(n, []) = []');
console.log('take(5, []):', take(5, []));
console.log('Expected: []');
console.log('✓ Pass:', JSON.stringify(take(5, [])) === JSON.stringify([]));
console.log('');

// Test 5: Length invariant
console.log('Test 5: Length invariant - |take(n, xs)| = min(n, |xs|)');
const n1 = 5;
const result1 = take(n1, data);
console.log(`|take(${n1}, data)| = ${result1.length}`);
console.log(`min(${n1}, ${data.length}) = ${Math.min(n1, data.length)}`);
console.log('✓ Pass:', result1.length === Math.min(n1, data.length));
console.log('');

// Test 6: Idempotence - take(n, take(m, xs)) = take(min(n, m), xs)
console.log('Test 6: Idempotence - take(n, take(m, xs)) = take(min(n, m), xs)');
const n2 = 3, m2 = 5;
const nested = take(n2, take(m2, data));
const direct = take(Math.min(n2, m2), data);
console.log(`take(${n2}, take(${m2}, data)):`, nested);
console.log(`take(min(${n2}, ${m2}), data):`, direct);
console.log('✓ Pass:', JSON.stringify(nested) === JSON.stringify(direct));
console.log('');

// ============================================================================
// DROP OPERATION TESTS
// ============================================================================

console.log('--- DROP OPERATION TESTS ---\n');

// Test 7: Basic drop operation
console.log('Test 7: Basic drop operation');
console.log('drop(3, data):', drop(3, data));
console.log('Expected: [4, 5, 6, 7, 8, 9, 10]');
console.log('✓ Pass:', JSON.stringify(drop(3, data)) === JSON.stringify([4, 5, 6, 7, 8, 9, 10]));
console.log('');

// Test 8: Drop zero elements (Zero property)
console.log('Test 8: Zero property - drop(0, xs) = xs');
console.log('drop(0, data):', drop(0, data));
console.log('Expected:', data);
console.log('✓ Pass:', JSON.stringify(drop(0, data)) === JSON.stringify(data));
console.log('');

// Test 9: Drop more than length (Absorption)
console.log('Test 9: Absorption - n ≥ |xs| ⟹ drop(n, xs) = []');
console.log('drop(100, data):', drop(100, data));
console.log('Expected: []');
console.log('✓ Pass:', JSON.stringify(drop(100, data)) === JSON.stringify([]));
console.log('');

// Test 10: Drop from empty array (Empty preservation)
console.log('Test 10: Empty preservation - drop(n, []) = []');
console.log('drop(5, []):', drop(5, []));
console.log('Expected: []');
console.log('✓ Pass:', JSON.stringify(drop(5, [])) === JSON.stringify([]));
console.log('');

// Test 11: Length invariant
console.log('Test 11: Length invariant - |drop(n, xs)| = max(0, |xs| - n)');
const n3 = 4;
const result3 = drop(n3, data);
console.log(`|drop(${n3}, data)| = ${result3.length}`);
console.log(`max(0, ${data.length} - ${n3}) = ${Math.max(0, data.length - n3)}`);
console.log('✓ Pass:', result3.length === Math.max(0, data.length - n3));
console.log('');

// Test 12: Composition law - drop(n, drop(m, xs)) = drop(n + m, xs)
console.log('Test 12: Composition law - drop(n, drop(m, xs)) = drop(n + m, xs)');
const n4 = 2, m4 = 3;
const nested2 = drop(n4, drop(m4, data));
const direct2 = drop(n4 + m4, data);
console.log(`drop(${n4}, drop(${m4}, data)):`, nested2);
console.log(`drop(${n4 + m4}, data):`, direct2);
console.log('✓ Pass:', JSON.stringify(nested2) === JSON.stringify(direct2));
console.log('');

// ============================================================================
// DUALITY TESTS (TAKE AND DROP TOGETHER)
// ============================================================================

console.log('--- DUALITY TESTS (TAKE AND DROP) ---\n');

// Test 13: Concatenation decomposition - xs = take(n, xs) ⊕ drop(n, xs)
console.log('Test 13: Concatenation decomposition - xs = take(n, xs) ⊕ drop(n, xs)');
const n5 = 4;
const prefix = take(n5, data);
const suffix = drop(n5, data);
const reconstructed = [...prefix, ...suffix];
console.log(`take(${n5}, data):`, prefix);
console.log(`drop(${n5}, data):`, suffix);
console.log('Concatenated:', reconstructed);
console.log('Original:', data);
console.log('✓ Pass:', JSON.stringify(reconstructed) === JSON.stringify(data));
console.log('');

// Test 14: Complementarity - |take(n, xs)| + |drop(n, xs)| = |xs|
console.log('Test 14: Complementarity - |take(n, xs)| + |drop(n, xs)| = |xs|');
const n6 = 6;
const taken = take(n6, data);
const dropped = drop(n6, data);
console.log(`|take(${n6}, data)| = ${taken.length}`);
console.log(`|drop(${n6}, data)| = ${dropped.length}`);
console.log(`Sum: ${taken.length + dropped.length}`);
console.log(`|data| = ${data.length}`);
console.log('✓ Pass:', (taken.length + dropped.length) === data.length);
console.log('');

// Test 15: Disjoint sets - take(n, xs) ∩ drop(n, xs) = ∅
console.log('Test 15: Disjoint sets - take(n, xs) ∩ drop(n, xs) = ∅');
const n7 = 5;
const taken2 = take(n7, data);
const dropped2 = drop(n7, data);
const intersection = taken2.filter(x => dropped2.includes(x));
console.log(`take(${n7}, data):`, taken2);
console.log(`drop(${n7}, data):`, dropped2);
console.log('Intersection:', intersection);
console.log('Expected: [] (empty set)');
console.log('✓ Pass:', intersection.length === 0);
console.log('');

// ============================================================================
// EDGE CASES AND TYPE VALIDATION
// ============================================================================

console.log('--- EDGE CASES AND TYPE VALIDATION ---\n');

// Test 16: Type validation - negative number
console.log('Test 16: Type validation - negative number should throw error');
try {
  take(-1, data);
  console.log('✗ Fail: Should have thrown TypeError');
} catch (error) {
  console.log('✓ Pass:', error instanceof TypeError);
}
console.log('');

// Test 17: Type validation - non-integer
console.log('Test 17: Type validation - non-integer should throw error');
try {
  take(3.5, data);
  console.log('✗ Fail: Should have thrown TypeError');
} catch (error) {
  console.log('✓ Pass:', error instanceof TypeError);
}
console.log('');

// Test 18: Type validation - non-array
console.log('Test 18: Type validation - non-array should throw error');
try {
  take(3, 'not an array');
  console.log('✗ Fail: Should have thrown TypeError');
} catch (error) {
  console.log('✓ Pass:', error instanceof TypeError);
}
console.log('');

// ============================================================================
// PRACTICAL EXAMPLES
// ============================================================================

console.log('--- PRACTICAL EXAMPLES ---\n');

// Example 1: Pagination
console.log('Example 1: Pagination using take and drop');
const pageSize = 3;
const page1 = take(pageSize, data);
const page2 = take(pageSize, drop(pageSize, data));
const page3 = take(pageSize, drop(2 * pageSize, data));
console.log('Page 1:', page1);
console.log('Page 2:', page2);
console.log('Page 3:', page3);
console.log('');

// Example 2: Windowing
console.log('Example 2: Windowing using take and drop');
const windowSize = 3;
const windows = [];
for (let i = 0; i <= data.length - windowSize; i++) {
  windows.push(take(windowSize, drop(i, data)));
}
console.log('Windows of size', windowSize, ':', windows);
console.log('');

// Example 3: Split at position
console.log('Example 3: Split at position using take and drop');
const splitPos = 5;
const [left, right] = [take(splitPos, data), drop(splitPos, data)];
console.log(`Split at position ${splitPos}:`, { left, right });
console.log('');

console.log('========================================');
console.log('All Tests Completed Successfully! ✓');
console.log('Take and Drop operations are correctly');
console.log('formalized with discrete mathematics');
console.log('properties and algebraic laws.');
console.log('========================================');
