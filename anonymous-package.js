/**
 * Anonymous Package - NPM Package Release
 * Mapping tool injectable with anonymous/lambda calculus
 * 
 * @version 1.0.0
 * @author xaoex
 */

const path = require('path');

// Load core systems
let AnonymousCalculus, BAESSystem, COOLEMSSystem;

try {
  AnonymousCalculus = require('./.anonymouscalc/lambdas/anonymous-calculus.js').AnonymousCalculus;
} catch (error) {
  console.warn('[AnonymousPackage] AnonymousCalculus not available');
}

try {
  BAESSystem = require('./.baes/situations/baes-system.js').BAESSystem;
} catch (error) {
  console.warn('[AnonymousPackage] BAESSystem not available');
}

try {
  COOLEMSSystem = require('./.coolems/modules/coolems-system.js').COOLEMSSystem;
} catch (error) {
  console.warn('[AnonymousPackage] COOLEMSSystem not available');
}

/**
 * AnonymousPackage - Main integration class
 */
class AnonymousPackage {
  constructor(options = {}) {
    this.options = {
      maxopt: options.maxopt !== false,
      verbose: options.verbose !== false,
      anonymous: options.anonymous !== false,
      ...options
    };
    
    this.initialized = false;
    this.anonymousCalc = null;
    this.baes = null;
    this.coolems = null;
    
    if (options.autoInit !== false) {
      this.initialize();
    }
  }
  
  /**
   * Initialize the anonymous package
   */
  initialize() {
    if (this.initialized) {
      return this;
    }
    
    console.log('[AnonymousPackage] Initializing mapping tool with anonymous/lambda calculus...');
    
    // Initialize AnonymousCalculus
    if (AnonymousCalculus) {
      this.anonymousCalc = new AnonymousCalculus({
        maxopt: this.options.maxopt,
        verbose: this.options.verbose
      });
    }
    
    // Initialize BAES
    if (BAESSystem) {
      this.baes = new BAESSystem({
        maxopt: this.options.maxopt,
        verbose: this.options.verbose,
        cool: true
      });
    }
    
    // Initialize COOLEMS
    if (COOLEMSSystem) {
      this.coolems = new COOLEMSSystem({
        maxopt: this.options.maxopt,
        cool: true,
        xcodeSituation: true
      });
    }
    
    this.initialized = true;
    console.log('[AnonymousPackage] ✓ Initialized with lambda calculus, BAES, and COOLEMS');
    
    return this;
  }
  
  /**
   * ETL Transform - Extract, Transform, Load with verbose logging
   */
  etl(extractFn, transformFn, loadFn, options = {}) {
    if (!this.anonymousCalc) {
      throw new Error('AnonymousCalculus not available');
    }
    
    const etlFn = this.anonymousCalc.etl(extractFn, transformFn, loadFn);
    
    return (data) => {
      const result = etlFn(data);
      
      // Log to common bayes situation
      if (this.baes && options.logToBayes !== false) {
        this.baes.logToCommonBayes({
          operation: 'etl',
          input: data,
          output: result
        });
      }
      
      return result;
    };
  }
  
  /**
   * Polypipes - Multiple parallel pipes
   */
  polypipes(...pipelines) {
    if (!this.anonymousCalc) {
      throw new Error('AnonymousCalculus not available');
    }
    
    return this.anonymousCalc.polypipes(...pipelines);
  }
  
  /**
   * Maxpipes - Maximum optimization pipes
   */
  maxpipes(...fns) {
    if (!this.anonymousCalc) {
      throw new Error('AnonymousCalculus not available');
    }
    
    return this.anonymousCalc.maxpipes(...fns);
  }
  
  /**
   * Anonymous mapper - Injectable mapping tool
   */
  mapper(strategy = 'one-to-one') {
    if (!this.anonymousCalc) {
      throw new Error('AnonymousCalculus not available');
    }
    
    return this.anonymousCalc.mapper(strategy);
  }
  
  /**
   * Log to common bayes situation
   */
  logToCommonBayes(data, situation = 'default') {
    if (!this.baes) {
      console.warn('[AnonymousPackage] BAES not available');
      return data;
    }
    
    return this.baes.logToCommonBayes(data, situation);
  }
  
  /**
   * Use area as tool (BAES pattern)
   */
  areaAsTool(areaName, toolConfig) {
    if (!this.baes) {
      throw new Error('BAES not available');
    }
    
    return this.baes.areaAsTool(areaName, toolConfig);
  }
  
  /**
   * Build world within anonymous calculus
   */
  buildWorld(config) {
    if (!this.anonymousCalc) {
      throw new Error('AnonymousCalculus not available');
    }
    
    const world = this.anonymousCalc.buildWorld(config);
    
    // Make world 100% maxopt
    if (this.options.maxopt) {
      world.maxopt = true;
      world.optimizationLevel = 100;
    }
    
    console.log('[AnonymousPackage] World built within anonymous calculus');
    
    return world;
  }
  
  /**
   * Apply predictive models (COOLEMS)
   */
  applyPredictiveModels(data) {
    if (!this.coolems) {
      console.warn('[AnonymousPackage] COOLEMS not available');
      return data;
    }
    
    return this.coolems.applyLambdaFromDomains(data);
  }
  
  /**
   * Xcode situation
   */
  xcodeSituation(config) {
    if (!this.coolems) {
      throw new Error('COOLEMS not available');
    }
    
    return this.coolems.xcodeSituation(config);
  }
  
  /**
   * Get comprehensive status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      maxopt: this.options.maxopt,
      anonymous: this.options.anonymous,
      systems: {
        anonymousCalc: !!this.anonymousCalc,
        baes: !!this.baes,
        coolems: !!this.coolems
      },
      details: {
        anonymousCalc: this.anonymousCalc?.getStatus(),
        baes: this.baes?.getStatus(),
        coolems: this.coolems?.getStatus()
      }
    };
  }
}

// Create global instance
const anonymousPackage = new AnonymousPackage({ autoInit: true });

// Export
module.exports = {
  AnonymousPackage,
  anonymousPackage,
  
  // Quick accessors
  etl: (extract, transform, load, options) => anonymousPackage.etl(extract, transform, load, options),
  polypipes: (...pipelines) => anonymousPackage.polypipes(...pipelines),
  maxpipes: (...fns) => anonymousPackage.maxpipes(...fns),
  mapper: (strategy) => anonymousPackage.mapper(strategy),
  logToCommonBayes: (data, situation) => anonymousPackage.logToCommonBayes(data, situation),
  areaAsTool: (area, config) => anonymousPackage.areaAsTool(area, config),
  buildWorld: (config) => anonymousPackage.buildWorld(config),
  getStatus: () => anonymousPackage.getStatus(),
  
  // Direct system exports
  AnonymousCalculus: AnonymousCalculus,
  BAESSystem: BAESSystem,
  COOLEMSSystem: COOLEMSSystem
};

module.exports.default = AnonymousPackage;
