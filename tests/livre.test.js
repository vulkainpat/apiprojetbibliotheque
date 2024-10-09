import request from 'supertest'; // Pour effectuer des requêtes HTTP sur l'application Express
import app from '../app.js'; // L'application Express à tester

describe('Livres Controller', () => {

  it('GET /api/livres - doit lire tous les livres', async () => {
    // Ajoutons des livres à la base de données pour les tests
    const result = await Livre.create([
      { titre: 'Nouveau livre', auteurId: '1', annee: '2023', genre: 'Fiction' },
      { titre: 'Nouveau livre2', auteurId: '2', annee: '2023', genre: 'Non-fiction' }
    ]);
    expect(result).toBe(expectedValue);
    const res = await request(app).get('/api/livres');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2); // Vérifiez le nombre de livres
    expect(res.body[0]).toEqual(expect.objectContaining({
      titre: 'Nouveau livre',
      auteurId: '1',
      annee: '2023',
      genre: 'Fiction'
    }));
  });

  it('POST /api/livres - doit créer un livre', async () => {
    const res = await request(app)
    .post('/api/livres')
    .set('Authorization', 'projet_final')
    .send({
      titre: 'Le livre',
      auteurId:'2',
      annee: 'YYYY',
      genre: 'Aventure'
    });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('titre', 'Le livre');
      expect(res.body).toHaveProperty('auteurId', '2');
  });

});



/*describe('POST /api/livres', () => {

  test('devrait créer un nouveau livre'  , async () => {
    const res = await request(app)
      .post('/api/livres')
      .send({
        titre: 'Nouveau livre', // Titre du livre
        auteurId: 'Nouvel auteur',
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
        titre: 'le titre', // Titre du livre
        email: 'email@test.com',
        annee: '2004', // année
        genre: 'Nouveau genre'
      });

    // Vérification du code de statut pour une requête invalide
    expect(response.status).toBe(400);
  });

}); */
