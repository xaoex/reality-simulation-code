# Veronica Analysis

**Veronica Mars x Law & Order Style Data Analysis Framework**

A narrative-driven data investigation system featuring graphs, plots, and structured analysis tools. Perfect for working at companies like Palantir or conducting investigative data analysis with style.

## Overview

The Veronica Analysis module provides a unique approach to data analysis by combining:

- **Narrative Structure**: Tell the story of your data investigation
- **Structured Analysis**: The Deed, The Happening, The X/Y/Z, The Glory, Findings
- **Visualizations**: ASCII art plots, graphs, and charts for CLI display
- **Multiple Report Styles**: Narrative, Technical, Executive, and Palantir-style reports

## Features

- 🔍 **Narrative-Driven Analysis**: Veronica Mars-style investigation narration
- 📊 **Data Visualization**: Line plots, scatter plots, bar charts, histograms, heatmaps
- 🎯 **Structured Framework**: Organized analysis sections (Deed, Happening, X/Y/Z, Glory, Findings)
- 📈 **Statistical Analysis**: Correlation analysis, trend detection, basic statistics
- 🎨 **Multiple Report Formats**: Narrative, Technical, Executive, Palantir-style
- 💬 **Narrator System**: Customizable narrator for personalized analysis

## Installation

```javascript
const { VeronicaAnalysis } = require('reality-simulation-code');
// or
const VeronicaAnalysis = require('./lib/veronica-analysis');
```

## Quick Start

```javascript
const { VeronicaAnalysis } = require('./veronica-analysis');

// Create analysis instance
const analysis = new VeronicaAnalysis({
  narrator: 'Veronica Mars',
  style: 'mars',
  verbose: true
});

// Load your dataset
analysis.loadDataset([10, 20, 30, 40, 50], {
  name: 'Sample Investigation',
  source: 'Mars Investigations'
});

// Structure your investigation
analysis
  .theDeed('In dataset here is what happened: Sales figures over 5 months')
  .theHappening('In dataset here something happened: Steady growth detected')
  .theX('month')
  .theY('sales_amount')
  .theGlory('Business is growing at 25% monthly rate!');

// Generate report
console.log(analysis.generateReport('narrative'));
```

## Core Concepts

### The Structure

Every Veronica Analysis follows this narrative structure:

1. **The Deed**: What happened in the dataset
2. **The Happening**: Something specific that occurred
3. **The X/Y/Z**: Dimensions of analysis (variables, axes)
4. **The Glory**: The breakthrough or revelation
5. **Findings**: Individual discoveries with confidence levels

### Example Investigation

```javascript
const analysis = new VeronicaAnalysis({
  narrator: 'Veronica Mars'
});

// Load suspect data
const suspects = [
  { name: 'Suspect A', alibi_strength: 0.3, motive: 0.8 },
  { name: 'Suspect B', alibi_strength: 0.9, motive: 0.2 },
  { name: 'Suspect C', alibi_strength: 0.5, motive: 0.7 }
];

analysis.loadDataset(suspects, {
  name: 'Neptune High Case #47',
  source: 'Mars Investigations'
});

// Build the narrative
analysis
  .theDeed(
    'A laptop went missing from the principal\'s office',
    { location: 'Neptune High', time: '2:30 PM' }
  )
  .theHappening(
    'Security footage shows three students near the office',
    { footage_quality: 'grainy' }
  )
  .theX('alibi_strength')
  .theY('motive')
  .addFinding('Suspect A has weak alibi but strong motive', { confidence: 0.85 })
  .theGlory('Social media posts reveal Suspect A posted about the laptop minutes after it went missing!');

// Generate report
const report = analysis.generateReport('narrative');
console.log(report);
```

## Visualizations

### Line Plot

```javascript
const crimeData = [12, 15, 13, 18, 20, 22, 19, 17, 16, 14];

analysis.loadDataset(crimeData, {
  name: 'Crime Rate Analysis'
});

const plot = analysis.generatePlot('line', {
  title: 'Crime Rate Trend',
  xLabel: 'Week',
  yLabel: 'Incidents'
});

console.log(plot);
```

Output:
```
╔══════════════════════════════════════════════════════════════╗
║ Crime Rate Trend                                             ║
╠══════════════════════════════════════════════════════════════╣
║ ●                     ●                                      ║
║ ·●                   · ●                                     ║
║  ·●                 ·   ●                                    ║
║   ·●               ·     ●                                   ║
║    ·●●           ●·       ●                                  ║
║       ·●       ·           ●                                 ║
║         ●     ●             ●                                ║
║          ·●·●                ●●                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Bar Chart

```javascript
const { PlotGenerator } = require('./plot-generator');

const plotter = new PlotGenerator();
const performance = [85, 92, 78, 95, 88, 90];

const chart = plotter.generateBarChart(performance, {
  title: 'Department Performance'
});

console.log(chart);
```

### Heatmap

```javascript
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
```

## Report Styles

### Narrative Style (Veronica Mars)

```javascript
const report = analysis.generateReport('narrative');
```

Output:
```
╔═══════════════════════════════════════════════════════════════╗
║        CASE ANALYSIS - VERONICA MARS STYLE                    ║
╚═══════════════════════════════════════════════════════════════╝

📊 Dataset: Neptune High Case #47
   Source: Mars Investigations
   Records: 3

🔍 THE DEED
─────────────────────────────────────────────────────────────
   "A laptop went missing from the principal's office"
   - Narrator: Veronica Mars

⚡ THE HAPPENING
─────────────────────────────────────────────────────────────
   "Security footage shows three students near the office"
   
