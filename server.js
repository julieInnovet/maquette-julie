const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db'); // Assurez-vous que db.js est correctement configuré

const app = express();

// Middleware
app.use(cors()); // Permet les requêtes cross-origin
app.use(bodyParser.json()); // Parse les corps des requêtes en JSON

// Endpoint pour ajouter un client
app.post('/api/add-client', (req, res) => {
  const { firstName, lastName, address, email, phone } = req.body;

  // Validation des champs requis
  if (!firstName || !lastName || !address || !email || !phone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Tous les champs sont requis: firstName, lastName, address, email, phone.' 
    });
  }

  // Insertion dans la base de données
  const query = `
    INSERT INTO clients (first_name, last_name, address, email, phone) 
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [firstName, lastName, address, email, phone], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur interne du serveur.' 
      });
    }

    // Succès
    res.status(201).json({ 
      success: true, 
      message: 'Client ajouté avec succès.', 
      data: { id: result.insertId, firstName, lastName, address, email, phone } 
    });
  });
});

// Endpoint pour récupérer tous les clients
app.get('/api/clients', (req, res) => {
  const query = `SELECT * FROM clients`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des clients:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur interne du serveur.' 
      });
    }

    // Succès
    res.status(200).json({ 
      success: true, 
      data: results 
    });
  });
});

// Configuration du port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

module.exports = app; // Nécessaire pour un déploiement avec Vercel
