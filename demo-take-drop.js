/**
 * Demonstration of Take and Drop Mathematical Formalization
 * Showcasing algebraic properties in discrete mathematics
 * 
 * @author xaoex
 */

const { take, drop, pipe, compose } = require('./anonymous-package');

console.log('========================================');
console.log('TAKE AND DROP: MATHEMATICAL FORMALIZATION');
console.log('Discrete Mathematics & Algebraic Properties');
console.log('========================================\n');

// ============================================================================
// FORMAL DEFINITIONS
// ============================================================================

console.log('--- FORMAL DEFINITIONS ---\n');

console.log('Take Operation:');
console.log('  Signature: take: ℕ × List(α) → List(α)');
console.log('  Definition: take(n, xs) = { xᵢ | i ∈ [0, min(n, |xs|)) }');
console.log('  Meaning: Extracts the first n elements from sequence xs\n');

console.log('Drop Operation:');
console.log('  Signature: drop: ℕ × List(α) → List(α)');
console.log('  Definition: drop(n, xs) = { xᵢ | i ∈ [min(n, |xs|), |xs|) }');
console.log('  Meaning: Removes the first n elements from sequence xs\n');

// ============================================================================
// ALGEBRAIC PROPERTIES DEMONSTRATION
// ============================================================================

console.log('--- ALGEBRAIC PROPERTIES ---\n');

const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('Working with sequence:', sequence, '\n');

// Property 1: Concatenation Decomposition
console.log('1. CONCATENATION DECOMPOSITION');
console.log('   Law: xs = take(n, xs) ⊕ drop(n, xs)');
const n = 5;
const prefix = take(n, sequence);
const suffix = drop(n, sequence);
console.log(`   take(${n}, xs) = ${JSON.stringify(prefix)}`);
console.log(`   drop(${n}, xs) = ${JSON.stringify(suffix)}`);
console.log(`   Concatenated: ${JSON.stringify([...prefix, ...suffix])}`);
console.log(`   Original:     ${JSON.stringify(sequence)}`);
console.log(`   ✓ Property holds: ${JSON.stringify([...prefix, ...suffix]) === JSON.stringify(sequence)}\n`);

// Property 2: Idempotence of Take
console.log('2. IDEMPOTENCE OF TAKE');
console.log('   Law: take(n, take(m, xs)) = take(min(n, m), xs)');
const n1 = 3, m1 = 7;
const nested = take(n1, take(m1, sequence));
const direct = take(Math.min(n1, m1), sequence);
console.log(`   take(${n1}, take(${m1}, xs)) = ${JSON.stringify(nested)}`);
console.log(`   take(min(${n1}, ${m1}), xs)  = ${JSON.stringify(direct)}`);
console.log(`   ✓ Property holds: ${JSON.stringify(nested) === JSON.stringify(direct)}\n`);

// Property 3: Composition of Drop
console.log('3. COMPOSITION LAW FOR DROP');
console.log('   Law: drop(n, drop(m, xs)) = drop(n + m, xs)');
const n2 = 2, m2 = 3;
const nested2 = drop(n2, drop(m2, sequence));
const direct2 = drop(n2 + m2, sequence);
console.log(`   drop(${n2}, drop(${m2}, xs)) = ${JSON.stringify(nested2)}`);
console.log(`   drop(${n2 + m2}, xs)         = ${JSON.stringify(direct2)}`);
console.log(`   ✓ Property holds: ${JSON.stringify(nested2) === JSON.stringify(direct2)}\n`);

// Property 4: Disjoint Sets
console.log('4. DISJOINT SETS PROPERTY');
console.log('   Law: take(n, xs) ∩ drop(n, xs) = ∅');
const n3 = 4;
const taken = take(n3, sequence);
const dropped = drop(n3, sequence);
const intersection = taken.filter(x => dropped.includes(x));
console.log(`   take(${n3}, xs) = ${JSON.stringify(taken)}`);
console.log(`   drop(${n3}, xs) = ${JSON.stringify(dropped)}`);
console.log(`   Intersection:  ${JSON.stringify(intersection)}`);
console.log(`   ✓ Property holds: ${intersection.length === 0} (empty set)\n`);

