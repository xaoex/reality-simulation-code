/**
 * Reality Simulation Code - Demo
 * Demonstrates the core functionality of the reality-simulation-code package
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 * @see https://linktr.ee/oktays
 */

const pkg = require('./index.js');

console.log('Reality Simulation Code - Demo');
console.log('==============================');
console.log('');

// Initialize the simulation
const initialized = pkg.init();
console.log('Initialized:', initialized);
console.log('');

// Get package info
const info = pkg.info();
console.log('Package Info:');
console.log('  Name:', info.name);
console.log('  Version:', info.version);
console.log('  Author:', info.author);
console.log('  Links:', info.links.join(', '));
console.log('');

console.log('Demo complete. Reality simulation ready for production.');
