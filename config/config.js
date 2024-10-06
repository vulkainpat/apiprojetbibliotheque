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


// Fonction pour initialiser Sequelize après la création de la base de données
const initializeSequelize = async () => {
  try {
    await createDatabase();  // Assure-toi que la base de données est créée
    const sequelize = new Sequelize(
      process.env.MYSQL_DATABASE,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASSWORD,
      {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false,  // Désactiver le logging SQL pour plus de clarté (à activer si nécessaire)
      }
    );

    // Vérification de la connexion à la base de données
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

// Exporte l'instance de Sequelize pour l'utiliser dans d'autres parties de l'application
export const sequelize = await initializeSequelize();
