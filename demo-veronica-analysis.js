#!/usr/bin/env node

/**
 * Demo: Veronica Mars x Law & Order Style Data Analysis
 * 
 * This demo showcases the narrative-driven data analysis framework
 * featuring graphs, plots, and structured investigation tools.
 * Perfect for Palantir-style intelligence analysis.
 */

const {
  VeronicaAnalysis,
  PlotGenerator,
  veronicaAnalysisExample
} = require('./index.js');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   Veronica Mars x Law & Order Style Data Analysis Demo      ║');
console.log('║   Narrative-driven investigation with graphs and plots       ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');
console.log('');

// ============================================================================
// Demo 1: The Neptune High Laptop Case
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Demo 1: The Neptune High Laptop Case                        │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

const investigation = new VeronicaAnalysis({
  narrator: 'Veronica Mars',
  style: 'mars',
  verbose: true
});

// Case data: suspect profiles
const suspects = [
  { id: 'A', alibi_strength: 0.3, motive: 0.8, opportunity: 0.9 },
  { id: 'B', alibi_strength: 0.9, motive: 0.2, opportunity: 0.4 },
  { id: 'C', alibi_strength: 0.5, motive: 0.7, opportunity: 0.6 }
];

investigation.loadDataset(suspects, {
  name: 'Neptune High Laptop Theft - Case #47',
  source: 'Mars Investigations',
  date: '2026-01-02',
  caseType: 'theft'
});

// Build the investigation narrative
investigation
  .theDeed(
    'In dataset here is what happened: A laptop containing sensitive student records went missing from the principal\'s office during lunch period',
    { location: 'Neptune High - Principal\'s Office', time: '12:30 PM' }
  )
  .theHappening(
    'In dataset here something happened: Security footage analysis reveals three students were in the vicinity during the critical time window',
    { footage_quality: 'medium', timestamp_accuracy: 'high', witnesses: 2 }
  )
  .theX('alibi_strength', { description: 'Strength of alibi evidence (0-1 scale)' })
  .theY('motive', { description: 'Assessed motive level based on investigation (0-1 scale)' })
  .theZ('opportunity', { description: 'Access and opportunity to commit theft (0-1 scale)' });

// Add investigative findings
investigation.addFinding(
  'Suspect A: Weak alibi (claims to be in library, no witnesses), strong motive (failing grade dispute with principal)',
  { confidence: 0.85, priority: 'high' }
);

investigation.addFinding(
  'Suspect B: Strong alibi (verified in cafeteria with multiple witnesses), weak motive',
  { confidence: 0.92, priority: 'low' }
);

investigation.addFinding(
  'Suspect C: Moderate alibi (claims hallway encounter, one partial witness), moderate motive (disciplinary record)',
  { confidence: 0.75, priority: 'medium' }
);

// Correlation analysis
investigation.analyzeCorrelation('motive', 'opportunity');

// The breakthrough
investigation.theGlory(
  'BREAKTHROUGH: Cross-referencing social media activity reveals Suspect A posted about "access to valuable data" 30 minutes after the theft. Search warrant executed on locker - laptop recovered!',
  { 
    case_status: 'SOLVED',
    conviction_confidence: 0.95,
    evidence_strength: 'conclusive',
    recovery: 'successful'
  }
);

// Generate the investigation report
const report = investigation.generateReport('narrative');
console.log(report);

// ============================================================================
// Demo 2: Financial Analytics - Palantir Style
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Demo 2: Q4 Financial Intelligence Analysis                  │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

const financialAnalysis = new VeronicaAnalysis({
  narrator: 'Intelligence Analyst',
  verbose: false
});

// Q4 transaction volume data
const transactions = [
  120, 135, 145, 155, 170, 190, 210, 225, 240, 260,
  275, 290, 310, 330, 350, 370, 395, 420, 445, 470
];

financialAnalysis.loadDataset(transactions, {
  name: 'Q4 2025 Transaction Volume Analysis',
  source: 'Enterprise Financial Database',
  period: 'October 1 - December 20, 2025',
  classification: 'CONFIDENTIAL'
});

financialAnalysis
  .theDeed(
    'In dataset here is what happened: Comprehensive analysis of Q4 transaction volumes shows consistent growth trajectory'
  )
  .theHappening(
    'In dataset here something happened: Notable acceleration in transaction velocity observed starting Week 6 (mid-November)'
  )
  .theX('time_period')
  .theY('transaction_volume')
  .analyzeTrend('transaction_volume', 'linear');

// Generate visualization
console.log('📊 Generating transaction trend visualization...\n');
const transactionPlot = financialAnalysis.generatePlot('line', {
  title: 'Q4 Transaction Volume Trend',
  xLabel: 'Week',
  yLabel: 'Volume'
});
console.log(transactionPlot);
console.log('');

financialAnalysis
  .addFinding(
    'Transaction volume increased 291.7% over 20-week period',
    { confidence: 0.98, verified: true }
  )
  .addFinding(
    'Growth acceleration correlates with new marketing campaign launch',
    { confidence: 0.87, correlation: 0.89 }
  )
  .theGlory(
    'INTELLIGENCE FINDING: Sustained growth pattern indicates successful market penetration. Projected Q1 2026 volume: 550+ transactions/week. Recommend continuing current strategy.',
    { 
      projection_confidence: 0.92,
      recommendation: 'CONTINUE_AND_SCALE',
      business_impact: 'HIGH_POSITIVE'
    }
  );

