#!/usr/bin/env node

/**
 * Test Suite: Veronica Analysis Module
 * Tests for VeronicaAnalysis and PlotGenerator classes
 * 
 * @author xaoex
 */

const { VeronicaAnalysis, PlotGenerator } = require('./index.js');

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

/**
 * Test assertion helper
 */
function assert(condition, testName) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${testName}`);
  } else {
    testsFailed++;
    console.log(`  ✗ ${testName}`);
  }
}

/**
 * Test suite header
 */
function testSuite(name) {
  console.log(`\n${name}`);
  console.log('─'.repeat(60));
}

// ============================================================================
// VeronicaAnalysis Tests
// ============================================================================

testSuite('VeronicaAnalysis - Basic Functionality');

// Test: Constructor and initialization
const analysis = new VeronicaAnalysis({
  narrator: 'Test Narrator',
  verbose: false
});

assert(analysis !== null, 'VeronicaAnalysis instance created');
assert(analysis.options.narrator === 'Test Narrator', 'Narrator option set correctly');
assert(analysis.analysis !== null, 'Analysis structure initialized');

// Test: Load dataset
const testData = [10, 20, 30, 40, 50];
analysis.loadDataset(testData, {
  name: 'Test Dataset',
  source: 'Test Source'
});

assert(analysis.dataset !== null, 'Dataset loaded successfully');
assert(analysis.dataset.data.length === 5, 'Dataset contains correct number of records');
assert(analysis.dataset.metadata.name === 'Test Dataset', 'Dataset metadata stored correctly');
assert(analysis.dataset.stats.count === 5, 'Basic statistics calculated');

// Test: The Deed
analysis.theDeed('Test deed description', { context: 'test' });
assert(analysis.analysis.deed !== null, 'The Deed set successfully');
assert(analysis.analysis.deed.description === 'Test deed description', 'Deed description stored');

// Test: The Happening
analysis.theHappening('Test happening event', { detail: 'test' });
assert(analysis.analysis.happening !== null, 'The Happening set successfully');
assert(analysis.analysis.happening.event === 'Test happening event', 'Happening event stored');

// Test: The X, Y, Z
analysis.theX('test_x_variable');
analysis.theY('test_y_variable');
analysis.theZ('test_z_variable');

assert(analysis.analysis.x !== null, 'The X set successfully');
assert(analysis.analysis.y !== null, 'The Y set successfully');
assert(analysis.analysis.z !== null, 'The Z set successfully');
assert(analysis.analysis.x.variable === 'test_x_variable', 'X variable stored correctly');

// Test: The Glory
analysis.theGlory('Test revelation', { impact: 'high' });
assert(analysis.analysis.glory !== null, 'The Glory set successfully');
assert(analysis.analysis.glory.revelation === 'Test revelation', 'Glory revelation stored');

// Test: Findings
analysis.addFinding('First finding', { confidence: 0.8 });
analysis.addFinding('Second finding', { confidence: 0.9 });

assert(analysis.analysis.findings.length === 2, 'Findings added successfully');
assert(analysis.analysis.findings[0].confidence === 0.8, 'Finding confidence stored correctly');

testSuite('VeronicaAnalysis - Reports');

// Test: Narrative report
const narrativeReport = analysis.generateReport('narrative');
assert(typeof narrativeReport === 'string', 'Narrative report generated');
assert(narrativeReport.includes('VERONICA MARS STYLE'), 'Narrative report has correct header');
assert(narrativeReport.includes('THE DEED'), 'Narrative report includes The Deed section');
assert(narrativeReport.includes('THE GLORY'), 'Narrative report includes The Glory section');

// Test: Palantir report
const palantirReport = analysis.generateReport('palantir');
assert(typeof palantirReport === 'string', 'Palantir report generated');
assert(palantirReport.includes('PALANTIR FOUNDRY'), 'Palantir report has correct header');
assert(palantirReport.includes('INVESTIGATION OVERVIEW'), 'Palantir report has overview section');

// Test: Technical report
const technicalReport = analysis.generateReport('technical');
assert(typeof technicalReport === 'string', 'Technical report generated');
const parsed = JSON.parse(technicalReport);
assert(parsed.metadata !== undefined, 'Technical report contains metadata');
assert(parsed.analysis !== undefined, 'Technical report contains analysis');

// Test: Executive report
const executiveReport = analysis.generateReport('executive');
assert(typeof executiveReport === 'string', 'Executive report generated');
assert(executiveReport.includes('EXECUTIVE SUMMARY'), 'Executive report has correct header');

testSuite('VeronicaAnalysis - Analysis Methods');

// Test: Correlation analysis
const correlation = analysis.analyzeCorrelation('var1', 'var2');
assert(correlation !== null, 'Correlation analysis completed');
assert(correlation.type === 'correlation', 'Correlation type set correctly');
assert(typeof correlation.coefficient === 'number', 'Correlation coefficient calculated');

// Test: Trend analysis
const trend = analysis.analyzeTrend('test_variable', 'linear');
assert(trend !== null, 'Trend analysis completed');
assert(trend.type === 'trend', 'Trend type set correctly');
assert(trend.variable === 'test_variable', 'Trend variable stored correctly');

// ============================================================================
// PlotGenerator Tests
// ============================================================================

testSuite('PlotGenerator - Basic Functionality');

const plotter = new PlotGenerator({
  width: 40,
  height: 10,
  verbose: false
});

assert(plotter !== null, 'PlotGenerator instance created');
assert(plotter.options.width === 40, 'Width option set correctly');
assert(plotter.options.height === 10, 'Height option set correctly');

testSuite('PlotGenerator - Plot Generation');

// Test: Line plot
const lineData = [5, 10, 15, 20, 25, 30];
const linePlot = plotter.generateLinePlot(lineData, { title: 'Test Line' });
assert(typeof linePlot === 'string', 'Line plot generated');
assert(linePlot.includes('Test Line'), 'Line plot has title');
assert(linePlot.includes('╔'), 'Line plot has borders');

// Test: Scatter plot
const scatterData = [
  { x: 1, y: 5 },
  { x: 2, y: 10 },
  { x: 3, y: 15 }
];
const scatterPlot = plotter.generateScatterPlot(scatterData, { title: 'Test Scatter' });
assert(typeof scatterPlot === 'string', 'Scatter plot generated');
assert(scatterPlot.includes('Test Scatter'), 'Scatter plot has title');

// Test: Bar chart
const barData = [10, 20, 30, 40, 50];
const barChart = plotter.generateBarChart(barData, { title: 'Test Bar' });
assert(typeof barChart === 'string', 'Bar chart generated');
assert(barChart.includes('Test Bar'), 'Bar chart has title');
assert(barChart.includes('█'), 'Bar chart has bar characters');

// Test: Histogram
const histData = [1, 2, 2, 3, 3, 3, 4, 4, 5];
const histogram = plotter.generateHistogram(histData, { title: 'Test Histogram', bins: 5 });
assert(typeof histogram === 'string', 'Histogram generated');
assert(histogram.includes('Test Histogram'), 'Histogram has title');

// Test: Heatmap
const heatmapData = {
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
};
const heatmap = plotter.generateHeatmap(heatmapData, { title: 'Test Heatmap' });
assert(typeof heatmap === 'string', 'Heatmap generated');
assert(heatmap.includes('Test Heatmap'), 'Heatmap has title');

// Test: Generate method with type parameter
const autoPlot = plotter.generate([1, 2, 3, 4, 5], 'line', { title: 'Auto Plot' });
assert(typeof autoPlot === 'string', 'Auto plot generated via generate method');
assert(autoPlot.includes('Auto Plot'), 'Auto plot has title');

testSuite('VeronicaAnalysis - Integration with PlotGenerator');

// Test: Generate plot from analysis
const plotAnalysis = new VeronicaAnalysis({ verbose: false });
plotAnalysis.loadDataset([10, 20, 30, 40], { name: 'Plot Test' });
plotAnalysis.theX('time').theY('value');

const analysisPlot = plotAnalysis.generatePlot('line', { title: 'Analysis Plot' });
assert(typeof analysisPlot === 'string', 'Plot generated from analysis');
assert(analysisPlot.includes('Analysis Plot'), 'Analysis plot has title');

testSuite('VeronicaAnalysis - Edge Cases');

// Test: Empty dataset
const emptyAnalysis = new VeronicaAnalysis({ verbose: false });
emptyAnalysis.loadDataset([], { name: 'Empty' });
assert(emptyAnalysis.dataset.stats.count === 0, 'Empty dataset handled correctly');

// Test: Dataset with objects
const objectData = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 }
];
const objectAnalysis = new VeronicaAnalysis({ verbose: false });
objectAnalysis.loadDataset(objectData, { name: 'Object Data' });
assert(objectAnalysis.dataset.stats.count === 2, 'Object dataset handled correctly');
assert(objectAnalysis.dataset.stats.fields.length === 2, 'Object fields detected');

// Test: Narration system
const narratedAnalysis = new VeronicaAnalysis({ narrator: 'Test', verbose: false });
narratedAnalysis.theDeed('Test');
assert(narratedAnalysis.narrations.length > 0, 'Narrations recorded');
assert(narratedAnalysis.narrations[0].narrator === 'Test', 'Narrator stored in narrations');

// ============================================================================
// Test Results
// ============================================================================

console.log('\n' + '═'.repeat(60));
console.log('TEST RESULTS');
console.log('═'.repeat(60));
console.log(`Total Tests: ${testsRun}`);
console.log(`Passed: ${testsPassed} ✓`);
console.log(`Failed: ${testsFailed} ✗`);
console.log(`Success Rate: ${((testsPassed / testsRun) * 100).toFixed(1)}%`);

if (testsFailed === 0) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed`);
  process.exit(1);
}
