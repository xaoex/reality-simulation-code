#!/usr/bin/env node

/**
 * Genesys Demo
 * Demonstrates entity demand management and communication system
 */

const { Genesys } = require('./index.js');

console.log('\n' + '='.repeat(80));
console.log('GENESYS DEMONSTRATION');
console.log('Entity Demand Management & Communication System');
console.log('='.repeat(80) + '\n');

// ============================================================================
// Scenario: Microservices Architecture
// ============================================================================

console.log('--- Scenario: Microservices API Gateway ---\n');

// Create Genesys instance
const genesys = new Genesys({
  maxCapacity: 2000,
  loadBalancing: 'weighted',
  maxopt: true
});

console.log('✓ Genesys initialized with weighted load balancing\n');

// Register microservices (entities)
genesys.registerEntity('api-gateway', { 
  capacity: 200, 
  type: 'api',
  metadata: { version: '1.0', region: 'us-east' }
});

genesys.registerEntity('auth-service', { 
  capacity: 150, 
  type: 'authentication',
  metadata: { version: '2.0', region: 'us-east' }
});

genesys.registerEntity('user-service', { 
  capacity: 180, 
  type: 'api',
  metadata: { version: '1.5', region: 'us-west' }
});

genesys.registerEntity('database-primary', { 
  capacity: 300, 
  type: 'database',
  metadata: { version: '14.0', region: 'us-east' }
});

console.log('✓ Registered 4 microservices:\n');
for (const [id, entity] of genesys.entities) {
  console.log(`  - ${id}: capacity=${entity.capacity}, type=${entity.type}`);
}

console.log('\n--- Submitting User Requests ---\n');

// Simulate user requests
const requests = [
  { type: 'LOGIN', priority: 10, weight: 15, payload: { username: 'alice' } },
  { type: 'API_CALL', priority: 5, weight: 10, payload: { endpoint: '/users/123' } },
  { type: 'DATABASE_QUERY', priority: 8, weight: 20, payload: { query: 'SELECT *' } },
  { type: 'AUTH_TOKEN', priority: 10, weight: 12, payload: { action: 'refresh' } },
  { type: 'API_CALL', priority: 3, weight: 8, payload: { endpoint: '/posts' } },
  { type: 'DATABASE_QUERY', priority: 9, weight: 25, payload: { query: 'UPDATE users' } }
];

const results = [];

for (let i = 0; i < requests.length; i++) {
  const req = requests[i];
  const result = genesys.submitDemand(req);
  
  if (result.success) {
    results.push(result);
    console.log(`Request ${i + 1}: ${req.type}`);
    console.log(`  → Routed to: ${result.entity.id}`);
    console.log(`  → Weight applied: ${result.weightedDemand.toFixed(2)}`);
    console.log(`  → Entity utilization: ${(result.entity.getUtilization() * 100).toFixed(1)}%\n`);
  }
}

console.log('--- System Status After Routing ---\n');

// Show current load distribution
const utilizations = genesys.getAllUtilization();
console.log('Entity Utilization:');
for (const util of utilizations) {
  const bar = '█'.repeat(Math.floor(util.utilization * 20));
  console.log(`  ${util.entityId.padEnd(20)} [${bar.padEnd(20)}] ${(util.utilization * 100).toFixed(1)}%`);
}

const load = genesys.getLoad();
console.log(`\nTotal Load: ${load.totalLoad}`);
console.log(`Weighted Load: ${load.weightedLoad.toFixed(2)}`);
console.log(`System Efficiency: ${load.efficiency.toFixed(2)}`);

console.log('\n--- Processing Requests (Completing 3 of them) ---\n');

// Complete some requests
for (let i = 0; i < 3; i++) {
  const result = results[i];
  const response = genesys.routeResponse(result.demand.id, {
    status: 'success',
    timestamp: Date.now(),
    data: { processed: true }
  });
  
  if (response.success) {
    console.log(`✓ Request ${i + 1} completed (${result.demand.type})`);
    console.log(`  Processing time: ${response.demand.processingDuration}ms\n`);
  }
}

console.log('--- Updated System Status ---\n');

const updatedUtil = genesys.getAllUtilization();
console.log('Entity Utilization After Completions:');
for (const util of updatedUtil) {
  const bar = '█'.repeat(Math.floor(util.utilization * 20));
  console.log(`  ${util.entityId.padEnd(20)} [${bar.padEnd(20)}] ${(util.utilization * 100).toFixed(1)}%`);
}

const stats = genesys.getStats();
console.log(`\nStatistics:`);
console.log(`  Total Demands Submitted: ${stats.totalDemandsSubmitted}`);
console.log(`  Total Demands Processed: ${stats.totalDemandsProcessed}`);
console.log(`  Average Processing Time: ${stats.averageProcessingTime.toFixed(2)}ms`);
console.log(`  Routing Operations: ${stats.routingOperations}`);

console.log('\n--- Load Balancing Optimization ---\n');

const optimization = genesys.optimizeLoadBalancing();
console.log('Optimization Recommendations:');
for (const plan of optimization.optimizationPlan) {
  const adjustmentSign = plan.adjustment > 0 ? '+' : '';
  console.log(`  ${plan.entityId.padEnd(20)} Current: ${plan.currentLoad.toFixed(1)}, Target: ${plan.targetLoad.toFixed(1)}, Adjustment: ${adjustmentSign}${plan.adjustment.toFixed(1)}`);
}

console.log('\n--- Broadcast Example (Event System) ---\n');

// Broadcast an event to multiple services
const broadcastResults = genesys.broadcastDemand(
  { type: 'CACHE_INVALIDATE', priority: 1, weight: 2, payload: { key: 'users' } },
  ['api-gateway', 'user-service', 'auth-service']
);

console.log(`✓ Broadcasted CACHE_INVALIDATE event to ${broadcastResults.length} services`);
for (const result of broadcastResults) {
  if (result.success) {
    console.log(`  - ${result.entity.id}: received`);
  }
}

console.log('\n--- Mathematical Framework ---\n');

console.log('Genesys implements three mathematical structures:');
console.log('');
console.log('1. Relational Algebra:');
console.log('   f: D × E → Genesys');
console.log('   Maps demands to entities through structured relations');
console.log('');
console.log('2. Group Theory:');
console.log('   g₁ · Genesys = entity (forward routing)');
console.log('   g₂ · entity = Genesys (response routing)');
console.log('   Ensures bidirectional communication');
console.log('');
console.log('3. Ring Theory:');
console.log('   w · d = weighted demand (scaling)');
console.log('   d₁ + d₂ = accumulated demand (addition)');
console.log('   Enables load quantification and optimization');

console.log('\n' + '='.repeat(80));
console.log('DEMONSTRATION COMPLETE');
console.log('For full documentation, see GENESYS.md');
console.log('For API reference, see lib/genesys/README.md');
console.log('='.repeat(80) + '\n');
