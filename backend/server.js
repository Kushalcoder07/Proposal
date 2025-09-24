require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const Status = require('./models/Schema');
const Path = require('path');

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected to MongoDB")).catch(err => console.log(err));

// Middleware to parse JSON bodies
app.use(express.json());  
app.use(cors()); // Enable CORS for all routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

//Sending the index file
app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, '../frontend/k1.html'));
});

// Sample route
app.post('/status', (req, res) => {
  const { status } = req.body;
  const newStatus = new Status({ status });
  newStatus.save().then(() => console.log('Status saved to database')).catch(err => console.log(err));
    if (status) {
        res.json({ message: `Status received: ${status}` });
        console.log(`Status received: ${status}`);
    } else {
        res.status(400).json({ error: 'Status is required' });
    }
});