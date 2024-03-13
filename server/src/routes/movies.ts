import { addMovie, deleteMovie, getAllMovies, getMovie } from '../controllers/movies';
import express from 'express';

export default(router: express.Router) => {
    router.get('/movies',getAllMovies);
    router.get('/movies/:id',getMovie);
    router.post('/movies',addMovie);
    router.delete('/movies/:id',deleteMovie);
};