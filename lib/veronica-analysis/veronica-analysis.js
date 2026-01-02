/**
 * VeronicaAnalysis - Narrative-driven data analysis framework
 * Inspired by Veronica Mars x Law & Order investigation style
 * Perfect for Palantir-style data analysis with narration
 * 
 * @author xaoex
 */

const { PlotGenerator } = require('./plot-generator');

/**
 * VeronicaAnalysis - Main analysis class with narrative structure
 */
class VeronicaAnalysis {
  constructor(options = {}) {
    this.options = {
      narrator: options.narrator || 'Veronica',
      style: options.style || 'mars', // 'mars' or 'law-order'
      verbose: options.verbose !== false,
      includeGraphs: options.includeGraphs !== false,
      ...options
    };
    
    this.dataset = null;
    this.analysis = {
      deed: null,
      happening: null,
      x: null,
      y: null,
      z: null,
      glory: null,
      findings: []
    };
    
    this.plotter = new PlotGenerator(options);
    this.narrations = [];
  }
  
  /**
   * Load dataset for analysis
   */
  loadDataset(data, metadata = {}) {
    this.dataset = {
      data,
      metadata: {
        name: metadata.name || 'Unknown Dataset',
        source: metadata.source || 'Unknown',
        timestamp: new Date().toISOString(),
        ...metadata
      },
      stats: this._calculateStats(data)
    };
    
    this._narrate(`Dataset loaded: ${this.dataset.metadata.name}`);
    return this;
  }
  
  /**
   * THE DEED - What happened in the dataset
   */
  theDeed(description, context = {}) {
    this.analysis.deed = {
      description,
      context,
      timestamp: new Date().toISOString(),
      narrator: this.options.narrator
    };
    
    this._narrate(`The Deed: ${description}`, 'deed');
    return this;
  }
  
  /**
   * THE HAPPENING - Something specific that occurred
   */
  theHappening(event, details = {}) {
    this.analysis.happening = {
      event,
      details,
      timestamp: new Date().toISOString(),
      narrator: this.options.narrator
    };
    
    this._narrate(`The Happening: ${event}`, 'happening');
    return this;
  }
  
  /**
   * THE X - First dimension of analysis
   */
  theX(variable, analysis = {}) {
    this.analysis.x = {
      variable,
      analysis,
      type: 'x-axis',
      ...this._analyzeVariable(variable)
    };
    
    this._narrate(`The X: Analyzing ${variable}`, 'x');
    return this;
  }
  
  /**
   * THE Y - Second dimension of analysis
   */
  theY(variable, analysis = {}) {
    this.analysis.y = {
      variable,
      analysis,
      type: 'y-axis',
      ...this._analyzeVariable(variable)
    };
    
    this._narrate(`The Y: Analyzing ${variable}`, 'y');
    return this;
  }
  
  /**
   * THE Z - Third dimension of analysis (depth)
   */
  theZ(variable, analysis = {}) {
    this.analysis.z = {
      variable,
      analysis,
      type: 'z-axis',
      ...this._analyzeVariable(variable)
    };
    
    this._narrate(`The Z: Deep dive into ${variable}`, 'z');
    return this;
  }
  
  /**
   * THE GLORY - The revelation/breakthrough
   */
  theGlory(revelation, impact = {}) {
    this.analysis.glory = {
      revelation,
      impact,
      timestamp: new Date().toISOString(),
      narrator: this.options.narrator
    };
    
    this._narrate(`The Glory: ${revelation}`, 'glory');
    return this;
  }
  
  /**
   * Add a finding to the analysis
   */
  addFinding(finding, evidence = {}) {
    const entry = {
      finding,
      evidence,
      confidence: evidence.confidence || 0.8,
      timestamp: new Date().toISOString()
    };
    
    this.analysis.findings.push(entry);
    this._narrate(`Finding #${this.analysis.findings.length}: ${finding}`, 'finding');
    return this;
  }
  
