/**
 * God Generator Module
 * 
 * Advanced entity creation system combining Yoshi's Secret and Bae Mathematics
 * Creates complex entities with encoded properties and relationships
 * 
 * @module god-generator
 * @author xaoex
 */

const { YoshisSecret } = require('../shis-secret');
const { BaeMathematics } = require('../bae-mathematics');
const { createRationalField } = require('../ung-field');

// Constants for entity attribute generation
const MIN_ATTRIBUTE_VALUE = 0;
const MAX_ATTRIBUTE_VALUE = 100;

// Constants for evolutionary and simulation parameters
const OFFSPRING_VARIATION_FACTOR = 0.2;  // 20% variation in offspring traits
const SIMILARITY_THRESHOLD = 0.5;         // Neutral similarity point
const INTERACTION_DELTA_FACTOR = 0.1;     // Relationship change rate

/**
 * God Generator - Creates advanced entities with encoded properties
 * 
 * Combines Yoshi's Secret (encoding) with Bae Mathematics (relationships)
 * to generate complex entities with hidden properties and relationships.
 * 
 * Inspired by curiosity about data, learning, and creating emergent complexity.
 */
class GodGenerator {
  constructor(secretPrime = 31337) {
    this.secret = new YoshisSecret(secretPrime);
    this.bae = new BaeMathematics();
    this.field = createRationalField();
    this.entities = new Map();
    this.nextId = 1;
  }

  /**
   * Generate a "god" entity with encoded properties
   */
  generateGod(properties = {}) {
    const godId = `god_${this.nextId++}`;
    
    // Encode properties using Yoshi's Secret
    const encodedProperties = {};
    for (const [key, value] of Object.entries(properties)) {
      if (typeof value === 'number') {
        encodedProperties[key] = this.secret.encode(value);
      } else if (typeof value === 'string') {
        encodedProperties[key] = this.secret.encodeString(value);
      } else {
        encodedProperties[key] = value;
      }
    }
    
    // Create entity with special properties
    const god = {
      id: godId,
      type: 'god',
      createdAt: Date.now(),
      properties: properties,
      encodedProperties: encodedProperties,
      essence: this._calculateEssence(properties),
      power: this._calculatePower(properties)
    };
    
    // Store entity
    this.entities.set(godId, god);
    this.bae.addEntity(godId, properties);
    
    return god;
  }

  /**
   * Calculate entity essence (hash of properties)
   */
  _calculateEssence(properties) {
    return this.secret.hash(properties);
  }

  /**
   * Calculate entity power level (sum of numeric properties)
   */
  _calculatePower(properties) {
    let power = 0;
    for (const value of Object.values(properties)) {
      if (typeof value === 'number') {
        power = this.field.add(power, Math.abs(value));
      }
    }
    return power;
  }

  /**
   * Create a relationship between two entities
   */
  connectEntities(entity1Id, entity2Id, strength = 0.5) {
    if (!this.entities.has(entity1Id) || !this.entities.has(entity2Id)) {
      throw new Error(`Cannot connect entities: one or both entity IDs do not exist (${entity1Id}, ${entity2Id})`);
    }
    
    return this.bae.connect(entity1Id, entity2Id, strength);
  }

  /**
   * Decode entity properties
   */
  decodeEntity(entityId) {
    const entity = this.entities.get(entityId);
    if (!entity) return null;
    
    const decoded = {};
    for (const [key, value] of Object.entries(entity.encodedProperties)) {
      if (Array.isArray(value)) {
        decoded[key] = this.secret.decodeString(value);
      } else if (typeof value === 'number') {
        decoded[key] = this.secret.decode(value);
      } else {
        decoded[key] = value;
      }
    }
    
    return { ...entity, decodedProperties: decoded };
  }

  /**
   * Generate a pantheon (collection of connected gods)
   */
  generatePantheon(count = 3, baseProperties = {}) {
    const pantheon = [];
    
    // Generate gods
    for (let i = 0; i < count; i++) {
      const properties = {
        ...baseProperties,
        name: `God_${this.nextId}`,
        level: (i + 1) * MAX_ATTRIBUTE_VALUE,
        wisdom: Math.floor(Math.random() * (MAX_ATTRIBUTE_VALUE - MIN_ATTRIBUTE_VALUE + 1)) + MIN_ATTRIBUTE_VALUE,
        power: Math.floor(Math.random() * (MAX_ATTRIBUTE_VALUE - MIN_ATTRIBUTE_VALUE + 1)) + MIN_ATTRIBUTE_VALUE
      };
      
      const god = this.generateGod(properties);
      pantheon.push(god);
    }
    
    // Create relationships between all gods
    for (let i = 0; i < pantheon.length; i++) {
      for (let j = i + 1; j < pantheon.length; j++) {
        const strength = this.field.divide(
          Math.abs(pantheon[i].power - pantheon[j].power),
          Math.max(pantheon[i].power, pantheon[j].power, 1)
        );
        const normalizedStrength = Math.max(0.1, 1 - strength);
        this.connectEntities(pantheon[i].id, pantheon[j].id, normalizedStrength);
      }
    }
    
    return pantheon;
  }

