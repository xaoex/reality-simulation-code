# Young Situation Module

Dynamic enterprise modeling and optimization framework using tuple-based formalism.

## Overview

A Young Situation is a tuple-based formalism for modeling dynamic enterprise optimization scenarios. It provides a mathematical foundation for representing states, transitions, and valuations in optimization problems.

## Mathematical Definition

A Young Situation is a tuple `Y = (S, R, σ, δ, F)` where:
- `S` is a finite set of states (situation configurations)
- `R ⊆ S × S` is a relation over states (transitions)
- `σ: S → ℝ≥0` is a valuation function (situation measure)
- `δ: S × A → S` is a transition function for action set A
- `F ⊆ S` is the set of final (optimized) states

## Axioms

- **Y1 (Non-emptiness)**: `S ≠ ∅ ∧ F ⊆ S`
- **Y2 (Completeness)**: `∀s ∈ S : ∃s' ∈ S : (s, s') ∈ R ∨ s ∈ F`
- **Y3 (Valuation Monotonicity)**: `∀s₁, s₂ ∈ S : (s₁, s₂) ∈ R ⇒ σ(s₁) ≤ σ(s₂)`

## API

### Classes

#### `YoungSituation`

Main class representing a Young Situation.

```javascript
const situation = new YoungSituation(states, relation, valuation, transition, finalStates);
```

**Methods:**
- `valuation(state)` - Get valuation for a state
- `transition(state, action)` - Apply transition
- `isFinal(state)` - Check if state is final
- `getReachableStates(state)` - Get all reachable states
- `findOptimalPath(startState)` - Find optimal path to final state

### Factory Functions

#### `createCommonYoungSituation()`

Creates a typical optimization scenario with states: initial → planning → executing → optimizing → optimal.

```javascript
const situation = createCommonYoungSituation();
const path = situation.findOptimalPath('initial');
```

#### `createLinearYoungSituation(numStates)`

Creates a linear chain of states.

```javascript
const situation = createLinearYoungSituation(5);
```

#### `createBranchingYoungSituation()`

Creates a situation with multiple paths (branching).

```javascript
const situation = createBranchingYoungSituation();
```

#### `defineYoungArea()`

Defines the configuration space for Young Situations, including state categories, action types, constraints, and evaluation metrics.

```javascript
const area = defineYoungArea();
console.log(area.stateCategories);
console.log(area.metrics.efficiency(40, 4)); // Calculate efficiency
```

### Examples

#### `ungSituationExample()`

Demonstrates common Young Situation usage with optimal path finding.

```javascript
const result = ungSituationExample();
console.log(result.optimalPath); // ['initial', 'planning', 'optimizing', 'optimal']
console.log(result.pathValuations);
```

#### `ungAreaExample()`

Demonstrates area definition and metric calculations.

```javascript
const result = ungAreaExample();
console.log(result.situationMetrics); // Efficiency, optimality, convergence
```

## Usage Example

```javascript
const { YoungSituation, createCommonYoungSituation } = require('reality-simulation-code');

// Create a common situation
const situation = createCommonYoungSituation();

// Find optimal path
const path = situation.findOptimalPath('initial');
console.log('Path:', path.join(' -> '));

// Get valuations along the path
path.forEach(state => {
  console.log(`${state}: ${situation.valuation(state)}`);
});

// Check if state is final
console.log('Is optimal final?', situation.isFinal('optimal'));
```

## References

- See `WHITEPAPER_YOUNG_SITUATION.md` Section 3 for formal mathematical definitions
- See `YOUNG_SITUATION.md` for comprehensive usage guide