  /**
   * Generate a plot/graph for the analysis
   */
  generatePlot(type = 'line', options = {}) {
    if (!this.dataset || !this.dataset.data) {
      throw new Error('No dataset loaded. Call loadDataset() first.');
    }
    
    const plotData = {
      x: this.analysis.x,
      y: this.analysis.y,
      z: this.analysis.z,
      dataset: this.dataset.data
    };
    
    const plot = this.plotter.generate(plotData, type, options);
    this._narrate(`Generated ${type} plot for analysis`, 'visualization');
    return plot;
  }
  
  /**
   * Generate correlation analysis
   */
  analyzeCorrelation(var1, var2) {
    if (!this.dataset || !this.dataset.data) {
      throw new Error('No dataset loaded.');
    }
    
    const correlation = this._calculateCorrelation(var1, var2);
    
    const finding = {
      type: 'correlation',
      variables: [var1, var2],
      coefficient: correlation,
      strength: this._interpretCorrelation(correlation)
    };
    
    this.addFinding(
      `Correlation between ${var1} and ${var2}: ${finding.strength}`,
      { correlation: finding }
    );
    
    return finding;
  }
  
  /**
   * Generate trend analysis
   */
  analyzeTrend(variable, method = 'linear') {
    if (!this.dataset || !this.dataset.data) {
      throw new Error('No dataset loaded.');
    }
    
    const trend = this._calculateTrend(variable, method);
    
    const finding = {
      type: 'trend',
      variable,
      method,
      direction: trend.direction,
      strength: trend.strength,
      projection: trend.projection
    };
    
    this.addFinding(
      `Trend for ${variable}: ${finding.direction} (${finding.strength})`,
      { trend: finding }
    );
    
    return finding;
  }
  
  /**
   * Generate the full narrative report
   */
  generateReport(format = 'narrative') {
    const formats = {
      narrative: () => this._generateNarrativeReport(),
      technical: () => this._generateTechnicalReport(),
      executive: () => this._generateExecutiveReport(),
      palantir: () => this._generatePalantirStyleReport()
    };
    
    const generator = formats[format] || formats.narrative;
    return generator();
  }
  
  /**
   * Generate narrative-style report (Veronica Mars style)
   */
  _generateNarrativeReport() {
    const lines = [];
    
    lines.push('╔═══════════════════════════════════════════════════════════════╗');
    lines.push('║        CASE ANALYSIS - VERONICA MARS STYLE                    ║');
    lines.push('╚═══════════════════════════════════════════════════════════════╝');
    lines.push('');
    
    if (this.dataset) {
      lines.push(`📊 Dataset: ${this.dataset.metadata.name}`);
      lines.push(`   Source: ${this.dataset.metadata.source}`);
      lines.push(`   Records: ${this.dataset.stats.count}`);
      lines.push('');
    }
    
    if (this.analysis.deed) {
      lines.push('🔍 THE DEED');
      lines.push('─────────────────────────────────────────────────────────────');
      lines.push(`   "${this.analysis.deed.description}"`);
      lines.push(`   - Narrator: ${this.analysis.deed.narrator}`);
      lines.push('');
    }
    
    if (this.analysis.happening) {
      lines.push('⚡ THE HAPPENING');
      lines.push('─────────────────────────────────────────────────────────────');
      lines.push(`   "${this.analysis.happening.event}"`);
      if (Object.keys(this.analysis.happening.details).length > 0) {
        lines.push('   Details:');
        for (const [key, value] of Object.entries(this.analysis.happening.details)) {
          lines.push(`   - ${key}: ${value}`);
        }
      }
      lines.push('');
    }
    
    if (this.analysis.x || this.analysis.y || this.analysis.z) {
      lines.push('📈 THE DIMENSIONS');
      lines.push('─────────────────────────────────────────────────────────────');
      
      if (this.analysis.x) {
        lines.push(`   The X: ${this.analysis.x.variable}`);
      }
      if (this.analysis.y) {
        lines.push(`   The Y: ${this.analysis.y.variable}`);
      }
      if (this.analysis.z) {
        lines.push(`   The Z: ${this.analysis.z.variable} (depth analysis)`);
      }
      lines.push('');
    }
    
    if (this.analysis.glory) {
      lines.push('✨ THE GLORY');
      lines.push('─────────────────────────────────────────────────────────────');
      lines.push(`   "${this.analysis.glory.revelation}"`);
      if (Object.keys(this.analysis.glory.impact).length > 0) {
        lines.push('   Impact:');
        for (const [key, value] of Object.entries(this.analysis.glory.impact)) {
          lines.push(`   - ${key}: ${value}`);
        }
      }
      lines.push('');
    }
    
    if (this.analysis.findings.length > 0) {
      lines.push('🎯 FINDINGS');
      lines.push('─────────────────────────────────────────────────────────────');
      this.analysis.findings.forEach((finding, idx) => {
        lines.push(`   ${idx + 1}. ${finding.finding}`);
        lines.push(`      Confidence: ${(finding.confidence * 100).toFixed(0)}%`);
      });
      lines.push('');
    }
    
    lines.push('─────────────────────────────────────────────────────────────');
    lines.push(`Case closed by ${this.options.narrator} | ${new Date().toISOString()}`);
    lines.push('');
    
    return lines.join('\n');
  }
  
