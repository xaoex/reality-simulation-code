/**
 * Test CoolProcess System
 */

const realitySim = require('./index.js');

console.log('================================');
console.log('Testing CoolProcess Integration');
console.log('================================\n');

// Test 1: Check if CoolProcessSystem is available
console.log('1. CoolProcessSystem available:', !!realitySim.CoolProcessSystem);

if (realitySim.CoolProcessSystem) {
  // Test 2: Create instance
  console.log('\n2. Creating CoolProcess instance...');
  const coolProcess = new realitySim.CoolProcessSystem({ 
    maxopt: true, 
    verbose: true 
  });
  
  // Test 3: Check status
  console.log('\n3. System status:');
  const status = coolProcess.status();
  console.log(JSON.stringify(status, null, 2));
  
  // Test 4: Create a process
  console.log('\n4. Creating a test process...');
  const process = coolProcess.createProcess('test-process', {
    type: 'test',
    priority: 'high'
  });
  console.log('Process created:', process.name);
  
  // Test 5: Store data in floppies
  console.log('\n5. Storing data in floppies...');
  const floppy = coolProcess.storeInFloppies('test-data', {
    values: [1, 2, 3, 4, 5],
    metadata: { test: true }
  }, {
    compress: true,
    version: '1.0.0'
  });
  console.log('Data stored with ID:', floppy.id);
  
  // Test 6: Retrieve data from floppies
  console.log('\n6. Retrieving data from floppies...');
  const retrieved = coolProcess.retrieveFromFloppies('test-data');
  console.log('Retrieved data:', JSON.stringify(retrieved, null, 2));
  
  // Test 7: Create a test case
  console.log('\n7. Creating a test case...');
  const testCase = coolProcess.createCase('validation-test', () => {
    const sum = [1, 2, 3].reduce((a, b) => a + b, 0);
    return { success: sum === 6, result: sum };
  });
  console.log('Test case created:', testCase.name);
  
  // Test 8: Execute the test case
  console.log('\n8. Executing test case...');
  const result = coolProcess.executeCase('validation-test');
  console.log('Test case status:', result.status);
  console.log('Test case results:', JSON.stringify(result.results, null, 2));
  
  // Test 9: Create a workflow
  console.log('\n9. Creating a workflow...');
  const workflow = coolProcess.createWorkflow('test-workflow', [
    () => ({ data: [1, 2, 3, 4, 5] }),
    (input) => input.data.map(x => x * 2),
    (transformed) => ({ sum: transformed.reduce((a, b) => a + b, 0) })
  ]);
  console.log('Workflow created:', workflow.name);
  
  // Test 10: Execute workflow
  console.log('\n10. Executing workflow...');
  coolProcess.executeWorkflow('test-workflow').then(workflowResult => {
    console.log('Workflow status:', workflowResult.status);
    console.log('Workflow results:', JSON.stringify(workflowResult.results, null, 2));
    
    // Test 11: Final status
    console.log('\n11. Final system status:');
    const finalStatus = coolProcess.status();
    console.log(JSON.stringify(finalStatus, null, 2));
    
    console.log('\n================================');
    console.log('✓ All tests completed successfully!');
    console.log('================================');
  }).catch(error => {
    console.error('Workflow execution error:', error);
  });
  
} else {
  console.log('✗ CoolProcessSystem not available');
}
