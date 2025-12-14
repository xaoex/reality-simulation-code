#!/usr/bin/env node
/**
 * Reality CSEMS Integration Tests
 * Validates the complete .realitycsems system
 * 
 * @version 1.0.0
 * @author xaoex
 */

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test helper function
 */
function test(name, fn) {
  const divider = '='.repeat(70);
  console.log(`\n${divider}`);
  console.log(`Testing: ${name}`);
  console.log(divider);
  
  try {
    fn();
    console.log(`✓ ${name} - PASSED`);
    testsPassed++;
  } catch (error) {
    console.error(`✗ ${name} - FAILED`);
    console.error(`  Error: ${error.message}`);
    testsFailed++;
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// ============================================================================
// Tests
// ============================================================================

test('Reality CSEMS Directory Structure', () => {
  assert(fs.existsSync('.realitycsems'), '.realitycsems directory should exist');
  assert(fs.existsSync('.realitycsems/HEAD'), 'HEAD file should exist');
  assert(fs.existsSync('.realitycsems/config'), 'config directory should exist');
  assert(fs.existsSync('.realitycsems/refs'), 'refs directory should exist');
  assert(fs.existsSync('.realitycsems/packages'), 'packages directory should exist');
  assert(fs.existsSync('.realitycsems/releases'), 'releases directory should exist');
  console.log('  ✓ All required directories exist');
});

test('Reality CSEMS Configuration Files', () => {
  const coreConfig = JSON.parse(fs.readFileSync('.realitycsems/config/core.json', 'utf8'));
  const layersConfig = JSON.parse(fs.readFileSync('.realitycsems/config/layers.json', 'utf8'));
  const packagesConfig = JSON.parse(fs.readFileSync('.realitycsems/packages/packages.json', 'utf8'));
  
  assert(coreConfig.system.name === '.realitycsems', 'Core config should have correct name');
  assert(coreConfig.system.maxopt === true, 'Maxopt should be enabled');
  assert(layersConfig.layers, 'Layers config should have layers');
  assert(packagesConfig.packages, 'Packages config should have packages');
  
  console.log('  ✓ All configuration files are valid');
});

test('Reality CSEMS Layers', () => {
  const layersConfig = JSON.parse(fs.readFileSync('.realitycsems/config/layers.json', 'utf8'));
  
  assert(layersConfig.layers['reality-base'], 'reality-base layer should exist');
  assert(layersConfig.layers['reality-main'], 'reality-main layer should exist');
  assert(layersConfig.layers['reality-production'], 'reality-production layer should exist');
  assert(layersConfig.layers['reality-maxopt'], 'reality-maxopt layer should exist');
  
  // Check layer hierarchy
  assert(layersConfig.layers['reality-main'].parent === 'reality-base', 
    'reality-main should have reality-base as parent');
  assert(layersConfig.layers['reality-maxopt'].status === 'maxopt',
    'reality-maxopt should have maxopt status');
  
  console.log('  ✓ All layers are properly configured');
});

test('Reality CSEMS Refs Structure', () => {
  assert(fs.existsSync('.realitycsems/refs/heads'), 'refs/heads should exist');
  assert(fs.existsSync('.realitycsems/refs/tags'), 'refs/tags should exist');
  assert(fs.existsSync('.realitycsems/refs/remotes'), 'refs/remotes should exist');
  
  assert(fs.existsSync('.realitycsems/refs/heads/reality-base'), 'reality-base ref should exist');
  assert(fs.existsSync('.realitycsems/refs/heads/reality-main'), 'reality-main ref should exist');
  assert(fs.existsSync('.realitycsems/refs/heads/reality-production'), 'reality-production ref should exist');
  assert(fs.existsSync('.realitycsems/refs/heads/reality-maxopt'), 'reality-maxopt ref should exist');
  
  console.log('  ✓ All refs are properly structured');
});

test('Reality CSEMS HEAD Reference', () => {
  const head = fs.readFileSync('.realitycsems/HEAD', 'utf8').trim();
  assert(head.startsWith('ref: refs/heads/'), 'HEAD should reference a layer');
  console.log(`  ✓ HEAD points to: ${head}`);
});

test('Maxopt Injector Package - JavaScript', () => {
  const maxoptPath = path.resolve('.realitycsems/packages/maxopt-injector/javascript/index.js');
  assert(fs.existsSync(maxoptPath), 'JavaScript maxopt injector should exist');
  
  const { MaxoptInjector, verify } = require(maxoptPath);
  assert(typeof MaxoptInjector === 'function', 'MaxoptInjector should be a class');
  
  const verification = verify();
  assert(verification.valid === true, 'Maxopt should be verified');
  assert(verification.level === 100, 'Optimization level should be 100%');
  
  console.log('  ✓ JavaScript maxopt injector is functional');
  console.log(`  ✓ ${verification.message}`);
});

test('Maxopt Injector Package - Python', () => {
  const pythonPath = '.realitycsems/packages/maxopt-injector/python/__init__.py';
  assert(fs.existsSync(pythonPath), 'Python maxopt injector should exist');
  
  const content = fs.readFileSync(pythonPath, 'utf8');
  assert(content.includes('class MaxoptInjector'), 'Python file should contain MaxoptInjector class');
  assert(content.includes('def inject(self)'), 'Python file should have inject method');
  
  console.log('  ✓ Python maxopt injector file is valid');
});

test('Maxopt Injector Package - C', () => {
  const cPath = '.realitycsems/packages/maxopt-injector/c/maxopt.c';
  const hPath = '.realitycsems/packages/maxopt-injector/c/maxopt.h';
  
  assert(fs.existsSync(cPath), 'C maxopt injector should exist');
  assert(fs.existsSync(hPath), 'C header file should exist');
  
  const content = fs.readFileSync(cPath, 'utf8');
  assert(content.includes('maxopt_inject'), 'C file should have inject function');
  assert(content.includes('maxopt_verify'), 'C file should have verify function');
  
  console.log('  ✓ C maxopt injector files are valid');
});

test('Maxopt Injector Package - Rust', () => {
  const rustPath = '.realitycsems/packages/maxopt-injector/rust/lib.rs';
  assert(fs.existsSync(rustPath), 'Rust maxopt injector should exist');
  
  const content = fs.readFileSync(rustPath, 'utf8');
  assert(content.includes('pub struct MaxoptInjector'), 'Rust file should contain MaxoptInjector struct');
  assert(content.includes('pub fn inject'), 'Rust file should have inject method');
  
  console.log('  ✓ Rust maxopt injector file is valid');
});

test('Maxopt Injector Package - Go', () => {
  const goPath = '.realitycsems/packages/maxopt-injector/go/maxopt.go';
  assert(fs.existsSync(goPath), 'Go maxopt injector should exist');
  
  const content = fs.readFileSync(goPath, 'utf8');
  assert(content.includes('type MaxoptInjector struct'), 'Go file should contain MaxoptInjector struct');
  assert(content.includes('func (m *MaxoptInjector) Inject'), 'Go file should have Inject method');
  
  console.log('  ✓ Go maxopt injector file is valid');
});

test('Reality CSEMS Releases', () => {
  const releasesPath = '.realitycsems/releases/releases.json';
  assert(fs.existsSync(releasesPath), 'Releases file should exist');
  
  const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
  assert(releases.releases, 'Releases should have releases object');
  assert(releases.releases['v1.0.0'], 'v1.0.0 release should exist');
  assert(releases.releases['v1.0.1-maxopt'], 'v1.0.1-maxopt release should exist');
  
  const maxoptRelease = releases.releases['v1.0.1-maxopt'];
  assert(maxoptRelease.status === 'maxopt', 'Maxopt release should have maxopt status');
  assert(maxoptRelease.layer === 'reality-maxopt', 'Maxopt release should be on reality-maxopt layer');
  
  console.log('  ✓ Releases are properly configured');
});

test('Reality CSEMS Integration Module', () => {
  const integrationPath = './realitycsems-integration.js';
  assert(fs.existsSync(integrationPath), 'Integration module should exist');
  
  const integration = require(integrationPath);
  assert(typeof integration.realityCSEMS === 'object', 'realityCSEMS should be exported');
  assert(typeof integration.getCurrentLayer === 'function', 'getCurrentLayer should be exported');
  assert(typeof integration.verifyMaxopt === 'function', 'verifyMaxopt should be exported');
  
  const currentLayer = integration.getCurrentLayer();
  assert(typeof currentLayer === 'string', 'Current layer should be a string');
  console.log(`  ✓ Current layer: ${currentLayer}`);
  
  const verification = integration.verifyMaxopt();
  assert(verification.valid === true, 'Maxopt should be verified');
  console.log(`  ✓ ${verification.message}`);
});

test('Reality CSEMS CLI', () => {
  const cliPath = './realitycsems-cli.js';
  assert(fs.existsSync(cliPath), 'CLI script should exist');
  
  const stats = fs.statSync(cliPath);
  assert(stats.mode & fs.constants.S_IXUSR, 'CLI should be executable');
  
  const content = fs.readFileSync(cliPath, 'utf8');
  assert(content.includes('#!/usr/bin/env node'), 'CLI should have shebang');
  assert(content.includes('const commands'), 'CLI should define commands');
  
  console.log('  ✓ CLI script is properly configured');
});

test('Main Index Integration', () => {
  const index = require('./index.js');
  
  assert(index.RealityCSEMS !== undefined, 'RealityCSEMS should be exported');
  
  // Test init function
  const initResult = index.init();
  assert(initResult === true, 'Init should return true');
  
  // Test info function
  const info = index.info();
  assert(info.name === 'reality-simulation-code', 'Info should have correct name');
  
  if (info.realityCSEMS) {
    assert(info.realityCSEMS.enabled === true, 'RealityCSEMS should be enabled');
    assert(typeof info.realityCSEMS.currentLayer === 'string', 'Should have current layer');
    console.log(`  ✓ Reality CSEMS enabled on layer: ${info.realityCSEMS.currentLayer}`);
    console.log(`  ✓ Maxopt: ${info.realityCSEMS.maxopt.message}`);
  }
});

test('Package.json Integration', () => {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  assert(packageJson.description.includes('Reality CSEMS'), 'Description should mention Reality CSEMS');
  assert(packageJson.keywords.includes('reality-csems'), 'Keywords should include reality-csems');
  assert(packageJson.keywords.includes('maxopt'), 'Keywords should include maxopt');
  
  assert(packageJson.bin, 'Package should have bin field');
  assert(packageJson.bin.realitycsems, 'Package should define realitycsems binary');
  
  assert(packageJson.scripts['csems:status'], 'Package should have csems:status script');
  assert(packageJson.scripts['csems:layers'], 'Package should have csems:layers script');
  assert(packageJson.scripts['csems:maxopt'], 'Package should have csems:maxopt script');
  
  assert(packageJson.files.includes('.realitycsems/'), 'Package should include .realitycsems/');
  assert(packageJson.files.includes('realitycsems-integration.js'), 'Package should include integration file');
  assert(packageJson.files.includes('realitycsems-cli.js'), 'Package should include CLI file');
  assert(packageJson.files.includes('REALITYCSEMS.md'), 'Package should include REALITYCSEMS.md');
  
  console.log('  ✓ package.json is properly configured');
});

test('Documentation Files', () => {
  assert(fs.existsSync('.realitycsems/README.md'), '.realitycsems/README.md should exist');
  assert(fs.existsSync('REALITYCSEMS.md'), 'REALITYCSEMS.md should exist');
  
  const csemsReadme = fs.readFileSync('.realitycsems/README.md', 'utf8');
  assert(csemsReadme.includes('Reality CSEMS'), 'README should document Reality CSEMS');
  assert(csemsReadme.includes('maxopt'), 'README should mention maxopt');
  assert(csemsReadme.includes('layers'), 'README should mention layers');
  
  const mainDoc = fs.readFileSync('REALITYCSEMS.md', 'utf8');
  assert(mainDoc.includes('Implementation'), 'Main doc should describe implementation');
  
  console.log('  ✓ All documentation files are present and valid');
});

// ============================================================================
// Summary
// ============================================================================

console.log('\n' + '='.repeat(70));
console.log('TEST SUMMARY');
console.log('='.repeat(70));
console.log(`Total Tests: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✓ ALL REALITY CSEMS TESTS PASSED ✓\n');
  console.log('Reality CSEMS is fully functional and integrated!');
  console.log('- Git-like layer system: ✓');
  console.log('- Multi-language maxopt injector: ✓');
  console.log('- Release management: ✓');
  console.log('- CLI tools: ✓');
  console.log('- Integration with main codebase: ✓');
  console.log('');
  process.exit(0);
} else {
  console.log('\n✗ SOME TESTS FAILED ✗\n');
  process.exit(1);
}
