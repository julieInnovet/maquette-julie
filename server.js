const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();

// Middleware to parse JSON bodies and handle CORS
app.use(bodyParser.json());
app.use(cors());

// POST endpoint for adding clients
app.post('/api/add-client', (req, res) => {
  try {
    const { firstName, lastName, address, email, phone } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !address || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: firstName, lastName, address, email, phone',
      });
    }

    // Validate email and phone format
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^\d{10,15}$/.test(phone);

    if (!isValidEmail(email) || !isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or phone format',
      });
    }

    // Add the new client to the database
    const query = `
      INSERT INTO clients (first_name, last_name, address, email, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(query, [firstName, lastName, address, email, phone], (err, results) => {
      if (err) {
        console.error('Error adding client:', err);
        return res.status(500).json({
          success: false,
          message: 'Error processing client data',
        });
      }

      res.status(201).json({
        success: true,
        message: 'Client added successfully',
        data: { id: results.insertId, firstName, lastName, address, email, phone },
      });
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing client data',
    });
  }
});

// GET endpoint to retrieve all clients
app.get('/api/clients', (req, res) => {
  const query = 'SELECT * FROM clients';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving clients:', err);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving clients',
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

// Get port from environment variable or use 3000 as default
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
