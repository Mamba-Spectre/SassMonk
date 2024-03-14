"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import styles from "./page.module.css";
import { toast } from "react-toastify";

interface Movie {
  _id: string;
  name: string;
  releaseDate: Date;
  averageRating: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredMoviesList, setFilteredMoviesList] = useState<Movie[]>([]);
  const router = useRouter();

  const deleteMovie = async (movieId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`);
      fetchAllMovies();
    } catch (error:any) {
      toast.error(error, { autoClose: 2000 })
    }
  };

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get<Movie[]>(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
      setMovies(response.data);
      setFilteredMoviesList(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const filterMovies = (query: string) => {
    if (query.trim() === "") {
      setFilteredMoviesList(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMoviesList(filtered);
    }
  };
  useEffect(() => {
    fetchAllMovies();
  }, []);
  useEffect(() => {
    filterMovies(search);
  }, [search, movies]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>
        <h1>The Best Movie Review Site</h1>
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.inputField}
        />
        <div className={styles.movieList}>
          {filteredMoviesList.map((movie) => (
            <div key={movie._id} className={styles.movieCard} onClick={(e)=>{
              e.preventDefault();
              router.push(`/movie-details?id=${movie._id}`)
            }}>
              <div>
                <h2>{movie.name}</h2>
                <p>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </p>
                <p>Average Rating: {movie.averageRating}</p>
                <button onClick={(e) => {
                  e.preventDefault();
              e.stopPropagation();

                  deleteMovie(movie._id)}} className={styles.deleteButton}>Delete Movie</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
