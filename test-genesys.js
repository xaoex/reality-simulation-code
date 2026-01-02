/**
 * Genesys Test Suite
 * Tests for Genesys entity demand management and communication system
 * Based on GENESYS.md - Relational Algebra, Group Theory, Ring Theory
 */

const {
  Genesys,
  Entity,
  Demand,
  Mapping,
  RoutingOperation,
  createGenesysExample,
  genesysExample
} = require('./index.js');

console.log('\n' + '='.repeat(80));
console.log('GENESYS TEST SUITE');
console.log('Entity Demand Management & Communication System');
console.log('='.repeat(80) + '\n');

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`✓ ${testName}`);
  } else {
    testsFailed++;
    console.error(`✗ ${testName}`);
  }
}

// ============================================================================
// Test 1: Basic Entity Creation
// ============================================================================

console.log('\n--- Test 1: Basic Entity Creation ---\n');

const entity1 = new Entity('service1', { 
  capacity: 100, 
  type: 'api',
  health_status: 'healthy'
});

assert(entity1.id === 'service1', 'Entity ID is correct');
assert(entity1.capacity === 100, 'Entity capacity is set');
assert(entity1.type === 'api', 'Entity type is set');
assert(entity1.health_status === 'healthy', 'Entity health status is healthy');
assert(entity1.currentLoad === 0, 'Entity starts with zero load');
assert(entity1.getUtilization() === 0, 'Entity utilization starts at 0%');

// ============================================================================
// Test 2: Entity Load Management
// ============================================================================

console.log('\n--- Test 2: Entity Load Management ---\n');

entity1.addLoad(50);
assert(entity1.currentLoad === 50, 'Entity load increases correctly');
assert(entity1.getUtilization() === 0.5, 'Entity utilization is 50%');
assert(entity1.canAcceptLoad(30), 'Entity can accept more load');
assert(!entity1.canAcceptLoad(60), 'Entity rejects excessive load');

entity1.removeLoad(20);
assert(entity1.currentLoad === 30, 'Entity load decreases correctly');
assert(entity1.getUtilization() === 0.3, 'Entity utilization is 30%');

// ============================================================================
// Test 3: Basic Demand Creation
// ============================================================================

console.log('\n--- Test 3: Basic Demand Creation ---\n');

const demand1 = new Demand('demand1', {
  type: 'API_CALL',
  priority: 1,
  weight: 10,
  payload: { endpoint: '/users' }
});

assert(demand1.id === 'demand1', 'Demand ID is correct');
assert(demand1.type === 'API_CALL', 'Demand type is set');
assert(demand1.priority === 1, 'Demand priority is set');
assert(demand1.weight === 10, 'Demand weight is set');
assert(demand1.status === 'pending', 'Demand starts as pending');

// ============================================================================
// Test 4: Demand State Transitions
// ============================================================================

console.log('\n--- Test 4: Demand State Transitions ---\n');

demand1.startProcessing();
assert(demand1.status === 'processing', 'Demand transitions to processing');
assert(demand1.processingStartTime !== undefined, 'Processing start time is recorded');

demand1.complete({ status: 200, data: { users: [] } });
assert(demand1.status === 'completed', 'Demand transitions to completed');
assert(demand1.response !== undefined, 'Response is stored');
assert(demand1.processingDuration >= 0, 'Processing duration is calculated');

const demand2 = new Demand('demand2', { type: 'QUERY' });
demand2.fail('Database unavailable');
assert(demand2.status === 'failed', 'Demand can fail');
assert(demand2.error === 'Database unavailable', 'Error message is stored');

// ============================================================================
// Test 5: Routing Operations (Group Theory)
// ============================================================================

console.log('\n--- Test 5: Routing Operations (Group Theory) ---\n');

const g1 = new RoutingOperation('forward');
const g2 = new RoutingOperation('response');
const g3 = new RoutingOperation('broadcast', { targets: ['e1', 'e2'] });
const e = new RoutingOperation('identity');