🎯 FINDINGS
─────────────────────────────────────────────────────────────
   1. Suspect A has weak alibi but strong motive
      Confidence: 85%
```

### Palantir Style

```javascript
const report = analysis.generateReport('palantir');
```

Output:
```
╔═══════════════════════════════════════════════════════════════╗
║           PALANTIR FOUNDRY - DATA ANALYSIS REPORT             ║
╚═══════════════════════════════════════════════════════════════╝

┌─ INVESTIGATION OVERVIEW ──────────────────────────────────┐
│ Initial Assessment:
│   Analyzing transaction patterns for Q4 2025
│ Key Event:
│   Significant uptick detected in November
└───────────────────────────────────────────────────────────┘

┌─ DATA DIMENSIONS ─────────────────────────────────────────┐
│ X-Axis: time_period
│ Y-Axis: transaction_amount
└───────────────────────────────────────────────────────────┘

┌─ INTELLIGENCE FINDINGS ───────────────────────────────────┐
│ [92%] Strong positive correlation indicates healthy growth
└───────────────────────────────────────────────────────────┘
```

## API Reference

### VeronicaAnalysis

#### Constructor

```javascript
new VeronicaAnalysis(options)
```

Options:
- `narrator`: String - Name of the narrator (default: 'Veronica')
- `style`: String - Analysis style: 'mars' or 'law-order' (default: 'mars')
- `verbose`: Boolean - Enable verbose logging (default: true)
- `includeGraphs`: Boolean - Include graphs in reports (default: true)

#### Methods

**loadDataset(data, metadata)**
- Load dataset for analysis
- `data`: Array - Your data (numbers, objects, etc.)
- `metadata`: Object - Dataset metadata (name, source, etc.)

**theDeed(description, context)**
- Define what happened in the dataset
- `description`: String - The deed description
- `context`: Object - Additional context

**theHappening(event, details)**
- Define a specific event that occurred
- `event`: String - Event description
- `details`: Object - Event details

**theX(variable, analysis)**
**theY(variable, analysis)**
**theZ(variable, analysis)**
- Define dimensions of analysis
- `variable`: String - Variable name
- `analysis`: Object - Analysis details

**theGlory(revelation, impact)**
- Define the breakthrough or revelation
- `revelation`: String - The discovery
- `impact`: Object - Impact assessment

**addFinding(finding, evidence)**
- Add a finding to the analysis
- `finding`: String - Finding description
- `evidence`: Object - Supporting evidence (include `confidence` level)

**generatePlot(type, options)**
- Generate visualization
- `type`: String - 'line', 'scatter', 'bar', 'histogram', 'heatmap'
- `options`: Object - Plot options (title, xLabel, yLabel, etc.)

**analyzeCorrelation(var1, var2)**
- Analyze correlation between variables
- Returns correlation finding

**analyzeTrend(variable, method)**
- Analyze trend for variable
- `method`: String - 'linear', etc.
- Returns trend finding

**generateReport(format)**
- Generate analysis report
- `format`: String - 'narrative', 'technical', 'executive', 'palantir'
- Returns formatted report string

### PlotGenerator

#### Constructor

```javascript
new PlotGenerator(options)
```

Options:
- `width`: Number - Plot width (default: 60)
- `height`: Number - Plot height (default: 20)
- `includeAxis`: Boolean - Include axes (default: true)
- `includeLabels`: Boolean - Include labels (default: true)

#### Methods

**generate(data, type, options)**
- Generate any type of plot
- `data`: Object/Array - Plot data
- `type`: String - Plot type
- `options`: Object - Plot options

**generateLinePlot(data, options)**
**generateScatterPlot(data, options)**
**generateBarChart(data, options)**
**generateHistogram(data, options)**
**generateHeatmap(data, options)**
- Generate specific plot types

## Examples

See `examples.js` for complete examples including:

1. Basic Investigation Analysis
2. Palantir-Style Data Analysis
3. Data Visualization with Plots
4. Multi-Dimensional Heatmap Analysis
5. Bar Chart Comparison
6. Complete Investigation Flow

Run examples:
```bash
node lib/veronica-analysis/examples.js
```

## Use Cases

### Perfect For

- **Data Investigation**: Detective-style data analysis
- **Business Intelligence**: Narrative-driven business insights
- **Security Analysis**: Threat investigation and analysis
- **Research**: Academic or scientific data exploration
- **Reporting**: Executive summaries with storytelling
- **Education**: Teaching data analysis concepts

### Companies

Works great for:
- Palantir-style intelligence analysis
- Consulting firms (McKinsey, BCG, etc.)
- Security companies
- Research institutions
- Data journalism

## Integration with BAES

The Veronica Analysis module integrates seamlessly with the BAES (Bayesian Analysis and Exploration System):

```javascript
const { VeronicaAnalysis } = require('./veronica-analysis');
const { BAESSystem } = require('../.baes/lib/baes-system');

const analysis = new VeronicaAnalysis();
const baes = new BAESSystem({ maxopt: true });

// Use BAES for pattern discovery
const discoveries = baes.discover(yourData, 'circlejerk');

// Feed discoveries into Veronica Analysis
discoveries.forEach(discovery => {
  analysis.addFinding(
    `Pattern discovered: ${discovery.pattern}`,
    { confidence: 0.8, data: discovery }
  );
});
```

## Contributing

This module is part of the Reality Simulation Code package. For contributions, see the main repository.

## License

XPSL-1.0

## Author

xaoex
- https://linktr.ee/xaoex
- https://linktr.ee/oktays

---

**"In dataset here is what happened"** - The investigation begins...
