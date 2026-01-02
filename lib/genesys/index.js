/**
 * Genesys - Entity Demand Management & Communication System
 * 
 * Handles all demands toward entities and handles all communication with them.
 * Based on GENESYS.md - combining relational algebra, group theory, and ring theory.
 * 
 * @module genesys
 */

/**
 * Entity class representing addressable components in the system
 */
class Entity {
  constructor(id, options = {}) {
    this.id = id;
    this.type = options.type || 'generic';
    this.capacity = options.capacity || 100;
    this.health_status = options.health_status || 'healthy';
    this.metadata = options.metadata || {};
    this.currentLoad = 0;
    this.processedDemands = 0;
  }

  /**
   * Get entity utilization (0-1 scale)
   */
  getUtilization() {
    return this.currentLoad / this.capacity;
  }

  /**
   * Check if entity can accept more load
   */
  canAcceptLoad(amount) {
    return (this.currentLoad + amount) <= this.capacity;
  }

  /**
   * Add load to entity
   */
  addLoad(amount) {
    this.currentLoad += amount;
    this.processedDemands++;
  }

  /**
   * Remove load from entity
   */
  removeLoad(amount) {
    this.currentLoad = Math.max(0, this.currentLoad - amount);
  }
}

/**
 * Demand class representing communication requests
 */
class Demand {
  constructor(id, options = {}) {
    this.id = id;
    this.type = options.type || 'generic';
    this.priority = options.priority || 1;
    this.timestamp = options.timestamp || Date.now();
    this.payload = options.payload || {};
    this.status = 'pending';
    this.weight = options.weight || 1;
  }

  /**
   * Mark demand as processing
   */
  startProcessing() {
    this.status = 'processing';
    this.processingStartTime = Date.now();
  }

  /**
   * Mark demand as completed
   */
  complete(response) {
    this.status = 'completed';
    this.completionTime = Date.now();
    this.response = response;
    this.processingDuration = this.completionTime - this.processingStartTime;
  }

  /**
   * Mark demand as failed
   */
  fail(error) {
    this.status = 'failed';
    this.error = error;
  }
}

/**
 * Mapping class for demand-entity relationships (relational algebra)
 */
class Mapping {
  constructor(demand, entity) {
    this.mapping_id = `${demand.id}_${entity.id}_${Date.now()}`;
    this.demand_id = demand.id;
    this.entity_id = entity.id;
    this.route_time = Date.now();
    this.completion_time = null;
  }

  complete() {
    this.completion_time = Date.now();
  }
}

/**
 * RoutingOperation class (group theory)
 * Represents operations in the routing group G
 */
class RoutingOperation {
  constructor(type, config = {}) {
    this.type = type; // 'forward', 'response', 'broadcast', 'aggregate', 'identity'
    this.config = config;
  }

  /**
   * Apply routing operation (group action)
   * g · Genesys = entity (forward)
   * g · entity = Genesys (response)
   */
  apply(source, target) {
    switch (this.type) {
      case 'forward':
        return { action: 'route_to_entity', source, target };
      case 'response':
        return { action: 'route_to_genesys', source, target };
      case 'broadcast':
        return { action: 'fan_out', source, targets: this.config.targets };
      case 'aggregate':
        return { action: 'collect', sources: this.config.sources, target };
      case 'identity':
        return { action: 'passthrough', source, target };
      default:
        throw new Error(`Unknown routing operation: ${this.type}`);
    }
  }

  /**
   * Compose routing operations (group composition)
   * (g₁ · g₂) · g₃ = g₁ · (g₂ · g₃)
   */
  compose(other) {
    return new RoutingOperation('composed', {
      operations: [this, other]
    });
  }

  /**
   * Get inverse operation
   */
  inverse() {
    const inverseMap = {
      'forward': 'response',
      'response': 'forward',
      'broadcast': 'aggregate',
      'aggregate': 'broadcast',
      'identity': 'identity'
    };
    return new RoutingOperation(inverseMap[this.type], this.config);
  }
}

/**
 * Main Genesys class
 * Implements demand routing and entity communication management
 */
