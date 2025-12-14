# God Generator Module

Advanced entity creation system combining cryptographic encoding and relationship modeling.

## Overview

God Generator creates complex entities with encoded properties and manages their relationships. It combines Yoshi's Secret (cryptographic encoding) with Bae Mathematics (relationship modeling) to generate entities with hidden properties, evolutionary capabilities, and emergent behaviors.

Inspired by curiosity about data, learning, and creating emergent complexity.

## Features

- **Entity Generation**: Create entities with encoded properties
- **Pantheon Creation**: Generate connected groups of entities
- **Relationship Management**: Automatic relationship graphs
- **Evolution**: Evolve entity properties over time
- **Genetics**: Create offspring with inherited traits
- **Merging**: Combine entities into hybrids
- **Influence Calculation**: Measure entity power and centrality
- **Lineage Tracking**: Track ancestry and descendants
- **Faction Detection**: Find natural communities
- **Statistics**: Comprehensive entity analytics

## API

### Classes

#### `GodGenerator`

Main class for entity generation and management.

```javascript
const generator = new GodGenerator(secretPrime);
```

**Constructor Parameters:**
- `secretPrime` - Prime number for encoding (default: 31337)

**Methods:**

##### Entity Creation
- `generateGod(properties)` - Create a single entity
- `generatePantheon(count, baseProperties)` - Generate connected group
- `generateOffspring(parent1Id, parent2Id)` - Create offspring from two parents
- `mergeEntities(entity1Id, entity2Id, weight)` - Merge two entities

##### Entity Management
- `connectEntities(entity1Id, entity2Id, strength)` - Create relationship
- `decodeEntity(entityId)` - Decode encoded properties
- `getMostPowerful()` - Find most powerful entity
- `getEntityHierarchy()` - Get entities ranked by influence

##### Evolution & Simulation
- `evolveEntity(entityId, growthRate)` - Evolve properties over time
- `simulateInteraction(entity1Id, entity2Id)` - Simulate interaction and update relationships
- `entitySimilarity(entity1Id, entity2Id)` - Calculate similarity score

##### Analysis
- `calculateInfluence(entityId)` - Calculate influence score
- `getLineage(entityId)` - Get ancestry and descendants
- `findFactions()` - Find natural communities
- `pantheonHarmony()` - Calculate average relationship strength
- `getStatistics()` - Get comprehensive statistics
- `getRelationshipGraph()` - Get full relationship matrix

### Examples

#### `godGeneratorExample()`

Demonstrates basic entity creation.

```javascript
const result = godGeneratorExample();
console.log(result.singleGod);        // Single entity info
console.log(result.pantheonCount);    // Number in pantheon
console.log(result.relationshipMatrix); // Relationship graph
```

## Usage Examples

### Creating a Single Entity

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const zeus = generator.generateGod({
  name: 'Zeus',
  power: 9000,
  wisdom: 8500,
  domain: 'Sky',
  element: 'Lightning'
});

console.log('ID:', zeus.id);
console.log('Power:', zeus.power);
console.log('Essence:', zeus.essence); // Cryptographic hash
console.log('Properties:', zeus.properties);
console.log('Encoded:', zeus.encodedProperties); // Hidden values
```

### Creating a Pantheon

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

// Generate 5 connected gods
const pantheon = generator.generatePantheon(5, {
  realm: 'Olympus',
  faction: 'Greek'
});

console.log('Generated:', pantheon.length, 'gods');

// Check relationships
const matrix = generator.getRelationshipGraph();
console.log('Relationship matrix:', matrix);

// Find harmony level
const harmony = generator.pantheonHarmony();
console.log('Pantheon harmony:', harmony);
```

### Connecting Entities

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const zeus = generator.generateGod({ name: 'Zeus', power: 9000 });
const hera = generator.generateGod({ name: 'Hera', power: 8500 });

// Create strong relationship
generator.connectEntities(zeus.id, hera.id, 0.9);

// Check connection
const strength = generator.bae.getConnectionStrength(zeus.id, hera.id);
console.log('Connection strength:', strength); // 0.9
```

### Evolution

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const entity = generator.generateGod({
  name: 'Evolving Entity',
  power: 100,
  wisdom: 50
});

console.log('Initial power:', entity.power);

// Evolve with 10% growth rate
generator.evolveEntity(entity.id, 0.1);
console.log('After evolution:', entity.power); // 110

// Evolve again
generator.evolveEntity(entity.id, 0.1);
console.log('After 2nd evolution:', entity.power); // 121
```

### Creating Offspring

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const parent1 = generator.generateGod({
  name: 'Parent1',
  power: 1000,
  wisdom: 800,
  speed: 600
});

const parent2 = generator.generateGod({
  name: 'Parent2',
  power: 800,
  wisdom: 1000,
  speed: 900
});

