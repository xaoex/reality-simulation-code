/**
 * Examples - Veronica Analysis demonstrations
 * Shows how to use the Veronica Mars x Law & Order style analysis
 * 
 * @author xaoex
 */

const { VeronicaAnalysis } = require('./veronica-analysis');
const { PlotGenerator } = require('./plot-generator');

/**
 * Example 1: Basic Investigation Analysis
 */
function basicInvestigationExample() {
  console.log('\n=== Example 1: Basic Investigation ===\n');
  
  const analysis = new VeronicaAnalysis({
    narrator: 'Veronica Mars',
    style: 'mars',
    verbose: true
  });
  
  // Load dataset
  const suspectData = [
    { name: 'Suspect A', alibi_strength: 0.3, motive: 0.8 },
    { name: 'Suspect B', alibi_strength: 0.9, motive: 0.2 },
    { name: 'Suspect C', alibi_strength: 0.5, motive: 0.7 }
  ];
  
  analysis.loadDataset(suspectData, {
    name: 'Neptune High Case #47',
    source: 'Mars Investigations',
    caseType: 'missing_laptop'
  });
  
  // Structure the investigation
  analysis
    .theDeed(
      'A laptop containing sensitive student records went missing from the principal\'s office',
      { location: 'Neptune High', time: '2:30 PM' }
    )
    .theHappening(
      'Security footage shows three students near the office during the time window',
      { footage_quality: 'grainy', timestamp_accuracy: 'high' }
    )
    .theX('alibi_strength', { description: 'Strength of alibi evidence' })
    .theY('motive', { description: 'Assessed motive level' })
    .theZ('behavioral_patterns', { description: 'Past behavioral indicators' });
  
  // Add findings
  analysis.addFinding(
    'Suspect A has weak alibi but strong motive',
    { confidence: 0.85 }
  );
  
  analysis.addFinding(
    'Suspect B has strong alibi, investigation priority: low',
    { confidence: 0.92 }
  );
  
  analysis.addFinding(
    'Suspect C shows moderate risk across all dimensions',
    { confidence: 0.75 }
  );
  
  // The breakthrough
  analysis.theGlory(
    'Cross-referencing social media posts reveals Suspect A posted about the laptop 30 minutes after it went missing',
    { impact: { case_status: 'solved', confidence: 0.95 } }
  );
  
  // Generate report
  const report = analysis.generateReport('narrative');
  console.log(report);
  
  return analysis;
}

/**
 * Example 2: Palantir-Style Data Analysis
 */
function palantirStyleExample() {
  console.log('\n=== Example 2: Palantir-Style Analysis ===\n');
  
  const analysis = new VeronicaAnalysis({
    narrator: 'Data Analyst',
    verbose: false
  });
  
  // Financial transaction data
  const transactions = [
    100, 150, 200, 180, 220, 250, 300, 280, 350, 400,
    420, 390, 450, 500, 480, 520, 550, 600, 580, 620
  ];
  
  analysis.loadDataset(transactions, {
    name: 'Q4 Transaction Analysis',
    source: 'Financial Database',
    period: 'Oct-Dec 2025'
  });
  
  analysis
    .theDeed(
      'Analyzing transaction patterns for Q4 2025 to identify anomalies and trends'
    )
    .theHappening(
      'Significant uptick in transaction volume detected in November'
    )
    .theX('time_period')
    .theY('transaction_amount')
    .analyzeCorrelation('time_period', 'transaction_amount')
    .analyzeTrend('transaction_amount', 'linear');
  
  analysis.theGlory(
    'Strong positive correlation indicates healthy growth pattern with 23% increase over quarter',
    { impact: { business_health: 'positive', growth_rate: 0.23 } }
  );
  
  const report = analysis.generateReport('palantir');
  console.log(report);
  
  return analysis;
}

/**
 * Example 3: Data Visualization with Plots
 */
function visualizationExample() {
  console.log('\n=== Example 3: Data Visualization ===\n');
  
  const analysis = new VeronicaAnalysis({
    narrator: 'Veronica',
    verbose: false
  });
  
  // Crime rate data over time
  const crimeData = [
    12, 15, 13, 18, 20, 22, 19, 17, 16, 14,
    13, 11, 10, 9, 11, 12, 10, 8, 7, 9
  ];
  
  analysis.loadDataset(crimeData, {
    name: 'Neptune Crime Rate Analysis',
    source: 'Sheriff\'s Department',
    timeframe: '20 weeks'
  });
  
  analysis
    .theDeed('In dataset, Neptune has shown varying crime rates over the past 20 weeks')
    .theHappening('A downward trend emerged after week 6, coinciding with increased patrols')
    .theX('week_number')
    .theY('crime_incidents');
  
  // Generate visualization
  console.log('Generating line plot...\n');
  const linePlot = analysis.generatePlot('line', {
    title: 'Crime Rate Trend',
    xLabel: 'Week',
    yLabel: 'Incidents'
  });
  console.log(linePlot);
  
  analysis.theGlory(
    'Crime rate decreased by 42% after implementing new patrol strategy',
    { impact: { effectiveness: 0.42, recommendation: 'continue_strategy' } }
  );
  
  console.log('\n' + analysis.generateReport('narrative'));
  
  return analysis;
}

