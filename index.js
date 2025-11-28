/**
 * Reality Simulation Code
 * SimSim Code & Contributions
 * 
 * @author xaoex
 * @see https://linktr.ee/xaoex
 * @see https://linktr.ee/oktays
 */

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'reality-simulation-code',
  version: '1.0.0',
  description: 'Reality Simulation Codebase - SimSim Code & Contributions',
  author: 'xaoex',
  
  /**
   * Initialize the simulation
   */
  init: function() {
    console.log('Reality Simulation Code initialized');
    return true;
  },
  
  /**
   * Get simulation info
   */
  info: function() {
    return {
      name: this.name,
      version: this.version,
      author: this.author,
      links: [
        'https://linktr.ee/xaoex',
        'https://linktr.ee/oktays'
      ]
    };
  },

  /**
   * Parse xaoex .gamers file and extract entries
   * @param {string} filePath - Path to the .gamers file
   * @returns {Array} Array of parsed entries
   */
  parseGamers: function(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const entries = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('.') && !trimmed.startsWith('#')) {
        entries.push(trimmed);
      }
    }
    
    return entries;
  },

  /**
   * Transform gamers entries to .oai situation format
   * @param {Array} gamersEntries - Array of gamers entries
   * @returns {string} OAI situation content
   */
  transformToOai: function(gamersEntries) {
    const lines = [
      '# .oai situation - Generated from xaoex.gamers',
      '# OpenAI Integration Situation for Reality Simulation',
      '',
      '.situation',
      '.oai',
      ''
    ];

    const entities = [];
    const gaming = [];
    const platforms = [];
    const maxopts = [];
    const eternal = [];

    for (const entry of gamersEntries) {
      if (entry.includes('oktay') || entry.includes('rasmus') || entry.includes('camilla') || entry.includes('xaoex')) {
        entities.push(entry);
      }
      if (entry.includes('gaming') || entry.includes('gamer') || entry.includes('multiplayer') || entry.includes('singleplayer') || entry.includes('streaming')) {
        gaming.push(entry);
      }
      if (entry.includes('console') || entry.includes('pc') || entry.includes('mobile')) {
        platforms.push(entry);
      }
      if (entry.includes('maxopt') || entry.includes('max')) {
        maxopts.push(entry);
      }
      if (entry.includes('eternal') || entry.includes('forever')) {
        eternal.push(entry);
      }
    }

    // Add core entities
    lines.push('# Core xaoex entities');
    for (const entity of entities) {
      lines.push('.entity' + entity.substring(1));
    }
    lines.push('');

    // Add gaming integration
    lines.push('# Gaming integration');
    for (const game of gaming) {
      lines.push('.gaming.integration' + game.substring(1) + '.enabled');
    }
    lines.push('');

    // Add platform support
    lines.push('# Platform support');
    for (const platform of platforms) {
      lines.push('.platform' + platform.substring(1) + '.supported');
    }
    lines.push('');

    // Add AI situation mappings
    lines.push('# AI situation mappings');
    lines.push('.oai.connection.established');
    lines.push('.oai.xaoexgamers.mapped');
    lines.push('.oai.realitysim.integrated');
    lines.push('.oai.simsim.connected');
    lines.push('');

    // Add max optimization states
    lines.push('# Max optimization states');
    for (const maxopt of maxopts) {
      lines.push('.maxopt' + maxopt.substring(1) + '.complete');
    }
    lines.push('');

    // Add eternal configuration
    lines.push('# Eternal configuration');
    for (const et of eternal) {
      lines.push('.eternal' + et.substring(1) + '.active');
    }
    lines.push('');

    // Add situation status
    lines.push('# Situation status');
    lines.push('.situation.generated');
    lines.push('.situation.active');
    lines.push('.situation.xaoex.gamers.source');

    return lines.join('\n');
  },

  /**
   * Generate .oai situation file from xaoex .gamers file
   * @param {string} gamersPath - Path to xaoex.gamers file
   * @param {string} outputPath - Path to output .oai file
   * @returns {boolean} Success status
   */
  generateOaiSituation: function(gamersPath, outputPath) {
    try {
      const entries = this.parseGamers(gamersPath);
      const oaiContent = this.transformToOai(entries);
      fs.writeFileSync(outputPath, oaiContent);
      console.log('Generated .oai situation from xaoex.gamers');
      return true;
    } catch (error) {
      console.error('Error generating .oai situation:', error.message);
      return false;
    }
  }
};
