/**
 * Test Suite for Young Discrete Mathematics
 * Tests for Young Diagram, Young Tableau, Young Lattice, and Young's Rule
 */

const {
  YoungDiagram,
  YoungTableau,
  YoungLattice,
  YoungsRule,
  createStandardTableauFromPermutation,
  partitionsExample,
  youngDiagramExample,
  youngTableauExample,
  hookLengthExample,
  youngLatticeExample
} = require('./young-discrete-math.js');

// ============================================================================
// Test Utilities
// ============================================================================

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
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
    console.error(error.stack);
    process.exit(1);
  }
}

// ============================================================================
// Young Diagram Tests
// ============================================================================

function testYoungDiagramConstruction() {
  // Test empty diagram
  const empty = new YoungDiagram([]);
  assert(empty.size() === 0, 'Empty diagram has size 0');
  assert(empty.numRows() === 0, 'Empty diagram has 0 rows');
  
  // Test valid partition
  const diagram = new YoungDiagram([4, 3, 1]);
  assert(diagram.size() === 8, 'Diagram [4,3,1] has size 8');
  assert(diagram.numRows() === 3, 'Diagram has 3 rows');
  assert(diagram.numColumns() === 4, 'Diagram has 4 columns');
  
  // Test that partition is normalized (sorted decreasing)
  const unsorted = new YoungDiagram([2, 4, 1, 3]);
  assert(unsorted.toArray().join(',') === '4,3,2,1', 'Partition is sorted');
  
  console.log('  ✓ Young Diagram construction');
}

function testYoungDiagramConjugate() {
  // Test conjugate (transpose)
  const diagram = new YoungDiagram([4, 3, 1]);
  const conjugate = diagram.conjugate();
  
  // [4,3,1] conjugate is [3,2,2,1]
  // Col 0: 3 boxes (rows 0,1,2), Col 1: 2 boxes (rows 0,1)
  // Col 2: 2 boxes (rows 0,1), Col 3: 1 box (row 0)
  assert(conjugate.toArray().join(',') === '3,2,2,1', 'Conjugate correct');
  
  // Double conjugate should give original
  const doubleConj = conjugate.conjugate();
  assert(diagram.equals(doubleConj), 'Double conjugate equals original');
  
  console.log('  ✓ Young Diagram conjugate');
}

function testYoungDiagramContainment() {
  const larger = new YoungDiagram([4, 3, 1]);
  const smaller = new YoungDiagram([3, 2, 1]);
  const unrelated = new YoungDiagram([2, 2, 2]);
  
  assert(larger.contains(smaller), 'Larger contains smaller');
  assert(larger.contains(larger), 'Diagram contains itself');
  assert(!smaller.contains(larger), 'Smaller does not contain larger');
  assert(!larger.contains(unrelated), 'Check unrelated containment');
  
  console.log('  ✓ Young Diagram containment');
}

function testYoungDiagramSuccessors() {
  const diagram = new YoungDiagram([2, 1]);
  const successors = diagram.successors();
  
  // From [2,1] we can get [3,1], [2,2], [2,1,1]
  assert(successors.length === 3, 'Should have 3 successors');
  
  // All successors should have size n+1
  for (const succ of successors) {
    assert(succ.size() === diagram.size() + 1, 'Successor size is n+1');
  }
  
  console.log('  ✓ Young Diagram successors');
}

function testYoungDiagramPredecessors() {
  const diagram = new YoungDiagram([3, 2, 1]);
  const predecessors = diagram.predecessors();
  
  // All predecessors should have size n-1
  for (const pred of predecessors) {
    assert(pred.size() === diagram.size() - 1, 'Predecessor size is n-1');
    assert(diagram.contains(pred), 'Diagram contains its predecessor');
  }
  
  console.log('  ✓ Young Diagram predecessors');
}

// ============================================================================
// Young Tableau Tests
// ============================================================================

