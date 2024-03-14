import { addMovie, deleteMovie, getAllMovies, getMovie } from '../controllers/movies';
import express from 'express';
const router = express.Router();
    router.get('/',getAllMovies);
    router.post('/',addMovie);
    router.get('/:id',getMovie);
    router.delete('/:id',deleteMovie);
export default router;