assert(g1.type === 'forward', 'Forward operation created');
assert(g2.type === 'response', 'Response operation created');
assert(g3.type === 'broadcast', 'Broadcast operation created');
assert(e.type === 'identity', 'Identity operation created');

// Test group action
const result1 = g1.apply('Genesys', 'service1');
assert(result1.action === 'route_to_entity', 'Forward routing applies correctly');
assert(result1.target === 'service1', 'Forward routing targets correct entity');

const result2 = g2.apply('service1', 'Genesys');
assert(result2.action === 'route_to_genesys', 'Response routing applies correctly');

// Test inverse
const g1_inverse = g1.inverse();
assert(g1_inverse.type === 'response', 'Forward inverse is response');
assert(g2.inverse().type === 'forward', 'Response inverse is forward');
assert(e.inverse().type === 'identity', 'Identity is its own inverse');

// Test composition
const composed = g1.compose(g2);
assert(composed.type === 'composed', 'Operations can be composed');
assert(composed.config.operations.length === 2, 'Composition contains both operations');

// ============================================================================
// Test 6: Genesys Instance Creation
// ============================================================================

console.log('\n--- Test 6: Genesys Instance Creation ---\n');

const genesys = new Genesys({
  maxCapacity: 1000,
  defaultWeight: 1.0,
  loadBalancing: 'weighted',
  monitoring: true,
  maxopt: true
});

assert(genesys.config.maxCapacity === 1000, 'Max capacity is set');
assert(genesys.config.loadBalancing === 'weighted', 'Load balancing strategy is set');
assert(genesys.config.maxopt === true, 'Maxopt is enabled');
assert(genesys.entities.size === 0, 'Starts with no entities');
assert(genesys.totalLoad === 0, 'Starts with zero load');

// ============================================================================
// Test 7: Entity Registration (Relational Algebra)
// ============================================================================

console.log('\n--- Test 7: Entity Registration (Relational Algebra) ---\n');

const svc1 = genesys.registerEntity('api-service', { 
  capacity: 100, 
  type: 'api' 
});

const svc2 = genesys.registerEntity('database', { 
  capacity: 200, 
  type: 'database' 
});

assert(genesys.entities.size === 2, 'Two entities registered');
assert(svc1.id === 'api-service', 'First entity registered correctly');
assert(svc2.id === 'database', 'Second entity registered correctly');
assert(genesys.entities.get('api-service') === svc1, 'Entity retrievable by ID');

genesys.unregisterEntity('api-service');
assert(genesys.entities.size === 1, 'Entity unregistration works');
assert(genesys.entities.get('api-service') === undefined, 'Unregistered entity removed');

// Re-register for further tests
genesys.registerEntity('api-service', { capacity: 100, type: 'api' });
genesys.registerEntity('auth-service', { capacity: 150, type: 'auth' });

// ============================================================================
// Test 8: Demand Submission and Routing
// ============================================================================

console.log('\n--- Test 8: Demand Submission and Routing ---\n');

const result = genesys.submitDemand({
  type: 'LOGIN',
  priority: 1,
  weight: 10,
  payload: { username: 'user1' }
});

assert(result.success === true, 'Demand submission succeeds');
assert(result.demand !== undefined, 'Demand is created');
assert(result.entity !== undefined, 'Entity is assigned');
assert(result.mapping !== undefined, 'Mapping is created');
assert(result.demand.status === 'processing', 'Demand is marked as processing');
assert(result.entity.currentLoad > 0, 'Entity load increases');
assert(genesys.totalLoad > 0, 'Total system load increases');

// ============================================================================
// Test 9: Response Routing (Group Theory g₂)
// ============================================================================

console.log('\n--- Test 9: Response Routing (Group Theory g₂) ---\n');

const demandId = result.demand.id;
const entityLoadBefore = result.entity.currentLoad;

