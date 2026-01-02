# Veronica Analysis - Quick Reference

## Installation
```javascript
const { VeronicaAnalysis, PlotGenerator } = require('reality-simulation-code');
```

## Quick Start
```javascript
const analysis = new VeronicaAnalysis({ narrator: 'Veronica Mars' });

analysis
  .loadDataset(data, { name: 'Case #47' })
  .theDeed('In dataset here is what happened: ...')
  .theHappening('In dataset here something happened: ...')
  .theX('variable_name')
  .theY('another_variable')
  .addFinding('Discovery found', { confidence: 0.85 })
  .theGlory('Breakthrough achieved!');

console.log(analysis.generateReport('narrative'));
```

## Narrative Structure

| Method | Purpose | Example |
|--------|---------|---------|
| `theDeed()` | What happened in dataset | "Laptop theft at school" |
| `theHappening()` | Specific event | "Three suspects identified" |
| `theX()` | First dimension | "alibi_strength" |
| `theY()` | Second dimension | "motive_level" |
| `theZ()` | Third dimension (depth) | "opportunity" |
| `theGlory()` | Breakthrough/revelation | "Case solved!" |
| `addFinding()` | Individual discovery | "Suspect A weak alibi" |

## Visualizations

```javascript
// Line plot
analysis.generatePlot('line', { title: 'Trend', xLabel: 'Time', yLabel: 'Value' });

// Scatter plot
analysis.generatePlot('scatter', { title: 'Correlation' });

// Bar chart
const plotter = new PlotGenerator();
plotter.generateBarChart([10, 20, 30], { title: 'Comparison' });

// Histogram
plotter.generateHistogram([1,2,2,3,3,3], { bins: 5 });

// Heatmap
plotter.generateHeatmap({ matrix: [[1,2],[3,4]] });
```

## Report Formats

```javascript
analysis.generateReport('narrative');   // Veronica Mars style
analysis.generateReport('palantir');    // Palantir Foundry style
analysis.generateReport('technical');   // JSON output
analysis.generateReport('executive');   // Summary
```

## Analysis Methods

```javascript
// Correlation
analysis.analyzeCorrelation('var1', 'var2');

// Trend
analysis.analyzeTrend('variable', 'linear');

// Dataset stats
analysis.dataset.stats  // { count, mean, median, stdDev, min, max }
```

## Integration with BAES

```javascript
const { BAESSystem } = require('reality-simulation-code').AnonymousPackage;
const baes = new BAESSystem({ maxopt: true });

// Discover patterns
const discoveries = baes.discover(data, 'circlejerk');

// Feed into Veronica Analysis
discoveries.forEach(d => {
  analysis.addFinding(`Pattern: ${d.pattern}`, { confidence: 0.85 });
});
```

## Integration with ETL

```javascript
const { etl } = require('reality-simulation-code').AnonymousPackage;

const processed = etl(
  data => data.filter(x => x > 0),  // Extract
  data => data.map(x => x * 2),     // Transform
  data => data                       // Load
)(rawData);

analysis.loadDataset(processed);
```

## Integration with Polypipes

```javascript
const { polypipes } = require('reality-simulation-code').AnonymousPackage;

const results = polypipes(
  [data => data.map(x => x.ctr)],
  [data => data.map(x => x.conversion)]
)(campaignData);

// Analyze both pipelines
results.forEach((result, idx) => {
  analysis.addFinding(`Pipeline ${idx} completed`, { confidence: 0.9 });
});
```

## Common Use Cases

### Investigation
```javascript
analysis
  .theDeed('Crime data shows pattern')
  .theHappening('Spike detected in November')
  .theX('time')
  .theY('incidents')
  .addFinding('46% reduction observed')
  .theGlory('Patrol strategy effective!');
```

### Business Intelligence
```javascript
analysis
  .theDeed('Q4 sales analysis')
  .theHappening('Growth acceleration detected')
  .theX('week')
  .theY('revenue')
  .analyzeTrend('revenue', 'linear')
  .theGlory('292% growth achieved!');
```

### Security/Fraud
```javascript
analysis
  .theDeed('Transaction monitoring')
  .theHappening('High fraud scores detected')
  .theX('amount')
  .theY('fraud_score')
  .addFinding('2 high-risk transactions')
  .theGlory('Account compromise prevented!');
```

## Demos

```bash
# Main demo - 4 complete examples
npm run demo:veronica

# Integration examples - BAES, ETL, Polypipes
node demo-veronica-integration.js

# Run tests
npm run test:veronica
```

## Options

```javascript
new VeronicaAnalysis({
  narrator: 'Veronica Mars',  // Narrator name
  style: 'mars',              // 'mars' or 'law-order'
  verbose: true,              // Enable logging
  includeGraphs: true         // Include visualizations
});

new PlotGenerator({
  width: 60,                  // Plot width
  height: 20,                 // Plot height
  includeAxis: true,          // Show axes
  includeLabels: true         // Show labels
});
```

## Tips

1. **Load dataset first**: Always call `loadDataset()` before analysis
2. **Build narrative**: Use methods in order for best storytelling
3. **Add confidence**: Include confidence levels in findings
4. **Choose format**: Use appropriate report format for audience
5. **Combine tools**: Integrate with BAES for powerful analysis

## Documentation

- Module README: `lib/veronica-analysis/README.md`
- Implementation Summary: `VERONICA_ANALYSIS_SUMMARY.md`
- Main README: Search for "Veronica Analysis Usage"
- Examples: `lib/veronica-analysis/examples.js`

---

**"In dataset here is what happened..."** 🔍
