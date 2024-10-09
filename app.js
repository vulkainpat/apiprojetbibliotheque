import express from 'express'; // Framework Express pour créer l'application serveur
import bodyParser from 'body-parser'; // Middleware pour analyser le corps des requêtes entrantes
import livreRouter from './routes/livre.routes.js'; // Routeur pour les routes liées aux livres
import auteurRouter from './routes/auteur.routes.js'; // Routeur pour les routes liées aux auteurs
import { errorHandler } from './middlewares/errorHandler.js'; // Middleware pour la gestion des erreurs
import { config } from 'dotenv'; // Module pour charger les variables d'environnement du fichier .env
import authRouter from './routes/auth.routes.js'; // Routeur pour les routes d'authentification
import cors from 'cors';

// Chargement des variables d'environnement
config();

// Création d'une instance de l'application Express
const app = express();

// Utilisation du middleware CORS
app.use(cors());

// Utilisation de bodyParser pour analyser les requêtes JSON entrantes
app.use(bodyParser.json());

// Définition des routes pour l'authentification
app.use('/api/auth', authRouter);

// Définition des routes pour la gestion des livres
app.use('/api/livres', livreRouter);

// Définition des routes pour la gestion des auteurs
app.use('/api/auteurs', auteurRouter);

// Utilisation du middleware pour la gestion des erreurs
app.use(errorHandler);


// Exporter 'app' pour permettre son utilisation dans d'autres fichiers, notamment pour les tests
export default app;
