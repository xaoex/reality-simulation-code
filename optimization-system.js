/**
 * General Optimization System
 * Calculated opt and general opt light situation for all subpackages
 * 
 * @version 1.0.0
 * @author xaoex
 */

/**
 * OptimizationCalculator - Calculates optimization levels
 */
class OptimizationCalculator {
  constructor() {
    this.maxLevel = 100;
    this.lightLevel = 50;
    this.standardLevel = 75;
  }

  /**
   * Calculate optimization level based on input
   */
  calculateOptLevel(data) {
    if (!data || typeof data !== 'object') {
      return this.lightLevel;
    }

    let score = 0;
    let factors = 0;

    // Factor 1: Complexity
    if (data.complexity) {
      score += data.complexity * 20;
      factors++;
    }

    // Factor 2: Priority
    if (data.priority) {
      const priorityMap = { low: 25, medium: 50, high: 75, max: 100 };
      score += priorityMap[data.priority] || 50;
      factors++;
    }

    // Factor 3: Size
    if (data.size) {
      score += Math.min(data.size / 10, 30);
      factors++;
    }

    if (factors === 0) {
      return this.standardLevel;
    }

    const calculated = Math.min(score / factors, this.maxLevel);
    return Math.round(calculated);
  }

  /**
   * Get maxopt (100%)
   */
  maxopt() {
    return this.maxLevel;
  }

  /**
   * Get light optimization (50%)
   */
  lightOpt() {
    return this.lightLevel;
  }

  /**
   * Get standard optimization (75%)
   */
  standardOpt() {
    return this.standardLevel;
  }

  /**
   * Apply optimization to data
   */
  applyOptimization(data, level) {
    if (!data) return data;

    const optimized = { ...data };
    optimized._optimized = true;
    optimized._optLevel = level;
    optimized._optTimestamp = new Date().toISOString();

    // Apply optimization transformations based on level
    if (level >= 75) {
      optimized._maxopt = true;
    } else if (level >= 50) {
      optimized._lightopt = true;
    }

    return optimized;
  }
}

/**
 * GeneralOptSituation - General optimization situation handler
 */
class GeneralOptSituation {
  constructor(options = {}) {
    this.calculator = new OptimizationCalculator();
    this.situations = new Map();
    this.verbose = options.verbose || false;
  }

  /**
   * Create an optimization situation
   */
  createSituation(name, data) {
    const optLevel = this.calculator.calculateOptLevel(data);
    const situation = {
      name,
      data,
      optLevel,
      created: new Date().toISOString(),
      status: 'created'
    };

    this.situations.set(name, situation);

    if (this.verbose) {
      console.log(`[OptSituation] Created: ${name} (level: ${optLevel}%)`);
    }

    return situation;
  }

  /**
   * Optimize a situation
   */
  optimizeSituation(name) {
    const situation = this.situations.get(name);
    if (!situation) {
      throw new Error(`Situation not found: ${name}`);
    }

    const optimized = this.calculator.applyOptimization(
      situation.data,
      situation.optLevel
    );

    situation.optimizedData = optimized;
    situation.status = 'optimized';
    situation.optimizedAt = new Date().toISOString();

    if (this.verbose) {
      console.log(`[OptSituation] Optimized: ${name} (${situation.optLevel}%)`);
    }

    return situation;
  }

  /**
   * Get maxopt situation (100%)
   */
  maxoptSituation(name, data) {
    const situation = this.createSituation(name, data);
    situation.optLevel = this.calculator.maxopt();
    return this.optimizeSituation(name);
  }

  /**
   * Get light opt situation (50%)
   */
  lightOptSituation(name, data) {
    const situation = this.createSituation(name, data);
    situation.optLevel = this.calculator.lightOpt();
    return this.optimizeSituation(name);
  }

  /**
   * Get all situations
   */
  getSituations() {
    return Array.from(this.situations.values());
  }

  /**
   * Get optimization statistics
   */
  getStats() {
    const situations = this.getSituations();
    const total = situations.length;
    const optimized = situations.filter(s => s.status === 'optimized').length;
    const avgLevel = situations.reduce((sum, s) => sum + s.optLevel, 0) / total || 0;

    return {
      total,
      optimized,
      pending: total - optimized,
      avgLevel: Math.round(avgLevel)
    };
  }
}

// Export
module.exports = {
  OptimizationCalculator,
  GeneralOptSituation
};
