# Yoshi's Secret + Bae Mathematics

## Overview

This document describes two new mathematical frameworks and the God Generator system that combines them:

1. **Yoshi's Secret** - A cryptographic encoding/decoding framework using Young Field mathematics
2. **Bae Mathematics** - A relationship and connection modeling framework
3. **God Generator** - An advanced entity creation system combining both frameworks

These implementations were inspired by childhood curiosity, data exploration, and learning - representing the journey from wondering about data to creating complex mathematical systems.

---

## Yoshi's Secret

### What is Yoshi's Secret?

**Yoshi's Secret** is a cryptographic encoding system built on top of Young Field mathematics (finite fields). It provides:

- Reversible encoding/decoding of numbers and strings
- Cryptographic hashing
- Secret key generation based on special primes
- Field-based transformations for data security

### Mathematical Foundation

Yoshi's Secret uses a finite field ℤₚ (integers modulo a prime p) to perform encoding operations:

- **Encoding**: `E(x) = (x × k + c) mod p`
- **Decoding**: `D(y) = (y - c) × k⁻¹ mod p`

Where:
- `k` is a secret key derived from special primes
- `c` is a constant shift (1337)
- `p` is a large prime (default: 31337)

### Usage

#### Basic Number Encoding

```javascript
const { YoshisSecret } = require('reality-simulation-code');

// Create a YoshisSecret instance with prime 31337
const secret = new YoshisSecret(31337);

// Encode a number
const original = 42;
const encoded = secret.encode(original);
console.log(`Encoded: ${encoded}`);

// Decode back to original
const decoded = secret.decode(encoded);
console.log(`Decoded: ${decoded}`); // 42
```

#### String Encoding

```javascript
const secret = new YoshisSecret(31337);

// Encode a string
const message = "Hello Yoshi!";
const encoded = secret.encodeString(message);
console.log(`Encoded array: ${encoded}`);

// Decode back to string
const decoded = secret.decodeString(encoded);
console.log(`Decoded: ${decoded}`); // "Hello Yoshi!"
```

#### Cryptographic Hashing

```javascript
const secret = new YoshisSecret(31337);

// Generate hash of data
const data = "important data";
const hash = secret.hash(data);
console.log(`Hash: ${hash}`);

// Same data produces same hash
const hash2 = secret.hash("important data");
console.log(`Same: ${hash === hash2}`); // true

// Different data produces different hash
const hash3 = secret.hash("different data");
console.log(`Different: ${hash !== hash3}`); // true
```

### API Reference

#### Constructor

```javascript
new YoshisSecret(prime = 31337)
```

- `prime`: A prime number for the finite field (default: 31337)

#### Methods

- **`encode(value)`** - Encode a number using the secret key
- **`decode(encoded)`** - Decode a number using the secret key inverse
- **`encodeString(message)`** - Encode a string to an array of encoded numbers
- **`decodeString(encoded)`** - Decode an array back to a string
- **`hash(data)`** - Generate a hash of data using field operations

---

## Bae Mathematics

### What is Bae Mathematics?

**Bae Mathematics** is a framework for modeling relationships and connections between entities. "Bae" (before anne else) represents the mathematical structure for:

- Entity relationship graphs
- Connection strengths (0 to 1)
- Transitive relationships
- Relationship matrices
- "Bae index" - finding strongest connections

### Mathematical Foundation

Bae Mathematics models relationships as a weighted graph where:

- **Entities** are vertices in the graph
- **Connections** are weighted edges (strength ∈ [0, 1])
- **Transitive connections** are calculated as: `T(a,c) = max(S(a,b) × S(b,c))` for all intermediaries b

The framework uses Young Field operations for normalization and probability distributions over relationships.

### Usage

#### Creating Entities and Relationships

```javascript
const { BaeMathematics } = require('reality-simulation-code');

const bae = new BaeMathematics();

// Add entities
bae.addEntity('alice', { name: 'Alice' });
bae.addEntity('bob', { name: 'Bob' });
bae.addEntity('charlie', { name: 'Charlie' });

// Create relationships (strength from 0 to 1)
bae.connect('alice', 'bob', 0.9);      // Strong connection
bae.connect('bob', 'charlie', 0.7);    // Medium connection
bae.connect('alice', 'charlie', 0.3);  // Weak connection

// Get connection strength
const strength = bae.getConnectionStrength('alice', 'bob');
console.log(`Alice-Bob strength: ${strength}`); // 0.9
```

