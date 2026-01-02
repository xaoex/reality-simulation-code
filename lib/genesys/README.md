# Genesys Module

**Genesys** handles all demands toward entities and handles all communication with them.

## Overview

This module implements the Genesys entity demand management and communication system, combining:
- **Relational Algebra**: Structured mapping of demands to entities
- **Group Theory**: Bidirectional routing operations for request/response cycles
- **Ring Theory**: Communication load quantification and scaling

For complete mathematical formalization and organizational documentation, see [GENESYS.md](../../GENESYS.md).

## Features

### Relational Algebra
- Entity and demand registration
- Mapping between demands and entities
- Selection (σ), Projection (π), and Join (⋈) operations
- Complete traceability of all interactions

### Group Theory
- Forward routing (g₁): Assign request to entity
- Response routing (g₂): Route response back
- Broadcast (g₃): Fan-out to multiple entities
- Aggregation (g₄): Collect responses
- Identity (e): Passthrough operation
- Operation composition and inverses

### Ring Theory
- Demand accumulation (+): Combine multiple demands
- Capacity scaling (·): Weight demands by entity capacity
- Load calculation: Total and weighted loads
- Efficiency metrics: w_Genesys = capacity / load

### Load Balancing
- Round-robin: Simple circular distribution
- Weighted: Capacity-based allocation
- Least-load: Minimize maximum entity load

### Monitoring & Analytics
- Entity utilization tracking
- Processing time metrics
- System-wide statistics
- Load optimization recommendations

## Installation

```bash
npm install reality-simulation-code
```

## Usage

### Basic Usage

```javascript
const { Genesys } = require('reality-simulation-code');

// Create Genesys instance
const genesys = new Genesys({
  maxCapacity: 1000,
  loadBalancing: 'weighted',
  maxopt: true
});

// Register entities
genesys.registerEntity('api-service', { 
  capacity: 100, 
  type: 'api' 
});

genesys.registerEntity('database', { 
  capacity: 200, 
  type: 'database' 
});

// Submit a demand
const result = genesys.submitDemand({
  type: 'API_CALL',
  priority: 1,
  weight: 10,
  payload: { endpoint: '/users' }
});

if (result.success) {
  console.log(`Demand routed to: ${result.entity.id}`);
  
  // Process and respond
  genesys.routeResponse(result.demand.id, {
    status: 200,
    data: { users: [...] }
  });
}
```

### Relational Algebra Operations

```javascript
const { Genesys } = require('reality-simulation-code');
const genesys = new Genesys();

// Selection (σ) - Filter high-priority demands
const highPriorityDemands = genesys.selectDemands(d => d.priority > 5);

// Projection (π) - Extract specific attributes
const demandTypes = genesys.projectDemands(['type', 'priority']);

// Join (⋈) - Combine demand and entity data
const demandEntityPairs = genesys.joinDemandEntity();
```

### Group Theory Operations

```javascript
const { Genesys, RoutingOperation } = require('reality-simulation-code');
const genesys = new Genesys();

// Forward routing (g₁)
const demand = { type: 'REQUEST', weight: 5 };
const entity = genesys.entities.get('service1');
genesys.routeRequest(demand, entity);

// Response routing (g₂)
genesys.routeResponse(demand.id, { status: 'success' });

// Broadcast (g₃)
genesys.broadcastDemand(
  { type: 'EVENT', weight: 1 },
  ['service1', 'service2', 'service3']
);

// Compose operations
const g1 = new RoutingOperation('forward');
const g2 = new RoutingOperation('response');
const composed = g1.compose(g2); // Round-trip operation
```

### Ring Theory Operations

```javascript
const { Genesys } = require('reality-simulation-code');
const genesys = new Genesys();

// Get entity weight (w)
const entity = genesys.entities.get('service1');
const weight = genesys.getEntityWeight(entity);
console.log(`Weight: ${weight}`); // capacity / load

// Calculate weighted demand (w · d)
const demand = { weight: 10 };
const weightedDemand = genesys.calculateWeightedDemand(entity, demand);

// Get total load (∑ d_i)
const load = genesys.getLoad();
console.log(`Total load: ${load.totalLoad}`);
console.log(`Weighted load: ${load.weightedLoad}`);
console.log(`Efficiency: ${load.efficiency}`);
```

### Load Balancing

```javascript
const { Genesys } = require('reality-simulation-code');

// Round-robin load balancing
const genesysRR = new Genesys({ loadBalancing: 'round-robin' });

// Weighted load balancing (capacity-based)
const genesysWeighted = new Genesys({ loadBalancing: 'weighted' });

// Least-load balancing
const genesysLL = new Genesys({ loadBalancing: 'least-load' });

// Optimize load distribution
const optimization = genesys.optimizeLoadBalancing();
console.log(optimization.optimizationPlan);
```

### Monitoring & Analytics

```javascript
const { Genesys } = require('reality-simulation-code');
const genesys = new Genesys();

// Get entity utilization
const utilization = genesys.getEntityUtilization('service1');
console.log(`Utilization: ${(utilization.utilization * 100).toFixed(2)}%`);

// Get all entities utilization
const allUtilization = genesys.getAllUtilization();

// Get system statistics
const stats = genesys.getStats();
console.log(`Total demands processed: ${stats.totalDemandsProcessed}`);
console.log(`Average processing time: ${stats.averageProcessingTime}ms`);
console.log(`Efficiency: ${stats.efficiency}`);

// Get complete system status
const status = genesys.getStatus();
```

### Complete Example