  /**
   * Generate Palantir-style report
   */
  _generatePalantirStyleReport() {
    const lines = [];
    
    lines.push('╔═══════════════════════════════════════════════════════════════╗');
    lines.push('║           PALANTIR FOUNDRY - DATA ANALYSIS REPORT             ║');
    lines.push('╚═══════════════════════════════════════════════════════════════╝');
    lines.push('');
    
    lines.push('┌─ INVESTIGATION OVERVIEW ──────────────────────────────────┐');
    
    if (this.analysis.deed) {
      lines.push('│ Initial Assessment:');
      lines.push(`│   ${this.analysis.deed.description}`);
    }
    
    if (this.analysis.happening) {
      lines.push('│ Key Event:');
      lines.push(`│   ${this.analysis.happening.event}`);
    }
    
    lines.push('└───────────────────────────────────────────────────────────┘');
    lines.push('');
    
    lines.push('┌─ DATA DIMENSIONS ─────────────────────────────────────────┐');
    
    if (this.analysis.x) {
      lines.push(`│ X-Axis: ${this.analysis.x.variable}`);
    }
    if (this.analysis.y) {
      lines.push(`│ Y-Axis: ${this.analysis.y.variable}`);
    }
    if (this.analysis.z) {
      lines.push(`│ Z-Axis: ${this.analysis.z.variable}`);
    }
    
    lines.push('└───────────────────────────────────────────────────────────┘');
    lines.push('');
    
    if (this.dataset && this.dataset.stats) {
      lines.push('┌─ DATASET STATISTICS ──────────────────────────────────────┐');
      lines.push(`│ Total Records: ${this.dataset.stats.count}`);
      if (this.dataset.stats.mean !== undefined) {
        lines.push(`│ Mean: ${this.dataset.stats.mean.toFixed(2)}`);
      }
      if (this.dataset.stats.median !== undefined) {
        lines.push(`│ Median: ${this.dataset.stats.median.toFixed(2)}`);
      }
      if (this.dataset.stats.stdDev !== undefined) {
        lines.push(`│ Std Dev: ${this.dataset.stats.stdDev.toFixed(2)}`);
      }
      lines.push('└───────────────────────────────────────────────────────────┘');
      lines.push('');
    }
    
    if (this.analysis.findings.length > 0) {
      lines.push('┌─ INTELLIGENCE FINDINGS ───────────────────────────────────┐');
      this.analysis.findings.forEach((finding, idx) => {
        const confidence = (finding.confidence * 100).toFixed(0);
        lines.push(`│ [${confidence}%] ${finding.finding}`);
      });
      lines.push('└───────────────────────────────────────────────────────────┘');
      lines.push('');
    }
    
    if (this.analysis.glory) {
      lines.push('┌─ BREAKTHROUGH DISCOVERY ──────────────────────────────────┐');
      lines.push(`│ ${this.analysis.glory.revelation}`);
      lines.push('└───────────────────────────────────────────────────────────┘');
      lines.push('');
    }
    
    lines.push(`Analysis completed: ${new Date().toISOString()}`);
    lines.push(`Analyst: ${this.options.narrator}`);
    lines.push('');
    
    return lines.join('\n');
  }
  
