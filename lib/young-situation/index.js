/**
 * Young Situation Module
 * 
 * A tuple-based formalism for dynamic enterprise modeling
 * Based on WHITEPAPER_YOUNG_SITUATION.md Section 3
 * 
 * @module ung-situation
 * @author xaoex
 */

/**
 * Young Situation - A tuple-based formalism for dynamic enterprise modeling
 * 
 * A Young Situation is a tuple Y = (S, R, σ, δ, F) where:
 * - S is a finite set of states (situation configurations)
 * - R ⊆ S × S is a relation over states (transitions)
 * - σ: S → ℝ≥0 is a valuation function (situation measure)
 * - δ: S × A → S is a transition function for action set A
 * - F ⊆ S is the set of final (optimized) states
 * 
 * Axioms:
 * - Y1 (Non-emptiness): S ≠ ∅ ∧ F ⊆ S
 * - Y2 (Completeness): ∀s ∈ S : ∃s' ∈ S : (s, s') ∈ R ∨ s ∈ F
 * - Y3 (Valuation Monotonicity): ∀s₁, s₂ ∈ S : (s₁, s₂) ∈ R ⇒ σ(s₁) ≤ σ(s₂)
 */
class YoungSituation {
  constructor(states, relation, valuation, transition, finalStates) {
    // Axiom Y1: Non-emptiness
    if (!states || states.size === 0) {
      throw new Error('Axiom Y1 violated: States set must be non-empty');
    }
    
    // Verify final states are a subset of states
    for (const f of finalStates) {
      if (!states.has(f)) {
        throw new Error('Axiom Y1 violated: Final states must be subset of states');
      }
    }
    
    this.S = states;                    // Set of states
    this.R = relation;                  // Transition relation
    this.σ = valuation;                 // Valuation function
    this.δ = transition;                // Transition function
    this.F = finalStates;               // Final states
    
    // Verify axioms
    this._verifyCompleteness();         // Axiom Y2
    this._verifyMonotonicity();         // Axiom Y3
  }
  
  /**
   * Verify Axiom Y2: Completeness
   * Every state can either transition to another state or is final
   */
  _verifyCompleteness() {
    for (const state of this.S) {
      if (this.F.has(state)) {
        continue; // Final states don't need outgoing transitions
      }
      
      // Check if state has an outgoing transition
      let hasTransition = false;
      for (const [s1, s2] of this.R) {
        if (s1 === state) {
          hasTransition = true;
          break;
        }
      }
      
      if (!hasTransition) {
        throw new Error(`Axiom Y2 violated: State ${state} has no outgoing transition and is not final`);
      }
    }
  }
  
  /**
   * Verify Axiom Y3: Valuation Monotonicity
   * Valuations must not decrease along transitions
   */
  _verifyMonotonicity() {
    for (const [s1, s2] of this.R) {
      const val1 = this.σ(s1);
      const val2 = this.σ(s2);
      
      if (val1 > val2) {
        throw new Error(`Axiom Y3 violated: Valuation decreases from ${s1} (${val1}) to ${s2} (${val2})`);
      }
    }
  }
  
  /**
   * Get the current valuation for a state
   */
  valuation(state) {
    return this.σ(state);
  }
  
  /**
   * Apply a transition from one state to another
   */
  transition(state, action) {
    return this.δ(state, action);
  }
  
  /**
   * Check if a state is final (optimized)
   */
  isFinal(state) {
    return this.F.has(state);
  }
  
  /**
   * Get all states reachable from a given state
   */
  getReachableStates(state) {
    const reachable = new Set();
    const queue = [state];
    const visited = new Set();
    
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      reachable.add(current);
      
      // Find all states reachable from current
      for (const [s1, s2] of this.R) {
        if (s1 === current && !visited.has(s2)) {
          queue.push(s2);
        }
      }
    }
    
