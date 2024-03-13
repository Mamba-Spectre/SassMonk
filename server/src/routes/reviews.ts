import { deleteReview, getAllReviews, postReview } from '../controllers/reviews';
import express from 'express';

export default(router: express.Router) => {
    router.get('/movie1/:id/reviews',getAllReviews);
    router.post('/reviews',postReview);
    router.delete('/reviews/:id',deleteReview);
};