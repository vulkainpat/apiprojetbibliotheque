import { Router } from 'express';
import {
  getAllLivres,
  getLivreById,
  createLivre,
  updateLivre,
  deleteLivre,
} from '../controllers/livre.controller.js';

// Importation des middlewares pour l'authentification et l'autorisation
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorize } from '../middlewares/authorize.js';

// Création d'un nouveau routeur
const router = Router();

// Définition des routes pour les opérations sur les tâches
// Route pour récupérer toutes les tâches
router.get('/', getAllLivres);

// Route pour récupérer une tâche spécifique par son ID
router.get('/:id', getLivreById);

// Route pour créer une nouvelle tâche, protégée par le middleware d'authentification
router.post('/', authenticateToken, createLivre);

// Route pour mettre à jour une tâche spécifique, également protégée par l'authentification
router.put('/:id', authenticateToken, updateLivre);

// Route pour supprimer une tâche spécifique, protégée par l'authentification
// et le middleware d'autorisation (seuls les utilisateurs avec les rôles 'admin' ou 'utilisateur' peuvent supprimer)
router.delete('/:id', authenticateToken, authorize(['admin', 'utilisateur']), deleteLivre);

// Exportation du routeur pour l'utiliser dans l'application principale
export default router;
