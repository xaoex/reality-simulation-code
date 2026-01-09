/**
 * Reality CSEMS Integration
 * Integrates .realitycsems layer system with reality-simulation-code
 * 
 * @version 1.0.0
 * @author xaoex
 */

const fs = require('fs');
const path = require('path');

// Reality CSEMS paths
const REALITYCSEMS_ROOT = path.join(__dirname, '.realitycsems');
const CONFIG_DIR = path.join(REALITYCSEMS_ROOT, 'config');
const PACKAGES_DIR = path.join(REALITYCSEMS_ROOT, 'packages');

/**
 * Reality CSEMS Manager
 * Manages layers, packages, and optimization
 */
class RealityCSEMSManager {
  constructor() {
    this.initialized = false;
    this.config = null;
    this.layers = null;
    this.packages = null;
    this.currentLayer = null;
    this.maxoptInjector = null;
  }
  
  /**
   * Initialize Reality CSEMS
   */
  initialize() {
    if (this.initialized) {
      return this;
    }
    
    console.log('[Reality CSEMS] Initializing...');
    
    // Load configuration
    this._loadConfig();
    
    // Load current layer
    this._loadCurrentLayer();
    
    // Initialize maxopt injector
    this._initializeMaxopt();
    
    this.initialized = true;
    console.log(`[Reality CSEMS] ✓ Initialized on layer: ${this.currentLayer}`);
    
    return this;
  }
  
  /**
   * Load configuration files
   */
  _loadConfig() {
    try {
      const coreConfig = fs.readFileSync(path.join(CONFIG_DIR, 'core.json'), 'utf8');
      const layersConfig = fs.readFileSync(path.join(CONFIG_DIR, 'layers.json'), 'utf8');
      const packagesConfig = fs.readFileSync(path.join(PACKAGES_DIR, 'packages.json'), 'utf8');
      
      this.config = JSON.parse(coreConfig);
      this.layers = JSON.parse(layersConfig);
      this.packages = JSON.parse(packagesConfig);
    } catch (error) {
      console.warn('[Reality CSEMS] Warning: Could not load configuration:', error.message);
      this.config = { system: { name: '.realitycsems' } };
      this.layers = { layers: {} };
      this.packages = { packages: {} };
    }
  }
  
  /**
   * Load current active layer
   */
  _loadCurrentLayer() {
    try {
      const headPath = path.join(REALITYCSEMS_ROOT, 'HEAD');
      const headContent = fs.readFileSync(headPath, 'utf8').trim();
      
      // Parse ref: refs/heads/reality-main
      const match = headContent.match(/ref: refs\/heads\/(.+)/);
      if (match) {
        this.currentLayer = match[1];
      } else {
        this.currentLayer = 'reality-main';
      }
    } catch (error) {
      this.currentLayer = 'reality-main';
    }
  }
  
  /**
   * Initialize maxopt injector
   */
  _initializeMaxopt() {
    try {
      const maxoptPath = path.join(PACKAGES_DIR, 'maxopt-injector', 'javascript', 'index.js');
      const MaxoptModule = require(maxoptPath);
      
      this.maxoptInjector = MaxoptModule.injector;
      
      // Verify maxopt injection
      const verification = this.maxoptInjector.verify();
      if (verification.valid) {
        console.log(`[Reality CSEMS] ${verification.message}`);
      }
    } catch (error) {
      console.warn('[Reality CSEMS] Warning: Could not initialize maxopt injector:', error.message);
    }
  }
  
  /**
   * Get current layer
   */
  getCurrentLayer() {
    return this.currentLayer;
  }
  
  /**
   * Get layer info
   */
  getLayerInfo(layerName) {
    if (!layerName) {
      layerName = this.currentLayer;
    }
    
    return this.layers.layers ? this.layers.layers[layerName] : null;
  }
  
  /**
   * Get all layers
   */
  getAllLayers() {
    return this.layers.layers || {};
  }
  
  /**
   * Get system configuration
   */
  getConfig() {
    return this.config;
  }
  
  /**
   * Get packages
   */
  getPackages() {
    return this.packages.packages || {};
  }
  
  /**
   * Get maxopt status
   */
  getMaxoptStatus() {
    if (!this.maxoptInjector) {
      return { error: 'Maxopt injector not initialized' };
    }
    
    return this.maxoptInjector.getStatus();
  }
  
  /**
   * Verify maxopt
   */
  verifyMaxopt() {
    if (!this.maxoptInjector) {
      return { valid: false, message: 'Maxopt injector not initialized' };
    }
    
    return this.maxoptInjector.verify();
  }
  
  /**
   * Get complete status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      currentLayer: this.currentLayer,
      layerInfo: this.getLayerInfo(),
      system: this.config.system || {},
      maxopt: this.getMaxoptStatus(),
      packages: Object.keys(this.getPackages()).length
    };
  }
}

// Create global instance
const realityCSEMS = new RealityCSEMSManager();

// Auto-initialize
try {
  realityCSEMS.initialize();
} catch (error) {
  console.warn('[Reality CSEMS] Warning: Auto-initialization failed:', error.message);
}

module.exports = {
  RealityCSEMSManager,
  realityCSEMS,
  getCurrentLayer: () => realityCSEMS.getCurrentLayer(),
  getLayerInfo: (name) => realityCSEMS.getLayerInfo(name),
  getAllLayers: () => realityCSEMS.getAllLayers(),
  getConfig: () => realityCSEMS.getConfig(),
  getPackages: () => realityCSEMS.getPackages(),
  getMaxoptStatus: () => realityCSEMS.getMaxoptStatus(),
  verifyMaxopt: () => realityCSEMS.verifyMaxopt(),
  getStatus: () => realityCSEMS.getStatus()
};

// Export as default for ES6 imports
module.exports.default = realityCSEMS;