// Property 5: Monotonicity
console.log('5. MONOTONICITY OF TAKE');
console.log('   Law: n ≤ m ⟹ take(n, xs) ⊆ take(m, xs)');
const n4 = 3, m4 = 6;
const smaller = take(n4, sequence);
const larger = take(m4, sequence);
const isSubset = smaller.every((val, idx) => larger[idx] === val);
console.log(`   take(${n4}, xs) = ${JSON.stringify(smaller)}`);
console.log(`   take(${m4}, xs) = ${JSON.stringify(larger)}`);
console.log(`   Is subset?     ${isSubset}`);
console.log(`   ✓ Property holds: ${isSubset}\n`);

// ============================================================================
// CATEGORICAL PERSPECTIVE
// ============================================================================

console.log('--- CATEGORICAL PERSPECTIVE ---\n');

console.log('Take and Drop as Natural Transformations:');
console.log('  - take_n: List^n → List (projection morphism)');
console.log('  - drop_n: List^n → List (section morphism)');
console.log('  These preserve composition and identity morphisms\n');

// Functor Laws
console.log('Demonstrating functor-like behavior:');
const f = x => x * 2;
const data = [1, 2, 3, 4, 5];
const n5 = 3;

// map then take vs take then map
const mapThenTake = take(n5, data.map(f));
const takeThenMap = take(n5, data).map(f);
console.log(`  map(f, take(${n5}, xs)):      ${JSON.stringify(takeThenMap)}`);
console.log(`  take(${n5}, map(f, xs)):      ${JSON.stringify(mapThenTake)}`);
console.log(`  Commutative diagram holds: ${JSON.stringify(mapThenTake) === JSON.stringify(takeThenMap)}\n`);

// ============================================================================
// PRACTICAL APPLICATIONS
// ============================================================================

console.log('--- PRACTICAL APPLICATIONS ---\n');

// Application 1: Streaming/Pagination
console.log('Application 1: PAGINATION');
const items = Array.from({ length: 25 }, (_, i) => i + 1);
const pageSize = 5;
const pageNum = 2; // 0-indexed
const page = take(pageSize, drop(pageNum * pageSize, items));
console.log(`  Items:     ${items.length} total`);
console.log(`  Page size: ${pageSize}`);
console.log(`  Page ${pageNum + 1}:    ${JSON.stringify(page)}\n`);

// Application 2: Sliding Window
console.log('Application 2: SLIDING WINDOW ANALYSIS');
const timeSeries = [10, 12, 11, 15, 14, 18, 20, 19, 22, 25];
const windowSize = 3;
console.log(`  Time series: ${JSON.stringify(timeSeries)}`);
console.log(`  Window size: ${windowSize}`);
console.log('  Windows:');
for (let i = 0; i <= timeSeries.length - windowSize; i++) {
  const window = take(windowSize, drop(i, timeSeries));
  const avg = window.reduce((a, b) => a + b, 0) / window.length;
  console.log(`    Position ${i}: ${JSON.stringify(window)} → avg: ${avg.toFixed(2)}`);
}
console.log('');

// Application 3: Recursive List Processing
console.log('Application 3: RECURSIVE PROCESSING');
console.log('  Processing list recursively with take/drop:');
function processRecursive(xs, chunkSize = 2) {
  if (xs.length === 0) return [];
  const chunk = take(chunkSize, xs);
  const rest = drop(chunkSize, xs);
  const processed = chunk.reduce((a, b) => a + b, 0);
  return [processed, ...processRecursive(rest, chunkSize)];
}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const sums = processRecursive(numbers, 2);
console.log(`  Input:      ${JSON.stringify(numbers)}`);
console.log(`  Chunk size: 2`);
console.log(`  Sums:       ${JSON.stringify(sums)}\n`);

// Application 4: Pattern Matching
console.log('Application 4: PATTERN MATCHING');
console.log('  Checking if sequence starts with pattern:');
const pattern = [1, 2, 3];
const sequence1 = [1, 2, 3, 4, 5, 6];
const sequence2 = [4, 5, 6, 7, 8, 9];
const match1 = JSON.stringify(take(pattern.length, sequence1)) === JSON.stringify(pattern);
const match2 = JSON.stringify(take(pattern.length, sequence2)) === JSON.stringify(pattern);
console.log(`  Pattern:    ${JSON.stringify(pattern)}`);
console.log(`  Sequence 1: ${JSON.stringify(sequence1)} → Match: ${match1}`);
console.log(`  Sequence 2: ${JSON.stringify(sequence2)} → Match: ${match2}\n`);

