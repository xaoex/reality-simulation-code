/**
 * Young Discrete Mathematics Implementations
 * Common situations and areas for "Young" in Discrete Mathematics
 * 
 * Implements:
 * - Young Tableaux (standard and semi-standard)
 * - Young Diagrams (partition representations)
 * - Young Lattice (ordered partitions)
 * - Young's Rule (group theory)
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 */

// ============================================================================
// Young Diagram (Partition Representation)
// Based on partition theory in discrete mathematics
// ============================================================================

/**
 * Young Diagram - Graphical representation of integer partitions
 * 
 * A Young Diagram is a collection of boxes arranged in left-justified rows
 * with non-increasing row lengths, representing a partition of an integer n.
 * 
 * Example: Partition [4, 3, 1] represents:
 * ****
 * ***
 * *
 * 
 * This is a fundamental concept in combinatorics and representation theory.
 */
class YoungDiagram {
  /**
   * @param {Array<number>} partition - Array of positive integers in non-increasing order
   */
  constructor(partition = []) {
    // Validate and normalize partition
    this.partition = [...partition].filter(x => x > 0).sort((a, b) => b - a);
    if (this.partition.length === 0) {
      this.partition = [];
    }
  }

  /**
   * Get the size (sum) of the partition
   */
  size() {
    return this.partition.reduce((sum, val) => sum + val, 0);
  }

  /**
   * Get the number of rows
   */
  numRows() {
    return this.partition.length;
  }

  /**
   * Get the number of columns
   */
  numColumns() {
    return this.partition.length > 0 ? this.partition[0] : 0;
  }

  /**
   * Get the conjugate (transpose) partition
   * Flip the diagram along the main diagonal
   */
  conjugate() {
    if (this.partition.length === 0) return new YoungDiagram([]);
    
    const maxCol = this.partition[0];
    const conjugatePart = [];
    
    // Count boxes in each column
    for (let col = 0; col < maxCol; col++) {
      let count = 0;
      for (let row = 0; row < this.partition.length; row++) {
        if (this.partition[row] > col) {
          count++;
        }
      }
      conjugatePart.push(count);
    }
    
    return new YoungDiagram(conjugatePart);
  }

