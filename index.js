/**
 * Reality Simulation Code
 * SimSim Code & Contributions
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 * @see https://linktr.ee/oktays
 */

// ============================================================================
// Young Ring Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 10.1
// ============================================================================

/**
 * Young Ring - Abstract mathematical ring combining relational algebra
 * with group and ring theory foundations
 * 
 * A Young Ring is an algebraic structure Y = (R, +, ×, 0, 1) where:
 * - (R, +, 0) is an abelian group (additive structure)
 * - (R, ×, 1) is a monoid (multiplicative structure)
 * - Left Distribution: a × (b + c) = (a × b) + (a × c)
 * - Right Distribution: (a + b) × c = (a × c) + (b × c)
 */
class YoungRing {
  constructor(elements = [], addOp = null, mulOp = null, zeroVal = 0, oneVal = 1) {
    this.elements = new Set(elements);
    this.addOp = addOp || ((a, b) => a + b);
    this.mulOp = mulOp || ((a, b) => a * b);
    this.zero = zeroVal;
    this.one = oneVal;
  }

  /**
   * Addition operation in the ring
   */
  add(a, b) {
    return this.addOp(a, b);
  }

  /**
   * Multiplication operation in the ring
   */
  multiply(a, b) {
    return this.mulOp(a, b);
  }

  /**
   * Relational Algebra: Selection (σ)
   * Filter elements based on predicate
   */
  select(predicate) {
    return new Set([...this.elements].filter(predicate));
  }

  /**
   * Relational Algebra: Projection (π)
   * Map elements using a function
   */
  project(mapper) {
    return new Set([...this.elements].map(mapper));
  }

  /**
   * Relational Algebra: Join (⋈)
   * Combine with another ring's elements
   */
  join(otherRing) {
    const result = new Set();
    for (const a of this.elements) {
      for (const b of otherRing.elements) {
        result.add([a, b]);
      }
    }
    return result;
  }

  /**
   * Check if element is in the ring
   */
  contains(element) {
    return this.elements.has(element);
  }
}

// ============================================================================
// Young Field Implementation
// Based on WHITEPAPER_YOUNG_SITUATION.md Section 10.3
// ============================================================================

/**
 * Young Field - Extension of Young Ring with multiplicative inverses
 * 
 * A Young Field is an algebraic structure F = (R, +, ×, 0, 1, ⁻¹) where:
 * - (R, +, 0) is an abelian group (additive structure)
 * - (R \ {0}, ×, 1, ⁻¹) is an abelian group (multiplicative structure excluding zero)
 * - Multiplicative Inverse: ∀a ∈ R \ {0} : ∃a⁻¹ ∈ R : a × a⁻¹ = 1
 * - Division operation: a ÷ b = a × b⁻¹ for b ≠ 0
 * 
 * This enables:
 * - Division operations
 * - Normalized situation valuations
 * - Probability distributions over situations
 * - Rate of change calculations
 */
class YoungField extends YoungRing {
  constructor(elements = [], addOp = null, mulOp = null, invOp = null, zeroVal = 0, oneVal = 1) {
    super(elements, addOp, mulOp, zeroVal, oneVal);
    this.invOp = invOp || ((a) => {
      if (a === this.zero) return null;
      return 1 / a;
    });
  }

  /**
   * Multiplicative inverse
   * Returns null for zero (no inverse exists)
   */
  inverse(a) {
    if (a === this.zero) {
      return null;
    }
    return this.invOp(a);
  }

  /**
   * Division operation
   * a ÷ b = a × b⁻¹ for b ≠ 0
   * Returns null if divisor is zero
   */
  divide(a, b) {
    if (b === this.zero) {
      return null; // Division by zero undefined
    }
    const bInverse = this.inverse(b);
    if (bInverse === null) {
      return null;
    }
    return this.multiply(a, bInverse);
  }