const responseResult = genesys.routeResponse(demandId, {
  status: 'success',
  data: { token: 'abc123' }
});

assert(responseResult.success === true, 'Response routing succeeds');
assert(responseResult.demand.status === 'completed', 'Demand is completed');
assert(responseResult.response !== undefined, 'Response is stored');
assert(responseResult.entity.currentLoad < entityLoadBefore, 'Entity load decreases');
assert(genesys.stats.totalDemandsProcessed === 1, 'Processed demand count increases');

// ============================================================================
// Test 10: Relational Algebra - Selection
// ============================================================================

console.log('\n--- Test 10: Relational Algebra - Selection ---\n');

// Submit multiple demands
genesys.submitDemand({ type: 'API_CALL', priority: 5, weight: 5 });
genesys.submitDemand({ type: 'QUERY', priority: 10, weight: 15 });
genesys.submitDemand({ type: 'API_CALL', priority: 3, weight: 8 });

// Selection: high-priority demands
const highPriority = genesys.selectDemands(d => d.priority >= 5);
assert(highPriority.length >= 2, 'Selection finds high-priority demands');

// Selection: by type
const apiCalls = genesys.selectDemands(d => d.type === 'API_CALL');
assert(apiCalls.length >= 2, 'Selection finds demands by type');

// ============================================================================
// Test 11: Relational Algebra - Projection
// ============================================================================

console.log('\n--- Test 11: Relational Algebra - Projection ---\n');

const projected = genesys.projectDemands(['type', 'priority']);
assert(projected.length > 0, 'Projection returns results');
assert(projected[0].type !== undefined, 'Projection includes type');
assert(projected[0].priority !== undefined, 'Projection includes priority');
assert(projected[0].payload === undefined, 'Projection excludes non-selected attributes');

// ============================================================================
// Test 12: Relational Algebra - Join
// ============================================================================

console.log('\n--- Test 12: Relational Algebra - Join ---\n');

const joined = genesys.joinDemandEntity();
assert(joined.length > 0, 'Join returns results');
assert(joined[0].demand !== undefined, 'Join includes demand');
assert(joined[0].entity !== undefined, 'Join includes entity');
assert(joined[0].mapping !== undefined, 'Join includes mapping');

// ============================================================================
// Test 13: Ring Theory - Load Calculation
// ============================================================================

console.log('\n--- Test 13: Ring Theory - Load Calculation ---\n');

const load = genesys.getLoad();
assert(load.totalLoad >= 0, 'Total load is non-negative');
assert(load.weightedLoad >= 0, 'Weighted load is non-negative');
assert(load.efficiency > 0, 'Efficiency is positive');

// Test accumulation (ring addition)
const demands = [
  new Demand('d1', { weight: 5 }),
  new Demand('d2', { weight: 10 }),
  new Demand('d3', { weight: 15 })
];
const accumulated = genesys.accumulateDemands(demands);
assert(accumulated === 30, 'Demand accumulation (ring addition) works correctly');

// ============================================================================
// Test 14: Ring Theory - Weighted Demands
// ============================================================================

console.log('\n--- Test 14: Ring Theory - Weighted Demands ---\n');

const testEntity = genesys.entities.get('database');
const testDemand = new Demand('test', { weight: 10 });

const weight = genesys.getEntityWeight(testEntity);
assert(weight > 0, 'Entity weight is positive');

const weightedDemand = genesys.calculateWeightedDemand(testEntity, testDemand);
assert(weightedDemand > 0, 'Weighted demand is positive');
assert(typeof weightedDemand === 'number', 'Weighted demand is numeric');

// ============================================================================
// Test 15: Load Balancing - Weighted
// ============================================================================

console.log('\n--- Test 15: Load Balancing - Weighted ---\n');

const genesysWeighted = new Genesys({ loadBalancing: 'weighted' });
genesysWeighted.registerEntity('low-cap', { capacity: 50 });
genesysWeighted.registerEntity('high-cap', { capacity: 200 });

