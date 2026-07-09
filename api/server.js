const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'fitnessbay_cloud.html');
    console.log(`Attempting to read: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      console.log(`__dirname is: ${__dirname}`);
      console.log(`Available files in parent:`, fs.readdirSync(path.join(__dirname, '..')));
      return res.status(404).send('Dashboard HTML file not found: ' + filePath);
    }

    const html = fs.readFileSync(filePath, 'utf8');
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error serving dashboard:', err);
    res.status(500).send('Server error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Fitness Bay Financials running at http://localhost:${port}`);
});