  /**
   * Get relationship graph for all entities
   */
  getRelationshipGraph() {
    return this.bae.getRelationshipMatrix();
  }

  /**
   * Find the most powerful entity
   */
  getMostPowerful() {
    let maxPower = 0;
    let mostPowerful = null;
    
    for (const [id, entity] of this.entities) {
      if (entity.power > maxPower) {
        maxPower = entity.power;
        mostPowerful = entity;
      }
    }
    
    return mostPowerful;
  }

  /**
   * Calculate entity similarity based on properties
   * Definition: sim(A, B) = 1 - |P(A) - P(B)| / max(P(A), P(B))
   */
  entitySimilarity(entity1Id, entity2Id) {
    const e1 = this.entities.get(entity1Id);
    const e2 = this.entities.get(entity2Id);
    
    if (!e1 || !e2) return 0;
    
    const powerDiff = Math.abs(e1.power - e2.power);
    const maxPower = Math.max(e1.power, e2.power, 1);
    
    return 1 - this.field.divide(powerDiff, maxPower);
  }

  /**
   * Evolve an entity's properties over time
   * Definition: P(t+1) = P(t) × (1 + growth_rate)
   */
  evolveEntity(entityId, growthRate = 0.1) {
    const entity = this.entities.get(entityId);
    if (!entity) return null;
    
    // Evolve power
    entity.power = this.field.multiply(entity.power, 1 + growthRate);
    
    // Update encoded properties
    for (const [key, value] of Object.entries(entity.properties)) {
      if (typeof value === 'number') {
        const evolved = this.field.multiply(value, 1 + growthRate);
        entity.properties[key] = evolved;
        entity.encodedProperties[key] = this.secret.encode(evolved);
      }
    }
    
    // Recalculate essence
    entity.essence = this._calculateEssence(entity.properties);
    
    return entity;
  }

  /**
   * Merge two entities into a new hybrid entity
   * Definition: H(A, B) = {p | p ∈ P(A) ∪ P(B), value = weighted_avg(A.p, B.p)}
   */
  mergeEntities(entity1Id, entity2Id, weight = 0.5) {
    const e1 = this.entities.get(entity1Id);
    const e2 = this.entities.get(entity2Id);
    
    if (!e1 || !e2) return null;
    
    // Merge properties with weighted average
    const mergedProperties = {};
    const allKeys = new Set([
      ...Object.keys(e1.properties),
      ...Object.keys(e2.properties)
    ]);
    
    for (const key of allKeys) {
      const v1 = e1.properties[key];
      const v2 = e2.properties[key];
      
      if (typeof v1 === 'number' && typeof v2 === 'number') {
        mergedProperties[key] = this.field.add(
          this.field.multiply(v1, weight),
          this.field.multiply(v2, 1 - weight)
        );
      } else if (typeof v1 === 'string' && typeof v2 === 'string') {
        mergedProperties[key] = weight > 0.5 ? v1 : v2;
      } else {
        mergedProperties[key] = v1 || v2;
      }
    }
    
    mergedProperties.name = `Merged_${this.nextId}`;
    mergedProperties.origin = [entity1Id, entity2Id];
    
    return this.generateGod(mergedProperties);
  }

  /**
   * Calculate entity influence score
   * Definition: I(v) = P(v) × C_D(v) × E(v)
   * where P is power, C_D is degree centrality, E is essence
   */
  calculateInfluence(entityId) {
    const entity = this.entities.get(entityId);
    if (!entity) return 0;
    
    const centrality = this.bae.degreeCentrality(entityId);
    const normalizedEssence = entity.essence / this.secret.prime;
    
    return this.field.multiply(
      this.field.multiply(entity.power, centrality),
      normalizedEssence
    );
  }

  /**
   * Find entity hierarchy (most influential at top)
   */
  getEntityHierarchy() {
    const hierarchy = [];
    
    for (const [id, entity] of this.entities) {
      const influence = this.calculateInfluence(id);
      hierarchy.push({ id, entity, influence });
    }
    
    hierarchy.sort((a, b) => b.influence - a.influence);
    return hierarchy;
  }

