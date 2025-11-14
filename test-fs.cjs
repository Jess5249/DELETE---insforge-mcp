const fs = require('fs');
const path = require('path');

console.log('process.cwd():', process.cwd());
console.log('WORKSPACE_FOLDER_PATHS:', process.env.WORKSPACE_FOLDER_PATHS);
console.log('PWD:', process.env.PWD);

// Test 1: Write using relative path
const testFile1 = 'test-file-1.txt';
fs.writeFileSync(testFile1, 'Test content 1');
console.log('\nTest 1 - Relative path:');
console.log('Created:', path.resolve(testFile1));

// Test 2: Write using process.cwd()
const testFile2 = path.join(process.cwd(), 'test-file-2.txt');
fs.writeFileSync(testFile2, 'Test content 2');
console.log('\nTest 2 - process.cwd():');
console.log('Created:', testFile2);

// Test 3: Write using PWD env var if available
if (process.env.PWD) {
  const testFile3 = path.join(process.env.PWD, 'test-file-3.txt');
  fs.writeFileSync(testFile3, 'Test content 3');
  console.log('\nTest 3 - PWD env var:');
  console.log('Created:', testFile3);
}

console.log('\nCleanup...');
fs.unlinkSync(testFile1);
fs.unlinkSync(testFile2);
if (process.env.PWD && fs.existsSync(path.join(process.env.PWD, 'test-file-3.txt'))) {
  fs.unlinkSync(path.join(process.env.PWD, 'test-file-3.txt'));
}
console.log('Done!');
