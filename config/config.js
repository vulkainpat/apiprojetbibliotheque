import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();  // Charger les variables d'environnement

// Fonction pour créer la base de données si elle n'existe pas
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    // Créer la base de données si elle n'existe pas
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    console.log(`Database ${process.env.MYSQL_DATABASE} created or already exists.`);

    await connection.end();
  } catch (err) {
    console.error('Error creating database:', err.message);
    throw err;  // Renvoyer l'erreur pour permettre une meilleure gestion
  }
};


// Initialisation de Sequelize sans utilisation de `await` au top-level
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,  // Désactiver le logging SQL pour plus de clarté
  }
);

// Exécuter la création de la base de données avant d'exporter Sequelize
const initializeSequelize = async () => {
  try {
    await createDatabase();
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error during database initialization:', error.message);
    throw error;
  }
};

// Appeler la fonction d'initialisation immédiatement et exporter Sequelize
initializeSequelize().then(() => {
  console.log('Sequelize is ready.');
});

export { sequelize };