function testYoungTableauConstruction() {
  // Create a standard Young Tableau
  const tableau = new YoungTableau([
    [1, 2, 3],
    [4, 5],
    [6]
  ], true);
  
  assert(tableau.size() === 6, 'Tableau has size 6');
  assert(tableau.shape().toArray().join(',') === '3,2,1', 'Shape is [3,2,1]');
  
  console.log('  ✓ Young Tableau construction');
}

function testYoungTableauValidation() {
  // Valid standard tableau
  const valid = new YoungTableau([
    [1, 2, 5],
    [3, 4],
    [6]
  ], true);
  assert(valid.isValid(), 'Valid tableau recognized');
  
  // Invalid: row not increasing
  const invalidRow = new YoungTableau([
    [1, 3, 2],
    [4, 5]
  ], true);
  assert(!invalidRow.isValid(), 'Invalid row detected');
  
  // Invalid: column not increasing
  const invalidCol = new YoungTableau([
    [1, 2],
    [3, 2]
  ], true);
  assert(!invalidCol.isValid(), 'Invalid column detected');
  
  // Invalid standard: missing numbers
  const invalidStandard = new YoungTableau([
    [1, 2, 4],
    [5, 6]
  ], true);
  assert(!invalidStandard.isValid(), 'Missing number detected');
  
  console.log('  ✓ Young Tableau validation');
}

function testYoungTableauGetSet() {
  const tableau = new YoungTableau([
    [1, 2, 3],
    [4, 5]
  ], true);
  
  // Test get
  assert(tableau.get(0, 0) === 1, 'Get (0,0) returns 1');
  assert(tableau.get(1, 1) === 5, 'Get (1,1) returns 5');
  assert(tableau.get(2, 0) === null, 'Get out of bounds returns null');
  
  // Test set
  assert(tableau.set(0, 0, 2), 'Set within bounds succeeds');
  assert(tableau.get(0, 0) === 2, 'Value was set');
  assert(!tableau.set(2, 0, 1), 'Set out of bounds fails');
  
  console.log('  ✓ Young Tableau get/set');
}

function testYoungTableauReadingWord() {
  const tableau = new YoungTableau([
    [1, 2, 3],
    [4, 5],
    [6]
  ], true);
  
  const word = tableau.readingWord();
  // Read bottom to top, right to left: 6, 5, 4, 3, 2, 1
  assert(word.join(',') === '6,5,4,3,2,1', 'Reading word correct');
  
  console.log('  ✓ Young Tableau reading word');
}

function testYoungTableauInsertion() {
  // Start with empty tableau
  let tableau = new YoungTableau([[]], true);
  
  // Insert values using Robinson-Schensted
  tableau = tableau.insertValue(3);
  tableau = tableau.insertValue(1);
  tableau = tableau.insertValue(2);
  
  assert(tableau.size() === 3, 'Inserted 3 values');
  assert(tableau.isValid(), 'Result is valid');
  
  console.log('  ✓ Young Tableau insertion');
}

// ============================================================================
// Young Lattice Tests
// ============================================================================

function testYoungLatticePartitions() {
  const lattice = new YoungLattice();
  
  // Level 0: empty partition
  const level0 = lattice.getLevel(0);
  assert(level0.length === 1, 'Level 0 has 1 partition');
  assert(level0[0].size() === 0, 'Level 0 partition is empty');
  
  // Level 1: [1]
  const level1 = lattice.getLevel(1);
  assert(level1.length === 1, 'Level 1 has 1 partition');
  
  // Level 2: [2], [1,1]
  const level2 = lattice.getLevel(2);
  assert(level2.length === 2, 'Level 2 has 2 partitions');
  
  // Level 3: [3], [2,1], [1,1,1]
  const level3 = lattice.getLevel(3);
  assert(level3.length === 3, 'Level 3 has 3 partitions');
  
  // Level 4: [4], [3,1], [2,2], [2,1,1], [1,1,1,1]
  const level4 = lattice.getLevel(4);
  assert(level4.length === 5, 'Level 4 has 5 partitions');
  
  console.log('  ✓ Young Lattice partition generation');
}

