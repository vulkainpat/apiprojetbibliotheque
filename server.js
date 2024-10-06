import app from './app.js';
import { sequelize } from './config/config.js'; // Configuration Sequelize pour la base de donnée

// Définition du port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Synchronisation avec la base de données et démarrage du serveur
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`)); // Démarrage du serveur sur le port spécifié
});
