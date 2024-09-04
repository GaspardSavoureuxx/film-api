const express = require('express');
const Film = require('../models/films');
const router = express.Router();

// Requetes pour une base de données NoSQL


// 1. Ajouter un nouveau film
router.post('/films', async (req, res) => {
    try {
        const film = new Film(req.body);
        await film.save();
        res.status(201).send(film);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 2. Trouver tous les films
router.get('/films', async (req, res) => {
    try {
        const films = await Film.find();
        res.status(200).send(films);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

// 3. Récupérer un film par son titre 
router.get('/films/:title', async (req, res) => {
    try {
        const films = await Film.findOne({title : req.params.title});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});


// 4. Mettre à jour un film existant par son titre 
router.patch('/films/:title', async (req, res) => {
    try {
        const films = await Film.findOneAndUpdate({title : req.params.title}, req.body,  { new: true });
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 5. Supprimer un film par son titre
router.delete('/films/:title', async (req, res) => {
    try {
        const films = await Film.findOneAndDelete({title : req.params.title});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 6. Récupérer un film par son réalisateur 
router.get('/films/director/:name', async (req, res) => {
    try {
        const films = await Film.find({"directors.name" : req.params.name});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 7. Récupérer un film par le nom de l'acteur 
router.get('/films/actor/:name', async (req, res) => {
    try {
        const films = await Film.find({"actors.name" : req.params.name});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});


// 8. Récupérer les films avec une note moyenne supérieure à 6
router.get('/films/ratings/above6', async (req, res) => {
    try {
        const films = await Film.aggregate([{$unwind : "$ratings"}, {$group: { _id: "$id" , avgNote: { $avg: "$ratings.score" }, title : {$first : "$title"}}}, {$match : {avgNote : {gte : 6 }}}
       ]);
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 9. Récupérer les films sortis dans une année spécifique
router.get('/films/yearRelease/:releaseYear', async (req, res) => 
        // on ajoute un élément "yearRelease" dans le chemin d'accès pour le différencier des chemins d'autres fonctions get

    {
    try {
        const films = await Film.find({"releaseYear" : req.params.releaseYear});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 10. Récupérer les films par genre
router.get('/films/gender/:genre', async (req, res) => 
    // on ajoute un élément "gender" dans le chemin d'accès pour le différencier des chemins d'autres fonctions get
    {
    try {
        const films = await Film.find({"genre" : req.params.genre});
        res.status(200).send(films);
    } catch (error) {
        res.status(400).send(error);
    }
});





























module.exports = router;// Ce fichier va créer les différentes portes d'accès vers l' API