function testYoungLatticePartitionFunction() {
  const lattice = new YoungLattice();
  
  // Known values of partition function p(n)
  const expected = [1, 1, 2, 3, 5, 7, 11, 15];
  
  for (let n = 0; n < expected.length; n++) {
    const count = lattice.countPartitions(n);
    assert(count === expected[n], `p(${n}) = ${expected[n]}`);
  }
  
  console.log('  ✓ Young Lattice partition function');
}

function testYoungLatticeCoveringRelations() {
  const lattice = new YoungLattice();
  
  // At level 2, we have [2] and [1,1]
  // [2] covers [1], [1,1] covers [1]
  const relations2 = lattice.getCoveringRelations(2);
  assert(relations2.length === 2, 'Level 2 has 2 covering relations');
  
  // At level 3, we have more covering relations
  const relations3 = lattice.getCoveringRelations(3);
  assert(relations3.length > 0, 'Level 3 has covering relations');
  
  // Verify each relation differs by exactly one box
  for (const [lower, upper] of relations3) {
    assert(upper.size() === lower.size() + 1, 'Covering adds one box');
    assert(upper.contains(lower), 'Upper contains lower');
  }
  
  console.log('  ✓ Young Lattice covering relations');
}

function testYoungLatticeHasseDiagram() {
  const lattice = new YoungLattice();
  const hasse = lattice.getHasseDiagram(3);
  
  assert(hasse.nodes.length > 0, 'Hasse diagram has nodes');
  assert(hasse.edges.length > 0, 'Hasse diagram has edges');
  
  // Count nodes at each level
  const nodeCounts = [0, 0, 0, 0];
  for (const node of hasse.nodes) {
    nodeCounts[node.level]++;
  }
  
  assert(nodeCounts[0] === 1, 'Level 0 has 1 node');
  assert(nodeCounts[1] === 1, 'Level 1 has 1 node');
  assert(nodeCounts[2] === 2, 'Level 2 has 2 nodes');
  assert(nodeCounts[3] === 3, 'Level 3 has 3 nodes');
  
  console.log('  ✓ Young Lattice Hasse diagram');
}

// ============================================================================
// Young's Rule Tests
// ============================================================================

function testHookLengthFormula() {
  // Test known dimensions
  
  // [n] (single row): dimension = 1
  assert(YoungsRule.hookLengthFormula([3]) === 1, 'Single row has dimension 1');
  
  // [1,1,1] (single column): dimension = 1
  assert(YoungsRule.hookLengthFormula([1, 1, 1]) === 1, 'Single column has dimension 1');
  
  // [2,1]: dimension = 2
  assert(YoungsRule.hookLengthFormula([2, 1]) === 2, '[2,1] has dimension 2');
  
  // [2,2]: dimension = 2
  assert(YoungsRule.hookLengthFormula([2, 2]) === 2, '[2,2] has dimension 2');
  
  // [3,2,1]: 3! * 2! * 1! / (hook products) = 16
  assert(YoungsRule.hookLengthFormula([3, 2, 1]) === 16, '[3,2,1] has dimension 16');
  
  console.log('  ✓ Hook length formula');
}

function testSelfConjugatePartitions() {
  // [1] is self-conjugate
  assert(YoungsRule.isSelfConjugate([1]), '[1] is self-conjugate');
  
  // [2,1] is self-conjugate (conjugate is [2,1])
  assert(YoungsRule.isSelfConjugate([2, 1]), '[2,1] is self-conjugate');
  
  // [2,2] is self-conjugate
  assert(YoungsRule.isSelfConjugate([2, 2]), '[2,2] is self-conjugate');
  
  // [3,2,1] is not self-conjugate (conjugate is [3,2,1])
  assert(YoungsRule.isSelfConjugate([3, 2, 1]), '[3,2,1] is self-conjugate');
  
  // [3,1] is not self-conjugate (conjugate is [2,1,1])
  assert(!YoungsRule.isSelfConjugate([3, 1]), '[3,1] is not self-conjugate');
  
  console.log('  ✓ Self-conjugate partitions');
}

