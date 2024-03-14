import express from 'express';
import movies from './movies';
import reviews from './reviews';

const router = express.Router();
router.use('/movies', movies);
router.use('/reviews', reviews);

router.get('/health', (req, res) => {
    res.json({ message: 'Server is running' });
});

export default router;