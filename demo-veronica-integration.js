#!/usr/bin/env node

/**
 * Integration Example: Veronica Analysis + BAES System
 * 
 * Demonstrates how to use Veronica Analysis with the BAES (Bayesian Analysis
 * and Exploration System) for advanced pattern discovery and data analysis.
 */

const {
  VeronicaAnalysis,
  AnonymousPackage
} = require('./index.js');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║     Veronica Analysis + BAES Integration Example             ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');
console.log('');

// ============================================================================
// Example 1: Using BAES for Pattern Discovery
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Example 1: BAES Pattern Discovery + Veronica Analysis       │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

// Initialize BAES for pattern discovery
if (AnonymousPackage && AnonymousPackage.BAESSystem) {
  const baes = new AnonymousPackage.BAESSystem({ maxopt: true, verbose: false });
  
  // Sample data: customer behavior patterns
  const customerData = [
    { id: 1, purchases: 5, engagement: 0.7, satisfaction: 0.8 },
    { id: 2, purchases: 12, engagement: 0.9, satisfaction: 0.95 },
    { id: 3, purchases: 3, engagement: 0.4, satisfaction: 0.5 },
    { id: 4, purchases: 8, engagement: 0.75, satisfaction: 0.85 }
  ];
  
  // Use BAES to discover patterns
  const discoveries = baes.discover(customerData, 'circlejerk');
  
  console.log('📊 BAES Pattern Discovery Results:');
  discoveries.forEach((discovery, idx) => {
    console.log(`   Iteration ${discovery.iteration}: ${discovery.pattern}`);
  });
  console.log('');
  
  // Now use Veronica Analysis for investigation
  const analysis = new VeronicaAnalysis({
    narrator: 'Business Analyst',
    verbose: false
  });
  
  analysis.loadDataset(customerData, {
    name: 'Customer Behavior Analysis Q4 2025',
    source: 'CRM System + BAES Discovery'
  });
  
  analysis
    .theDeed('In dataset here is what happened: Customer behavior analysis reveals distinct patterns across engagement levels')
    .theHappening('In dataset here something happened: BAES pattern discovery identified three iterations of behavioral clustering');
  
  // Add findings from BAES discoveries
  discoveries.forEach(discovery => {
    analysis.addFinding(
      `BAES Discovery: ${discovery.pattern} with maximized data`,
      { confidence: 0.85, source: 'BAES', iteration: discovery.iteration }
    );
  });
  
  // Use BAES maximize function for additional insights
  const engagementScores = customerData.map(c => c.engagement);
  const maximizedEngagement = baes.maximize(engagementScores);
  
  analysis.addFinding(
    `Maximized engagement scores show potential ceiling at ${Math.max(...maximizedEngagement).toFixed(2)}`,
    { confidence: 0.92, method: 'BAES maximize' }
  );
  
  analysis
    .theX('customer_engagement')
    .theY('purchase_frequency')
    .theZ('satisfaction_rating')
    .theGlory(
      'BUSINESS INTELLIGENCE: High correlation between engagement and satisfaction. BAES-discovered patterns suggest targeting medium-engagement customers (0.4-0.7 range) for conversion optimization.'
    );
  
  console.log(analysis.generateReport('palantir'));
  console.log('');
}

// ============================================================================
// Example 2: ETL Pipeline + Veronica Analysis
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Example 2: ETL Pipeline + Veronica Analysis                 │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

if (AnonymousPackage) {
  const { etl } = AnonymousPackage;
  
  // Raw transaction data
  const rawTransactions = [
    { amount: 100, status: 'completed', fraud_score: 0.1 },
    { amount: 250, status: 'completed', fraud_score: 0.05 },
    { amount: 5000, status: 'pending', fraud_score: 0.8 },
    { amount: 75, status: 'completed', fraud_score: 0.15 },
    { amount: 3000, status: 'flagged', fraud_score: 0.9 },
    { amount: 150, status: 'completed', fraud_score: 0.08 }
  ];
  
  // ETL pipeline to extract suspicious transactions
  const suspiciousTransactions = etl(
    // Extract: filter high fraud scores
    data => data.filter(t => t.fraud_score > 0.5),
    // Transform: add risk level
    data => data.map(t => ({
      ...t,
      risk_level: t.fraud_score > 0.8 ? 'HIGH' : 'MEDIUM'
    })),
    // Load: return processed data
    data => data
  )(rawTransactions);
  
  console.log('🔄 ETL Pipeline Results:');
  console.log(`   Found ${suspiciousTransactions.length} suspicious transactions`);
  suspiciousTransactions.forEach(t => {
    console.log(`   - $${t.amount} (${t.status}) - Risk: ${t.risk_level} (${(t.fraud_score * 100).toFixed(0)}%)`);
  });
  console.log('');
  
  // Analyze with Veronica
  const fraudAnalysis = new VeronicaAnalysis({
    narrator: 'Fraud Investigator',
    verbose: false
  });
  
  fraudAnalysis.loadDataset(rawTransactions, {
    name: 'Transaction Fraud Analysis',
    source: 'Payment Gateway + ETL Pipeline',
    period: 'Last 24 hours'
  });
  
  fraudAnalysis
    .theDeed('In dataset here is what happened: Routine transaction monitoring detected multiple high-risk indicators')
    .theHappening('In dataset here something happened: ETL pipeline identified 2 flagged transactions with fraud scores >50%')
    .theX('transaction_amount')
    .theY('fraud_score')
    .theZ('transaction_status');
  
  suspiciousTransactions.forEach(t => {
    fraudAnalysis.addFinding(
      `${t.risk_level} RISK: $${t.amount} transaction (${t.status}) - fraud score: ${(t.fraud_score * 100).toFixed(0)}%`,
      { confidence: t.fraud_score, priority: t.risk_level }
    );
  });
  
  fraudAnalysis.theGlory(
    'SECURITY ALERT: Two high-risk transactions identified. Recommend immediate account review and transaction hold. Pattern suggests potential account compromise.'
  );
  
  console.log(fraudAnalysis.generateReport('narrative'));
  console.log('');
}

