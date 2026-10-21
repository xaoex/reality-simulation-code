/**
 * Reality Simulation Code - JavaScript Test Suite
 * Tests for index.js module
 *
 * Run with: node tests/test_index.js
 */

'use strict';

const mod = require('../index.js');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.log(`[FAIL] ${message}`);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message}  (got: ${JSON.stringify(actual)}, want: ${JSON.stringify(expected)})`);
}

// ---- tests ----

// Module shape
assert(typeof mod === 'object' && mod !== null, 'module exports an object');
assertEqual(typeof mod.init, 'function', 'module exposes init()');
assertEqual(typeof mod.info, 'function', 'module exposes info()');

// Name / version fields
assertEqual(mod.name, 'reality-simulation-code', 'name is reality-simulation-code');
assertEqual(mod.version, '0.0.1', 'version is 0.0.1');
assertEqual(mod.author, 'xaoex', 'author is xaoex');

// init()
const initResult = mod.init();
assertEqual(initResult, true, 'init() returns true');

// info()
const info = mod.info();
assert(typeof info === 'object' && info !== null, 'info() returns an object');
assertEqual(info.name, 'reality-simulation-code', 'info().name matches');
assertEqual(info.version, '0.0.1', 'info().version matches');
assertEqual(info.author, 'xaoex', 'info().author matches');
assert(Array.isArray(info.links), 'info().links is an array');
assert(info.links.length > 0, 'info().links has at least one entry');
assert(info.links.every(l => typeof l === 'string' && l.startsWith('https://')),
       'all info().links are https:// strings');

// Immutability guard – calling init() multiple times should always return true
assert(mod.init() === true, 'init() is idempotent (returns true on second call)');

// ---- results ----
console.log('');
console.log('=== JS Test Results ===');
console.log(`Results: ${passed}/${passed + failed} tests passed`);
process.exit(failed > 0 ? 1 : 0);
