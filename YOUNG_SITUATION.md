# Young Situation Implementation

This document provides usage examples and documentation for the **Young Situation** implementation, based on the formal mathematical definitions in [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md) Section 3.

## Overview

The **Young Situation** is a tuple-based formalism for modeling dynamic enterprise optimization scenarios. It provides:
- State-based modeling of optimization processes
- Transition relations between states
- Valuation functions for measuring state quality
- Optimal path finding algorithms
- Area definitions for configuration spaces

## Mathematical Foundation

### Young Situation (Definition 3.1)

A Young Situation is a tuple **Y** = (S, R, σ, δ, F) where:

- **S** is a finite set of **states** (situation configurations)
- **R** ⊆ S × S is a **relation** over states (transitions)
- **σ**: S → ℝ≥0 is a **valuation function** (situation measure)
- **δ**: S × A → S is a **transition function** for action set A
- **F** ⊆ S is the set of **final** (optimized) states

### Axioms

**Axiom Y1 (Non-emptiness):**
```
S ≠ ∅ ∧ F ⊆ S
```

**Axiom Y2 (Completeness):**
```
∀s ∈ S : ∃s' ∈ S : (s, s') ∈ R ∨ s ∈ F
```

**Axiom Y3 (Valuation Monotonicity):**
```
∀s₁, s₂ ∈ S : (s₁, s₂) ∈ R ⇒ σ(s₁) ≤ σ(s₂)
```

## Installation

```bash
npm install reality-simulation-code
```

## Usage

### Basic Import

```javascript
const {
  YoungSituation,
  createCommonYoungSituation,
  defineYoungArea,
  createLinearYoungSituation,
  createBranchingYoungSituation,
  ungSituationExample,
  ungAreaExample
} = require('reality-simulation-code');
```

## Examples

### 1. Creating a Common Young Situation

The common Young Situation represents a typical optimization scenario:

```javascript
const situation = createCommonYoungSituation();

// Get information about the situation
console.log('Total states:', situation.S.size);           // 5
console.log('Final states:', Array.from(situation.F));    // ['optimal']

// Check state valuations
console.log('Initial valuation:', situation.valuation('initial'));    // 0
console.log('Optimal valuation:', situation.valuation('optimal'));    // 40

// Check if state is final
console.log('Is optimal final?', situation.isFinal('optimal'));       // true
```

States in common situation:
- **initial** (valuation: 0) - Starting point
- **planning** (valuation: 10) - Planning phase
- **executing** (valuation: 20) - Execution phase
- **optimizing** (valuation: 30) - Optimization phase
- **optimal** (valuation: 40) - Final optimized state

### 2. Finding Optimal Paths

Find the shortest path from any state to the final state:

```javascript
const situation = createCommonYoungSituation();

// Find optimal path from initial to final state
const path = situation.findOptimalPath('initial');

console.log('Path:', path.join(' -> '));
// Path: initial -> planning -> optimizing -> optimal

// Get valuations along the path
path.forEach(state => {
  console.log(`${state}: ${situation.valuation(state)}`);
});
// initial: 0
// planning: 10
// optimizing: 30
// optimal: 40
```

### 3. Getting Reachable States

Find all states reachable from a given state:

```javascript
const situation = createCommonYoungSituation();
const reachable = situation.getReachableStates('initial');

console.log('Reachable states:', Array.from(reachable));
// ['initial', 'planning', 'executing', 'optimizing', 'optimal']
```

### 4. Defining the Young Area

The Young Area defines the configuration space and metrics:

```javascript
const area = defineYoungArea();

console.log('Area name:', area.name);
// Area name: Young Area

console.log('State categories:', Object.keys(area.stateCategories));
// ['initial', 'intermediate', 'final']

console.log('Available actions:', area.actionTypes);
// ['plan', 'execute', 'optimize', 'finalize']

// Use area metrics
const efficiency = area.metrics.efficiency(40, 4);
console.log('Efficiency:', efficiency);  // 10.0

const optimality = area.metrics.optimality(40, 40);
console.log('Optimality:', optimality);  // 1.0
```

### 5. Creating Custom Young Situations

#### Linear Situation

Create a simple linear progression:

```javascript
const situation = createLinearYoungSituation(5);

// Creates states: state_0 -> state_1 -> state_2 -> state_3 -> state_4
const path = situation.findOptimalPath('state_0');
console.log('Path length:', path.length);  // 5
```

#### Branching Situation

Create a situation with multiple paths:

```javascript
const situation = createBranchingYoungSituation();

// Has two paths from start to end:
// Path A: start -> path_a1 -> path_a2 -> end
// Path B: start -> path_b1 -> path_b2 -> end

const path = situation.findOptimalPath('start');
console.log('Chosen path:', path.join(' -> '));
```

### 6. Custom Young Situation

Create ur own custom situation:

```javascript
// Define states
const states = new Set(['begin', 'middle', 'end']);

// Define transitions
const relation = new Set([
  ['begin', 'middle'],
  ['middle', 'end']
]);

// Define valuation function
const valuation = (state) => {
  const values = { 'begin': 0, 'middle': 50, 'end': 100 };
  return values[state] || 0;
};

// Define transition function
const transition = (state, action) => {
  const transitions = {
    'begin': { 'advance': 'middle' },
    'middle': { 'advance': 'end' }
  };
  return transitions[state]?.[action] || state;
};

// Define final states
const finalStates = new Set(['end']);

// Create the situation
const customSituation = new YoungSituation(
  states,
  relation,
  valuation,
  transition,
  finalStates
);

// Use it
const path = customSituation.findOptimalPath('begin');
console.log('Path:', path.join(' -> '));  // begin -> middle -> end
```

