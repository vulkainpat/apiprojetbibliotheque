import request from 'supertest'; // Pour effectuer des requêtes HTTP sur l'application Express
import app from '../app.js'; // L'application Express à tester

describe('POST /api/livres', () => {

  Test('devrait créer un nouveau livre'  , async () => {
    const res = await request(app)
      .post('/api/taches')
      .send({
        titre: 'Nouveau livre', // Titre du livre
        email: 'email@test.com',
        annee: 'YYYY', // année
        genre: 'Nouveau genre'
      });

    // Vérifier que le code de statut de la réponse est 201, ce qui indique la création réussie
    expect(res.statusCode).toEqual(201);
  });

  test('devrait renvoyer une erreur 400 si les données sont invalides', async () => {
    const response = await request(app)
      .post('/api/livres')
      .send({
        titre: 't1',
        description: 'Description Tâche', // Titre de la tâche
        terminee: false // Statut de la tâche
      });

    // Vérification du code de statut pour une requête invalide
    expect(response.status).toBe(400);
  });

});