  /**
   * Check if this diagram contains another diagram
   * Used for ordering in Young Lattice
   */
  contains(otherDiagram) {
    if (this.size() < otherDiagram.size()) return false;
    
    for (let i = 0; i < otherDiagram.partition.length; i++) {
      if (i >= this.partition.length || this.partition[i] < otherDiagram.partition[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get all diagrams that can be obtained by adding one box
   */
  successors() {
    const result = [];
    
    // Add box to existing row
    for (let i = 0; i < this.partition.length; i++) {
      const newPart = [...this.partition];
      newPart[i]++;
      // Check if still valid (non-increasing)
      if (i === 0 || newPart[i] <= newPart[i - 1]) {
        result.push(new YoungDiagram(newPart));
      }
    }
    
    // Add new row with one box
    if (this.partition.length === 0 || this.partition[this.partition.length - 1] >= 1) {
      const newPart = [...this.partition, 1];
      result.push(new YoungDiagram(newPart));
    }
    
    return result;
  }

  /**
   * Get all diagrams that can be obtained by removing one box
   */
  predecessors() {
    const result = [];
    
    for (let i = 0; i < this.partition.length; i++) {
      const newPart = [...this.partition];
      newPart[i]--;
      
      // Check if still valid (positive and non-increasing)
      const isValid = newPart[i] > 0 && 
                      (i === this.partition.length - 1 || newPart[i] >= this.partition[i + 1]);
      
      if (isValid) {
        result.push(new YoungDiagram(newPart));
      } else if (newPart[i] === 0) {
        // Remove the row entirely
        newPart.splice(i, 1);
        result.push(new YoungDiagram(newPart));
      }
    }
    
    return result;
  }

  /**
   * Generate ASCII representation
   */
  toString() {
    if (this.partition.length === 0) return '(empty)';
    return this.partition.map(rowLen => '*'.repeat(rowLen)).join('\n');
  }

  /**
   * Get partition as array
   */
  toArray() {
    return [...this.partition];
  }

  /**
   * Check equality with another diagram
   */
  equals(other) {
    if (this.partition.length !== other.partition.length) return false;
    return this.partition.every((val, i) => val === other.partition[i]);
  }
}

// ============================================================================
// Young Tableau (Combinatorial Structure)
// ============================================================================

/**
 * Young Tableau - Filling of a Young Diagram with numbers
 * 
 * A Young Tableau is a Young Diagram where each box contains a number,
 * with specific ordering properties:
 * - Standard: Numbers 1..n appear exactly once, rows/cols increasing
 * - Semi-standard: Numbers can repeat, rows weakly increasing, cols strictly increasing
 * 
 * Used in representation theory, combinatorics, and algebraic geometry.
 */
class YoungTableau {
  /**
   * @param {Array<Array<number>>} filling - 2D array representing the tableau
   * @param {boolean} standard - Whether this is a standard tableau
   */
  constructor(filling = [[]], standard = false) {
    this.filling = filling.filter(row => row && row.length > 0);
    this.standard = standard;
    this.diagram = new YoungDiagram(this.filling.map(row => row.length));
  }

  /**
   * Get the shape (underlying diagram)
   */
  shape() {
    return this.diagram;
  }

  /**
   * Get the size (number of boxes)
   */
  size() {
    return this.diagram.size();
  }

  /**
   * Validate if this is a valid Young Tableau
   */
  isValid() {
    if (this.filling.length === 0) return true;
    
    // Check rows are weakly increasing
    for (const row of this.filling) {
      for (let i = 0; i < row.length - 1; i++) {
        if (this.standard && row[i] >= row[i + 1]) return false;
        if (!this.standard && row[i] > row[i + 1]) return false;
      }
    }
    
    // Check columns are strictly increasing
    for (let col = 0; col < this.filling[0].length; col++) {
      for (let row = 0; row < this.filling.length - 1; row++) {
        if (!this.filling[row + 1] || col >= this.filling[row + 1].length) continue;
        if (this.filling[row][col] >= this.filling[row + 1][col]) return false;
      }
    }
    
    // For standard tableau, check each number 1..n appears exactly once
    if (this.standard) {
      const nums = [];
      for (const row of this.filling) {
        nums.push(...row);
      }
      nums.sort((a, b) => a - b);
      const expectedSize = this.size();
      if (nums.length !== expectedSize) return false;
      for (let i = 0; i < expectedSize; i++) {
        if (nums[i] !== i + 1) return false;
      }
    }
    
    return true;
  }

  /**
   * Get the value at position (row, col)
   */
  get(row, col) {
    if (row >= this.filling.length || col >= this.filling[row].length) {
      return null;
    }
    return this.filling[row][col];
  }

  /**
   * Set the value at position (row, col)
   */
  set(row, col, value) {
    if (row >= this.filling.length || col >= this.filling[row].length) {
      return false;
    }
    this.filling[row][col] = value;
    return true;
  }

  /**
   * Generate ASCII representation
   */
  toString() {
    if (this.filling.length === 0) return '(empty)';
    
    // Find max width for padding
    const maxWidth = Math.max(...this.filling.flat().map(n => String(n).length));
    
    return this.filling.map(row => 
      row.map(val => String(val).padStart(maxWidth)).join(' ')
    ).join('\n');
  }

  /**
   * Get the reading word (read row by row, right to left)
   */
  readingWord() {
    const word = [];
    for (let row = this.filling.length - 1; row >= 0; row--) {
      for (let col = this.filling[row].length - 1; col >= 0; col--) {
        word.push(this.filling[row][col]);
      }
    }
    return word;
  }

  /**
   * Apply Robinson-Schensted insertion of a value
   * Used for constructing standard tableaux
   */
  insertValue(value) {
    const newFilling = this.filling.map(row => [...row]);
    let currentVal = value;
    let rowIdx = 0;
    
    while (currentVal !== null) {
      if (rowIdx >= newFilling.length) {
        // Add new row
        newFilling.push([currentVal]);
        currentVal = null;
      } else {
        // Find position in current row
        let insertPos = newFilling[rowIdx].length;
        for (let i = 0; i < newFilling[rowIdx].length; i++) {
          if (newFilling[rowIdx][i] > currentVal) {
            insertPos = i;
            break;
          }
        }
        
        if (insertPos === newFilling[rowIdx].length) {
          // Append to row
          newFilling[rowIdx].push(currentVal);
          currentVal = null;
        } else {
          // Bump existing value
          const bumped = newFilling[rowIdx][insertPos];
          newFilling[rowIdx][insertPos] = currentVal;
          currentVal = bumped;
          rowIdx++;
        }
      }
    }
    
    return new YoungTableau(newFilling, this.standard);
  }
}

// ============================================================================
// Young Lattice (Ordered Structure)
// ============================================================================

/**
 * Young Lattice - Partially ordered set of partitions
 * 
 * The Young Lattice is the poset of all integer partitions ordered by inclusion.
 * A partition λ covers μ if λ can be obtained from μ by adding one box.
 * 
 * This structure is fundamental in combinatorics and representation theory.
 */
class YoungLattice {
  constructor() {
    // Cache of computed levels
    this.levels = new Map();
    this.levels.set(0, [new YoungDiagram([])]);
  }

  /**
   * Get all diagrams at a given level (size n)
   */
  getLevel(n) {
    if (this.levels.has(n)) {
      return this.levels.get(n);
    }
    
    // Generate all partitions of n
    const partitions = this.generatePartitions(n);
    const diagrams = partitions.map(p => new YoungDiagram(p));
    
    this.levels.set(n, diagrams);
    return diagrams;
  }

  /**
   * Generate all integer partitions of n
   */
  generatePartitions(n, max = n) {
    if (n === 0) return [[]];
    if (n < 0) return [];
    
    const result = [];
    for (let i = Math.min(n, max); i >= 1; i--) {
      const subPartitions = this.generatePartitions(n - i, i);
      for (const sub of subPartitions) {
        result.push([i, ...sub]);
      }
    }
    
    return result;
  }

  /**
   * Count partitions of n (partition function p(n))
   */
  countPartitions(n) {
    return this.getLevel(n).length;
  }

  /**
   * Get all covering relations at level n
   * Returns pairs [smaller, larger] where larger covers smaller
   */
  getCoveringRelations(n) {
    if (n === 0) return [];
    
    const lowerLevel = this.getLevel(n - 1);
    const upperLevel = this.getLevel(n);
    const relations = [];
    
    for (const lower of lowerLevel) {
      for (const upper of upperLevel) {
        // Check if upper covers lower (differs by exactly one box)
        if (upper.contains(lower)) {
          // Verify it's a covering relation (differs by exactly one)
          const upperSum = upper.size();
          const lowerSum = lower.size();
          if (upperSum === lowerSum + 1) {
            relations.push([lower, upper]);
          }
        }
      }
    }
    
    return relations;
  }

  /**
   * Get the Hasse diagram up to level n
   * Returns structure with nodes and edges
   */
  getHasseDiagram(n) {
    const nodes = [];
    const edges = [];
    
    for (let level = 0; level <= n; level++) {
      const diagrams = this.getLevel(level);
      nodes.push(...diagrams.map(d => ({
        level,
        partition: d.toArray(),
        diagram: d
      })));
      
      if (level > 0) {
        const relations = this.getCoveringRelations(level);
        edges.push(...relations.map(([lower, upper]) => ({
          from: lower.toArray(),
          to: upper.toArray()
        })));
      }
    }
    
    return { nodes, edges };
  }

  /**
   * Get maximal chains from empty partition to partition of n
   * A maximal chain corresponds to a standard Young tableau
   */
  getMaximalChains(n) {
    if (n === 0) return [[]];
    
    const chains = [];
    const diagrams = this.getLevel(n);
    
    for (const diagram of diagrams) {
      this._buildChains(diagram, [], chains);
    }
    
    return chains;
  }

  /**
   * Helper: Build chains recursively
   */
  _buildChains(current, path, result) {
    const newPath = [current, ...path];
    
    if (current.size() === 0) {
      result.push(newPath.reverse());
      return;
    }
    
    const predecessors = current.predecessors();
    for (const pred of predecessors) {
      this._buildChains(pred, newPath, result);
    }
  }
}

// ============================================================================
// Young's Rule and Symmetrizer
// ============================================================================

/**
 * Young's Rule - For decomposing tensor products in representation theory
 * 
 * Given two partitions λ and μ, Young's Rule describes how to decompose
 * the tensor product of corresponding representations.
 */
class YoungsRule {
  /**
   * Apply Littlewood-Richardson rule to compute tensor product
   * Returns the multiplicities of irreducible representations
   * 
   * @param {Array<number>} lambda - First partition
   * @param {Array<number>} mu - Second partition
   * @returns {Map} Map from partition to multiplicity
   */
  static tensorProduct(lambda, mu) {
    // Simplified version: Just enumerate possible results
    // Full implementation would use Littlewood-Richardson coefficients
    
    const diagram1 = new YoungDiagram(lambda);
    const diagram2 = new YoungDiagram(mu);
    
    const n1 = diagram1.size();
    const n2 = diagram2.size();
    const totalSize = n1 + n2;
    
    const lattice = new YoungLattice();
    const possibleResults = lattice.getLevel(totalSize);
    
    // For simplicity, return all partitions of the combined size
    // A full implementation would compute Littlewood-Richardson coefficients
    const result = new Map();
    for (const diagram of possibleResults) {
      // Placeholder: assign multiplicity 1 to all valid partitions
      // Real implementation would compute actual multiplicities
      result.set(diagram.toArray().join(','), 1);
    }
    
    return result;
  }

  /**
   * Compute the dimension of the irreducible representation
   * corresponding to a partition using the hook length formula
   * 
   * @param {Array<number>} partition - Integer partition
   * @returns {number} Dimension of the representation
   */
  static hookLengthFormula(partition) {
    if (partition.length === 0) return 1;
    
    const diagram = new YoungDiagram(partition);
    const n = diagram.size();
    
    // Compute hook lengths
    const hooks = [];
    for (let i = 0; i < partition.length; i++) {
      for (let j = 0; j < partition[i]; j++) {
        // Hook length = arm length + leg length + 1
        let arm = partition[i] - j - 1;  // boxes to the right
        let leg = 0;  // boxes below
        for (let k = i + 1; k < partition.length; k++) {
          if (j < partition[k]) leg++;
        }
        hooks.push(arm + leg + 1);
      }
    }
    
    // Dimension = n! / (product of hook lengths)
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
      factorial *= i;
    }
    
    let hookProduct = 1;
    for (const h of hooks) {
      hookProduct *= h;
    }
    
    return factorial / hookProduct;
  }

  /**
   * Check if a partition is self-conjugate
   * (equals its own transpose)
   */
  static isSelfConjugate(partition) {
    const diagram = new YoungDiagram(partition);
    const conjugate = diagram.conjugate();
    return diagram.equals(conjugate);
  }
}

// ============================================================================
// Factory Functions and Examples
// ============================================================================

/**
 * Create a standard Young Tableau from a permutation
 * using Robinson-Schensted correspondence
 */
function createStandardTableauFromPermutation(permutation) {
  let tableau = new YoungTableau([[]], true);
  
  for (const value of permutation) {
    tableau = tableau.insertValue(value);
  }
  
  return tableau;
}

/**
 * Example: Generate all partitions up to n
 */
function partitionsExample(n = 5) {
  const lattice = new YoungLattice();
  const result = {};
  
  for (let i = 0; i <= n; i++) {
    const partitions = lattice.getLevel(i).map(d => d.toArray());
    result[i] = partitions;
  }
  
  return result;
}

/**
 * Example: Demonstrate Young Diagram operations
 */
function youngDiagramExample() {
  const diagram = new YoungDiagram([4, 3, 1]);
  
  return {
    partition: diagram.toArray(),
    size: diagram.size(),
    rows: diagram.numRows(),
    cols: diagram.numColumns(),
    ascii: diagram.toString(),
    conjugate: diagram.conjugate().toArray(),
    successors: diagram.successors().map(d => d.toArray()),
    predecessors: diagram.predecessors().map(d => d.toArray())
  };
}

/**
 * Example: Create and validate Young Tableau
 */
function youngTableauExample() {
  // Standard Young Tableau
  const tableau = new YoungTableau([
    [1, 2, 5],
    [3, 4],
    [6]
  ], true);
  
  return {
    filling: tableau.filling,
    shape: tableau.shape().toArray(),
    size: tableau.size(),
    valid: tableau.isValid(),
    ascii: tableau.toString(),
    readingWord: tableau.readingWord()
  };
}

/**
 * Example: Demonstrate hook length formula
 */
function hookLengthExample() {
  const partitions = [[3, 2, 1], [4, 2], [2, 2, 2], [5, 1]];
  const results = {};
  
  for (const partition of partitions) {
    const dim = YoungsRule.hookLengthFormula(partition);
    results[partition.join(',')] = {
      partition,
      dimension: dim,
      size: partition.reduce((a, b) => a + b, 0)
    };
  }
  
  return results;
}

/**
 * Example: Young Lattice structure
 */
function youngLatticeExample(n = 4) {
  const lattice = new YoungLattice();
  
  return {
    partitionCounts: Array.from({length: n + 1}, (_, i) => ({
      n: i,
      count: lattice.countPartitions(i),
      partitions: lattice.getLevel(i).map(d => d.toArray())
    })),
    hassDiagram: lattice.getHasseDiagram(3)
  };
}

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  // Classes
  YoungDiagram,
  YoungTableau,
  YoungLattice,
  YoungsRule,
  
  // Factory functions
  createStandardTableauFromPermutation,
  
  // Examples
  partitionsExample,
  youngDiagramExample,
  youngTableauExample,
  hookLengthExample,
  youngLatticeExample
};