// Submit multiple demands
for (let i = 0; i < 10; i++) {
  genesysWeighted.submitDemand({ type: 'TEST', weight: 5 });
}

const lowCap = genesysWeighted.entities.get('low-cap');
const highCap = genesysWeighted.entities.get('high-cap');

// High capacity should handle more load
assert(highCap.processedDemands >= lowCap.processedDemands, 
  'Weighted balancing favors high-capacity entities');

// ============================================================================
// Test 16: Load Balancing - Round Robin
// ============================================================================

console.log('\n--- Test 16: Load Balancing - Round Robin ---\n');

const genesysRR = new Genesys({ loadBalancing: 'round-robin' });
genesysRR.registerEntity('rr1', { capacity: 100 });
genesysRR.registerEntity('rr2', { capacity: 100 });

for (let i = 0; i < 10; i++) {
  genesysRR.submitDemand({ type: 'TEST', weight: 1 });
}

// Should distribute relatively evenly
const rr1 = genesysRR.entities.get('rr1');
const rr2 = genesysRR.entities.get('rr2');
const diff = Math.abs(rr1.processedDemands - rr2.processedDemands);
assert(diff <= 3, 'Round-robin distributes evenly');

// ============================================================================
// Test 17: Load Balancing - Least Load
// ============================================================================

console.log('\n--- Test 17: Load Balancing - Least Load ---\n');

const genesysLL = new Genesys({ loadBalancing: 'least-load' });
genesysLL.registerEntity('ll1', { capacity: 100 });
genesysLL.registerEntity('ll2', { capacity: 100 });

// Manually set different loads
const ll1 = genesysLL.entities.get('ll1');
const ll2 = genesysLL.entities.get('ll2');
ll1.currentLoad = 50;
ll2.currentLoad = 20;

const llResult = genesysLL.submitDemand({ type: 'TEST', weight: 5 });
assert(llResult.entity.id === 'll2', 'Least-load selects entity with less load');

// ============================================================================
// Test 18: Broadcast (Group Theory g₃)
// ============================================================================

console.log('\n--- Test 18: Broadcast (Group Theory g₃) ---\n');

const genesysBroadcast = new Genesys();
genesysBroadcast.registerEntity('sub1', { capacity: 100 });
genesysBroadcast.registerEntity('sub2', { capacity: 100 });
genesysBroadcast.registerEntity('sub3', { capacity: 100 });

const broadcastResults = genesysBroadcast.broadcastDemand(
  { type: 'EVENT', weight: 1 },
  ['sub1', 'sub2', 'sub3']
);

assert(broadcastResults.length === 3, 'Broadcast sends to all entities');
assert(broadcastResults.every(r => r.success), 'All broadcasts succeed');

// ============================================================================
// Test 19: Entity Utilization Monitoring
// ============================================================================

console.log('\n--- Test 19: Entity Utilization Monitoring ---\n');

const utilization = genesys.getEntityUtilization('database');
assert(utilization !== null, 'Utilization retrieved successfully');
assert(utilization.entityId === 'database', 'Correct entity utilization');
assert(utilization.utilization >= 0, 'Utilization is non-negative (can exceed 1.0 when overloaded)');
assert(utilization.weight > 0, 'Entity weight is included');

const allUtil = genesys.getAllUtilization();
assert(allUtil.length === genesys.entities.size, 
  'All entities utilization retrieved');

// ============================================================================
// Test 20: System Statistics
// ============================================================================

console.log('\n--- Test 20: System Statistics ---\n');

const stats = genesys.getStats();
assert(stats.totalDemandsProcessed >= 0, 'Stats include processed demands');
assert(stats.totalEntities > 0, 'Stats include entity count');
assert(stats.totalLoad >= 0, 'Stats include total load');
assert(stats.efficiency > 0, 'Stats include efficiency');
assert(stats.routingOperations > 0, 'Stats include routing operations count');

