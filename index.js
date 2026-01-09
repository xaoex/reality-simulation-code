/**
 * Reality Simulation Code
 * SimSim Code & Contributions
 * 
 * Main entry point that exports all modules and systems
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 * @see https://linktr.ee/oktays
 */

// ============================================================================
// Core Modules - Young Situation, Ring, and Field
// ============================================================================

const YoungSituationModule = require('./lib/young-situation');
const YoungRingModule = require('./lib/young-ring');
const YoungFieldModule = require('./lib/young-field');



// ============================================================================
// Reality CSEMS Integration
// ============================================================================

// Load Reality CSEMS if available
let RealityCSEMS = null;
try {
  RealityCSEMS = require('./realitycsems-integration');
  console.log('[Reality Simulation] ✓ Reality CSEMS layer system loaded');
} catch (error) {
  console.log('[Reality Simulation] Reality CSEMS not available (optional)');
}

// ============================================================================
// Anonymous Package Integration (Lambda Calculus + BAES + COOLEMS)
// ============================================================================

// Load Anonymous Package if available
let AnonymousPackage = null;
try {
  AnonymousPackage = require('./anonymous-package');
  console.log('[Reality Simulation] ✓ Anonymous Package loaded (Lambda Calculus + BAES + COOLEMS)');
} catch (error) {
  console.log('[Reality Simulation] Anonymous Package not available (optional)');
}

// ============================================================================
// Optimization System (Calculated Opt + General Opt Light Situation)
// ============================================================================

// Load Optimization System
let OptimizationSystem = null;
try {
  OptimizationSystem = require('./optimization-system');
  console.log('[Reality Simulation] ✓ Optimization System loaded (Calculated Opt + General Opt Light)');
} catch (error) {
  console.log('[Reality Simulation] Optimization System not available (optional)');
}

// ============================================================================
// Module Exports
// ============================================================================

module.exports = {
  name: 'reality-simulation-code',
  version: '1.0.0',
  description: 'Reality Simulation Codebase - SimSim Code & Contributions',
  author: 'xaoex',
  
  // ============================================================================
  // Original Functions
  // ============================================================================
  
  init: function() {
    console.log('Reality Simulation Code initialized');
    if (RealityCSEMS) {
      console.log(`Reality CSEMS active on layer: ${RealityCSEMS.getCurrentLayer()}`);
    }
    if (AnonymousPackage) {
      console.log('Anonymous Package active: Lambda Calculus + BAES + COOLEMS');
    }
    return true;
  },
  
  info: function() {
    const info = {
      name: this.name,
      version: this.version,
      author: this.author,
      links: [
        'https://linktr.ee/xaoex',
        'https://linktr.ee/oktays'
      ]
    };
    
    // Add Reality CSEMS info if available
    if (RealityCSEMS) {
      info.realityCSEMS = {
        enabled: true,
        currentLayer: RealityCSEMS.getCurrentLayer(),
        maxopt: RealityCSEMS.verifyMaxopt()
      };
    }
    
    // Add Anonymous Package info if available
    if (AnonymousPackage) {
      info.anonymousPackage = {
        enabled: true,
        status: AnonymousPackage.getStatus()
      };
    }
    
    return info;
  },

  // ============================================================================
  // Young Situation Module Exports
  // ============================================================================
  
  YoungSituation: YoungSituationModule.YoungSituation,
  createCommonYoungSituation: YoungSituationModule.createCommonYoungSituation,
  defineYoungArea: YoungSituationModule.defineYoungArea,
  createLinearYoungSituation: YoungSituationModule.createLinearYoungSituation,
  createBranchingYoungSituation: YoungSituationModule.createBranchingYoungSituation,
  youngSituationExample: YoungSituationModule.youngSituationExample,
  youngAreaExample: YoungSituationModule.youngAreaExample,

  // ============================================================================
  // Young Ring Module Exports
  // ============================================================================
  
  YoungRing: YoungRingModule.YoungRing,

  // ============================================================================
  // Young Field Module Exports
  // ============================================================================
  
  YoungField: YoungFieldModule.YoungField,
  createRationalField: YoungFieldModule.createRationalField,
  createFiniteField: YoungFieldModule.createFiniteField,
  createSituationValuationField: YoungFieldModule.createSituationValuationField,
  normalizedSituationExample: YoungFieldModule.normalizedSituationExample,
  youngFieldOperationsExample: YoungFieldModule.youngFieldOperationsExample,
  finiteFieldExample: YoungFieldModule.finiteFieldExample,

  
  // ============================================================================
  // External System Exports
  // ============================================================================
  
  // Reality CSEMS - Layer system (if available)
  RealityCSEMS,
  
  // Anonymous Package - Lambda Calculus + BAES + COOLEMS (if available)
  AnonymousPackage,
  
  // Optimization System - Calculated Opt + General Opt Light (if available)
  OptimizationCalculator: OptimizationSystem ? OptimizationSystem.OptimizationCalculator : null,
  GeneralOptSituation: OptimizationSystem ? OptimizationSystem.GeneralOptSituation : null
};
