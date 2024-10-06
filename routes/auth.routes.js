import { Router } from 'express';
import { inscription, connexion, modification } from '../controllers/utilisateur.controller.js';

// Importation des middlewares d'authentification et d'autorisation
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorize } from '../middlewares/authorize.js';

// Création d'un nouveau routeur Express
const router = Router();

// Route pour l'inscription des utilisateurs
router.post('/signup', inscription);

// Route pour la connexion des utilisateurs
router.post('/login', connexion);

// Route pour mettre à jour un utilisateur
// Protégée par l'authentification (authenticateToken) et l'autorisation (authorize)
router.put('/update/:id', authenticateToken, authorize(['admin']), modification);

// Route pour supprimer un utilisateur
// De même, protégée par l'authentification et l'autorisation
// router.delete('/delete/:id', authenticateToken, authorize(['admin']), deleteUser);

// Exportation du routeur pour une utilisation dans l'application principale
export default router;
