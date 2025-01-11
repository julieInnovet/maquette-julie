const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint pour ajouter des clients
app.post('/api/add-client', (req, res) => {
  const { firstName, lastName, address, email, phone } = req.body;
  if (!firstName || !lastName || !address || !email || !phone) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const query = `INSERT INTO clients (first_name, last_name, address, email, phone) VALUES (?, ?, ?, ?, ?)`;
  connection.query(query, [firstName, lastName, address, email, phone], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.status(201).json({ message: 'Client ajouté avec succès.', id: result.insertId });
  });
});

// Endpoint pour récupérer tous les clients
app.get('/api/clients', (req, res) => {
  const query = `SELECT * FROM clients`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération :', err);
      return res.status(500).json({ message: 'Erreur serveur.' });
    }
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
