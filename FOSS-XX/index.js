/**
 * FOSS-XX - Free and Open Source Software Store for Retro Computers
 * 
 * A store similar to F-Droid but for computers from the 80s onwards.
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 */

const fs = require('fs');
const path = require('path');

// Base path for the FOSS-XX repository
const REPO_BASE = path.join(__dirname);

/**
 * FOSS-XX Store Module
 */
const fossxx = {
  name: 'FOSS-XX',
  version: '1.0.0',
  description: 'Free and Open Source Software Store for Retro Computers (80s onwards)',
  
  /**
   * Initialize the FOSS-XX store
   * @returns {boolean} Success status
   */
  init: function() {
    console.log('FOSS-XX Store initialized');
    console.log('Free and Open Source Software for Retro Computers');
    return true;
  },
  
  /**
   * Get store information
   * @returns {object} Store info
   */
  info: function() {
    return {
      name: this.name,
      version: this.version,
      description: this.description,
      author: 'xaoex',
      license: 'MIT',
      inspiration: 'F-Droid',
      links: [
        'https://linktr.ee/xaoex',
        'https://linktr.ee/oktays'
      ]
    };
  },
  
  /**
   * Load the repository index
   * @returns {object|null} Repository index or null if not found
   */
  loadIndex: function() {
    try {
      const indexPath = path.join(REPO_BASE, 'index.json');
      if (fs.existsSync(indexPath)) {
        return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      }
    } catch (err) {
      console.error('Error loading index:', err.message);
    }
    return null;
  },
  
  /**
   * Get all supported platforms
   * @returns {object} Platforms grouped by era
   */
  getPlatforms: function() {
    const index = this.loadIndex();
    return index ? index.platforms : {};
  },
  
  /**
   * Get all categories
   * @returns {array} Category list
   */
  getCategories: function() {
    const index = this.loadIndex();
    return index ? index.categories : [];
  },
  
  /**
   * List all available apps
   * @returns {array} List of app metadata objects
   */
  listApps: function() {
    const apps = [];
    try {
      const metadataDir = path.join(REPO_BASE, 'metadata');
      if (fs.existsSync(metadataDir)) {
        const files = fs.readdirSync(metadataDir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const appData = JSON.parse(
              fs.readFileSync(path.join(metadataDir, file), 'utf8')
            );
            apps.push(appData);
          }
        }
      }
    } catch (err) {
      console.error('Error listing apps:', err.message);
    }
    return apps;
  },
  
  /**
   * Get app by ID
   * @param {string} appId - Application identifier
   * @returns {object|null} App metadata or null if not found
   */
  getApp: function(appId) {
    try {
      const appPath = path.join(REPO_BASE, 'metadata', `${appId}.json`);
      if (fs.existsSync(appPath)) {
        return JSON.parse(fs.readFileSync(appPath, 'utf8'));
      }
    } catch (err) {
      console.error('Error getting app:', err.message);
    }
    return null;
  },
  
  /**
   * Search apps by name or description
   * @param {string} query - Search query
   * @returns {array} Matching apps
   */
  searchApps: function(query) {
    const apps = this.listApps();
    const lowerQuery = query.toLowerCase();
    return apps.filter(app => 
      app.name.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery) ||
      app.summary.toLowerCase().includes(lowerQuery)
    );
  },
  
  /**
   * Get apps by category
   * @param {string} categoryId - Category identifier
   * @returns {array} Apps in the category
   */
  getAppsByCategory: function(categoryId) {
    const apps = this.listApps();
    return apps.filter(app => 
      app.categories && app.categories.includes(categoryId)
    );
  },
  
  /**
   * Get apps by platform
   * @param {string} platform - Platform identifier
   * @returns {array} Apps supporting the platform
   */
  getAppsByPlatform: function(platform) {
    const apps = this.listApps();
    return apps.filter(app => 
      app.platforms && app.platforms.includes(platform)
    );
  },
  
  /**
   * Get repository configuration
   * @returns {object|null} Repository config or null if not found
   */
  getRepoConfig: function() {
    try {
      const configPath = path.join(REPO_BASE, 'repo', 'config.json');
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
    } catch (err) {
      console.error('Error loading repo config:', err.message);
    }
    return null;
  },
  
  /**
   * Get category details
   * @param {string} categoryId - Category identifier
   * @returns {object|null} Category details or null if not found
   */
  getCategoryDetails: function(categoryId) {
    try {
      const categoryPath = path.join(REPO_BASE, 'categories', `${categoryId}.json`);
      if (fs.existsSync(categoryPath)) {
        return JSON.parse(fs.readFileSync(categoryPath, 'utf8'));
      }
    } catch (err) {
      console.error('Error loading category:', err.message);
    }
    return null;
  },
  
  /**
   * Get statistics about the store
   * @returns {object} Store statistics
   */
  getStats: function() {
    const apps = this.listApps();
    const categories = this.getCategories();
    const platforms = this.getPlatforms();
    
    const platformCount = Object.values(platforms).reduce(
      (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0), 0
    );
    
    return {
      totalApps: apps.length,
      totalCategories: categories.length,
      totalPlatforms: platformCount,
      appsByCategory: categories.reduce((acc, cat) => {
        acc[cat.id] = apps.filter(app => 
          app.categories && app.categories.includes(cat.id)
        ).length;
        return acc;
      }, {})
    };
  }
};

module.exports = fossxx;
