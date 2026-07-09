const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Main dashboard route
app.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'fitnessbay_cloud.html');
    
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return res.status(404).send('Dashboard file not found at: ' + filePath);
    }

    const html = fs.readFileSync(filePath, 'utf8');
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ 
      error: 'Server error', 
      message: err.message,
      path: __dirname
    });
  }
});

app.listen(port, () => {
  console.log(`Fitness Bay running on port ${port}`);
});