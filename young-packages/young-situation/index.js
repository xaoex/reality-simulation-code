/**
 * Young Situation - Dynamic Enterprise Modeling
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
 * 
 * @module young-situation
 * @version 1.0.0-template
 * @author xaoex
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
  
  _verifyCompleteness() {
    for (const state of this.S) {
      if (this.F.has(state)) continue;
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
  
  _verifyMonotonicity() {
    for (const [s1, s2] of this.R) {
      const val1 = this.σ(s1);
      const val2 = this.σ(s2);
      if (val1 > val2) {
        throw new Error(`Axiom Y3 violated: Valuation decreases from ${s1} (${val1}) to ${s2} (${val2})`);
      }
    }
  }
  
  valuation(state) {
    return this.σ(state);
  }
  
  transition(state, action) {
    return this.δ(state, action);
  }
  
  isFinal(state) {
    return this.F.has(state);
  }
  
  getReachableStates(state) {
    const reachable = new Set();
    const queue = [state];
    const visited = new Set();
    
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      reachable.add(current);
      
      for (const [s1, s2] of this.R) {
        if (s1 === current && !visited.has(s2)) {
          queue.push(s2);
        }
      }
    }
    
    return reachable;
  }
  
  findOptimalPath(startState) {
    if (this.F.has(startState)) {
      return [startState];
    }
    
    const dist = new Map();
    const prev = new Map();
    const queue = [];
    
    for (const state of this.S) {
      dist.set(state, Infinity);
    }
    
    for (const f of this.F) {
      dist.set(f, 0);
      queue.push(f);
    }
    
    const visited = new Set();
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      
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
    
    if (dist.get(startState) === Infinity) {
      return null;
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

function createCommonYoungSituation() {
  const states = new Set(['initial', 'planning', 'executing', 'optimizing', 'optimal']);
  const relation = new Set([
    ['initial', 'planning'],
    ['planning', 'executing'],
    ['planning', 'optimizing'],
    ['executing', 'optimizing'],
    ['optimizing', 'optimal']
  ]);
  const valuationMap = {
    'initial': 0, 'planning': 10, 'executing': 20, 'optimizing': 30, 'optimal': 40
  };
  const valuation = (state) => valuationMap[state] || 0;
  const transition = (state, action) => {
    const transitions = {
      'initial': { 'plan': 'planning' },
      'planning': { 'execute': 'executing', 'optimize': 'optimizing' },
      'executing': { 'optimize': 'optimizing' },
      'optimizing': { 'finalize': 'optimal' }
    };
    return transitions[state]?.[action] || state;
  };
  const finalStates = new Set(['optimal']);
  return new YoungSituation(states, relation, valuation, transition, finalStates);
}

function defineYoungArea() {
  return {
    name: 'Young Area',
    description: 'Configuration space for Young Situation optimization',
    stateCategories: {
      initial: { description: 'Starting point', valuation: { min: 0, max: 10 }, properties: ['unstable', 'high-potential'] },
      intermediate: { description: 'Middle stages', valuation: { min: 10, max: 30 }, properties: ['transitional', 'improving'] },
      final: { description: 'Optimized states', valuation: { min: 30, max: 100 }, properties: ['stable', 'optimized'] }
    },
    actionTypes: ['plan', 'execute', 'optimize', 'finalize'],
    constraints: { maxTransitionCost: 10, minValuationIncrease: 0, maxStatesPerPath: 10 },
    metrics: {
      efficiency: (valuationIncrease, pathLength) => valuationIncrease / pathLength,
      optimality: (currentValuation, maxValuation) => currentValuation / maxValuation,
      convergence: (distance) => 1 / (1 + distance)
    }
  };
}

module.exports = {
  YoungSituation,
  createCommonYoungSituation,
  defineYoungArea,
  version: '1.0.0-template',
  packageName: '@xaoex/young-situation'
};
