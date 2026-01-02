/**
 * Veronica Analysis - Veronica Mars x Law & Order Style Data Analysis
 * Narrative-driven data investigation with graphs, plots, and findings
 * 
 * "In dataset here is what happened" - The Deed
 * "In dataset here something happened" - The Happening
 * 
 * @version 1.0.0
 * @author xaoex
 * @see https://linktr.ee/xaoex
 */

const { VeronicaAnalysis } = require('./veronica-analysis');
const { PlotGenerator } = require('./plot-generator');
const { veronicaAnalysisExample } = require('./examples');

module.exports = {
  VeronicaAnalysis,
  PlotGenerator,
  veronicaAnalysisExample,
  
  /**
   * Quick start - Create a Veronica Analysis instance
   */
  createAnalysis: function(options = {}) {
    return new VeronicaAnalysis(options);
  },
  
  /**
   * Quick plot - Generate a quick visualization
   */
  quickPlot: function(data, type = 'line') {
    const plotter = new PlotGenerator();
    return plotter.generate(data, type);
  }
};