#### Transitive Connections

```javascript
const bae = new BaeMathematics();

bae.addEntity('a');
bae.addEntity('b');
bae.addEntity('c');

bae.connect('a', 'b', 0.8);
bae.connect('b', 'c', 0.6);

// Direct connection is 0 (no edge)
console.log(bae.getConnectionStrength('a', 'c')); // 0

// But transitive connection exists through 'b'
const transitive = bae.transitiveConnection('a', 'c');
console.log(`Transitive: ${transitive}`); // 0.48 (0.8 × 0.6)
```

#### Finding "Bae" (Strongest Connection)

```javascript
const bae = new BaeMathematics();

bae.addEntity('person');
bae.addEntity('friend1');
bae.addEntity('friend2');
bae.addEntity('friend3');

bae.connect('person', 'friend1', 0.5);
bae.connect('person', 'friend2', 0.9);
bae.connect('person', 'friend3', 0.7);

// Find who is "person"'s bae (strongest connection)
const baeIndex = bae.getBaeIndex('person');
console.log(`Bae: ${baeIndex.bae}`);           // "friend2"
console.log(`Strength: ${baeIndex.strength}`); // 0.9
```

#### Relationship Matrix

```javascript
const bae = new BaeMathematics();

bae.addEntity('a');
bae.addEntity('b');
bae.addEntity('c');

bae.connect('a', 'b', 0.5);
bae.connect('b', 'c', 0.7);

const matrix = bae.getRelationshipMatrix();
console.log(matrix);
// {
//   entities: ['a', 'b', 'c'],
//   matrix: [
//     [1,   0.5, 0],
//     [0.5, 1,   0.7],
//     [0,   0.7, 1]
//   ]
// }
```

### API Reference

#### Constructor

```javascript
new BaeMathematics()
```

#### Methods

- **`addEntity(entityId, properties)`** - Add an entity to the relationship graph
- **`connect(entity1, entity2, strength)`** - Create bidirectional connection with strength ∈ [0, 1]
- **`getConnectionStrength(entity1, entity2)`** - Get direct connection strength
- **`transitiveConnection(entity1, entity2)`** - Calculate connection through intermediaries
- **`getBaeIndex(entityId)`** - Find strongest connection for an entity
- **`getRelationshipMatrix()`** - Get matrix representation of all relationships
- **`normalizeRelationships(entityId)`** - Normalize connection strengths to probability distribution

---

## God Generator

### What is God Generator?

**God Generator** is an advanced entity creation system that combines Yoshi's Secret and Bae Mathematics to create complex entities with:

- Encoded properties for security
- Relationship modeling
- Power and essence calculations
- Pantheon generation (collections of related entities)

### Concept

The God Generator creates "god" entities - powerful, complex entities with:

- **Encoded Properties**: Using Yoshi's Secret to hide/protect data
- **Essence**: A cryptographic hash representing the entity's unique identity
- **Power**: A calculated value based on entity attributes
- **Relationships**: Managed through Bae Mathematics

### Usage

#### Creating a Single God

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

// Generate a god with properties
const zeus = generator.generateGod({
  name: 'Zeus',
  power: 9000,
  wisdom: 8500,
  domain: 'Sky'
});

console.log(zeus);
// {
//   id: 'god_1',
//   type: 'god',
//   createdAt: 1234567890,
//   properties: { name: 'Zeus', power: 9000, ... },
//   encodedProperties: { name: [encoded...], power: encoded, ... },
//   essence: 12345,  // Cryptographic hash
//   power: 17500     // Calculated power level
// }
```

#### Decoding God Properties

```javascript
const generator = new GodGenerator(31337);

const god = generator.generateGod({
  name: 'Apollo',
  level: 100
});

// Decode the encrypted properties
const decoded = generator.decodeEntity(god.id);
console.log(decoded.decodedProperties);
// { name: 'Apollo', level: 100 }
```

#### Creating Relationships Between Gods

```javascript
const generator = new GodGenerator(31337);

const zeus = generator.generateGod({ name: 'Zeus', power: 9000 });
const hera = generator.generateGod({ name: 'Hera', power: 8500 });

// Create a relationship (e.g., marriage)
generator.connectEntities(zeus.id, hera.id, 0.95);

