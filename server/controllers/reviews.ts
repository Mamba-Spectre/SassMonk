import express from 'express';
const { Movie, Review } = require('../db/schema');

export const getAllReviews = async ( req: express.Request, res: express.Response ) => {
    try {
        const movieId = req.params.id;
        const reviews = await Review.find({movieId});
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const deleteReview = async ( req: express.Request, res: express.Response ) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
export const postReview = async ( req: express.Request, res: express.Response ) => {
    const review = new Review({
        movieId: req.body.movieId,
        reviewerName: req.body.reviewerName,
        rating: req.body.rating,
        reviewComments: req.body.reviewComments,
    });
    if(!review.movieId || !review.rating || !review.reviewComments) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};