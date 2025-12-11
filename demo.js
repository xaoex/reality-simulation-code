#!/usr/bin/env node

/**
 * Demo: Yoshi's Secret + Bae Mathematics + God Generator
 * 
 * This demo showcases the new features inspired by childhood curiosity,
 * data exploration, and the journey of learning.
 */

const {
  YoshisSecret,
  BaeMathematics,
  GodGenerator,
  yoshisSecretExample,
  baeMathematicsExample,
  godGeneratorExample
} = require('./index.js');

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║   Yoshi\'s Secret + Bae Mathematics + God Generator Demo      ║');
console.log('║   From Childhood Curiosity to Advanced Mathematics           ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');

// ============================================================================
// Part 1: Yoshi's Secret - Encoding the Journey
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 1: Yoshi\'s Secret - Cryptographic Encoding             │');
console.log('└─────────────────────────────────────────────────────────────┘');

const secret = new YoshisSecret(31337);

// Encode a message from youth
const journeyMessage = "Young, curious, digging into data, learning...";
console.log(`\n📝 Original Message: "${journeyMessage}"`);

const encoded = secret.encodeString(journeyMessage);
console.log(`🔒 Encoded (first 10 values): [${encoded.slice(0, 10).join(', ')}...]`);

const decoded = secret.decodeString(encoded);
console.log(`🔓 Decoded Message: "${decoded}"`);
console.log(`✓ Encoding/Decoding successful: ${journeyMessage === decoded}`);

// Generate a hash
const messageHash = secret.hash(journeyMessage);
console.log(`\n🔐 Cryptographic Hash: ${messageHash}`);

// Demonstrate number encoding
console.log('\n📊 Number Encoding:');
const year = 1993;
const encodedYear = secret.encode(year);
const decodedYear = secret.decode(encodedYear);
console.log(`   Original: ${year}`);
console.log(`   Encoded: ${encodedYear}`);
console.log(`   Decoded: ${decodedYear}`);

// ============================================================================
// Part 2: Bae Mathematics - Relationships & Connections
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 2: Bae Mathematics - Modeling Relationships            │');
console.log('└─────────────────────────────────────────────────────────────┘');

const bae = new BaeMathematics();

// Create entities representing the journey
console.log('\n👤 Creating entities:');
bae.addEntity('young_self', { age: 'youth' });
bae.addEntity('curiosity', { type: 'passion' });
bae.addEntity('data', { domain: 'knowledge' });
bae.addEntity('learning', { process: 'growth' });
bae.addEntity('mathematics', { field: 'abstract' });

const entities = ['young_self', 'curiosity', 'data', 'learning', 'mathematics'];
console.log(`   Created ${entities.length} entities: ${entities.join(', ')}`);

// Create relationships
console.log('\n🔗 Creating relationships:');
bae.connect('young_self', 'curiosity', 1.0);    // Perfect connection
bae.connect('curiosity', 'data', 0.95);         // Very strong
bae.connect('data', 'learning', 0.90);          // Strong
bae.connect('learning', 'mathematics', 0.85);   // Strong
bae.connect('young_self', 'mathematics', 0.5);  // Growing connection

console.log('   young_self ←→ curiosity: 1.0 (Perfect)');
console.log('   curiosity ←→ data: 0.95 (Very Strong)');
console.log('   data ←→ learning: 0.90 (Strong)');
console.log('   learning ←→ mathematics: 0.85 (Strong)');

// Find bae (strongest connection)
console.log('\n💕 Finding strongest connections (Bae):');
for (const entity of ['young_self', 'curiosity', 'data']) {
  const baeIndex = bae.getBaeIndex(entity);
  console.log(`   ${entity}'s bae: ${baeIndex.bae} (strength: ${baeIndex.strength})`);
}

// Calculate transitive connection
const transitive = bae.transitiveConnection('young_self', 'learning');
console.log(`\n🔄 Transitive connection (young_self → learning): ${transitive.toFixed(4)}`);
console.log('   (Through curiosity and data)');