```javascript
const { Genesys } = require('reality-simulation-code');

// Create Genesys system
const genesys = new Genesys({
  maxCapacity: 1000,
  loadBalancing: 'weighted',
  maxopt: true
});

// Register entities
genesys.registerEntity('api-gateway', { capacity: 150, type: 'api' });
genesys.registerEntity('auth-service', { capacity: 100, type: 'auth' });
genesys.registerEntity('database', { capacity: 200, type: 'database' });

// Submit demands
const demands = [
  { type: 'LOGIN', weight: 5, payload: { username: 'user1' } },
  { type: 'QUERY', weight: 10, payload: { table: 'users' } },
  { type: 'API_CALL', weight: 8, payload: { endpoint: '/api/data' } }
];

for (const demandOpts of demands) {
  const result = genesys.submitDemand(demandOpts);
  
  if (result.success) {
    console.log(`Routed to: ${result.entity.id}`);
    
    // Simulate processing
    setTimeout(() => {
      genesys.routeResponse(result.demand.id, { 
        status: 'completed' 
      });
    }, 100);
  }
}

// Monitor system
setTimeout(() => {
  const status = genesys.getStatus();
  console.log('System Status:', status);
  
  const optimization = genesys.optimizeLoadBalancing();
  console.log('Optimization Plan:', optimization);
}, 500);
```

## API Reference

### Genesys Class

#### Constructor

```javascript
new Genesys(config)
```

**Config Options:**
- `maxCapacity`: Maximum system capacity (default: 10000)
- `defaultWeight`: Default entity weight (default: 1.0)
- `loadBalancing`: Load balancing strategy - 'round-robin', 'weighted', 'least-load' (default: 'weighted')
- `monitoring`: Enable monitoring (default: true)
- `maxopt`: Enable 100% maxopt injection (default: true)

#### Methods

##### Entity Management
- `registerEntity(id, options)` - Register a new entity
- `unregisterEntity(id)` - Remove an entity
- `getEntityUtilization(id)` - Get entity utilization metrics
- `getAllUtilization()` - Get all entities utilization

##### Demand Management
- `submitDemand(demandOptions, targetEntityId)` - Submit a demand for routing
- `selectDemands(predicate)` - Filter demands (relational selection)
- `projectDemands(attributes)` - Extract attributes (relational projection)
- `joinDemandEntity()` - Join demands and entities

##### Routing Operations (Group Theory)
- `routeRequest(demand, entity)` - Forward routing (g₁)
- `routeResponse(demandId, response)` - Response routing (g₂)
- `broadcastDemand(demandOptions, entityIds)` - Broadcast (g₃)

##### Load Management (Ring Theory)
- `getLoad()` - Get total and weighted load
- `calculateWeightedDemand(entity, demand)` - Calculate w · d
- `accumulateDemands(demands)` - Accumulate demands (d₁ + d₂)
- `getEntityWeight(entity)` - Get entity weight (w)
- `calculateEfficiency()` - Calculate system efficiency

##### Load Balancing
- `selectEntityForDemand(demand)` - Select entity based on strategy
- `optimizeLoadBalancing()` - Get optimization recommendations

##### Monitoring
- `getStats()` - Get system statistics
- `getStatus()` - Get complete system status

### Entity Class

```javascript
new Entity(id, options)
```

**Methods:**
- `getUtilization()` - Get utilization (0-1)
- `canAcceptLoad(amount)` - Check if can accept load
- `addLoad(amount)` - Add load
- `removeLoad(amount)` - Remove load

### Demand Class

```javascript
new Demand(id, options)
```

**Methods:**
- `startProcessing()` - Mark as processing
- `complete(response)` - Mark as completed
- `fail(error)` - Mark as failed

### RoutingOperation Class

```javascript
new RoutingOperation(type, config)
```

**Types:** 'forward', 'response', 'broadcast', 'aggregate', 'identity'

**Methods:**
- `apply(source, target)` - Apply routing operation
- `compose(other)` - Compose with another operation
- `inverse()` - Get inverse operation

## Integration with Reality Simulation

### With Young Situation

```javascript
const { Genesys, YoungSituation } = require('reality-simulation-code');

const genesys = new Genesys();
const entityStates = new YoungSituation({
  states: ['idle', 'processing', 'responding'],
  transitions: [
    ['idle', 'processing'],
    ['processing', 'responding'],
    ['responding', 'idle']
  ]
});

genesys.registerEntity('service1', { 
  capacity: 100,
  state: entityStates 
});
```

### With Young Field

```javascript
const { Genesys, YoungField } = require('reality-simulation-code');

const field = new YoungField();
const weights = [100, 200, 150];
const normalizedWeights = field.normalize(weights);

const genesys = new Genesys();
// Apply normalized weights to entities
```

## Use Cases

1. **Microservices Architecture**: Route requests between services
2. **API Gateway**: Central entry point for all API calls
3. **Message Broker**: Distribute messages to subscribers
4. **Load Balancer**: Optimize distribution across servers
5. **Event System**: Route events to handlers
6. **Request-Response Patterns**: Manage bidirectional communication

## Performance

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Submit demand | O(n) | O(1) |
| Route request | O(1) | O(1) |
| Route response | O(n) | O(1) |
| Select entity | O(n) | O(1) |
| Optimize load | O(n) | O(n) |

Where n = number of entities

## References

- **[GENESYS.md](../../GENESYS.md)** - Complete mathematical formalization
- **[WHITEPAPER_YOUNG_SITUATION.md](../../WHITEPAPER_YOUNG_SITUATION.md)** - Mathematical foundations
- **Relational Algebra**: Codd, E.F. (1970)
- **Group Theory**: Abstract Algebra
- **Ring Theory**: Commutative Algebra

---

**Version:** 1.0.0  
**Created:** January 2026  
**Status:** Production Ready - 100% Maxopt
