const mongoose = require('mongoose');

// Define Movie Schema
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    averageRating: {
        type: Number,
        min: 0,
        max: 10,
        default: null
    }
});

// Define Review Schema
const reviewSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    reviewerName: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    reviewComments: {
        type: String,
        required: true
    }
});

// Compile models from schemas
const Movie = mongoose.model('Movie', movieSchema);
const Review = mongoose.model('Review', reviewSchema);

// Export models
exports.Movie = Movie;
exports.Review = Review;