// Check connection strength
const strength = generator.bae.getConnectionStrength(zeus.id, hera.id);
console.log(`Zeus-Hera connection: ${strength}`); // 0.95
```

#### Generating a Pantheon

```javascript
const generator = new GodGenerator(31337);

// Generate a pantheon of 5 gods with shared properties
const olympians = generator.generatePantheon(5, {
  realm: 'Olympus',
  type: 'Olympian'
});

console.log(`Created ${olympians.length} gods`);
// Each god is automatically connected to others
// Connection strength based on power similarity

// Get relationship matrix
const graph = generator.getRelationshipGraph();
console.log(graph.entities); // ['god_1', 'god_2', 'god_3', 'god_4', 'god_5']
console.log(graph.matrix);   // 5×5 relationship matrix
```

#### Finding Most Powerful Entity

```javascript
const generator = new GodGenerator(31337);

generator.generateGod({ name: 'Ares', power: 7000 });
generator.generateGod({ name: 'Zeus', power: 9000 });
generator.generateGod({ name: 'Hades', power: 8500 });

const mostPowerful = generator.getMostPowerful();
console.log(`Most powerful: ${mostPowerful.properties.name}`); // "Zeus"
console.log(`Power level: ${mostPowerful.power}`);              // 9000
```

### API Reference

#### Constructor

```javascript
new GodGenerator(secretPrime = 31337)
```

- `secretPrime`: Prime number for Yoshi's Secret encoding

#### Methods

- **`generateGod(properties)`** - Create a god entity with encoded properties
- **`connectEntities(entity1Id, entity2Id, strength)`** - Create relationship between entities
- **`decodeEntity(entityId)`** - Decode entity's encrypted properties
- **`generatePantheon(count, baseProperties)`** - Generate collection of related gods
- **`getRelationshipGraph()`** - Get relationship matrix for all entities
- **`getMostPowerful()`** - Find entity with highest power level

---

## Examples

### Complete Example: Creating a Mythology

```javascript
const { GodGenerator, shisSecretExample, baeMathematicsExample } = require('reality-simulation-code');

// Create generator
const generator = new GodGenerator(31337);

// Create Greek pantheon
const zeus = generator.generateGod({
  name: 'Zeus',
  power: 9500,
  wisdom: 9000,
  domain: 'Sky'
});

const poseidon = generator.generateGod({
  name: 'Poseidon',
  power: 9000,
  wisdom: 8500,
  domain: 'Sea'
});

const hades = generator.generateGod({
  name: 'Hades',
  power: 8800,
  wisdom: 9200,
  domain: 'Underworld'
});

// Create relationships (brothers)
generator.connectEntities(zeus.id, poseidon.id, 0.85);
generator.connectEntities(zeus.id, hades.id, 0.75);
generator.connectEntities(poseidon.id, hades.id, 0.80);

// Find most powerful
const strongest = generator.getMostPowerful();
console.log(`Strongest god: ${strongest.properties.name}`);

// Get relationship matrix
const graph = generator.getRelationshipGraph();
console.log('Relationship graph:', graph);

// Decode a god's properties
const decoded = generator.decodeEntity(zeus.id);
console.log('Decoded Zeus:', decoded.decodedProperties);
```

### Example: Secret Message Exchange

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Alice encodes a message
const aliceMessage = "Meet at dawn";
const encoded = secret.encodeString(aliceMessage);
console.log('Encoded message:', encoded);

// Bob receives and decodes
const decoded = secret.decodeString(encoded);
console.log('Decoded message:', decoded); // "Meet at dawn"

// Create message signature
const signature = secret.hash(aliceMessage);
console.log('Message signature:', signature);
```

### Running Example Functions

```javascript
const {
  shisSecretExample,
  baeMathematicsExample,
  godGeneratorExample
} = require('reality-simulation-code');

// Run Yoshi's Secret example
console.log('Yoshi\'s Secret:', shisSecretExample());
// {
//   original: "Hello Yoshi!",
//   encoded: "12345,23456,...",
//   decoded: "Hello Yoshi!",
//   hash: 26513
// }

// Run Bae Mathematics example
console.log('Bae Mathematics:', baeMathematicsExample());
// {
//   aliceBob: 0.9,
//   bobCharlie: 0.7,
//   aliceCharlie: 0.3,
//   transitiveAliceCharlie: 0.63,
//   aliceBae: { bae: 'bob', strength: 0.9 }
// }

// Run God Generator example
console.log('God Generator:', godGeneratorExample());
// {
//   singleGod: { id: 'god_1', type: 'god', power: 17500, essence: 12345 },
//   pantheonCount: 3,
//   relationshipMatrix: { entities: [...], matrix: [...] }
// }
```