class Genesys {
  constructor(config = {}) {
    this.config = {
      maxCapacity: config.maxCapacity || 10000,
      defaultWeight: config.defaultWeight || 1.0,
      loadBalancing: config.loadBalancing || 'weighted',
      monitoring: config.monitoring !== false,
      maxopt: config.maxopt !== false
    };

    // Relational storage
    this.entities = new Map();      // entity_id -> Entity
    this.demands = new Map();        // demand_id -> Demand
    this.mappings = [];              // Array of Mappings

    // Ring structure for load calculation
    this.totalLoad = 0;              // ∑ d_i
    this.weightedLoad = 0;           // ∑ w_i · d_i

    // Monitoring
    this.stats = {
      totalDemandsProcessed: 0,
      totalDemandsSubmitted: 0,
      totalDemandsFailed: 0,
      averageProcessingTime: 0,
      routingOperations: 0
    };

    // Group operations
    this.g1 = new RoutingOperation('forward');   // Request assignment
    this.g2 = new RoutingOperation('response');  // Response routing
    this.g3 = new RoutingOperation('broadcast'); // Fan-out
    this.g4 = new RoutingOperation('aggregate'); // Aggregation
    this.e = new RoutingOperation('identity');   // Identity element
  }

  // === Relational Algebra Methods ===

  /**
   * Register a new entity
   * f: D × E → Genesys
   */
  registerEntity(id, options = {}) {
    const entity = new Entity(id, options);
    this.entities.set(id, entity);
    return entity;
  }

  /**
   * Unregister an entity
   */
  unregisterEntity(id) {
    this.entities.delete(id);
  }

