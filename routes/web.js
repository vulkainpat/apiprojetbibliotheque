import express from 'express';
import axios from 'axios';

const router = express.Router();
const apiURL = 'http://localhost:3300/api/livres'; // URL de l'API

// Page principale pour afficher toutes les tâches
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiURL);
        const livres = response.data;
        res.render('index', { livres });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des livres');
    }
});

// Page pour ajouter une nouveau livre
router.get('/add', (req, res) => {
    res.render('addLivre');
});

// Ajouter une nouveau livre via POST
router.post('/add', async (req, res) => {
    console.log("222222222222222222");
    console.log(req.body);
    const newLivre = {
        title: req.body.titre,
        description: req.body.description
    };
    try {
        await axios.post(apiURL, newLivre);
        res.redirect('/livres');
    } catch (error) {
        res.status(500).send('Erreur lors de la création de la tâche' + error.message);
    }
});

// Page pour éditer un livre existante
router.get('/edit/:id', async (req, res) => {
    try {
        const response = await axios.get(`${apiURL}/${req.params.id}`);
        const Livre = response.data;
        res.render('editLivre', { livre });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération de la tâche');
    }
});

// Mettre à jour un livre via POST
router.post('/edit/:id', async (req, res) => {
    const updatedLivre = {
        titre: req.body.titre,
        auteurId: req.body.auteurId,
        annee: req.body.annee,
        genre: req.body.genre
    };
    try {
        await axios.put(`${apiURL}/${req.params.id}`, updatedLivre);
        res.redirect('/livres');
    } catch (error) {
        res.status(500).send('Erreur lors de la mise à jour de la tâche');
    }
});

// Supprimer un livre
router.post('/delete/:id', async (req, res) => {
    try {
        await axios.delete(`${apiURL}/${req.params.id}`);
        res.redirect('/livres');
    } catch (error) {
        res.status(500).send('Erreur lors de la suppression de la tâche');
    }
});

export default router;