---

## Philosophy & Inspiration

These frameworks were inspired by:

### Childhood Curiosity
The desire to dig into data, understand patterns, and learn how things work at a fundamental level.

### Mathematical Beauty
Combining abstract algebra (Young Fields), cryptography (Yoshi's Secret), and graph theory (Bae Mathematics) into cohesive systems.

### Creative Exploration
From wondering "what if?" to building systems that can create complex entities and relationships - potentially even "generating a god" as a thought experiment in emergent complexity.

### Learning Journey
Representing the path from being ung and curious about data to creating sophisticated mathematical frameworks for reality simulation.

---

## Testing

All features are comprehensively tested. Run the test suite:

```bash
npm test
```

The test suite includes:
- Yoshi's Secret encoding/decoding, authentication, commitments, and random generation
- Bae Mathematics relationship modeling, centrality measures, path finding, and graph metrics
- God Generator entity creation, evolution, merging, offspring generation, and hierarchy
- All integration scenarios
- Example function validation
- **Total: 55 comprehensive tests**

---

## Extended Features

### Advanced Yoshi's Secret Operations

#### Batch Operations
```javascript
const secret = new YoshisSecret(31337);
const values = [10, 20, 30, 40];
const encoded = secret.encodeBatch(values);
const decoded = secret.decodeBatch(encoded);
```

#### Message Authentication
```javascript
const message = "Important data";
const authCode = secret.authenticate(message);
const isValid = secret.verifyAuthentication(message, authCode);
```

#### Cryptographic Commitments
```javascript
const value = 42;
const { commitment, randomness } = secret.commit(value);
const isValid = secret.verifyCommitment(value, commitment, randomness);
```

#### Deterministic Random Sequence
```javascript
const seed = 12345;
const sequence = secret.generateRandomSequence(seed, 10);
```

#### Oblivious Transfer Protocol
```javascript
const transfer = secret.obliviousTransferSend(msg0, msg1);
const chosen = secret.obliviousTransferReceive(transfer, 0, transfer.mask);
```

### Advanced Bae Mathematics Operations

#### Centrality Measures
```javascript
const bae = new BaeMathematics();
// ... add entities and connections

// Various centrality measures
const degree = bae.degreeCentrality('entity');
const betweenness = bae.betweennessCentrality('entity');
const closeness = bae.closenessCentrality('entity');
const clustering = bae.clusteringCoefficient('entity');
```

#### Path Finding
```javascript
// Find all paths between entities
const paths = bae.findPaths('start', 'end', maxDepth);

// Find strongest path
const strongest = bae.strongestPath('start', 'end');
console.log(strongest.path);     // ['start', 'mid', 'end']
console.log(strongest.strength);  // 0.48
```

#### Graph Analysis
```javascript
// Graph metrics
const density = bae.graphDensity();
const avgStrength = bae.averageConnectionStrength();
const components = bae.connectedComponents();
```

### Advanced God Generator Operations

#### Entity Evolution
```javascript
const generator = new GodGenerator(31337);
const god = generator.generateGod({ power: 100 });

// Evolve entity over time
generator.evolveEntity(god.id, 0.1); // 10% growth rate
```

#### Entity Merging
```javascript
const god1 = generator.generateGod({ power: 100, wisdom: 50 });
const god2 = generator.generateGod({ power: 200, wisdom: 150 });

// Merge two entities
const merged = generator.mergeEntities(god1.id, god2.id, 0.5);
```

#### Offspring Generation
```javascript
const parent1 = generator.generateGod({ power: 100 });
const parent2 = generator.generateGod({ power: 150 });

// Generate offspring with inherited traits
const offspring = generator.generateOffspring(parent1.id, parent2.id);
console.log(offspring.properties.parents); // [parent1.id, parent2.id]
```

#### Entity Analysis
```javascript
// Calculate similarity
const similarity = generator.entitySimilarity(god1.id, god2.id);

// Get influence score
const influence = generator.calculateInfluence(god.id);

// Get entity hierarchy
const hierarchy = generator.getEntityHierarchy();

// Get lineage (ancestors and descendants)
const lineage = generator.getLineage(god.id);

// Get statistics
const stats = generator.getStatistics();
console.log(stats);
// {
//   count: 5,
//   avgPower: 150,
//   maxPower: 200,
//   minPower: 100,
//   avgEssence: 12345,
//   density: 0.7,
//   harmony: 0.65
// }
```

#### Simulation
```javascript
// Simulate interaction between entities
const result = generator.simulateInteraction(god1.id, god2.id);
console.log(result.newStrength); // Updated relationship strength

// Find natural factions/clusters
const factions = generator.findFactions();

// Calculate pantheon harmony
const harmony = generator.pantheonHarmony();
```

---

## Mathematical Definitions

### Yoshi's Secret Definitions

**Definition 1 (Encoding)**: For value x ∈ ℤₚ, the encoding function is:
```
E(x) = (x × k + c) mod p
```
where k is the secret key and c is the constant shift.

**Definition 2 (Batch Encoding)**: For a set V = {v₁, v₂, ..., vₙ}:
```
E(V) = {E(v₁), E(v₂), ..., E(vₙ)}
```

**Definition 3 (HMAC-like Authentication)**: For message m and key k:
```
HMAC(m, k) = H((k ⊕ opad) || H((k ⊕ ipad) || m))
```
Simplified for finite field operations.

**Definition 4 (Commitment Scheme)**: A commitment C to value v with randomness r:
```
C(v, r) = E(v) + r mod p
```

**Definition 5 (Random Sequence Generator)**: Linear Congruential Generator:
```
Rₙ = (a × Rₙ₋₁ + c) mod p
```

### Bae Mathematics Definitions

**Definition 6 (Clustering Coefficient)**: For vertex v with k neighbors:
```
C(v) = (2 × |edges in neighborhood|) / (k × (k-1))
```

**Definition 7 (Degree Centrality)**: For vertex v in graph with n vertices:
```
C_D(v) = deg(v) / (n - 1)
```

**Definition 8 (Closeness Centrality)**: 
```
C_C(v) = (n - 1) / Σᵤ d(v, u)
```
where d(v, u) is the distance between vertices.

**Definition 9 (Path Strength)**: For path P = [v₁, v₂, ..., vₖ]:
```
S(P) = ∏ᵢ₌₁ᵏ⁻¹ s(vᵢ, vᵢ₊₁)
```
where s(vᵢ, vᵢ₊₁) is the edge strength.

**Definition 10 (Graph Density)**:
```
D = (2 × |E|) / (|V| × (|V| - 1))
```
where |E| is the number of edges and |V| is the number of vertices.

### God Generator Definitions

**Definition 11 (Entity Similarity)**:
```
sim(A, B) = 1 - |P(A) - P(B)| / max(P(A), P(B))
```

**Definition 12 (Entity Evolution)**:
```
P(t+1) = P(t) × (1 + γ)
```
where γ is the growth rate.

**Definition 13 (Entity Merge)**:
```
H(A, B, w) = {p | p ∈ P(A) ∪ P(B), value(p) = w × A.p + (1-w) × B.p}
```

**Definition 14 (Offspring Generation)**:
```
O(A, B) = {p | p ∈ P(A) ∪ P(B), value(p) = (A.p + B.p)/2 + ε}
```
where ε is random variation.

**Definition 15 (Influence Score)**:
```
I(v) = P(v) × C_D(v) × E(v)/p
```
where P is power, C_D is degree centrality, E is essence, and p is the prime.

---

## Integration with Young Field

These frameworks build upon the Young Field implementation:

- **Yoshi's Secret** uses finite Young Fields (ℤₚ) for cryptographic operations
- **Bae Mathematics** uses rational Young Fields for relationship normalization
- **God Generator** combines both, using field operations for power calculations

See [YOUNG_FIELD.md](YOUNG_FIELD.md) and [WHITEPAPER_YOUNG_SITUATION.md](WHITEPAPER_YOUNG_SITUATION.md) for the mathematical foundations.

---

## License

MIT License - See LICENSE file for details

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

*"From curiosity to creation - generating complexity from mathematics."*