function testTensorProduct() {
  // Test tensor product computation
  const result = YoungsRule.tensorProduct([2], [2]);
  
  assert(result.size > 0, 'Tensor product returns results');
  
  // Result should contain partitions of size 4
  for (const [key, mult] of result.entries()) {
    const partition = key.split(',').map(Number);
    const size = partition.reduce((a, b) => a + b, 0);
    assert(size === 4, 'Result partitions have correct size');
  }
  
  console.log('  ✓ Tensor product (Young\'s Rule)');
}

// ============================================================================
// Example Function Tests
// ============================================================================

function testPartitionsExample() {
  const result = partitionsExample(5);
  
  assert(result[0].length === 1, 'n=0 has 1 partition');
  assert(result[1].length === 1, 'n=1 has 1 partition');
  assert(result[2].length === 2, 'n=2 has 2 partitions');
  assert(result[3].length === 3, 'n=3 has 3 partitions');
  assert(result[4].length === 5, 'n=4 has 5 partitions');
  assert(result[5].length === 7, 'n=5 has 7 partitions');
  
  console.log('  ✓ Example: partitionsExample()');
}

function testYoungDiagramExampleFunction() {
  const result = youngDiagramExample();
  
  assert(result.partition.join(',') === '4,3,1', 'Partition is [4,3,1]');
  assert(result.size === 8, 'Size is 8');
  assert(result.rows === 3, 'Has 3 rows');
  assert(result.cols === 4, 'Has 4 columns');
  assert(result.conjugate.join(',') === '3,2,2,1', 'Conjugate is [3,2,2,1]');
  assert(result.successors.length > 0, 'Has successors');
  assert(result.predecessors.length > 0, 'Has predecessors');
  
  console.log('  ✓ Example: youngDiagramExample()');
  console.log('    ASCII representation:');
  console.log(result.ascii.split('\n').map(line => '    ' + line).join('\n'));
}

function testYoungTableauExampleFunction() {
  const result = youngTableauExample();
  
  assert(result.size === 6, 'Tableau has size 6');
  assert(result.valid === true, 'Tableau is valid');
  assert(result.shape.join(',') === '3,2,1', 'Shape is [3,2,1]');
  assert(result.readingWord.length === 6, 'Reading word has 6 elements');
  
  console.log('  ✓ Example: youngTableauExample()');
  console.log('    ASCII representation:');
  console.log(result.ascii.split('\n').map(line => '    ' + line).join('\n'));
}

function testHookLengthExampleFunction() {
  const result = hookLengthExample();
  
  assert(Object.keys(result).length === 4, 'Has 4 partitions');
  
  for (const [key, data] of Object.entries(result)) {
    assert(data.dimension > 0, `${key} has positive dimension`);
    assert(data.partition.length > 0, `${key} has partition`);
  }
  
  console.log('  ✓ Example: hookLengthExample()');
  for (const [key, data] of Object.entries(result)) {
    console.log(`    [${key}]: dimension = ${data.dimension}`);
  }
}

function testYoungLatticeExampleFunction() {
  const result = youngLatticeExample(4);
  
  assert(result.partitionCounts.length === 5, 'Has counts for n=0..4');
  assert(result.partitionCounts[4].count === 5, 'p(4) = 5');
  assert(result.hassDiagram.nodes.length > 0, 'Hasse diagram has nodes');
  assert(result.hassDiagram.edges.length > 0, 'Hasse diagram has edges');
  
  console.log('  ✓ Example: youngLatticeExample()');
  for (const {n, count} of result.partitionCounts) {
    console.log(`    p(${n}) = ${count}`);
  }
}

