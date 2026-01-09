#!/usr/bin/env node
/**
 * Reality CSEMS CLI
 * Command-line interface for Reality CSEMS layer system
 * 
 * @version 1.0.0
 * @author xaoex
 */

const fs = require('fs');
const path = require('path');

const REALITYCSEMS_ROOT = path.join(__dirname, '.realitycsems');
const CONFIG_DIR = path.join(REALITYCSEMS_ROOT, 'config');

// Commands
const commands = {
  status: showStatus,
  layers: listLayers,
  current: showCurrentLayer,
  info: showInfo,
  maxopt: showMaxopt,
  packages: listPackages,
  releases: listReleases,
  help: showHelp
};

/**
 * Main CLI entry point
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  if (commands[command]) {
    commands[command](args.slice(1));
  } else {
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
}

/**
 * Show complete status
 */
function showStatus(args) {
  console.log('=== Reality CSEMS Status ===\n');
  
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const status = realityCSEMS.getStatus();
    
    console.log(`Initialized: ${status.initialized ? '✓' : '✗'}`);
    console.log(`Current Layer: ${status.currentLayer}`);
    console.log(`System: ${status.system.name || 'N/A'}`);
    console.log(`Packages: ${status.packages}`);
    
    console.log('\nLayer Info:');
    if (status.layerInfo) {
      console.log(`  Name: ${status.layerInfo.name}`);
      console.log(`  Status: ${status.layerInfo.status}`);
      console.log(`  Protected: ${status.layerInfo.protected}`);
      console.log(`  Parent: ${status.layerInfo.parent || 'none'}`);
    }
    
    console.log('\nMaxopt Status:');
    if (status.maxopt && status.maxopt.injected !== undefined) {
      console.log(`  Injected: ${status.maxopt.injected ? '✓' : '✗'}`);
      console.log(`  Level: ${status.maxopt.level}%`);
      console.log(`  Eternal: ${status.maxopt.eternal ? '✓' : '✗'}`);
      console.log(`  Optimizations: ${status.maxopt.optimizations?.length || 0}`);
    }
  } catch (error) {
    console.error('Error loading Reality CSEMS:', error.message);
    process.exit(1);
  }
}

/**
 * List all layers
 */
function listLayers(args) {
  console.log('=== Reality CSEMS Layers ===\n');
  
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const layers = realityCSEMS.getAllLayers();
    const currentLayer = realityCSEMS.getCurrentLayer();
    
    for (const [name, layer] of Object.entries(layers)) {
      const current = name === currentLayer ? ' (current)' : '';
      const protected_str = layer.protected ? ' [protected]' : '';
      console.log(`${name}${current}${protected_str}`);
      console.log(`  Status: ${layer.status}`);
      console.log(`  Parent: ${layer.parent || 'none'}`);
      console.log(`  Description: ${layer.description}`);
      console.log();
    }
  } catch (error) {
    console.error('Error listing layers:', error.message);
    process.exit(1);
  }
}

/**
 * Show current layer
 */
