import { deleteReview, getAllReviews, postReview } from '../controllers/reviews';
import express from 'express';
const router = express.Router();

    router.get('/movie1/:id/reviews',getAllReviews);
    router.post('/',postReview);
    router.delete('/:id',deleteReview);
export default router;
