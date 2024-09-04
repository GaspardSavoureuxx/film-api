const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    score: { type: Number, required: true },
    reviewer: { type: String }
});

const filmSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    releaseYear: { type: Number },
    genre: { type: String },
    actors: [{ name: String }],
    directors: [{ name: String }],
    ratings: [ratingSchema]
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;

// Ce fichier est un modèle de la base de données 