    return reachable;
  }
  
  /**
   * Find optimal path to final state from given state
   * Uses dynamic programming approach
   */
  findOptimalPath(startState) {
    if (this.F.has(startState)) {
      return [startState];
    }
    
    const dist = new Map();
    const prev = new Map();
    const queue = [];
    
    // Initialize distances
    for (const state of this.S) {
      dist.set(state, Infinity);
    }
    
    // Set distance for final states
    for (const f of this.F) {
      dist.set(f, 0);
      queue.push(f);
    }
    
    // Reverse BFS from final states
    const visited = new Set();
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      
      // Find predecessors
      for (const [s1, s2] of this.R) {
        if (s2 === current) {
          const newDist = dist.get(current) + 1;
          if (newDist < dist.get(s1)) {
            dist.set(s1, newDist);
            prev.set(s1, current);
            queue.push(s1);
          }
        }
      }
    }
    
    // Reconstruct path
    if (dist.get(startState) === Infinity) {
      return null; // No path to final state
    }
    
    const path = [];
    let current = startState;
    while (current !== undefined) {
      path.push(current);
      if (this.F.has(current)) break;
      current = prev.get(current);
    }
    
    return path;
  }
}

/**
 * Create a common Young Situation for the "Young" context
 * This represents a typical optimization scenario with multiple states
 */
function createCommonYoungSituation() {
  // Define states representing different optimization levels
  const states = new Set(['initial', 'planning', 'executing', 'optimizing', 'optimal']);
  
  // Define transition relations (directed edges)
  const relation = new Set([
    ['initial', 'planning'],
    ['planning', 'executing'],
    ['planning', 'optimizing'],
    ['executing', 'optimizing'],
    ['optimizing', 'optimal']
  ]);
  
  // Define valuation function (increasing along paths to optimal)
  const valuationMap = {
    'initial': 0,
    'planning': 10,
    'executing': 20,
    'optimizing': 30,
    'optimal': 40
  };
  const valuation = (state) => valuationMap[state] || 0;
  
  // Define transition function (simple deterministic transitions)
  const transition = (state, action) => {
    const transitions = {
      'initial': { 'plan': 'planning' },
      'planning': { 'execute': 'executing', 'optimize': 'optimizing' },
      'executing': { 'optimize': 'optimizing' },
      'optimizing': { 'finalize': 'optimal' }
    };
    return transitions[state]?.[action] || state;
  };
  
  // Define final states
  const finalStates = new Set(['optimal']);
  
  return new YoungSituation(states, relation, valuation, transition, finalStates);
}

/**
 * Define the area (domain/configuration space) for Young Situations
 * The area represents all possible state configurations and their properties
 */
function defineYoungArea() {
  return {
    name: 'Young Area',
    description: 'Configuration space for Young Situation optimization',
    
    // State categories
    stateCategories: {
      initial: {
        description: 'Starting point of optimization',
        valuation: { min: 0, max: 10 },
        properties: ['unstable', 'high-potential']
      },
      intermediate: {
        description: 'Middle stages of optimization',
        valuation: { min: 10, max: 30 },
        properties: ['transitional', 'improving']
      },
      final: {
        description: 'Optimized end states',
        valuation: { min: 30, max: 100 },
        properties: ['stable', 'optimized']
      }
    },
    
    // Action types available in this area
    actionTypes: [
      'plan',      // Transition to planning state
      'execute',   // Transition to execution state
      'optimize',  // Transition to optimizing state
      'finalize'   // Transition to final state
    ],
    
    // Constraints and bounds
    constraints: {
      maxTransitionCost: 10,
      minValuationIncrease: 0,
      maxStatesPerPath: 10
    },
    
    // Metrics for evaluation
    metrics: {
      efficiency: (valuationIncrease, pathLength) => valuationIncrease / pathLength,
      optimality: (currentValuation, maxValuation) => currentValuation / maxValuation,
      convergence: (distance) => 1 / (1 + distance)
    }
  };
}

/**
 * Create a simple Young Situation with linear progression
 */
