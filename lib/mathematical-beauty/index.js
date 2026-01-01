/**
 * Mathematical Beauty Module
 * 
 * Series and sequences that exhibit mathematical beauty:
 * - Fibonacci sequence
 * - Lucas numbers
 * - Golden ratio phi (φ)
 * - Tribonacci sequence
 * - Padovan sequence
 * 
 * Integrated with 4-part temporal situation model:
 * - prepre: Historical context (t-2)
 * - pre: Previous state (t-1)
 * - current: Current state (t)
 * - post: Next state (t+1)
 * - lore: Accumulated wisdom/patterns from all states
 * 
 * @module mathematical-beauty
 * @author xaoex
 */

const { createRationalField } = require('../young-field');
const { YoungSituation } = require('../young-situation');

/**
 * Mathematical Beauty Series Generator
 * 
 * Generates beautiful mathematical sequences with temporal awareness
 */
class MathematicalBeauty {
  constructor() {
    this.field = createRationalField();
    this.PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.sequences = new Map(); // Store generated sequences
    this.lore = new Map(); // Store accumulated patterns
  }

  /**
   * Generate Fibonacci sequence
   * F(n) = F(n-1) + F(n-2), with F(0)=0, F(1)=1
   */
  fibonacci(n) {
    if (n < 0) return 0;
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    const seq = [0, 1];
    for (let i = 2; i <= n; i++) {
      seq[i] = seq[i - 1] + seq[i - 2];
    }
    
    this._storeLore('fibonacci', seq);
    return seq[n];
  }

  /**
   * Generate Lucas numbers
   * L(n) = L(n-1) + L(n-2), with L(0)=2, L(1)=1
   */
  lucas(n) {
    if (n < 0) return 2;
    if (n === 0) return 2;
    if (n === 1) return 1;
    
    const seq = [2, 1];
    for (let i = 2; i <= n; i++) {
      seq[i] = seq[i - 1] + seq[i - 2];
    }
    
    this._storeLore('lucas', seq);
    return seq[n];
  }

  /**
   * Generate Tribonacci sequence
   * T(n) = T(n-1) + T(n-2) + T(n-3), with T(0)=0, T(1)=0, T(2)=1
   */
  tribonacci(n) {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 0;
    if (n === 2) return 1;
    
    const seq = [0, 0, 1];
    for (let i = 3; i <= n; i++) {
      seq[i] = seq[i - 1] + seq[i - 2] + seq[i - 3];
    }
    
    this._storeLore('tribonacci', seq);
    return seq[n];
  }

  /**
   * Generate Padovan sequence
   * P(n) = P(n-2) + P(n-3), with P(0)=1, P(1)=1, P(2)=1
   */
  padovan(n) {
    if (n < 0) return 1;
    if (n === 0 || n === 1 || n === 2) return 1;
    
    const seq = [1, 1, 1];
    for (let i = 3; i <= n; i++) {
      seq[i] = seq[i - 2] + seq[i - 3];
    }
    
    this._storeLore('padovan', seq);
    return seq[n];
  }

  /**
   * Calculate golden ratio using Fibonacci convergence
   * φ = lim(n→∞) F(n+1)/F(n)
   */
  goldenRatio(iterations = 20) {
    // Use high enough iteration to avoid division by zero
    const safeIterations = Math.max(iterations, 2);
    const fn = this.fibonacci(safeIterations);
    const fn1 = this.fibonacci(safeIterations + 1);
    return this.field.divide(fn1, fn);
  }

  /**
   * Store sequence lore (patterns and history)
   */
  _storeLore(sequenceName, sequence) {
    if (!this.lore.has(sequenceName)) {
      this.lore.set(sequenceName, {
        totalGenerations: 0,
        maxLength: 0,
        patterns: []
      });
    }
    
    const lore = this.lore.get(sequenceName);
    lore.totalGenerations++;
    lore.maxLength = Math.max(lore.maxLength, sequence.length);
    
    // Store ratio patterns for sequences of length > 2
    // Avoid division by zero
    if (sequence.length > 2) {
      const last = sequence[sequence.length - 1];
      const secondLast = sequence[sequence.length - 2];
      if (secondLast !== 0) {
        const lastRatio = last / secondLast;
        lore.patterns.push(lastRatio);
      }
    }
  }

  /**
   * Get accumulated lore for a sequence type
   */
  getLore(sequenceName) {
    return this.lore.get(sequenceName) || null;
  }

  /**
   * Get all lore
   */
  getAllLore() {
    const allLore = {};
    for (const [name, data] of this.lore.entries()) {
      allLore[name] = data;
    }
    return allLore;
  }
}

/**
 * Four-Part Situation for Mathematical Beauty
 * 
 * Represents temporal states in sequence generation:
 * - prepre: t-2 (historical foundation)
 * - pre: t-1 (previous state)
 * - current: t (current state)
 * - post: t+1 (next state)
 */
class FourPartSituation {
  constructor(sequenceType = 'fibonacci', startIndex = 0) {
    this.beauty = new MathematicalBeauty();
    this.sequenceType = sequenceType;
    this.currentIndex = startIndex;
    this.history = [];
  }

  /**
   * Get the prepre state (t-2)
   */
  prepre() {
    const index = this._clampIndex(this.currentIndex - 2);
    return this._getSequenceValue(index);
  }

  /**
   * Get the pre state (t-1)
   */
  pre() {
    const index = this._clampIndex(this.currentIndex - 1);
    return this._getSequenceValue(index);
  }