/**
 * Example 4: Multi-Dimensional Analysis with Heatmap
 */
function heatmapExample() {
  console.log('\n=== Example 4: Heatmap Analysis ===\n');
  
  const plotter = new PlotGenerator({ width: 40, height: 10 });
  
  // Relationship strength matrix
  const relationships = [
    [1.0, 0.7, 0.3, 0.5],
    [0.7, 1.0, 0.8, 0.4],
    [0.3, 0.8, 1.0, 0.6],
    [0.5, 0.4, 0.6, 1.0]
  ];
  
  const heatmap = plotter.generateHeatmap({ matrix: relationships }, {
    title: 'Suspect Relationship Matrix'
  });
  
  console.log(heatmap);
  console.log('\nLegend: █ = Strong relationship, ░ = Weak relationship\n');
  
  const analysis = new VeronicaAnalysis({ narrator: 'Veronica', verbose: false });
  
  analysis
    .theDeed('Analyzing relationship patterns between four key suspects')
    .theHappening('Strong connections revealed between Suspects B and C')
    .theGlory('Suspects B and C likely collaborated - investigate together');
  
  console.log(analysis.generateReport('narrative'));
}

/**
 * Example 5: Bar Chart Comparison
 */
function barChartExample() {
  console.log('\n=== Example 5: Bar Chart Comparison ===\n');
  
  const plotter = new PlotGenerator({ width: 50, height: 15 });
  
  const departmentPerformance = [85, 92, 78, 95, 88, 90];
  
  const barChart = plotter.generateBarChart(departmentPerformance, {
    title: 'Department Performance Scores'
  });
  
  console.log(barChart);
  console.log('Departments: 1=Sales, 2=Engineering, 3=HR, 4=Product, 5=Marketing, 6=Operations\n');
}

/**
 * Example 6: Complete Investigation Flow
 */
function completeInvestigationExample() {
  console.log('\n=== Example 6: Complete Investigation Flow ===\n');
  
  const analysis = new VeronicaAnalysis({
    narrator: 'Veronica Mars',
    verbose: true
  });
  
  // Case data
  const evidenceTimeline = [
    { time: 0, suspicion_level: 0.2 },
    { time: 1, suspicion_level: 0.3 },
    { time: 2, suspicion_level: 0.5 },
    { time: 3, suspicion_level: 0.7 },
    { time: 4, suspicion_level: 0.9 }
  ];
  
  analysis.loadDataset(evidenceTimeline, {
    name: 'The Case of the Missing Trophy',
    source: 'Mars Investigations'
  });
  
  analysis
    .theDeed('In dataset here is what happened: The school championship trophy vanished during the victory celebration')
    .theHappening('In dataset here something happened: Evidence accumulation over 5-hour investigation period shows escalating suspicion')
    .theX('investigation_hour')
    .theY('suspicion_level')
    .theZ('evidence_strength');
  
  // Generate plot
  const plot = analysis.generatePlot('line', {
    title: 'Suspicion Level Over Time',
    xLabel: 'Hours',
    yLabel: 'Suspicion'
  });
  console.log('\n' + plot + '\n');
  
  analysis
    .addFinding('Initial evidence points to inside job', { confidence: 0.6 })
    .addFinding('Fingerprints match school janitor', { confidence: 0.85 })
    .addFinding('Janitor had motive: unpaid overtime dispute', { confidence: 0.9 })
    .theGlory('Case solved: Trophy recovered from janitor\'s locker. Motive confirmed through payroll records.');
  
  const report = analysis.generateReport('palantir');
  console.log(report);
  
  return analysis;
}

/**
 * Run all examples
 */
function veronicaAnalysisExample() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║  Veronica Mars x Law & Order Style Data Analysis Examples    ║');
  console.log('║  Narrative-driven investigation with graphs and analysis      ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  
  basicInvestigationExample();
  palantirStyleExample();
  visualizationExample();
  heatmapExample();
  barChartExample();
  completeInvestigationExample();
  
  console.log('\n✨ All examples completed!\n');
}

module.exports = {
  veronicaAnalysisExample,
  basicInvestigationExample,
  palantirStyleExample,
  visualizationExample,
  heatmapExample,
  barChartExample,
  completeInvestigationExample
};