## Pre-built Examples

The library includes two comprehensive example functions:

### Example 1: Young Situation

```javascript
const result = ungSituationExample();
console.log(result);
// {
//   totalStates: 5,
//   finalStates: ['optimal'],
//   startState: 'initial',
//   optimalPath: ['initial', 'planning', 'optimizing', 'optimal'],
//   pathLength: 4,
//   pathValuations: [
//     { state: 'initial', valuation: 0, isFinal: false },
//     { state: 'planning', valuation: 10, isFinal: false },
//     { state: 'optimizing', valuation: 30, isFinal: false },
//     { state: 'optimal', valuation: 40, isFinal: true }
//   ],
//   reachableStates: [...]
// }
```

### Example 2: Young Area

```javascript
const result = ungAreaExample();
console.log(result);
// {
//   areaName: 'Young Area',
//   stateCategories: ['initial', 'intermediate', 'final'],
//   availableActions: ['plan', 'execute', 'optimize', 'finalize'],
//   situationMetrics: {
//     efficiency: 10.0,
//     optimality: 1.0,
//     convergence: 0.25
//   },
//   constraintsApplied: {
//     maxTransitionCost: 10,
//     minValuationIncrease: 0,
//     maxStatesPerPath: 10
//   }
// }
```

## API Reference

### YoungSituation

#### Constructor

```javascript
new YoungSituation(states, relation, valuation, transition, finalStates)
```

**Parameters:**
- `states` (Set) - Set of state names
- `relation` (Set) - Set of [state1, state2] transition pairs
- `valuation` (Function) - Function mapping state to numeric value
- `transition` (Function) - Function mapping (state, action) to next state
- `finalStates` (Set) - Set of final/optimized states

**Throws:**
- Error if Axiom Y1 violated (empty states or invalid final states)
- Error if Axiom Y2 violated (incomplete transitions)
- Error if Axiom Y3 violated (non-monotonic valuations)

#### Methods

**`valuation(state)`**
- Returns the valuation (numeric measure) for a state
- Returns: Number

**`transition(state, action)`**
- Apply a transition from one state to another
- Returns: String (next state)

**`isFinal(state)`**
- Check if a state is final (optimized)
- Returns: Boolean

**`getReachableStates(state)`**
- Get all states reachable from a given state
- Returns: Set of state names

**`findOptimalPath(startState)`**
- Find shortest path from start state to any final state
- Returns: Array of states or null if no path exists

### Factory Functions

**`createCommonYoungSituation()`**
- Creates a typical optimization scenario with 5 states
- Returns: YoungSituation

**`createLinearYoungSituation(numStates)`**
- Creates a linear progression with specified number of states
- Parameters:
  - `numStates` (Number, default: 5) - Number of states in sequence
- Returns: YoungSituation

**`createBranchingYoungSituation()`**
- Creates a situation with multiple paths to the final state
- Returns: YoungSituation

**`defineYoungArea()`**
- Defines the configuration space and metrics for Young Situations
- Returns: Object with area definition

### Example Functions

**`ungSituationExample()`**
- Demonstrates common Young Situation usage
- Returns: Object with situation analysis

**`ungAreaExample()`**
- Demonstrates area definition and metrics
- Returns: Object with area information and metrics

## Testing

Run the comprehensive test suite:

```bash
npm test
```

The test suite verifies:
- Young Situation construction
- All three axioms (Y1, Y2, Y3)
- Reachability algorithms
- Optimal path finding
- Common, linear, and branching situations
- Area definition
- All example functions

## Integration with Young Field

Young Situations work seamlessly with Young Fields for advanced applications:

```javascript
const { createSituationValuationField } = require('reality-simulation-code');

const situation = createCommonYoungSituation();
const field = createSituationValuationField();

// Get all state valuations
const states = Array.from(situation.S);
const valuations = states.map(s => situation.valuation(s));

// Normalize to probability distribution
const probabilities = field.normalize(valuations);

// Assign probabilities to states
states.forEach((state, i) => {
  console.log(`P(${state}) = ${probabilities[i].toFixed(3)}`);
});
// P(initial) = 0.000
// P(planning) = 0.100
// P(executing) = 0.200
// P(optimizing) = 0.300
// P(optimal) = 0.400
```

## Mathematical Theorems Implemented

### Theorem 3.1: Reachability of Final States
For any Young Situation Y with |S| = n, every state s ∈ S can reach some f ∈ F in at most n-1 transitions.

This is implemented in the `findOptimalPath` method using reverse breadth-first search from final states.

## References

- **Whitepaper:** [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md)
- **Section 3:** Young Situation
  - **Definition 3.1:** Young Situation formal definition
  - **Axioms Y1-Y3:** Non-emptiness, Completeness, Monotonicity
  - **Theorem 3.1:** Reachability proof
- **Related:** [YOUNG_FIELD.md](YOUNG_FIELD.md) for Young Field integration

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*For the complete mathematical foundation and formal proofs, see the [Young Situation White Paper](WHITEPAPER_YOUNG_SITUATION.md).*