// ============================================================================
// Example 3: Polypipes + Multi-dimensional Analysis
// ============================================================================

console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ Example 3: Polypipes + Multi-dimensional Analysis           │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('');

if (AnonymousPackage) {
  const { polypipes } = AnonymousPackage;
  
  // Marketing campaign data
  const campaignMetrics = [
    { campaign: 'Email', impressions: 10000, clicks: 500, conversions: 50 },
    { campaign: 'Social', impressions: 25000, clicks: 1250, conversions: 125 },
    { campaign: 'Search', impressions: 15000, clicks: 900, conversions: 90 }
  ];
  
  // Use polypipes to analyze different metrics in parallel
  const results = polypipes(
    // Pipeline 1: Calculate CTR (Click-Through Rate)
    [data => data.map(c => ({
      campaign: c.campaign,
      ctr: (c.clicks / c.impressions * 100).toFixed(2)
    }))],
    // Pipeline 2: Calculate conversion rate
    [data => data.map(c => ({
      campaign: c.campaign,
      conversion_rate: (c.conversions / c.clicks * 100).toFixed(2)
    }))]
  )(campaignMetrics);
  
  console.log('📊 Polypipes Analysis Results:');
  console.log('   CTR Analysis:');
  results[0].forEach(r => console.log(`   - ${r.campaign}: ${r.ctr}%`));
  console.log('   Conversion Rate Analysis:');
  results[1].forEach(r => console.log(`   - ${r.campaign}: ${r.conversion_rate}%`));
  console.log('');
  
  // Veronica Analysis for campaign performance
  const campaignAnalysis = new VeronicaAnalysis({
    narrator: 'Marketing Analyst',
    verbose: false
  });
  
  campaignAnalysis.loadDataset(campaignMetrics, {
    name: 'Q4 Marketing Campaign Performance',
    source: 'Marketing Analytics Platform + Polypipes Analysis'
  });
  
  campaignAnalysis
    .theDeed('In dataset here is what happened: Three marketing channels analyzed across impression, click, and conversion metrics')
    .theHappening('In dataset here something happened: Polypipes parallel analysis revealed different performance characteristics per channel')
    .theX('campaign_channel')
    .theY('conversion_rate')
    .theZ('cost_per_acquisition');
  
  // Add findings from polypipes analysis
  results[0].forEach(ctr => {
    const conv = results[1].find(c => c.campaign === ctr.campaign);
    campaignAnalysis.addFinding(
      `${ctr.campaign}: CTR ${ctr.ctr}%, Conversion ${conv.conversion_rate}%`,
      { confidence: 0.95 }
    );
  });
  
  campaignAnalysis.theGlory(
    'MARKETING INSIGHT: Social media shows highest total conversions (125) despite lower conversion rate. Email shows strongest conversion rate (10%) but lower volume. Recommend: Scale social budget while optimizing email targeting.'
  );
  
  console.log(campaignAnalysis.generateReport('palantir'));
}

// ============================================================================
// Finale
// ============================================================================

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║         Integration Examples Complete! ✨                     ║');
console.log('║                                                               ║');
console.log('║  Veronica Analysis seamlessly integrates with:                ║');
console.log('║  • BAES - Pattern discovery and maximization                  ║');
console.log('║  • ETL - Data transformation pipelines                        ║');
console.log('║  • Polypipes - Parallel analysis workflows                    ║');
console.log('║                                                               ║');
console.log('║  Perfect for enterprise data intelligence work!               ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
