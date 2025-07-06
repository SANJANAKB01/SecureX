// start-all.js
const { spawn } = require('child_process');

// Start Flask backend
const flask = spawn('python', ['../none/app.py'], {
  stdio: 'inherit',
  shell: true,
});

// Start React frontend
const react = spawn('npm', ['run' , 'start-react'], {
  stdio: 'inherit',
  shell: true,
});

// Handle Flask exit
flask.on('exit', (code) => {
  console.log(`Flask backend exited with code ${code}`);
  process.exit(code); // Exit the whole process if Flask stops
});

// Handle React exit
react.on('exit', (code) => {
  console.log(`React frontend exited with code ${code}`);
  process.exit(code); // Exit the whole process if React stops
});