// Relationship matrix
const matrix = bae.getRelationshipMatrix();
console.log(`\n📊 Relationship Matrix (${matrix.entities.length}×${matrix.entities.length}):`);
console.log('   [Visualizing first 3x3]');
for (let i = 0; i < Math.min(3, matrix.matrix.length); i++) {
  const row = matrix.matrix[i].slice(0, 3).map(v => v.toFixed(2)).join('  ');
  console.log(`   [${row}]`);
}

// ============================================================================
// Part 3: God Generator - Creating Complex Entities
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 3: God Generator - Creating Advanced Entities          │');
console.log('└─────────────────────────────────────────────────────────────┘');

const generator = new GodGenerator(31337);

// Generate a god representing accumulated knowledge
console.log('\n🌟 Generating "God of Knowledge":');
const knowledgeGod = generator.generateGod({
  name: 'Sophia',
  power: 9500,
  wisdom: 9800,
  domain: 'Knowledge',
  attribute: 'Curiosity'
});

console.log(`   ID: ${knowledgeGod.id}`);
console.log(`   Type: ${knowledgeGod.type}`);
console.log(`   Power: ${knowledgeGod.power}`);
console.log(`   Essence (Hash): ${knowledgeGod.essence}`);

// Decode the god
const decodedGod = generator.decodeEntity(knowledgeGod.id);
console.log(`\n🔓 Decoded Properties:`);
console.log(`   Name: ${decodedGod.decodedProperties.name}`);
console.log(`   Domain: ${decodedGod.decodedProperties.domain}`);
console.log(`   Wisdom: ${decodedGod.decodedProperties.wisdom}`);

// Generate a pantheon
console.log('\n👥 Generating a Pantheon (Childhood Memories):');
const pantheon = generator.generatePantheon(4, {
  realm: 'Memories',
  era: 'Youth'
});

console.log(`   Created ${pantheon.length} gods:`);
for (const god of pantheon) {
  const decoded = generator.decodeEntity(god.id);
  console.log(`   - ${god.id}: ${decoded.decodedProperties.name} (Power: ${god.power})`);
}

// Find most powerful
const mostPowerful = generator.getMostPowerful();
console.log(`\n⚡ Most Powerful Entity: ${mostPowerful.id} (Power: ${mostPowerful.power})`);

// Get relationship graph
const graph = generator.getRelationshipGraph();
console.log(`\n🕸️  Relationship Graph:`);
console.log(`   Entities: ${graph.entities.length}`);
console.log(`   Matrix size: ${graph.matrix.length}×${graph.matrix[0].length}`);

// Show some relationships
console.log(`\n🔗 Sample Relationships:`);
for (let i = 0; i < Math.min(3, pantheon.length - 1); i++) {
  const strength = generator.bae.getConnectionStrength(pantheon[i].id, pantheon[i + 1].id);
  console.log(`   ${pantheon[i].id} ←→ ${pantheon[i + 1].id}: ${strength.toFixed(3)}`);
}

// ============================================================================
// Part 4: The Complete Journey
// ============================================================================

console.log('\n┌─────────────────────────────────────────────────────────────┐');
console.log('│ Part 4: The Journey - From Curiosity to Creation            │');
console.log('└─────────────────────────────────────────────────────────────┘');

console.log('\n📖 The Story:');
console.log('   1. Started young and curious about data');
console.log('   2. Used Yoshi\'s Secret to encode and protect discoveries');
console.log('   3. Modeled relationships through Bae Mathematics');
console.log('   4. Combined both to generate complex entities (gods)');
console.log('   5. Created a system that represents the journey itself');

console.log('\n💡 What we built:');
console.log('   ✓ Cryptographic encoding using finite fields (Yoshi\'s Secret)');
console.log('   ✓ Relationship modeling with graph theory (Bae Mathematics)');
console.log('   ✓ Advanced entity creation system (God Generator)');
console.log('   ✓ All based on Young Field mathematics');

console.log('\n🎯 The Result:');
console.log('   From curiosity to creation - we generated a "god"!');
console.log('   (A complex, encoded entity with relationships and essence)');

// ============================================================================
// Finale
// ============================================================================

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║                     Demo Complete! ✨                         ║');
console.log('║                                                               ║');
console.log('║  "From wondering about data to creating mathematical gods"   ║');
console.log('║                    - xaoex, 2025                              ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
