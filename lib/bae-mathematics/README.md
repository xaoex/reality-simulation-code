# Bae Mathematics Module

Framework for modeling relationships and connections between entities using Young Field operations.

## Overview

Bae Mathematics provides a mathematical framework for modeling relationships, bonds, and connections between entities. "Bae" (before anyone else) represents the strongest relationships in a network. Uses Young Field operations for relationship calculations and graph analysis.

## Features

- **Entity Management**: Add and track entities
- **Relationship Modeling**: Create weighted connections between entities
- **Graph Metrics**: Calculate centrality, clustering, density
- **Path Finding**: Find paths and strongest connections
- **Network Analysis**: Connected components, communities
- **Probability Distributions**: Normalize relationships

## API

### Classes

#### `BaeMathematics`

Main class for relationship modeling.

```javascript
const bae = new BaeMathematics();
```

**Methods:**

##### Entity Management
- `addEntity(entityId, properties)` - Add entity to relationship graph
- `connect(entity1, entity2, strength)` - Create relationship (strength 0-1)
- `getConnectionStrength(entity1, entity2)` - Get relationship strength
- `transitiveConnection(entity1, entity2)` - Calculate indirect connection strength

##### Relationship Analysis
- `getBaeIndex(entityId)` - Find strongest relationship for an entity
- `getRelationshipMatrix()` - Get full relationship matrix
- `normalizeRelationships(entityId)` - Normalize to probability distribution
- `averageConnectionStrength()` - Calculate average across all relationships

##### Graph Metrics
- `degreeCentrality(entityId)` - Calculate degree centrality
- `betweennessCentrality(entityId)` - Calculate betweenness centrality
- `closenessCentrality(entityId)` - Calculate closeness centrality
- `clusteringCoefficient(entityId)` - Calculate clustering coefficient

##### Path Operations
- `findPaths(start, end, maxDepth)` - Find all paths between entities
- `pathStrength(path)` - Calculate strength of a path
- `strongestPath(start, end, maxDepth)` - Find strongest connection path

##### Network Structure
- `connectedComponents()` - Find connected components (communities)
- `graphDensity()` - Calculate overall graph density

### Examples

#### `baeMathematicsExample()`

Demonstrates basic relationship modeling.

```javascript
const result = baeMathematicsExample();
console.log(result.aliceBob);              // 0.9
console.log(result.aliceBae);              // { bae: 'bob', strength: 0.9 }
console.log(result.transitiveAliceCharlie); // Indirect connection
```

## Usage Examples

### Basic Relationship Modeling

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

// Add entities
bae.addEntity('alice', { name: 'Alice', age: 25 });
bae.addEntity('bob', { name: 'Bob', age: 30 });
bae.addEntity('charlie', { name: 'Charlie', age: 28 });

// Create relationships (strength from 0 to 1)
bae.connect('alice', 'bob', 0.9);      // Strong
bae.connect('bob', 'charlie', 0.7);    // Medium
bae.connect('alice', 'charlie', 0.3);  // Weak

// Query relationships
console.log(bae.getConnectionStrength('alice', 'bob')); // 0.9
```

### Finding the "Bae" (Strongest Connection)

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

bae.addEntity('alice');
bae.addEntity('bob');
bae.addEntity('charlie');
bae.addEntity('diana');

bae.connect('alice', 'bob', 0.9);
bae.connect('alice', 'charlie', 0.6);
bae.connect('alice', 'diana', 0.7);

// Find Alice's strongest connection
const aliceBae = bae.getBaeIndex('alice');
console.log(aliceBae); // { bae: 'bob', strength: 0.9 }
```

### Transitive Connections

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

bae.addEntity('alice');
bae.addEntity('bob');
bae.addEntity('charlie');

// No direct connection between Alice and Charlie
bae.connect('alice', 'bob', 0.8);
bae.connect('bob', 'charlie', 0.7);

// Calculate transitive connection (through Bob)
const transitive = bae.transitiveConnection('alice', 'charlie');
console.log(transitive); // 0.56 (0.8 * 0.7)
```

### Centrality Metrics

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

// Create a social network
['alice', 'bob', 'charlie', 'diana', 'eve'].forEach(id => bae.addEntity(id));

bae.connect('alice', 'bob', 0.9);
bae.connect('bob', 'charlie', 0.8);
bae.connect('charlie', 'diana', 0.7);
bae.connect('diana', 'eve', 0.6);
bae.connect('bob', 'diana', 0.5);

// Calculate centrality metrics
console.log('Bob degree:', bae.degreeCentrality('bob'));
console.log('Bob betweenness:', bae.betweennessCentrality('bob'));
console.log('Bob closeness:', bae.closenessCentrality('bob'));
```

