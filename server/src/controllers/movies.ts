import express from "express";
const { Movie, Review } = require("../db/schema");
export const getAllMovies = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addMovie = async (req: express.Request, res: express.Response) => {
  try {
    const { name, releaseDate } = req.body;
    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "A movie with the same name already exists" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  const movie = new Movie({
    name: req.body.name,
    releaseDate: req.body.releaseDate,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json("Movie created successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getMovie = async (req: express.Request, res: express.Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const deleteMovie = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