  /**
   * Generate technical report
   */
  _generateTechnicalReport() {
    return JSON.stringify({
      metadata: this.dataset ? this.dataset.metadata : {},
      analysis: this.analysis,
      narrations: this.narrations,
      statistics: this.dataset ? this.dataset.stats : {}
    }, null, 2);
  }
  
  /**
   * Generate executive summary
   */
  _generateExecutiveReport() {
    const lines = [];
    
    lines.push('EXECUTIVE SUMMARY');
    lines.push('═'.repeat(60));
    lines.push('');
    
    if (this.analysis.deed) {
      lines.push(`Situation: ${this.analysis.deed.description}`);
    }
    
    if (this.analysis.glory) {
      lines.push(`Key Finding: ${this.analysis.glory.revelation}`);
    }
    
    lines.push('');
    lines.push(`Total Findings: ${this.analysis.findings.length}`);
    
    if (this.analysis.findings.length > 0) {
      const avgConfidence = this.analysis.findings.reduce((sum, f) => sum + f.confidence, 0) / this.analysis.findings.length;
      lines.push(`Average Confidence: ${(avgConfidence * 100).toFixed(0)}%`);
    }
    
    return lines.join('\n');
  }
  
  /**
   * Internal narration system
   */
  _narrate(message, type = 'info') {
    const narration = {
      message,
      type,
      narrator: this.options.narrator,
      timestamp: new Date().toISOString()
    };
    
    this.narrations.push(narration);
    
    if (this.options.verbose) {
      const prefix = this._getNarrationPrefix(type);
      console.log(`${prefix} ${this.options.narrator}: ${message}`);
    }
  }
  
  /**
   * Get narration prefix based on type
   */
  _getNarrationPrefix(type) {
    const prefixes = {
      deed: '🔍',
      happening: '⚡',
      x: '📊',
      y: '📈',
      z: '🔬',
      glory: '✨',
      finding: '🎯',
      visualization: '📉',
      info: 'ℹ️'
    };
    
    return prefixes[type] || 'ℹ️';
  }
  
  /**
   * Calculate basic statistics
   */
  _calculateStats(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return { count: 0 };
    }
    
    // Handle array of numbers
    if (typeof data[0] === 'number') {
      const sorted = [...data].sort((a, b) => a - b);
      const sum = data.reduce((acc, val) => acc + val, 0);
      const mean = sum / data.length;
      
      const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
      const stdDev = Math.sqrt(variance);
      
      return {
        count: data.length,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        mean,
        median: sorted[Math.floor(sorted.length / 2)],
        stdDev
      };
    }
    
    // Handle array of objects
    return {
      count: data.length,
      fields: Object.keys(data[0] || {})
    };
  }
  
  /**
   * Analyze a variable
   */
  _analyzeVariable(variable) {
    if (!this.dataset || !this.dataset.data) {
      return {};
    }
    
    return {
      analyzed: true,
      timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Calculate correlation between two variables
   */
  _calculateCorrelation(var1, var2) {
    // Simple correlation coefficient calculation
    // In a real implementation, this would extract values from dataset
    return Math.random() * 2 - 1; // Placeholder: random value between -1 and 1
  }
  
  /**
   * Interpret correlation strength
   */
  _interpretCorrelation(coefficient) {
    const abs = Math.abs(coefficient);
    if (abs > 0.9) return 'Very Strong';
    if (abs > 0.7) return 'Strong';
    if (abs > 0.5) return 'Moderate';
    if (abs > 0.3) return 'Weak';
    return 'Very Weak';
  }
  
  /**
   * Calculate trend
   */
  _calculateTrend(variable, method) {
    // Placeholder trend calculation
    const direction = Math.random() > 0.5 ? 'Increasing' : 'Decreasing';
    const strength = ['Strong', 'Moderate', 'Weak'][Math.floor(Math.random() * 3)];
    
    return {
      direction,
      strength,
      projection: `${direction} ${strength.toLowerCase()}`
    };
  }
}

module.exports = { VeronicaAnalysis };