  /**
   * Get the current state (t)
   */
  current() {
    return this._getSequenceValue(this.currentIndex);
  }

  /**
   * Get the post state (t+1)
   */
  post() {
    return this._getSequenceValue(this.currentIndex + 1);
  }

  /**
   * Clamp index to ensure it's non-negative
   */
  _clampIndex(index) {
    return Math.max(0, index);
  }

  /**
   * Get the lore (accumulated wisdom)
   */
  lore() {
    return this.beauty.getLore(this.sequenceType);
  }

  /**
   * Get all four parts as an object
   */
  getAllParts() {
    return {
      prepre: this.prepre(),
      pre: this.pre(),
      current: this.current(),
      post: this.post(),
      lore: this.lore()
    };
  }

  /**
   * Advance to the next state
   */
  advance() {
    this.history.push(this.current());
    this.currentIndex++;
    return this.getAllParts();
  }

  /**
   * Go back to the previous state
   */
  rewind() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      if (this.history.length > 0) {
        this.history.pop();
      }
    }
    return this.getAllParts();
  }

  /**
   * Reset to a specific index
   */
  reset(index = 0) {
    this.currentIndex = index;
    this.history = [];
    return this.getAllParts();
  }

  /**
   * Get sequence value based on type
   */
  _getSequenceValue(index) {
    switch (this.sequenceType) {
      case 'fibonacci':
        return this.beauty.fibonacci(index);
      case 'lucas':
        return this.beauty.lucas(index);
      case 'tribonacci':
        return this.beauty.tribonacci(index);
      case 'padovan':
        return this.beauty.padovan(index);
      default:
        return this.beauty.fibonacci(index);
    }
  }
}

/**
 * Create a Young Situation for Mathematical Beauty Series
 * 
 * Models the progression through a beautiful sequence as states
 */
function createBeautySituation(sequenceType = 'fibonacci', length = 10) {
  const beauty = new MathematicalBeauty();
  const states = new Set();
  const relation = new Set();
  const finalStates = new Set();
  
  // Create states for each position in sequence
  for (let i = 0; i <= length; i++) {
    states.add(`n${i}`);
    if (i < length) {
      relation.add([`n${i}`, `n${i + 1}`]);
    }
  }
  
  // Final state is the last position
  finalStates.add(`n${length}`);
  
  // Valuation function returns the sequence value
  const valuation = (state) => {
    // Validate state format
    if (!state || typeof state !== 'string' || !state.startsWith('n')) {
      throw new Error(`Invalid state format: ${state}. Expected format: 'n{number}'`);
    }
    
    const index = parseInt(state.substring(1));
    if (isNaN(index) || index < 0) {
      throw new Error(`Invalid state index in: ${state}`);
    }
    
    switch (sequenceType) {
      case 'fibonacci':
        return beauty.fibonacci(index);
      case 'lucas':
        return beauty.lucas(index);
      case 'tribonacci':
        return beauty.tribonacci(index);
      case 'padovan':
        return beauty.padovan(index);
      default:
        return beauty.fibonacci(index);
    }
  };
  
  // Transition function moves to next sequence position
  const transition = (state, action) => {
    const index = parseInt(state.substring(1));
    if (action === 'next' && index < length) {
      return `n${index + 1}`;
    }
    return state;
  };
  
  return new YoungSituation(states, relation, valuation, transition, finalStates);
}

/**
 * Example: Demonstrate four-part situation with Fibonacci
 */
function fourPartSituationExample() {
  const situation = new FourPartSituation('fibonacci', 5);
  
  const parts = situation.getAllParts();
  
  // Advance through a few states
  const state1 = situation.advance();
  const state2 = situation.advance();
  
  // Rewind one state
  const state3 = situation.rewind();
  
  return {
    initialState: parts,
    afterAdvance1: state1,
    afterAdvance2: state2,
    afterRewind: state3,
    sequenceType: 'fibonacci',
    demonstration: 'Four-part temporal situation model for mathematical beauty'
  };
}

/**
 * Example: Demonstrate all beautiful sequences
 */
function mathematicalBeautyExample() {
  const beauty = new MathematicalBeauty();
  
  // Generate first 10 numbers of each sequence
  const n = 10;
  const fibonacci = [];
  const lucas = [];
  const tribonacci = [];
  const padovan = [];
  
  for (let i = 0; i <= n; i++) {
    fibonacci.push(beauty.fibonacci(i));
    lucas.push(beauty.lucas(i));
    tribonacci.push(beauty.tribonacci(i));
    padovan.push(beauty.padovan(i));
  }
  
  return {
    fibonacci,
    lucas,
    tribonacci,
    padovan,
    goldenRatio: beauty.goldenRatio(20),
    lore: beauty.getAllLore()
  };
}

/**
 * Example: Young Situation for Beauty Series
 */
function beautySituationExample() {
  const situation = createBeautySituation('fibonacci', 8);
  
  const path = situation.findOptimalPath('n0');
  const valuations = path.map(state => ({
    state,
    value: situation.valuation(state),
    isFinal: situation.isFinal(state)
  }));
  
  return {
    sequenceType: 'fibonacci',
    path,
    valuations,
    pathLength: path.length
  };
}

module.exports = {
  MathematicalBeauty,
  FourPartSituation,
  createBeautySituation,
  fourPartSituationExample,
  mathematicalBeautyExample,
  beautySituationExample
};