function showCurrentLayer(args) {
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const currentLayer = realityCSEMS.getCurrentLayer();
    const layerInfo = realityCSEMS.getLayerInfo(currentLayer);
    
    console.log(`Current Layer: ${currentLayer}`);
    
    if (layerInfo) {
      console.log(`Status: ${layerInfo.status}`);
      console.log(`Protected: ${layerInfo.protected ? 'yes' : 'no'}`);
      console.log(`Parent: ${layerInfo.parent || 'none'}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * Show system info
 */
function showInfo(args) {
  console.log('=== Reality CSEMS Information ===\n');
  
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const config = realityCSEMS.getConfig();
    
    console.log(`Name: ${config.system?.name || 'N/A'}`);
    console.log(`Type: ${config.system?.type || 'N/A'}`);
    console.log(`Purpose: ${config.system?.purpose || 'N/A'}`);
    console.log(`Status: ${config.system?.status || 'N/A'}`);
    console.log(`Maxopt: ${config.system?.maxopt ? 'enabled' : 'disabled'}`);
    
    if (config.layers) {
      console.log(`\nLayers: ${config.layers.enabled ? 'enabled' : 'disabled'}`);
      console.log(`Strategy: ${config.layers.strategy || 'N/A'}`);
    }
    
    if (config.packages) {
      console.log(`\nPackages: ${config.packages.enabled ? 'enabled' : 'disabled'}`);
      console.log(`Multi-Language: ${config.packages.multiLanguage ? 'yes' : 'no'}`);
      console.log(`Languages: ${config.packages.supportedLanguages?.join(', ') || 'N/A'}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * Show maxopt status
 */
function showMaxopt(args) {
  console.log('=== Maxopt Injector Status ===\n');
  
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const maxopt = realityCSEMS.getMaxoptStatus();
    const verification = realityCSEMS.verifyMaxopt();
    
    if (maxopt.error) {
      console.log(maxopt.error);
      return;
    }
    
    console.log(`Injected: ${maxopt.injected ? '✓' : '✗'}`);
    console.log(`Level: ${maxopt.level}%`);
    console.log(`Eternal: ${maxopt.eternal ? '✓' : '✗'}`);
    console.log(`Maxout: ${maxopt.maxout ? '✓' : '✗'}`);
    
    console.log('\nOptimizations:');
    if (maxopt.optimizations) {
      for (const opt of maxopt.optimizations) {
        console.log(`  [${opt.status}] ${opt.type}: ${opt.level}% - ${opt.description}`);
      }
    }
    
    console.log(`\nVerification: ${verification.message}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * List packages
 */
function listPackages(args) {
  console.log('=== Reality CSEMS Packages ===\n');
  
  try {
    const realityCSEMS = require('./realitycsems-integration');
    const packages = realityCSEMS.getPackages();
    
    for (const [name, pkg] of Object.entries(packages)) {
      console.log(`${name} v${pkg.version}`);
      console.log(`  Type: ${pkg.type}`);
      console.log(`  Priority: ${pkg.priority}`);
      console.log(`  Auto-Inject: ${pkg.autoInject ? 'yes' : 'no'}`);
      console.log(`  Description: ${pkg.description}`);
      
      if (pkg.languages) {
        const langs = Object.keys(pkg.languages).filter(l => pkg.languages[l].enabled);
        console.log(`  Languages: ${langs.join(', ')}`);
      }
      
      console.log();
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * List releases
 */
function listReleases(args) {
  console.log('=== Reality CSEMS Releases ===\n');
  
  try {
    const releasesPath = path.join(REALITYCSEMS_ROOT, 'releases', 'releases.json');
    const releasesData = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
    
    for (const [version, release] of Object.entries(releasesData.releases)) {
      console.log(`${version} - ${release.name}`);
      console.log(`  Date: ${release.date}`);
      console.log(`  Layer: ${release.layer}`);
      console.log(`  Status: ${release.status}`);
      console.log(`  Description: ${release.description}`);
      console.log(`  Tags: ${release.tags?.join(', ') || 'none'}`);
      console.log();
    }
    
    console.log(`Current Release: ${releasesData.metadata?.currentRelease}`);
    console.log(`Latest Stable: ${releasesData.metadata?.latestStable}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

/**
 * Show help
 */
function showHelp(args) {
  console.log('Reality CSEMS CLI - Layer System Management\n');
  console.log('Usage: realitycsems-cli [command]\n');
  console.log('Commands:');
  console.log('  status      Show complete system status');
  console.log('  layers      List all available layers');
  console.log('  current     Show current active layer');
  console.log('  info        Show system information');
  console.log('  maxopt      Show maxopt injector status');
  console.log('  packages    List all packages');
  console.log('  releases    List all releases');
  console.log('  help        Show this help message');
  console.log();
  console.log('Examples:');
  console.log('  realitycsems-cli status');
  console.log('  realitycsems-cli layers');
  console.log('  realitycsems-cli maxopt');
}

// Run CLI
if (require.main === module) {
  main();
}

module.exports = { main, commands };
