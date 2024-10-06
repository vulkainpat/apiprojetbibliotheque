import Livre from '../models/livre.model.js';

// Récupération de toutes les livres
export const getAllLivres = async (req, res, next) => {
  try {
    // Utilisation de la méthode findAll de Sequelize pour récupérer toutes les livres
    const livres = await Livre.findAll();
    // Envoie des données récupérées au client avec le statut 200 (OK)
    res.status(200).json(livres);
  } catch (error) {
    // En cas d'erreur, passe l'erreur au middleware suivant
    next(error);
  }
};

// Récupération d'un Livre par son ID
export const getLivreById = async (req, res, next) => {
  try {
    // Recherche d'un livre par son ID (Primary Key) avec findByPk
    const livre = await Livre.findByPk(req.params.id);
    if (livre) {
      // Si le livre est trouvée, envoie le livre au client
      res.status(200).json(livre);
    } else {
      // Si le livre n'est pas trouvé, envoie un message d'erreur 404 (Not Found)
      res.status(404).json({ message: 'livre non trouvée' });
    }
  } catch (error) {
    next(error);
  }
};

// Création d'un nouveau livre
export const createLivre = async (req, res, next) => {
  try {
    // Crée un nouveau livre avec les données envoyées dans le corps de la requête
    const livre = await Livre.create(req.body);
    // Envoie le livre créée au client avec le statut 201 (Created)
    res.status(201).json(livre);
  } catch (error) {
    next(error);
  }
};

// Mise à jour d'un livre
export const updateLivre = async (req, res, next) => {
  try {
    // Recherche d'une livre par son ID
    const livre = await Livre.findByPk(req.params.id);
    if (livre) {
      // Si le livre est trouvé, la mise à jour avec les nouvelles données
      await livre.update(req.body);
      // Envoie le livre mise à jour au client
      res.status(200).json(livre);
    } else {
      // Si le livre n'est pas trouvée, envoie un message d'erreur 404
      res.status(404).json({ message: 'livre non trouvée' });
    }
  } catch (error) {
    next(error);
  }
};

// Suppression d'un livre
export const deleteLivre = async (req, res, next) => {
  try {
    // Recherche d'une livre par son ID
    const livre = await Livre.findByPk(req.params.id);
    if (livre) {
      // Si le livre est trouvée, la supprimer
      await livre.destroy();
      // Envoie un message de confirmation de suppression
      res.status(200).json({ message: 'livre supprimée' });
    } else {
      // Si le livre n'est pas trouvé, envoie un message d'erreur 404
      res.status(404).json({ message: 'livre non trouvée' });
    }
  } catch (error) {
    next(error);
  }
};
