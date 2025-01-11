require('dotenv').config();
const mysql = require('mysql2');

// Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Gx4dykqw-100243',
  database: process.env.DB_NAME || 'innovet_db'
});

// Tester la connexion
connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL:', err.message);
    return;
  }
  console.log('✅ Connecté à MySQL avec succès!');

  // Ajoutez un log pour indiquer que la requête de création de la table va s'exécuter
  console.log('🔄 Tentative de création/vérification de la table `clients`...');

  // Créer la table clients si elle n'existe pas
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS clients (
      id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      address TEXT NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('❌ Erreur lors de la création de la table `clients`:', err.message);
      return;
    }
    console.log('✅ Table `clients` vérifiée/créée avec succès!');
  });
});

module.exports = connection;