  /**
   * Check if this is a valid field
   * Every non-zero element must have a multiplicative inverse
   */
  isValidField() {
    for (const element of this.elements) {
      if (element !== this.zero) {
        const inv = this.inverse(element);
        if (inv === null) return false;
        // Check that element × inverse = 1
        if (Math.abs(this.multiply(element, inv) - this.one) > 1e-10) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Normalize a set of values (sum to 1)
   * Used for probability distributions over situations
   */
  normalize(values) {
    const sum = values.reduce((acc, val) => this.add(acc, val), this.zero);
    // Check for zero sum with tolerance for floating point
    if (Math.abs(sum - this.zero) < 1e-10) return null;
    return values.map(val => this.divide(val, sum));
  }

  /**
   * Calculate rate of change: (f(x + h) - f(x)) / h
   */
  rateOfChange(f, x, h) {
    if (h === this.zero) return null;
    const fx = f(x);
    const fxh = f(this.add(x, h));
    const diff = this.add(fxh, this.multiply(-1, fx));
    return this.divide(diff, h);
  }

  /**
   * Create a probability distribution over situations
   * Normalizes valuations to sum to 1
   */
  createProbabilityDistribution(situationValuations) {
    return this.normalize(situationValuations);
  }
}

// ============================================================================
// Young Field Factory Functions
// ============================================================================

/**
 * Create a Rational Young Field (ℚ)
 * The field of rational numbers with standard operations
 */
function createRationalField() {
  return new YoungField(
    [], // Can be infinite, so we don't enumerate
    (a, b) => a + b,      // addition
    (a, b) => a * b,      // multiplication
    (a) => a === 0 ? null : 1 / a,  // inverse
    0,  // zero
    1   // one
  );
}

/**
 * Create a Finite Young Field (ℤₚ for prime p)
 * The field of integers modulo p
 */
function createFiniteField(p) {
  // Check if p is prime
  const isPrime = (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  if (!isPrime(p)) {
    throw new Error(`p must be prime to form a field. Got ${p}`);
  }

  const elements = Array.from({ length: p }, (_, i) => i);
  
  return new YoungField(
    elements,
    (a, b) => (a + b) % p,        // modular addition
    (a, b) => (a * b) % p,        // modular multiplication
    (a) => {                       // modular inverse using Extended Euclidean Algorithm
      if (a === 0) return null;
      // Extended Euclidean algorithm for modular inverse
      // Find x such that (a * x) % p = 1
      let [old_r, r] = [a, p];
      let [old_s, s] = [1, 0];
      
      while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        [old_r, r] = [r, old_r - quotient * r];
        [old_s, s] = [s, old_s - quotient * s];
      }
      
      // old_r is the GCD, should be 1 for prime p
      if (old_r !== 1) return null;
      
      // Normalize to positive result
      return ((old_s % p) + p) % p;
    },
    0,  // zero
    1   // one
  );
}

/**
 * Create a Situation Valuation Field
 * Field of situation valuations supporting arithmetic operations
 */
function createSituationValuationField() {
  return createRationalField(); // Uses rational field for valuations
}

// ============================================================================
// Young Field Examples and Demonstrations
// ============================================================================

/**
 * Example: Normalized Situation Valuations
 * Given situation values, compute normalized probabilities
 */
function normalizedSituationExample() {
  const field = createSituationValuationField();
  
  // Example situation valuations
  const situationValues = [10, 20, 30, 40];
  
  // Normalize to get probability distribution
  const probabilities = field.createProbabilityDistribution(situationValues);
  
  return {
    original: situationValues,
    normalized: probabilities,
    sum: probabilities.reduce((a, b) => a + b, 0)
  };
}

/**
 * Example: Young Field Operations
 * Demonstrate basic field operations
 */
function youngFieldOperationsExample() {
  const field = createRationalField();
  
  const a = 6;
  const b = 3;
  
  return {
    addition: field.add(a, b),           // 9
    multiplication: field.multiply(a, b), // 18
    division: field.divide(a, b),        // 2
    inverse: field.inverse(b),           // 1/3
    divisionByZero: field.divide(a, 0)   // null
  };
}

/**
 * Example: Finite Field Operations (ℤ₇)
 */
function finiteFieldExample() {
  const field = createFiniteField(7);
  
  return {
    elements: Array.from(field.elements),
    isValid: field.isValidField(),
    operations: {
      '5 + 4': field.add(5, 4),           // 2 (mod 7)
      '5 × 4': field.multiply(5, 4),      // 6 (mod 7)
      '5 ÷ 2': field.divide(5, 2),        // 6 (since 2⁻¹ = 4 in ℤ₇, 5×4=20≡6)
      'inverse(3)': field.inverse(3)      // 5 (since 3×5=15≡1)
    }
  };
}

// ============================================================================
// Yoshi's Secret - Cryptographic Encoding Framework
// ============================================================================

/**
 * Yoshi's Secret - A cryptographic encoding system using Young Field mathematics
 * 
 * This implements a secret encoding/decoding system based on finite fields,
 * allowing messages to be encoded using mathematical transformations.
 * Inspired by childhood curiosity and data exploration.
 */
class YoshisSecret {
  constructor(prime = 31337) {
    // Use a large prime for the finite field
    this.field = createFiniteField(prime);
    this.prime = prime;
    this.secretKey = this._generateSecretKey();
  }

  /**
   * Generate a secret key based on special primes
   * Uses primes significant to the creator
   */
  _generateSecretKey() {
    const specialPrimes = [1993, 1991, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    let key = 1;
    for (const p of specialPrimes) {
      key = this.field.multiply(key, p % this.prime);
    }
    return key;
  }

  /**
   * Encode a number using Yoshi's Secret transformation
   */
  encode(value) {
    const normalized = value % this.prime;
    const encoded = this.field.multiply(normalized, this.secretKey);
    return this.field.add(encoded, 1337 % this.prime);
  }

  /**
   * Decode a number using Yoshi's Secret inverse transformation
   */
  decode(encoded) {
    const shifted = this.field.add(encoded, this.field.multiply(-1, 1337 % this.prime));
    const keyInverse = this.field.inverse(this.secretKey);
    return this.field.multiply(shifted, keyInverse);
  }

  /**
   * Encode a string by converting to numeric values
   */
  encodeString(message) {
    const encoded = [];
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      encoded.push(this.encode(charCode));
    }
    return encoded;
  }

  /**
   * Decode numeric array back to string
   */
  decodeString(encoded) {
    let message = '';
    for (const value of encoded) {
      const charCode = this.decode(value);
      message += String.fromCharCode(charCode);
    }
    return message;
  }

  /**
   * Generate a hash of data using field operations
   */
  hash(data) {
    let hash = 0;
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    
    for (let i = 0; i < dataStr.length; i++) {
      const charCode = dataStr.charCodeAt(i);
      hash = this.field.add(
        this.field.multiply(hash, 31),
        charCode % this.prime
      );
    }
    
    return hash;
  }
}

// ============================================================================
// Bae Mathematics - Relationship & Connection Framework
// ============================================================================

/**
 * Bae Mathematics - Framework for modeling relationships and connections
 * 
 * "Bae" (before anyone else) represents the mathematical modeling of
 * relationships, bonds, and connections between entities.
 * Uses Young Field to create relationship matrices and connection strengths.
 */
class BaeMathematics {
  constructor() {
    this.field = createRationalField();
    this.relationships = new Map();
    this.entities = new Set();
  }

  /**
   * Add an entity to the relationship graph
   */
  addEntity(entityId, properties = {}) {
    this.entities.add(entityId);
    if (!this.relationships.has(entityId)) {
      this.relationships.set(entityId, new Map());
    }
    return { id: entityId, properties };
  }

  /**
   * Create a relationship between two entities
   * strength: 0 (no connection) to 1 (maximum connection)
   */
  connect(entity1, entity2, strength = 0.5) {
    if (!this.entities.has(entity1) || !this.entities.has(entity2)) {
      throw new Error('Both entities must exist before creating connection');
    }

    // Normalize strength to [0, 1]
    const normalizedStrength = Math.max(0, Math.min(1, strength));
    
    // Store bidirectional relationship
    this.relationships.get(entity1).set(entity2, normalizedStrength);
    this.relationships.get(entity2).set(entity1, normalizedStrength);
    
    return normalizedStrength;
  }

  /**
   * Calculate relationship strength between two entities
   */
  getConnectionStrength(entity1, entity2) {
    if (!this.relationships.has(entity1)) return 0;
    return this.relationships.get(entity1).get(entity2) || 0;
  }

  /**
   * Calculate transitive connection (connection through intermediaries)
   */
  transitiveConnection(entity1, entity2) {
    if (entity1 === entity2) return 1;
    
    const direct = this.getConnectionStrength(entity1, entity2);
    if (direct > 0) return direct;
    
    // Calculate through common connections
    let maxTransitive = 0;
    const connections1 = this.relationships.get(entity1) || new Map();
    
    for (const [intermediate, strength1] of connections1) {
      if (intermediate !== entity2) {
        const strength2 = this.getConnectionStrength(intermediate, entity2);
        if (strength2 > 0) {
          // Transitive strength = product of connections
          const transitiveStrength = this.field.multiply(strength1, strength2);
          maxTransitive = Math.max(maxTransitive, transitiveStrength);
        }
      }
    }
    
    return maxTransitive;
  }

  /**
   * Create a relationship matrix for all entities
   */
  getRelationshipMatrix() {
    const entityList = Array.from(this.entities);
    const n = entityList.length;
    const matrix = [];
    
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        if (i === j) {
          row.push(1); // Self-connection is always 1
        } else {
          row.push(this.getConnectionStrength(entityList[i], entityList[j]));
        }
      }
      matrix.push(row);
    }
    
    return { entities: entityList, matrix };
  }

  /**
   * Calculate the "bae index" - strongest relationship for an entity
   */
  getBaeIndex(entityId) {
    const connections = this.relationships.get(entityId);
    if (!connections || connections.size === 0) return null;
    
    let maxStrength = 0;
    let bae = null;
    
    for (const [otherId, strength] of connections) {
      if (strength > maxStrength) {
        maxStrength = strength;
        bae = otherId;
      }
    }
    
    return { bae, strength: maxStrength };
  }

  /**
   * Normalize all relationship strengths to create probability distribution
   */
  normalizeRelationships(entityId) {
    const connections = this.relationships.get(entityId);
    if (!connections || connections.size === 0) return new Map();
    
    const values = Array.from(connections.values());
    const normalized = this.field.normalize(values);
    
    const result = new Map();
    let i = 0;
    for (const [otherId] of connections) {
      result.set(otherId, normalized[i++]);
    }
    
    return result;
  }
}

// ============================================================================
// God Generator - Advanced Entity Creation System
// ============================================================================

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
      throw new Error('Both entities must exist');
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
        name: `Entity_${i + 1}`,
        level: (i + 1) * 100,
        wisdom: Math.floor(Math.random() * 100),
        power: Math.floor(Math.random() * 100)
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
}

