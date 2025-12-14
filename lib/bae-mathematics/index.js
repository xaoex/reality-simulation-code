/**
 * Bae Mathematics Module
 * 
 * Framework for modeling relationships and connections between entities
 * "Bae" (before anne else) represents mathematical modeling of relationships
 * 
 * @module bae-mathematics
 * @author xaoex
 */

const { createRationalField } = require('../ung-field');

/**
 * Bae Mathematics - Framework for modeling relationships and connections
 * 
 * "Bae" (before anne else) represents the mathematical modeling of
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
      throw new Error(`Entities must be added before creating connection. Missing: ${!this.entities.has(entity1) ? entity1 : entity2}`);
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

  /**
   * Calculate clustering coefficient for an entity
   * 
   * Measures how clustered an entity's neighbors are (i.e., how many of them are connected to each other).
   * Definition: C(v) = 2E / (k × (k-1))
   * where E is the number of edges in the neighborhood and k is the degree (number of neighbors).
   * 
   * Returns 0 if entity has fewer than 2 neighbors.
   * Returns value between 0 (no clustering) and 1 (fully clustered neighborhood).
   */
  clusteringCoefficient(entityId) {
    const neighbors = Array.from(this.relationships.get(entityId) || new Map()).map(([id]) => id);
    const k = neighbors.length;
    
    if (k < 2) return 0;
    
    let edgesInNeighborhood = 0;
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        if (this.getConnectionStrength(neighbors[i], neighbors[j]) > 0) {
          edgesInNeighborhood++;
        }
      }
    }
    
    // Safe division: k*(k-1) is always positive when k >= 2
    const denominator = k * (k - 1);
    return this.field.divide(2 * edgesInNeighborhood, denominator);
  }

  /**
   * Calculate betweenness centrality (simplified)
   * Measures how often an entity appears on shortest paths
   */
  betweennessCentrality(entityId) {
    let centrality = 0;
    const entities = Array.from(this.entities);
    
    for (const source of entities) {
      if (source === entityId) continue;
      for (const target of entities) {
        if (target === entityId || source === target) continue;
        
        // Check if entityId is on path from source to target
        const directPath = this.getConnectionStrength(source, target);
        const throughPath = this.field.multiply(
          this.getConnectionStrength(source, entityId),
          this.getConnectionStrength(entityId, target)
        );
        
        if (throughPath > directPath) {
          centrality++;
        }
      }
    }
    
    return centrality;
  }

  /**
   * Calculate degree centrality (normalized)
   * Definition: C_D(v) = deg(v) / (n - 1)
   */
  degreeCentrality(entityId) {
    const degree = (this.relationships.get(entityId) || new Map()).size;
    const n = this.entities.size;
    return n > 1 ? this.field.divide(degree, n - 1) : 0;
  }

  /**
   * Calculate closeness centrality
   * Definition: C_C(v) = (n - 1) / Σ d(v, u)
   * where d(v, u) is distance between vertices
   */
  closenessCentrality(entityId) {
    const entities = Array.from(this.entities);
    let totalDistance = 0;
    
    for (const otherId of entities) {
      if (otherId === entityId) continue;
      
      const strength = this.getConnectionStrength(entityId, otherId);
      // Distance is inverse of strength (0 strength = infinite distance)
      const distance = strength > 0 ? this.field.divide(1, strength) : entities.length;
      totalDistance = this.field.add(totalDistance, distance);
    }
    
    return totalDistance > 0 ? this.field.divide(entities.length - 1, totalDistance) : 0;
  }

  /**
   * Find all paths between two entities (up to depth limit)
   * Definition: P(s, t, d) = {p | p is path from s to t with length ≤ d}
   */
  findPaths(startEntity, endEntity, maxDepth = 3) {
    const paths = [];
    const visited = new Set();
    
    const dfs = (current, target, path, depth) => {
      if (depth > maxDepth) return;
      if (current === target && path.length > 1) {
        paths.push([...path]);
        return;
      }
      
      visited.add(current);
      const neighbors = this.relationships.get(current) || new Map();
      
      for (const [neighbor] of neighbors) {
        if (!visited.has(neighbor)) {
          path.push(neighbor);
          dfs(neighbor, target, path, depth + 1);
          path.pop();
        }
      }
      
      visited.delete(current);
    };
    
    dfs(startEntity, endEntity, [startEntity], 0);
    return paths;
  }

  /**
   * Calculate path strength (product of edge strengths along path)
   * Definition: S(path) = ∏ s(eᵢ) for all edges in path
   */
  pathStrength(path) {
    if (path.length < 2) return 0;
    
    let strength = 1;
    for (let i = 0; i < path.length - 1; i++) {
      const edgeStrength = this.getConnectionStrength(path[i], path[i + 1]);
      strength = this.field.multiply(strength, edgeStrength);
    }
    
    return strength;
  }

  /**
   * Find strongest path between two entities
   */
  strongestPath(startEntity, endEntity, maxDepth = 3) {
    const paths = this.findPaths(startEntity, endEntity, maxDepth);
    if (paths.length === 0) return null;
    
    let maxStrength = 0;
    let bestPath = null;
    
    for (const path of paths) {
      const strength = this.pathStrength(path);
      if (strength > maxStrength) {
        maxStrength = strength;
        bestPath = path;
      }
    }
    
    return { path: bestPath, strength: maxStrength };
  }

  /**
   * Calculate graph density
   * Definition: D = (2 × |E|) / (|V| × (|V| - 1))
   */
  graphDensity() {
    const n = this.entities.size;
    if (n < 2) return 0;
    
    let edgeCount = 0;
    for (const [_, connections] of this.relationships) {
      edgeCount += connections.size;
    }
    
    // Divide by 2 because edges are bidirectional
    edgeCount = edgeCount / 2;
    
    return this.field.divide(2 * edgeCount, n * (n - 1));
  }

  /**
   * Get connected components (groups of connected entities)
   */
  connectedComponents() {
    const visited = new Set();
    const components = [];
    
    const dfs = (entityId, component) => {
      visited.add(entityId);
      component.push(entityId);
      
      const neighbors = this.relationships.get(entityId) || new Map();
      for (const [neighbor] of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, component);
        }
      }
    };
    
    for (const entityId of this.entities) {
      if (!visited.has(entityId)) {
        const component = [];
        dfs(entityId, component);
        components.push(component);
      }
    }
    
    return components;
  }

  /**
   * Calculate average connection strength across all relationships
   */
  averageConnectionStrength() {
    let total = 0;
    let count = 0;
    
    for (const [_, connections] of this.relationships) {
      for (const [_, strength] of connections) {
        total = this.field.add(total, strength);
        count++;
      }
    }
    
    // Divide by 2 because relationships are bidirectional
    return count > 0 ? this.field.divide(total, count / 2) : 0;
  }
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

module.exports = {
  BaeMathematics,
  baeMathematicsExample
};