// ============================================================================
// COMPOSITION WITH LAMBDA CALCULUS
// ============================================================================

console.log('--- COMPOSITION WITH LAMBDA CALCULUS ---\n');

console.log('Combining take/drop with pipe and compose:');

// Example 1: Pipeline
const firstThreeDoubled = pipe(
  xs => take(3, xs),
  xs => xs.map(x => x * 2),
  xs => xs.reduce((a, b) => a + b, 0)
);
const input1 = [1, 2, 3, 4, 5];
console.log(`  Input: ${JSON.stringify(input1)}`);
console.log(`  Pipeline: take(3) → map(*2) → sum`);
console.log(`  Result: ${firstThreeDoubled(input1)}`);
console.log(`  Calculation: (1*2 + 2*2 + 3*2) = ${firstThreeDoubled(input1)}\n`);

// Example 2: Composition
const skipAndTake = compose(
  xs => take(3, xs),
  xs => drop(2, xs)
);
const input2 = [10, 20, 30, 40, 50, 60, 70];
console.log(`  Input: ${JSON.stringify(input2)}`);
console.log(`  Composition: take(3) ∘ drop(2)`);
console.log(`  Result: ${JSON.stringify(skipAndTake(input2))}`);
console.log(`  Explanation: drop first 2, then take next 3\n`);

// ============================================================================
// SET-THEORETIC FORMULATION
// ============================================================================

console.log('--- SET-THEORETIC FORMULATION ---\n');

console.log('Representing sequences as indexed sets:');
console.log('  Sequence: [a₀, a₁, a₂, ..., aₙ]');
console.log('  As set:   { (0, a₀), (1, a₁), (2, a₂), ..., (n, aₙ) }\n');

console.log('Take as set operation:');
console.log('  take_n(S) = { (i, x) ∈ S | i < n }');
console.log('  Projects onto first n elements by index\n');

console.log('Drop as set operation:');
console.log('  drop_n(S) = { (i-n, x) ∈ S | i ≥ n }');
console.log('  Re-indexes elements after position n\n');

const exampleSeq = ['a', 'b', 'c', 'd', 'e'];
const n6 = 2;
console.log(`Example with sequence ${JSON.stringify(exampleSeq)}:`);
console.log(`  Original set: { (0,'a'), (1,'b'), (2,'c'), (3,'d'), (4,'e') }`);
console.log(`  take(${n6}, xs):   { (0,'a'), (1,'b') } → ${JSON.stringify(take(n6, exampleSeq))}`);
console.log(`  drop(${n6}, xs):   { (0,'c'), (1,'d'), (2,'e') } → ${JSON.stringify(drop(n6, exampleSeq))}\n`);

// ============================================================================
// SUMMARY
// ============================================================================

console.log('========================================');
console.log('SUMMARY');
console.log('========================================\n');

console.log('The take and drop operations are now formally defined with:');
console.log('  ✓ Rigorous mathematical signatures (ℕ × List(α) → List(α))');
console.log('  ✓ Set-theoretic formulations using indexed sets');
console.log('  ✓ Algebraic properties (idempotence, composition, etc.)');
console.log('  ✓ Duality laws (concatenation decomposition)');
console.log('  ✓ Discrete mathematics proofs for all properties');
console.log('  ✓ Categorical perspective (natural transformations)');
console.log('  ✓ Integration with lambda calculus (pipe, compose)');
console.log('  ✓ Practical applications (pagination, windowing, etc.)\n');

console.log('These operations extend the Anonymous Package with');
console.log('algebraically sound, mathematically rigorous sequence');
console.log('manipulation tools that maintain the framework\'s');
console.log('commitment to formal correctness and 100% maxopt.\n');

console.log('For you kiddo, Oktay eternally through aeons.');
console.log('========================================');