// ============================================================================
// Test 21: Load Balancing Optimization
// ============================================================================

console.log('\n--- Test 21: Load Balancing Optimization ---\n');

const optimization = genesys.optimizeLoadBalancing();
assert(optimization.totalLoad >= 0, 'Optimization includes total load');
assert(optimization.totalCapacity > 0, 'Optimization includes total capacity');
assert(optimization.optimizationPlan.length > 0, 'Optimization plan generated');
assert(optimization.optimizationPlan[0].adjustment !== undefined, 
  'Plan includes adjustment recommendations');

// ============================================================================
// Test 22: System Status
// ============================================================================

console.log('\n--- Test 22: System Status ---\n');

const status = genesys.getStatus();
assert(status.config !== undefined, 'Status includes configuration');
assert(status.stats !== undefined, 'Status includes statistics');
assert(status.entities !== undefined, 'Status includes entities');
assert(status.load !== undefined, 'Status includes load information');

// ============================================================================
// Test 23: Example Functions
// ============================================================================

console.log('\n--- Test 23: Example Functions ---\n');

const exampleGenesys = createGenesysExample();
assert(exampleGenesys instanceof Genesys, 'createGenesysExample creates Genesys');
assert(exampleGenesys.entities.size === 3, 'Example has 3 entities');

const exampleResult = genesysExample();
assert(exampleResult.genesys instanceof Genesys, 'genesysExample returns Genesys');
assert(exampleResult.demands.length === 3, 'Example submits 3 demands');
assert(exampleResult.status !== undefined, 'Example includes status');
assert(exampleResult.optimization !== undefined, 'Example includes optimization');

// ============================================================================
// Test 24: Capacity Constraints
// ============================================================================

console.log('\n--- Test 24: Capacity Constraints ---\n');

const genesysCapped = new Genesys();
genesysCapped.registerEntity('limited', { capacity: 10 });

// Fill to capacity
for (let i = 0; i < 3; i++) {
  genesysCapped.submitDemand({ type: 'LOAD', weight: 3 }, 'limited');
}

// Should fail when over capacity
const overCapResult = genesysCapped.submitDemand(
  { type: 'LOAD', weight: 5 }, 
  'limited'
);

assert(overCapResult.success === false, 'Rejects demand when at capacity');
assert(overCapResult.error !== undefined, 'Provides error message');

// ============================================================================
// Test 25: Maxopt Integration
// ============================================================================

console.log('\n--- Test 25: Maxopt Integration ---\n');

const genesysMaxopt = new Genesys({ maxopt: true });
assert(genesysMaxopt.config.maxopt === true, 'Maxopt can be enabled');

const genesysNoMaxopt = new Genesys({ maxopt: false });
assert(genesysNoMaxopt.config.maxopt === false, 'Maxopt can be disabled');

// ============================================================================
// Summary
// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('TEST SUMMARY');
console.log('='.repeat(80));
console.log(`Total tests run: ${testsRun}`);
console.log(`Tests passed: ${testsPassed} ✓`);
console.log(`Tests failed: ${testsFailed} ✗`);
console.log(`Success rate: ${((testsPassed / testsRun) * 100).toFixed(2)}%`);
console.log('='.repeat(80) + '\n');

if (testsFailed === 0) {
  console.log('🎉 All Genesys tests passed! 🎉\n');
  console.log('Genesys is ready for:');
  console.log('  ✓ Entity demand management');
  console.log('  ✓ Relational algebra operations');
  console.log('  ✓ Group theory routing');
  console.log('  ✓ Ring theory load calculation');
  console.log('  ✓ Load balancing strategies');
  console.log('  ✓ System monitoring and analytics');
  console.log('  ✓ 100% maxopt integration\n');
} else {
  console.error(`⚠️  ${testsFailed} test(s) failed. Please review the output above.\n`);
  process.exit(1);
}
