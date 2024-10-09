import Auteur from '../models/auteur.model.js';

// Récupération de toutes les auteurs
export const getAllAuteurs = async (req, res, next) => {
  try {
    // Utilisation de la méthode findAll de Sequelize pour récupérer toutes les auteurs
    const auteurs = await Auteur.findAll();
    // Envoie des données récupérées au client avec le statut 200 (OK)
    res.status(200).json(auteurs);
  } catch (error) {
    // En cas d'erreur, passe l'erreur au middleware suivant
    next(error);
  }
};

// Récupération d'un auteur par son ID
export const getAuteurById = async (req, res, next) => {
  try {
    // Recherche d'un auteur par son ID (Primary Key) avec findByPk
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      // Si l'auteur est trouvé, envoie l'auteur au client
      res.status(200).json(auteur);
    } else {
      // Si l'auteur n'est  pas trouvé, envoie un message d'erreur 404 (Not Found)
      res.status(404).json({ message: 'Auteur non trouvé' });
    }
  } catch (error) {
    next(error);
  }
};

// Création d'un nouveau auteur
export const createAuteur = async (req, res, next) => {
  try {
    // Crée un nouveau auteur avec les données envoyées dans le corps de la requête
    const auteur = await Auteur.create(req.body);
    // Envoie l'auteur créée au client avec le statut 201 (Created)
    res.status(201).json(auteur);
  } catch (error) {
    next(error);
  }
};

// Mise à jour d'un auteur
export const updateAuteur = async (req, res, next) => {
  try {
    // Recherche d'un auteur par son ID
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      // Si l'auteur est trouvé, la mise à jour avec les nouvelles données
      await auteur.update(req.body);
      // Envoie l'auteur mise à jour au client
      res.status(200).json(auteur);
    } else {
      // Si l'auteur n'est  pas trouvé, envoie un message d'erreur 404
      res.status(404).json({ message: 'auteur non trouvée' });
    }
  } catch (error) {
    next(error);
  }
};

// Suppression d'un auteur
export const deleteAuteur = async (req, res, next) => {
  try {
    // Recherche d'un auteur par son ID
    const auteur = await Auteur.findByPk(req.params.id);
    if (auteur) {
      // Si l'auteur est trouvé, la supprimer
      await auteur.destroy();
      // Envoie un message de confirmation de suppression
      res.status(200).json({ message: 'auteur supprimée' });
    } else {
      // Si l'auteur n'est  pas trouvé, envoie un message d'erreur 404
      res.status(404).json({ message: 'auteur non trouvée' });
    }
  } catch (error) {
    next(error);
  }
};
