import express from 'express';
import movies from './movies';
import reviews from './reviews';

const router = express.Router();
export default (): express.Router => {
    movies(router);
    reviews(router);
    return router;
}