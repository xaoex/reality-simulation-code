/**
 * FREE-XX - Free Software & Offers Store
 * 
 * Comprehensive catalog of 100% free software, student offers,
 * lifetime free deals, free trials, and subscription management.
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 */

const fs = require('fs');
const path = require('path');

// Base path for the FREE-XX repository
const REPO_BASE = path.join(__dirname);

/**
 * FREE-XX Store Module
 */
const freexx = {
  name: 'FREE-XX',
  version: '1.0.0',
  description: 'Free Software & Offers Store - 100% Free, Student Offers, Trials & Lifetime Free',
  
  /**
   * Initialize the FREE-XX store
   * @returns {boolean} Success status
   */
  init: function() {
    console.log('FREE-XX Store initialized');
    console.log('Free Software, Student Offers, Trials & Lifetime Free');
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
      features: [
        '100% Free Forever software',
        'Student offers and discounts',
        'Lifetime free licenses',
        'Free trial management',
        'Subscription trial recycling'
      ],
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
      console.error('Error loading FREE-XX index from ' + path.join(REPO_BASE, 'index.json') + ':', err.message);
    }
    return null;
  },
  
  /**
   * Get all free types
   * @returns {array} Free type definitions
   */
  getFreeTypes: function() {
    const index = this.loadIndex();
    return index ? index.freeTypes : [];
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
   * Load entries from a specific directory
   * @param {string} directory - Directory name
   * @returns {array} List of entries
   */
  loadEntries: function(directory) {
    const entries = [];
    const dirPath = path.join(REPO_BASE, directory);
    try {
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          if (file.endsWith('.json')) {
            const data = JSON.parse(
              fs.readFileSync(path.join(dirPath, file), 'utf8')
            );
            entries.push(data);
          }
        }
      }
    } catch (err) {
      console.error('Error loading entries from ' + dirPath + ':', err.message);
    }
    return entries;
  },
  
  /**
   * List all free software entries
   * @returns {array} All free software metadata
   */
  listFree: function() {
    return this.loadEntries('metadata');
  },
  
  /**
   * Get 100% free forever software
   * @returns {array} Free forever software
   */
  getFreeForever: function() {
    const entries = this.listFree();
    return entries.filter(e => e.freeType === 'free-forever');
  },
  
  /**
   * Get student offers and free programs
   * @returns {array} Student offers
   */
  getStudentOffers: function() {
    // Load from dedicated student directory, then filter main metadata
    const studentEntries = this.loadEntries('student');
    const mainEntries = this.listFree().filter(e => 
      e.freeType === 'student-free' || 
      e.freeType === 'student-discount' ||
      (e.studentOffer && e.studentOffer.available)
    );
    // Combine without duplicates based on id
    const seen = new Set(studentEntries.map(e => e.id));
    return [...studentEntries, ...mainEntries.filter(e => !seen.has(e.id))];
  },
  
  /**
   * Get lifetime free software
   * @returns {array} Lifetime free entries
   */
  getLifetimeFree: function() {
    // Load from dedicated lifetime directory, then filter main metadata
    const lifetimeEntries = this.loadEntries('lifetime');
    const mainEntries = this.listFree().filter(e => e.freeType === 'lifetime-free');
    // Combine without duplicates based on id
    const seen = new Set(lifetimeEntries.map(e => e.id));
    return [...lifetimeEntries, ...mainEntries.filter(e => !seen.has(e.id))];
  },
  
  /**
   * Get free trials
   * @returns {array} Trial software
   */
  getTrials: function() {
    // Load from dedicated trials directory, then filter main metadata
    const trialEntries = this.loadEntries('trials');
    const mainEntries = this.listFree().filter(e => 
      e.freeType === 'trial-timed' || 
      e.freeType === 'trial-unlimited' ||
      e.freeType === 'subscription-trial' ||
      (e.trial && e.trial.available)
    );
    // Combine without duplicates based on id
    const seen = new Set(trialEntries.map(e => e.id));
    return [...trialEntries, ...mainEntries.filter(e => !seen.has(e.id))];
  },
  
  /**
   * Get subscription trials
   * @returns {array} Subscription trial entries
   */
  getSubscriptionTrials: function() {
    const entries = this.getTrials();
    return entries.filter(e => e.freeType === 'subscription-trial');
  },
  
  /**
   * Get trial recycling information for an app
   * @param {string} appId - Application identifier
   * @returns {object|null} Recycling info or null
   */
  getTrialRecycling: function(appId) {
    const entries = this.getTrials();
    const app = entries.find(e => e.id === appId);
    if (app && app.trial && app.trial.recyclable) {
      return {
        appId: app.id,
        appName: app.name,
        recyclable: true,
        method: app.trial.recycleMethod || 'unknown',
        duration: app.trial.duration,
        notes: app.trial.recycleNotes || null
      };
    }
    return null;
  },
  
  /**
   * Get all recyclable trials
   * @returns {array} Trials that can be recycled
   */
  getRecyclableTrials: function() {
    const entries = this.getTrials();
    return entries.filter(e => e.trial && e.trial.recyclable);
  },
  
  /**
   * Get current offers and deals
   * @returns {array} Current offers
   */
  getCurrentOffers: function() {
    return this.loadEntries('offers');
  },
  
  /**
   * Search free software
   * @param {string} query - Search query
   * @returns {array} Matching entries
   */
  search: function(query) {
    const entries = this.listFree();
    const lowerQuery = query.toLowerCase();
    return entries.filter(e => 
      e.name.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery) ||
      (e.summary && e.summary.toLowerCase().includes(lowerQuery))
    );
  },
  
  /**
   * Get entries by free type
   * @param {string} freeType - Free type identifier
   * @returns {array} Entries of that type
   */
  getByFreeType: function(freeType) {
    const entries = this.listFree();
    return entries.filter(e => e.freeType === freeType);
  },
  
  /**
   * Get entries by category
   * @param {string} categoryId - Category identifier
   * @returns {array} Entries in that category
   */
  getByCategory: function(categoryId) {
    const entries = this.listFree();
    return entries.filter(e => 
      e.categories && e.categories.includes(categoryId)
    );
  },
  
  /**
   * Get entries by platform
   * @param {string} platform - Platform identifier
   * @returns {array} Entries for that platform
   */
  getByPlatform: function(platform) {
    const entries = this.listFree();
    return entries.filter(e => 
      e.platforms && e.platforms.includes(platform)
    );
  },
  
  /**
   * Get store statistics
   * @returns {object} Store statistics
   */
  getStats: function() {
    const entries = this.listFree();
    const freeTypes = this.getFreeTypes();
    const categories = this.getCategories();
    
    return {
      totalEntries: entries.length,
      totalFreeTypes: freeTypes.length,
      totalCategories: categories.length,
      byFreeType: freeTypes.reduce((acc, ft) => {
        acc[ft.id] = entries.filter(e => e.freeType === ft.id).length;
        return acc;
      }, {}),
      studentOffers: this.getStudentOffers().length,
      lifetimeFree: this.getLifetimeFree().length,
      trials: this.getTrials().length,
      recyclableTrials: this.getRecyclableTrials().length
    };
  }
};

module.exports = freexx;