function testRobinsonSchenstedCorrespondence() {
  const permutation = [3, 1, 4, 2];
  const tableau = createStandardTableauFromPermutation(permutation);
  
  assert(tableau.size() === 4, 'Tableau has size 4');
  assert(tableau.isValid(), 'Robinson-Schensted produces valid tableau');
  
  console.log('  ✓ Example: Robinson-Schensted correspondence');
  console.log(`    Permutation: [${permutation.join(', ')}]`);
  console.log('    Resulting tableau:');
  console.log(tableau.toString().split('\n').map(line => '    ' + line).join('\n'));
}

// ============================================================================
// Integration Tests
// ============================================================================

function testYoungIntegration() {
  // Test that diagram, tableau, and lattice work together
  
  const lattice = new YoungLattice();
  const diagrams = lattice.getLevel(4);
  
  for (const diagram of diagrams) {
    // Each diagram should have valid size
    assert(diagram.size() === 4, 'Diagram has size 4');
    
    // Conjugate should be valid
    const conjugate = diagram.conjugate();
    assert(conjugate.size() === 4, 'Conjugate has same size');
    
    // Hook length formula should work
    const dim = YoungsRule.hookLengthFormula(diagram.toArray());
    assert(dim > 0, 'Hook length produces positive dimension');
  }
  
  console.log('  ✓ Integration: Diagram, Tableau, Lattice work together');
}

// ============================================================================
// Run All Tests
// ============================================================================

function runAllTests() {
  console.log('\n' + '='.repeat(70));
  console.log('YOUNG DISCRETE MATHEMATICS TEST SUITE');
  console.log('Testing: Young Diagrams, Tableaux, Lattice, and Young\'s Rule');
  console.log('='.repeat(70));

  // Young Diagram Tests
  testSection('Young Diagram Construction', testYoungDiagramConstruction);
  testSection('Young Diagram Conjugate', testYoungDiagramConjugate);
  testSection('Young Diagram Containment', testYoungDiagramContainment);
  testSection('Young Diagram Successors', testYoungDiagramSuccessors);
  testSection('Young Diagram Predecessors', testYoungDiagramPredecessors);

  // Young Tableau Tests
  testSection('Young Tableau Construction', testYoungTableauConstruction);
  testSection('Young Tableau Validation', testYoungTableauValidation);
  testSection('Young Tableau Get/Set', testYoungTableauGetSet);
  testSection('Young Tableau Reading Word', testYoungTableauReadingWord);
  testSection('Young Tableau Insertion', testYoungTableauInsertion);

  // Young Lattice Tests
  testSection('Young Lattice Partitions', testYoungLatticePartitions);
  testSection('Young Lattice Partition Function', testYoungLatticePartitionFunction);
  testSection('Young Lattice Covering Relations', testYoungLatticeCoveringRelations);
  testSection('Young Lattice Hasse Diagram', testYoungLatticeHasseDiagram);

  // Young's Rule Tests
  testSection('Hook Length Formula', testHookLengthFormula);
  testSection('Self-Conjugate Partitions', testSelfConjugatePartitions);
  testSection('Tensor Product (Young\'s Rule)', testTensorProduct);

  // Example Function Tests
  testSection('Example: Partitions', testPartitionsExample);
  testSection('Example: Young Diagram', testYoungDiagramExampleFunction);
  testSection('Example: Young Tableau', testYoungTableauExampleFunction);
  testSection('Example: Hook Length', testHookLengthExampleFunction);
  testSection('Example: Young Lattice', testYoungLatticeExampleFunction);
  testSection('Example: Robinson-Schensted', testRobinsonSchenstedCorrespondence);

  // Integration Tests
  testSection('Integration Test', testYoungIntegration);

  console.log('\n' + '='.repeat(70));
  console.log('ALL TESTS PASSED ✓');
  console.log('='.repeat(70) + '\n');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