  /**
   * Submit a demand for processing
   */
  submitDemand(demandOptions, targetEntityId = null) {
    const demandId = `demand_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const demand = new Demand(demandId, demandOptions);
    this.demands.set(demandId, demand);

    // Increment submitted counter
    this.stats.totalDemandsSubmitted++;

    // Add to total load (ring addition)
    this.totalLoad += demand.weight;

    // Route the demand
    const entity = targetEntityId 
      ? this.entities.get(targetEntityId)
      : this.selectEntityForDemand(demand);

    if (!entity) {
      demand.fail('No available entity');
      this.stats.totalDemandsFailed++;
      return { success: false, error: 'No available entity' };
    }

    return this.routeRequest(demand, entity);
  }

  /**
   * Selection operator (σ) - Filter demands
   */
  selectDemands(predicate) {
    const results = [];
    for (const [id, demand] of this.demands) {
      if (predicate(demand)) {
        results.push(demand);
      }
    }
    return results;
  }

  /**
   * Projection operator (π) - Extract attributes
   */
  projectDemands(attributes) {
    const results = [];
    for (const [id, demand] of this.demands) {
      const projected = {};
      for (const attr of attributes) {
        projected[attr] = demand[attr];
      }
      results.push(projected);
    }
    return results;
  }

  /**
   * Join operator (⋈) - Combine demand and entity data
   */
  joinDemandEntity() {
    const results = [];
    for (const mapping of this.mappings) {
      const demand = this.demands.get(mapping.demand_id);
      const entity = this.entities.get(mapping.entity_id);
      if (demand && entity) {
        results.push({ demand, entity, mapping });
      }
    }
    return results;
  }

  // === Group Theory Methods ===

  /**
   * Route request to entity (g₁ operation)
   * g₁ · Genesys = entity
   */
  routeRequest(demand, entity) {
    this.stats.routingOperations++;

    // Check if entity can accept load
    if (!entity.canAcceptLoad(demand.weight)) {
      demand.fail('Entity at capacity');
      this.stats.totalDemandsFailed++;
      return { success: false, error: 'Entity at capacity' };
    }

    // Apply forward routing operation
    const routingResult = this.g1.apply('Genesys', entity.id);

    // Create mapping (relational algebra)
    const mapping = new Mapping(demand, entity);
    this.mappings.push(mapping);

    // Update entity load (ring multiplication)
    const weightedDemand = this.calculateWeightedDemand(entity, demand);
    demand.appliedWeight = weightedDemand; // Store for later removal
    entity.addLoad(weightedDemand);
    this.weightedLoad += weightedDemand;

    // Update demand status
    demand.startProcessing();

    return {
      success: true,
      demand,
      entity,
      mapping,
      routingResult,
      weightedDemand
    };
  }

  /**
   * Route response back to Genesys (g₂ operation)
   * g₂ · entity = Genesys
   */
  routeResponse(demandId, response) {
    this.stats.routingOperations++;

    const demand = this.demands.get(demandId);
    if (!demand) {
      return { success: false, error: 'Demand not found' };
    }

    // Find mapping
    const mapping = this.mappings.find(m => m.demand_id === demandId);
    if (!mapping) {
      return { success: false, error: 'Mapping not found' };
    }

    const entity = this.entities.get(mapping.entity_id);
    if (!entity) {
      return { success: false, error: 'Entity not found' };
    }

    // Apply response routing operation
    const routingResult = this.g2.apply(entity.id, 'Genesys');

    // Update demand
    demand.complete(response);

    // Update mapping
    mapping.complete();

    // Remove load from entity (use stored weighted demand)
    const weightedDemand = demand.appliedWeight || this.calculateWeightedDemand(entity, demand);
    entity.removeLoad(weightedDemand);
    this.weightedLoad = Math.max(0, this.weightedLoad - weightedDemand);
    this.totalLoad = Math.max(0, this.totalLoad - demand.weight);

    // Update stats
    this.stats.totalDemandsProcessed++;
    this.updateAverageProcessingTime(demand.processingDuration);

    return {
      success: true,
      demand,
      entity,
      response,
      routingResult
    };
  }

  /**
   * Broadcast demand to multiple entities (g₃ operation)
   */
  broadcastDemand(demandOptions, entityIds) {
    const results = [];
    for (const entityId of entityIds) {
      const result = this.submitDemand(demandOptions, entityId);
      results.push(result);
    }
    return results;
  }

  // === Ring Theory Methods ===

  /**
   * Calculate weighted demand (ring multiplication)
   * w · d = weighted demand
   */
  calculateWeightedDemand(entity, demand) {
    const weight = this.getEntityWeight(entity);
    return weight * demand.weight;
  }

  /**
   * Get entity weight (w_Genesys)
   * w = capacity / load (efficiency metric)
   */
  getEntityWeight(entity) {
    if (entity.currentLoad === 0) {
      return this.config.defaultWeight;
    }
    return entity.capacity / (entity.currentLoad + 1); // +1 to avoid division issues
  }

  /**
   * Accumulate demands (ring addition)
   * d₁ + d₂ + d₃ = total demand
   */
  accumulateDemands(demands) {
    return demands.reduce((sum, demand) => sum + demand.weight, 0);
  }

  /**
   * Get total system load (∑ d_i)
   */
  getLoad() {
    return {
      totalLoad: this.totalLoad,
      weightedLoad: this.weightedLoad,
      efficiency: this.calculateEfficiency()
    };
  }

  /**
   * Calculate Genesys efficiency (w_Genesys)
   */
  calculateEfficiency() {
    if (this.totalLoad === 0) return 1.0;
    return this.config.maxCapacity / this.totalLoad;
  }

  // === Load Balancing Methods ===

  /**
   * Select entity for demand based on load balancing strategy
   */
  selectEntityForDemand(demand) {
    const availableEntities = Array.from(this.entities.values())
      .filter(e => e.health_status === 'healthy');

    if (availableEntities.length === 0) {
      return null;
    }

    switch (this.config.loadBalancing) {
      case 'round-robin':
        return this.selectRoundRobin(availableEntities);
      case 'weighted':
        return this.selectWeighted(availableEntities, demand);
      case 'least-load':
        return this.selectLeastLoad(availableEntities);
      default:
        return availableEntities[0];
    }
  }

  selectRoundRobin(entities) {
    // Simple round-robin selection
    const index = this.stats.totalDemandsSubmitted % entities.length;
    return entities[index];
  }

  selectWeighted(entities, demand) {
    // Select based on entity weight (capacity/load ratio)
    let bestEntity = null;
    let bestWeight = -Infinity;

    for (const entity of entities) {
      const weight = this.getEntityWeight(entity);
      if (entity.canAcceptLoad(demand.weight) && weight > bestWeight) {
        bestWeight = weight;
        bestEntity = entity;
      }
    }

    return bestEntity;
  }

  selectLeastLoad(entities) {
    // Select entity with least current load
    let leastLoadedEntity = null;
    let leastLoad = Infinity;

    for (const entity of entities) {
      if (entity.currentLoad < leastLoad) {
        leastLoad = entity.currentLoad;
        leastLoadedEntity = entity;
      }
    }

    return leastLoadedEntity;
  }

  /**
   * Optimize load balancing across all entities
   */
  optimizeLoadBalancing() {
    const entities = Array.from(this.entities.values());
    const totalCapacity = entities.reduce((sum, e) => sum + e.capacity, 0);
    const avgLoad = this.totalLoad / entities.length;

    const optimizationPlan = entities.map(entity => {
      const targetLoad = (entity.capacity / totalCapacity) * this.totalLoad;
      const adjustment = targetLoad - entity.currentLoad;
      return {
        entityId: entity.id,
        currentLoad: entity.currentLoad,
        targetLoad,
        adjustment
      };
    });

    return {
      totalLoad: this.totalLoad,
      totalCapacity,
      avgLoad,
      optimizationPlan
    };
  }

  // === Monitoring & Analytics ===

  /**
   * Get entity utilization metrics
   */
  getEntityUtilization(entityId) {
    const entity = this.entities.get(entityId);
    if (!entity) {
      return null;
    }

    return {
      entityId: entity.id,
      utilization: entity.getUtilization(),
      currentLoad: entity.currentLoad,
      capacity: entity.capacity,
      processedDemands: entity.processedDemands,
      weight: this.getEntityWeight(entity)
    };
  }

  /**
   * Get all entities utilization
   */
  getAllUtilization() {
    const utilizations = [];
    for (const [id, entity] of this.entities) {
      utilizations.push(this.getEntityUtilization(id));
    }
    return utilizations;
  }

  /**
   * Update average processing time
   */
  updateAverageProcessingTime(duration) {
    const total = this.stats.totalDemandsProcessed;
    this.stats.averageProcessingTime = 
      (this.stats.averageProcessingTime * (total - 1) + duration) / total;
  }

  /**
   * Get system statistics
   */
  getStats() {
    return {
      ...this.stats,
      totalEntities: this.entities.size,
      totalDemands: this.demands.size,
      totalMappings: this.mappings.length,
      totalLoad: this.totalLoad,
      weightedLoad: this.weightedLoad,
      efficiency: this.calculateEfficiency()
    };
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      config: this.config,
      stats: this.getStats(),
      entities: this.getAllUtilization(),
      load: this.getLoad()
    };
  }
}

/**
 * Create example Genesys system
 */
function createGenesysExample() {
  const genesys = new Genesys({
    maxCapacity: 1000,
    loadBalancing: 'weighted',
    maxopt: true
  });

  // Register entities
  genesys.registerEntity('service1', { capacity: 100, type: 'api' });
  genesys.registerEntity('service2', { capacity: 200, type: 'api' });
  genesys.registerEntity('database1', { capacity: 150, type: 'database' });

  return genesys;
}

/**
 * Run comprehensive Genesys example
 */
function genesysExample() {
  const genesys = createGenesysExample();

  // Submit demands
  const demand1 = genesys.submitDemand({ 
    type: 'API_CALL', 
    priority: 1,
    weight: 10,
    payload: { endpoint: '/users' }
  });

  const demand2 = genesys.submitDemand({ 
    type: 'DATABASE_QUERY', 
    priority: 2,
    weight: 15,
    payload: { query: 'SELECT * FROM users' }
  });

  const demand3 = genesys.submitDemand({ 
    type: 'API_CALL', 
    priority: 1,
    weight: 8,
    payload: { endpoint: '/posts' }
  });

  // Complete demands
  if (demand1.success) {
    genesys.routeResponse(demand1.demand.id, { status: 200, data: { users: [] } });
  }

  if (demand2.success) {
    genesys.routeResponse(demand2.demand.id, { rows: [] });
  }

  // Get system status
  const status = genesys.getStatus();
  const optimization = genesys.optimizeLoadBalancing();

  return {
    genesys,
    demands: [demand1, demand2, demand3],
    status,
    optimization
  };
}

module.exports = {
  Genesys,
  Entity,
  Demand,
  Mapping,
  RoutingOperation,
  createGenesysExample,
  genesysExample
};
