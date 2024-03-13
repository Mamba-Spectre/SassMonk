import express, { Router } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors(
    {
        credentials: true
    }
));

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI)
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
}
);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

app.use('/', router());


// // Create a new movie
// app.post('/movies', async (req, res) => {
//     try {
//         const movie = await Movie.create(req.body);
//         res.json(movie);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// app.put('/movies/:id', async (req, res) => {
//     try {
//         const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!movie) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }
//         res.json(movie);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Get all movies
// app.get('/movies', async (req, res) => {
//     try {
//         const movies = await Movie.find();
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route for creating a new review
// app.post('/reviews', async (req, res) => {
//     try {
//         // Extract review data from the request body
//         const { movieId, reviewerName, rating, reviewComments } = req.body;

//         // Check if all required fields are present
//         if (!movieId || !rating || !reviewComments) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         // Create a new review using the extracted data
//         const review = await Review.create({ movieId, reviewerName, rating, reviewComments });

//         // Return a success response
//         res.status(201).json({ message: 'Review created successfully', review });
//     } catch (err) {
//         // Handle errors
//         res.status(500).json({ message: err.message });
//     }
// });


// // Get a single movie
// app.get('/movies/:id', async (req, res) => {
//     try {
//         const movie = await Movie.findById(req.params.id);
//         if (!movie) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }
//         res.json(movie);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Delete a movie and its associated reviews
// app.delete('/movies/:id', async (req, res) => {
//     try {
//         await Movie.findByIdAndDelete(req.params.id);
//         await Review.deleteMany({ movieId: req.params.id });
//         res.json({ message: 'Movie and associated reviews deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Search function for movies by name keywords
// // app.get('/movie/search', async (req, res) => {
// //     const searchKeyword = req.query.keyword;
// //     try {
// //         // Query the database for movies whose names contain the search keyword
// //         const movies = await Movie.find({ name: { $regex: searchKeyword, $options: 'i' } });
// //         res.json(movies);
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // });

// // Search function for review comments
// // app.get('/reviews/search', async (req, res) => {
// //     const searchParam = req.query.search;
// //     try {
// //         const reviews = await Review.find({ reviewComments: { $regex: searchParam, $options: 'i' } });
// //         res.json(reviews);
// //     } catch (err) {
// //         res.status(500).json({ message: err.message });
// //     }
// // });

// // Route to get reviews for a specific movie
// app.get('/movie1/:id/reviews', async (req, res) => {
//     try {
//         // Extract the movie ID from the request parameters
//         const movieId = req.params.id;

//         // Query the database for reviews associated with the specified movie ID
//         const reviews = await Review.find({ movieId });
//         res.json(reviews);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// // Delete a review by ID
// app.delete('/reviews/:id', async (req, res) => {
//     const reviewId = req.params.id;
//     try {
//         // Find the review by ID and delete it
//         const deletedReview = await Review.findByIdAndDelete(reviewId);
//         if (!deletedReview) {
//             return res.status(404).json({ message: 'Review not found' });
//         }
//         // If the review is successfully deleted, send a success response
//         res.json({ message: 'Review deleted successfully', deletedReview });
//     } catch (err) {
//         // If an error occurs, send an error response
//         res.status(500).json({ message: err.message });
//     }
// });
