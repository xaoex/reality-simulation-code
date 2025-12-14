# AB Test Infrastructure

This directory contains the AB testing framework for continuous learning and code improvement through machine learning.

## Overview

The AB test infrastructure enables:
1. **AB Testing**: Run multiple code variants simultaneously
2. **Learning**: Learn from test results and performance data
3. **Refactoring**: Automatically refactor based on learnings
4. **Teaching AI**: Use test code + ML to teach AI how to code better

## Architecture

```
.abtest/
├── config/
│   ├── test-config.json       # AB test configurations
│   └── ml-config.json          # ML learning configurations
├── tests/
│   ├── baseline/               # Baseline tests
│   ├── variants/               # Variant tests
│   └── generated/              # ML-generated tests
├── results/
│   ├── test-runs/              # Test execution results
│   ├── metrics/                # Performance metrics
│   └── learnings/              # Extracted learnings
├── ml/
│   ├── models/                 # ML models
│   ├── training/               # Training data
│   └── predictions/            # Model predictions
└── actions/
    ├── refactor/               # Refactoring actions
    ├── incorporate/            # Incorporation actions
    └── workflows/              # GitHub Actions workflows
```

## Features

### 1. AB Testing
- Run baseline vs variant code
- Collect performance metrics
- Compare test outcomes
- Track success rates

### 2. Learning from Tests
- Extract patterns from test results
- Identify successful code patterns
- Learn from failures
- Build knowledge base

### 3. Automatic Refactoring
- Refactor based on learnings
- Apply successful patterns
- Remove anti-patterns
- Optimize code structure

### 4. Teaching AI to Code
- Use test code as training data
- Learn coding patterns from tests
- Generate new test cases
- Improve code suggestions

## Usage

### Running AB Tests

```javascript
const { ABTest } = require('./.abtest/ab-test');

// Create AB test
const test = new ABTest({
  name: 'young-field-optimization',
  baseline: './young-packages/young-field/index.js',
  variant: './young-packages/young-field/index-optimized.js',
  tests: ['./tests/young-field.test.js']
});

// Run test
const results = await test.run();
console.log(results);
// { baseline: { passed: 52, failed: 0, time: 1200ms },
//   variant: { passed: 52, failed: 0, time: 800ms },
//   winner: 'variant', improvement: '33%' }
```

### Learning from Results

```javascript
const { MLLearner } = require('./.abtest/ml/learner');

// Create learner
const learner = new MLLearner({
  testResults: './abtest/results/test-runs/',
  codebase: './young-packages/'
});

// Learn from tests
const learnings = await learner.analyze();
console.log(learnings);
// { patterns: ['use-early-return', 'avoid-nested-loops'],
//   improvements: ['caching', 'memoization'],
//   antiPatterns: ['deep-nesting', 'long-functions'] }
```

### Automatic Refactoring

```javascript
const { Refactor } = require('./.abtest/actions/refactor');

// Create refactorer
const refactor = new Refactor({
  learnings: learnings,
  target: './young-packages/young-field/index.js'
});

// Apply refactorings
const changes = await refactor.apply();
console.log(changes);
// { applied: 5, skipped: 2, improvements: ['32% faster', '15% less memory'] }
```

### Teaching AI

```javascript
const { AITeacher } = require('./.abtest/ml/teacher');

// Create teacher
const teacher = new AITeacher({
  testCode: './tests/',
  implementations: './young-packages/'
});

// Train AI model
const model = await teacher.train();

// Generate new code
const newCode = await model.generate('create a division-safe field operation');
```

## Integration with GitHub Actions

The AB test infrastructure integrates with GitHub Actions to:
- Run tests on every commit
- Compare against baseline
- Learn from results
- Automatically refactor if improvements found
- Create PRs with refactorings

### Example Workflow

```yaml
name: AB Test and Learn

on: [push]

jobs:
  ab-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run AB Tests
        run: node .abtest/run-tests.js
      - name: Learn from Results
        run: node .abtest/ml/learn.js
      - name: Apply Refactorings
        run: node .abtest/actions/refactor.js
      - name: Create PR if Improvements
        run: node .abtest/actions/create-pr.js
```

## Test Generation

The infrastructure can generate tests from:
1. **Existing Code**: Analyze code to generate tests
2. **User Behavior**: Learn from usage patterns
3. **Edge Cases**: Identify and test edge cases
4. **ML Models**: Generate tests using trained models

## Metrics Tracked

- **Performance**: Execution time, memory usage
- **Correctness**: Test pass/fail rates
- **Code Quality**: Complexity, maintainability
- **Coverage**: Code coverage percentage
- **Patterns**: Common patterns identified

## Learning Cycle

```
1. Run AB Test
   ↓
2. Collect Metrics
   ↓
3. Analyze Results
   ↓
4. Extract Learnings
   ↓
5. Train ML Model
   ↓
6. Generate Refactorings
   ↓
7. Apply Changes
   ↓
8. Run Tests Again (back to 1)
```

## Configuration

### Test Configuration

```json
{
  "tests": {
    "enabled": true,
    "baseline": "main",
    "variants": ["optimized", "alternative"],
    "metrics": ["time", "memory", "correctness"],
    "threshold": 0.05
  }
}
```

### ML Configuration

```json
{
  "ml": {
    "enabled": true,
    "model": "gpt-4",
    "training": {
      "testCode": true,
      "implementations": true,
      "results": true
    },
    "generation": {
      "tests": true,
      "refactorings": true,
      "code": false
    }
  }
}
```

## Benefits

1. **Continuous Improvement**: Code gets better over time
2. **Data-Driven**: Decisions based on real test data
3. **Automated**: Minimal manual intervention
4. **Learning**: System learns from every test run
5. **Teaching**: AI learns to code better
6. **Validation**: All changes are tested

## Generic Test Situation

The infrastructure supports a "generic test situation" - a baseline test environment that:
- Can be generated for any codebase
- Provides standard test scenarios
- Enables AB testing without custom tests
- Learns optimal test patterns

This allows teaching AI how to code by:
1. Showing test code examples
2. Running tests on various implementations
3. Learning which implementations pass
4. Generating new code based on patterns

## Implementation Status

- [x] Directory structure created
- [x] Documentation written
- [ ] Core AB test framework
- [ ] ML learning system
- [ ] Refactoring automation
- [ ] GitHub Actions integration
- [ ] AI teaching module

This infrastructure is in template form - production implementations can expand with:
- Actual ML models
- Real GitHub Actions
- Production refactoring tools
- Enterprise test frameworks