const palantirReport = financialAnalysis.generateReport('palantir');
console.log(palantirReport);

// ============================================================================
// Demo 3: Crime Pattern Analysis with Visualizations
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Demo 3: Neptune Crime Pattern Analysis                      │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

const crimeAnalysis = new VeronicaAnalysis({
  narrator: 'Sheriff Lamb',
  verbose: false
});

// Weekly crime incident data
const crimeIncidents = [
  15, 18, 16, 21, 24, 26, 23, 20, 18, 15,
  14, 12, 11, 10, 12, 13, 11, 9, 8, 10
];

crimeAnalysis.loadDataset(crimeIncidents, {
  name: 'Neptune County Crime Statistics',
  source: 'Sheriff\'s Department',
  timeframe: '20 weeks (Sep-Jan)',
  jurisdiction: 'Neptune County'
});

crimeAnalysis
  .theDeed('In dataset here is what happened: Neptune County experienced varying crime rates over 20-week observation period')
  .theHappening('In dataset here something happened: Significant downward trend emerged after Week 6, coinciding with enhanced patrol deployment')
  .theX('week_number')
  .theY('crime_incidents')
  .analyzeTrend('crime_incidents', 'linear');

// Generate crime trend plot
console.log('📉 Crime Rate Trend Analysis...\n');
const crimePlot = crimeAnalysis.generatePlot('line', {
  title: 'Weekly Crime Incidents',
  xLabel: 'Week',
  yLabel: 'Incidents'
});
console.log(crimePlot);
console.log('');

// Generate bar chart for comparison
const plotter = new PlotGenerator({ width: 50, height: 12 });
const weeklyComparison = [15, 18, 26, 11, 9]; // Sample weeks
console.log('📊 Selected Week Comparison...\n');
const barChart = plotter.generateBarChart(weeklyComparison, {
  title: 'Crime Incidents - Selected Weeks'
});
console.log(barChart);
console.log('Week Labels: 1=Week1, 2=Week3, 3=Week6(peak), 4=Week15, 5=Week19\n');

crimeAnalysis
  .addFinding(
    'Crime rate decreased 46.7% from peak (Week 6: 26 incidents) to recent low (Week 19: 8 incidents)',
    { confidence: 0.98, statistical_significance: 'high' }
  )
  .addFinding(
    'Enhanced patrol strategy shows clear correlation with crime reduction',
    { confidence: 0.89, correlation_coefficient: -0.87 }
  )
  .theGlory(
    'OPERATIONAL SUCCESS: Enhanced patrol deployment demonstrably effective. Crime rate at 5-month low. Recommend maintaining current resource allocation and patrol patterns.',
    { 
      effectiveness_score: 0.92,
      recommendation: 'MAINTAIN_STRATEGY',
      public_safety_impact: 'SIGNIFICANT_IMPROVEMENT'
    }
  );

console.log(crimeAnalysis.generateReport('narrative'));

// ============================================================================
// Demo 4: Relationship Heatmap Analysis
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Demo 4: Social Network Relationship Analysis                │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

// Relationship strength matrix between suspects
const relationshipMatrix = [
  [1.0, 0.3, 0.7, 0.2, 0.5],
  [0.3, 1.0, 0.9, 0.4, 0.3],
  [0.7, 0.9, 1.0, 0.6, 0.4],
  [0.2, 0.4, 0.6, 1.0, 0.8],
  [0.5, 0.3, 0.4, 0.8, 1.0]
];

console.log('🕸️  Social Relationship Heatmap (5x5 network)...\n');
const heatmap = plotter.generateHeatmap({ matrix: relationshipMatrix }, {
  title: 'Suspect Relationship Matrix'
});
console.log(heatmap);
console.log('\nLegend: █ = Strong (1.0-0.8), ▓ = Medium (0.7-0.5), ▒ = Weak (0.4-0.3), ░ = Very Weak (0.2+)');
console.log('Matrix: Persons A-E (rows & columns)\n');

const networkAnalysis = new VeronicaAnalysis({
  narrator: 'Veronica',
  verbose: false
});

networkAnalysis
  .theDeed('In dataset here is what happened: Social network analysis of five persons of interest reveals complex relationship web')
  .theHappening('In dataset here something happened: Strong cluster identified between Persons B, C, and D (relationship strength >0.6)')
  .addFinding('Person B and C show strongest connection (0.9) - likely close associates', { confidence: 0.95 })
  .addFinding('Person D and E also strongly connected (0.8) - secondary cluster', { confidence: 0.92 })
  .addFinding('Person A maintains moderate connections across network - possible coordinator role', { confidence: 0.78 })
  .theGlory('NETWORK INSIGHT: B-C-D cluster represents primary group of interest. Person A\'s distributed connections suggest potential central coordination role. Recommend focused surveillance on B-C-D cluster with monitoring of A\'s activities.');

console.log(networkAnalysis.generateReport('palantir'));

// ============================================================================
// Finale
// ============================================================================

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║                  All Demos Complete! ✨                       ║');
console.log('║                                                               ║');
console.log('║  Veronica Mars x Law & Order Style Data Analysis              ║');
console.log('║  • Narrative-driven investigations                            ║');
console.log('║  • Professional visualizations                                ║');
console.log('║  • Multiple report formats                                    ║');
console.log('║  • Perfect for Palantir-style analysis                        ║');
console.log('║                                                               ║');
console.log('║  "In dataset here is what happened..." - xaoex, 2026         ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