// Create offspring (inherits traits with variation)
const offspring = generator.generateOffspring(parent1.id, parent2.id);

console.log('Offspring:', offspring.properties);
console.log('Parents:', offspring.properties.parents);
// Properties are averaged with random variation
```

### Merging Entities

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const fire = generator.generateGod({ name: 'Fire', power: 800, heat: 1000 });
const water = generator.generateGod({ name: 'Water', power: 700, cold: 1000 });

// Merge with 50/50 weight
const merged = generator.mergeEntities(fire.id, water.id, 0.5);

console.log('Merged entity:', merged.properties);
console.log('Origin:', merged.properties.origin); // [fire.id, water.id]
```

### Calculating Influence

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

// Create pantheon
const pantheon = generator.generatePantheon(5);

// Calculate influence for each
pantheon.forEach(god => {
  const influence = generator.calculateInfluence(god.id);
  console.log(`${god.id} influence:`, influence);
});

// Get ranked hierarchy
const hierarchy = generator.getEntityHierarchy();
console.log('Most influential:', hierarchy[0].id);
```

### Simulating Interactions

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const entity1 = generator.generateGod({ name: 'A', power: 1000 });
const entity2 = generator.generateGod({ name: 'B', power: 1100 });

// Initial connection
generator.connectEntities(entity1.id, entity2.id, 0.5);

// Simulate interaction (similar entities strengthen bonds)
const result = generator.simulateInteraction(entity1.id, entity2.id);

console.log('Old strength:', result.oldStrength);
console.log('New strength:', result.newStrength);
console.log('Delta:', result.delta);
```

### Tracking Lineage

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const adam = generator.generateGod({ name: 'Adam', generation: 1 });
const eve = generator.generateGod({ name: 'Eve', generation: 1 });

const child1 = generator.generateOffspring(adam.id, eve.id);
const child2 = generator.generateOffspring(adam.id, eve.id);

const grandchild = generator.generateOffspring(child1.id, child2.id);

// Get lineage
const lineage = generator.getLineage(grandchild.id);
console.log('Parents:', lineage.parents);
console.log('Ancestors:', lineage.ancestors);
console.log('Offspring:', lineage.offspring);
```

### Finding Factions

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

// Create two separate groups
const greeks = generator.generatePantheon(3, { faction: 'Greek' });
const norse = generator.generatePantheon(3, { faction: 'Norse' });

// Factions naturally form from connection patterns
const factions = generator.findFactions();
console.log('Number of factions:', factions.length);
console.log('Faction 1:', factions[0]);
console.log('Faction 2:', factions[1]);
```

### Entity Statistics

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

// Generate multiple entities
generator.generatePantheon(10);

// Get comprehensive statistics
const stats = generator.getStatistics();
console.log('Total entities:', stats.count);
console.log('Average power:', stats.avgPower);
console.log('Max power:', stats.maxPower);
console.log('Min power:', stats.minPower);
console.log('Average essence:', stats.avgEssence);
console.log('Graph density:', stats.density);
console.log('Pantheon harmony:', stats.harmony);
```

### Decoding Entities

```javascript
const { GodGenerator } = require('reality-simulation-code');

const generator = new GodGenerator(31337);

const entity = generator.generateGod({
  name: 'Secret Entity',
  power: 1337,
  secret: 'Hidden Value'
});

// Properties are encoded
console.log('Encoded power:', entity.encodedProperties.power);

// Decode to see original values
const decoded = generator.decodeEntity(entity.id);
console.log('Decoded power:', decoded.decodedProperties.power); // 1337
```

## Use Cases

- **Game Development**: Generate NPCs, bosses, factions
- **Simulation Systems**: Model populations with relationships
- **AI Agents**: Create agents with hidden states
- **Social Networks**: Generate synthetic social graphs
- **Evolution Experiments**: Study emergent behaviors
- **Genetic Algorithms**: Breeding and selection systems
- **Story Generation**: Create character pantheons with relationships
- **Data Privacy**: Entities with encoded sensitive properties

## Constants

- `MIN_ATTRIBUTE_VALUE` = 0
- `MAX_ATTRIBUTE_VALUE` = 100
- `OFFSPRING_VARIATION_FACTOR` = 0.2 (20% variation)
- `SIMILARITY_THRESHOLD` = 0.5 (neutral point)
- `INTERACTION_DELTA_FACTOR` = 0.1 (relationship change rate)

## Integration

God Generator combines:
- **Yoshi's Secret**: For cryptographic property encoding
- **Bae Mathematics**: For relationship modeling
- **Young Field**: For mathematical operations

## References

- See `YOSHIS_SECRET_BAE_MATH.md` for comprehensive documentation
- See Yoshi's Secret module for encoding details
- See Bae Mathematics module for relationship mechanics
- See Young Field module for mathematical foundations
