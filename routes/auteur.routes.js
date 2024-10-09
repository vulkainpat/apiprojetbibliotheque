import { Router } from 'express';
import {
  getAllAuteurs,
  getAuteurById,
  createAuteur,
  updateAuteur,
  deleteAuteur,
} from '../controllers/auteur.controller.js';

// Importation des middlewares pour l'authentification et l'autorisation
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { authorize } from '../middlewares/authorize.js';

// Création d'un nouveau routeur
const router = Router();

// Définition des routes pour les opérations sur les livres
// Route pour récupérer toutes les livres
router.get('/', getAllAuteurs);

// Route pour récupérer un livre spécifique par son ID
router.get('/:id', getAuteurById);

// Route pour créer une nouvelle tâche, protégée par le middleware d'authentification
router.post('/', authenticateToken, createAuteur);

// Route pour mettre à jour un livre spécifique, également protégée par l'authentification
router.put('/:id', authenticateToken, updateAuteur);

// Route pour supprimer un livre spécifique, protégée par l'authentification
// et le middleware d'autorisation (seuls les utilisateurs avec les rôles 'admin' ou 'user' peuvent supprimer)
router.delete('/:id', authenticateToken, authorize(['admin', 'utilisateur']), deleteAuteur);

// Exportation du routeur pour l'utiliser dans l'application principale
export default router;