### Path Finding

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

['a', 'b', 'c', 'd', 'e'].forEach(id => bae.addEntity(id));

bae.connect('a', 'b', 0.9);
bae.connect('b', 'c', 0.8);
bae.connect('c', 'e', 0.7);
bae.connect('a', 'd', 0.6);
bae.connect('d', 'e', 0.5);

// Find all paths from 'a' to 'e'
const allPaths = bae.findPaths('a', 'e', 3);
console.log('All paths:', allPaths);

// Find strongest path
const strongest = bae.strongestPath('a', 'e', 3);
console.log('Strongest path:', strongest.path);
console.log('Path strength:', strongest.strength);
```

### Relationship Matrix

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

bae.addEntity('alice');
bae.addEntity('bob');
bae.addEntity('charlie');

bae.connect('alice', 'bob', 0.9);
bae.connect('bob', 'charlie', 0.7);
bae.connect('alice', 'charlie', 0.3);

// Get full relationship matrix
const matrix = bae.getRelationshipMatrix();
console.log('Entities:', matrix.entities);
console.log('Matrix:', matrix.matrix);
// Matrix[i][j] = strength between entities[i] and entities[j]
```

### Clustering and Communities

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

// Create two separate communities
['a1', 'a2', 'a3'].forEach(id => bae.addEntity(id));
['b1', 'b2', 'b3'].forEach(id => bae.addEntity(id));

// Strong connections within communities
bae.connect('a1', 'a2', 0.9);
bae.connect('a2', 'a3', 0.9);
bae.connect('a1', 'a3', 0.8);

bae.connect('b1', 'b2', 0.9);
bae.connect('b2', 'b3', 0.9);
bae.connect('b1', 'b3', 0.8);

// Weak connection between communities
bae.connect('a1', 'b1', 0.1);

// Find communities
const components = bae.connectedComponents();
console.log('Communities:', components); // Two groups

// Calculate clustering
console.log('a1 clustering:', bae.clusteringCoefficient('a1'));
console.log('a2 clustering:', bae.clusteringCoefficient('a2'));
```

### Network Density

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

['a', 'b', 'c', 'd'].forEach(id => bae.addEntity(id));

// Fully connected network
bae.connect('a', 'b', 0.8);
bae.connect('a', 'c', 0.7);
bae.connect('a', 'd', 0.6);
bae.connect('b', 'c', 0.9);
bae.connect('b', 'd', 0.8);
bae.connect('c', 'd', 0.7);

// Calculate density (1.0 = fully connected)
const density = bae.graphDensity();
console.log('Graph density:', density); // 1.0

// Average strength
const avgStrength = bae.averageConnectionStrength();
console.log('Average strength:', avgStrength);
```

### Normalized Relationships (Probability Distribution)

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

bae.addEntity('alice');
bae.addEntity('bob');
bae.addEntity('charlie');
bae.addEntity('diana');

bae.connect('alice', 'bob', 0.5);
bae.connect('alice', 'charlie', 0.3);
bae.connect('alice', 'diana', 0.2);

// Normalize Alice's relationships to probabilities
const normalized = bae.normalizeRelationships('alice');
console.log('Normalized:', Object.fromEntries(normalized));
// Each value represents probability of interaction
```

## Use Cases

- **Social Networks**: Model friendships, connections, influence
- **Knowledge Graphs**: Represent relationships between concepts
- **Recommendation Systems**: Find similar entities through connections
- **Organization Charts**: Model reporting structures and collaboration
- **Game Entities**: Relationships between characters, factions
- **System Dependencies**: Model component relationships

## Graph Theory

Bae Mathematics implements various graph theory concepts:
- **Degree Centrality**: How connected an entity is
- **Betweenness Centrality**: How often an entity bridges others
- **Closeness Centrality**: How close an entity is to all others
- **Clustering Coefficient**: How clustered an entity's neighbors are
- **Connected Components**: Separate communities in the network
- **Graph Density**: Overall connectivity of the network

## References

- See `YOSHIS_SECRET_BAE_MATH.md` for comprehensive documentation
- See Young Field module for underlying mathematics
- See God Generator module for applications in entity systems