function createLinearYoungSituation(numStates = 5) {
  const states = new Set();
  const relation = new Set();
  const valuationMap = {};
  
  // Create linear chain of states
  for (let i = 0; i < numStates; i++) {
    const stateName = `state_${i}`;
    states.add(stateName);
    valuationMap[stateName] = i * 10;
    
    // Add transition to next state
    if (i < numStates - 1) {
      relation.add([stateName, `state_${i + 1}`]);
    }
  }
  
  const valuation = (state) => valuationMap[state] || 0;
  
  const transition = (state, action) => {
    if (action === 'next') {
      const match = state.match(/state_(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        if (num < numStates - 1) {
          return `state_${num + 1}`;
        }
      }
    }
    return state;
  };
  
  const finalStates = new Set([`state_${numStates - 1}`]);
  
  return new YoungSituation(states, relation, valuation, transition, finalStates);
}

/**
 * Create a branching Young Situation with multiple paths
 */
function createBranchingYoungSituation() {
  const states = new Set(['start', 'path_a1', 'path_a2', 'path_b1', 'path_b2', 'end']);
  
  const relation = new Set([
    ['start', 'path_a1'],
    ['start', 'path_b1'],
    ['path_a1', 'path_a2'],
    ['path_a2', 'end'],
    ['path_b1', 'path_b2'],
    ['path_b2', 'end']
  ]);
  
  const valuationMap = {
    'start': 0,
    'path_a1': 15,
    'path_a2': 25,
    'path_b1': 10,
    'path_b2': 30,
    'end': 40
  };
  const valuation = (state) => valuationMap[state] || 0;
  
  const transition = (state, action) => {
    const transitions = {
      'start': { 'choose_a': 'path_a1', 'choose_b': 'path_b1' },
      'path_a1': { 'continue': 'path_a2' },
      'path_a2': { 'finish': 'end' },
      'path_b1': { 'continue': 'path_b2' },
      'path_b2': { 'finish': 'end' }
    };
    return transitions[state]?.[action] || state;
  };
  
  const finalStates = new Set(['end']);
  
  return new YoungSituation(states, relation, valuation, transition, finalStates);
}

/**
 * Example: Demonstrate common Young Situation usage
 */
function ungSituationExample() {
  const situation = createCommonYoungSituation();
  
  // Get information about the situation
  const startState = 'initial';
  const optimalPath = situation.findOptimalPath(startState);
  const reachableStates = situation.getReachableStates(startState);
  
  // Calculate path valuations
  const pathValuations = optimalPath.map(state => ({
    state: state,
    valuation: situation.valuation(state),
    isFinal: situation.isFinal(state)
  }));
  
  return {
    totalStates: situation.S.size,
    finalStates: Array.from(situation.F),
    startState: startState,
    optimalPath: optimalPath,
    pathLength: optimalPath.length,
    pathValuations: pathValuations,
    reachableStates: Array.from(reachableStates)
  };
}

/**
 * Example: Demonstrate area definition and usage
 */
function ungAreaExample() {
  const area = defineYoungArea();
  const situation = createCommonYoungSituation();
  
  // Calculate metrics for the situation
  const optimalPath = situation.findOptimalPath('initial');
  const startVal = situation.valuation('initial');
  const endVal = situation.valuation(optimalPath[optimalPath.length - 1]);
  const valuationIncrease = endVal - startVal;
  
  const metrics = {
    efficiency: area.metrics.efficiency(valuationIncrease, optimalPath.length),
    optimality: area.metrics.optimality(endVal, 40),
    convergence: area.metrics.convergence(optimalPath.length - 1)
  };
  
  return {
    areaName: area.name,
    stateCategories: Object.keys(area.stateCategories),
    availableActions: area.actionTypes,
    situationMetrics: metrics,
    constraintsApplied: area.constraints
  };
}

module.exports = {
  YoungSituation,
  createCommonYoungSituation,
  defineYoungArea,
  createLinearYoungSituation,
  createBranchingYoungSituation,
  ungSituationExample,
  ungAreaExample
};
