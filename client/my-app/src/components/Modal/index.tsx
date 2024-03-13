import React, { useEffect, useState } from "react";
import Select from "react-select";
import modalStyles from "./modal.module.css";
import axios from "axios";
import { toast } from "react-toastify";

interface ModalProps {
  closeModal: () => void;
  handleSubmit: (formData: FormData) => void;
  modalType: string;
}

interface MovieFormData {
  name: string;
  releaseDate: string;
}

interface ReviewFormData {
  reviewerName: string;
  rating: number;
  reviewComments: string;
  movieId: string;
}

type FormData = MovieFormData | ReviewFormData;

const Modal: React.FC<ModalProps> = ({ closeModal, handleSubmit, modalType }) => {
  const [movieOptions, setMovieOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<{ value: string; label: string } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    releaseDate: "",
    reviewerName: "",
    rating: 0,
    reviewComments: "",
    movieId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleMovieChange = (selectedOption: { value: string; label: string } | null) => {
    setSelectedMovie(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      movieId: selectedOption ? selectedOption.value : "",
    }));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/movies");
        const movies = response.data.map((movie: { _id: string; name: string }) => ({
          value: movie._id,
          label: movie.name,
        }));
        setMovieOptions(movies);
      } catch (error:any) {
        toast.error(error || "error fetching movies", { autoClose: 2000 });
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modal}>
        <button className={modalStyles.closeButton} onClick={closeModal}>
          X
        </button>
        <h2 className={modalStyles.h21}>{modalType === "movie" ? "Add New Movie" : "Add New Review"}</h2>
        <form onSubmit={submitForm}>
          {modalType === "movie" ? (
            <>
              <label className={modalStyles.label1} htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                className={modalStyles.input1}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label className={modalStyles.label1} htmlFor="releaseDate">
                Release Date:
              </label>
              <input
                type="date"
                className={modalStyles.input1}
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <label className={modalStyles.label1} htmlFor="reviewerName">
                Reviewer Name:
              </label>
              <input
                className={modalStyles.input1}
                type="text"
                id="reviewerName"
                name="reviewerName"
                value={formData.reviewerName}
                onChange={handleChange}
                required
              />
              <Select
                value={selectedMovie}
                onChange={handleMovieChange}
                options={movieOptions}
                className={modalStyles.select1}
                placeholder="Search for a movie..."
                isSearchable
              />
              <label className={modalStyles.label1} htmlFor="rating">
                Rating:
              </label>
              <input
                className={modalStyles.input1}
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                min={0}
                max={10}
                onChange={handleChange}
                required
              />
              <label className={modalStyles.label1} htmlFor="reviewComments">
                Review Comments:
              </label>
              <textarea
                id="reviewComments"
                name="reviewComments"
                value={formData.reviewComments}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button className={modalStyles.button1} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