// ============================================================================
// Example Functions for New Features
// ============================================================================

/**
 * Example: Yoshi's Secret encoding/decoding
 */
function yoshisSecretExample() {
  const secret = new YoshisSecret(31337);
  
  const message = "Hello Yoshi!";
  const encoded = secret.encodeString(message);
  const decoded = secret.decodeString(encoded);
  
  return {
    original: message,
    encoded: encoded.slice(0, 5).join(',') + '...',
    decoded: decoded,
    hash: secret.hash(message)
  };
}

/**
 * Example: Bae Mathematics relationship modeling
 */
function baeMathematicsExample() {
  const bae = new BaeMathematics();
  
  // Create entities
  bae.addEntity('alice', { name: 'Alice' });
  bae.addEntity('bob', { name: 'Bob' });
  bae.addEntity('charlie', { name: 'Charlie' });
  
  // Create relationships
  bae.connect('alice', 'bob', 0.9);      // Strong connection
  bae.connect('bob', 'charlie', 0.7);    // Medium connection
  bae.connect('alice', 'charlie', 0.3);  // Weak connection
  
  return {
    aliceBob: bae.getConnectionStrength('alice', 'bob'),
    bobCharlie: bae.getConnectionStrength('bob', 'charlie'),
    aliceCharlie: bae.getConnectionStrength('alice', 'charlie'),
    transitiveAliceCharlie: bae.transitiveConnection('alice', 'charlie'),
    aliceBae: bae.getBaeIndex('alice')
  };
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

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  name: 'reality-simulation-code',
  version: '1.0.0',
  description: 'Reality Simulation Codebase - SimSim Code & Contributions',
  author: 'xaoex',
  
  // Original functions
  init: function() {
    console.log('Reality Simulation Code initialized');
    return true;
  },
  
  info: function() {
    return {
      name: this.name,
      version: this.version,
      author: this.author,
      links: [
        'https://linktr.ee/xaoex',
        'https://linktr.ee/oktays'
      ]
    };
  },

  // Young Ring and Young Field classes
  YoungRing,
  YoungField,

  // Factory functions
  createRationalField,
  createFiniteField,
  createSituationValuationField,

  // Example functions
  normalizedSituationExample,
  youngFieldOperationsExample,
  finiteFieldExample,

  // Yoshi's Secret - Cryptographic encoding framework
  YoshisSecret,
  yoshisSecretExample,

  // Bae Mathematics - Relationship modeling
  BaeMathematics,
  baeMathematicsExample,

  // God Generator - Advanced entity creation
  GodGenerator,
  godGeneratorExample
};