  /**
   * Generate offspring from two parent entities
   * Definition: O(A, B) = new entity with inherited traits
   */
  generateOffspring(parent1Id, parent2Id) {
    const p1 = this.entities.get(parent1Id);
    const p2 = this.entities.get(parent2Id);
    
    if (!p1 || !p2) return null;
    
    // Inherit properties with variation
    const offspringProperties = {};
    const allKeys = new Set([
      ...Object.keys(p1.properties),
      ...Object.keys(p2.properties)
    ]);
    
    for (const key of allKeys) {
      const v1 = p1.properties[key];
      const v2 = p2.properties[key];
      
      if (typeof v1 === 'number' && typeof v2 === 'number') {
        // Average with random variation
        const avg = this.field.divide(this.field.add(v1, v2), 2);
        const variation = (Math.random() - 0.5) * OFFSPRING_VARIATION_FACTOR * avg;
        offspringProperties[key] = Math.max(0, avg + variation);
      } else {
        // Random choice for non-numeric properties
        offspringProperties[key] = Math.random() > 0.5 ? v1 : v2;
      }
    }
    
    offspringProperties.name = `Offspring_${this.nextId}`;
    offspringProperties.parents = [parent1Id, parent2Id];
    offspringProperties.generation = 2;
    
    const offspring = this.generateGod(offspringProperties);
    
    // Offspring connected to both parents
    this.connectEntities(offspring.id, parent1Id, 0.8);
    this.connectEntities(offspring.id, parent2Id, 0.8);
    
    return offspring;
  }

  /**
   * Simulate entity interactions and update relationships
   * Definition: R(A, B, t+1) = R(A, B, t) + Δ(sim(A, B))
   */
  simulateInteraction(entity1Id, entity2Id) {
    const similarity = this.entitySimilarity(entity1Id, entity2Id);
    const currentStrength = this.bae.getConnectionStrength(entity1Id, entity2Id);
    
    // Update relationship based on similarity
    const delta = (similarity - SIMILARITY_THRESHOLD) * INTERACTION_DELTA_FACTOR;
    const newStrength = Math.max(0, Math.min(1, currentStrength + delta));
    
    this.connectEntities(entity1Id, entity2Id, newStrength);
    
    return { oldStrength: currentStrength, newStrength, delta };
  }

  /**
   * Get entity lineage (ancestors and descendants)
   */
  getLineage(entityId) {
    const entity = this.entities.get(entityId);
    if (!entity) return null;
    
    const lineage = {
      entity: entityId,
      parents: entity.properties.parents || [],
      offspring: [],
      ancestors: []
    };
    
    // Find offspring
    for (const [id, e] of this.entities) {
      if (e.properties.parents && e.properties.parents.includes(entityId)) {
        lineage.offspring.push(id);
      }
    }
    
    // Find ancestors recursively
    const findAncestors = (id, ancestors = new Set()) => {
      const e = this.entities.get(id);
      if (e && e.properties.parents) {
        for (const parentId of e.properties.parents) {
          if (!ancestors.has(parentId)) {
            ancestors.add(parentId);
            findAncestors(parentId, ancestors);
          }
        }
      }
      return ancestors;
    };
    
    lineage.ancestors = Array.from(findAncestors(entityId));
    
    return lineage;
  }

  /**
   * Calculate pantheon harmony (average relationship strength)
   */
  pantheonHarmony() {
    return this.bae.averageConnectionStrength();
  }

  /**
   * Find natural clusters/factions within entities
   */
  findFactions() {
    return this.bae.connectedComponents();
  }

  /**
   * Get entity statistics summary
   */
  getStatistics() {
    const entities = Array.from(this.entities.values());
    
    if (entities.length === 0) {
      return {
        count: 0,
        avgPower: 0,
        maxPower: 0,
        minPower: 0,
        avgEssence: 0,
        density: 0,
        harmony: 0
      };
    }
    
    const powers = entities.map(e => e.power);
    const essences = entities.map(e => e.essence);
    
    return {
      count: entities.length,
      avgPower: powers.reduce((a, b) => a + b, 0) / powers.length,
      maxPower: Math.max(...powers),
      minPower: Math.min(...powers),
      avgEssence: essences.reduce((a, b) => a + b, 0) / essences.length,
      density: this.bae.graphDensity(),
      harmony: this.pantheonHarmony()
    };
  }
}

/**
 * Example: God Generator creating entities
 */
function godGeneratorExample() {
  const generator = new GodGenerator(31337);
  
  // Generate a god
  const god = generator.generateGod({
    name: 'Zeus',
    power: 9000,
    wisdom: 8500,
    domain: 'Sky'
  });
  
  // Generate a pantheon
  const pantheon = generator.generatePantheon(3, {
    realm: 'Olympus'
  });
  
  return {
    singleGod: {
      id: god.id,
      type: god.type,
      power: god.power,
      essence: god.essence
    },
    pantheonCount: pantheon.length,
    relationshipMatrix: generator.getRelationshipGraph()
  };
}

module.exports = {
  GodGenerator,
  godGeneratorExample
};
