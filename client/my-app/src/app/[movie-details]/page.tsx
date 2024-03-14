"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import NavBar from '@/components/NavBar';

interface Review {
    _id: string;
    reviewerName: string;
    rating: number;
    reviewComments: string;
}

const ReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const searchParams = useSearchParams();
    const movieId = searchParams.get('id');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get<Review[]>(`http://localhost:8080/reviews/movie1/${movieId}/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        if (movieId) {
            fetchReviews();
        }
    }, [movieId]);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            await axios.delete(`http://localhost:8080/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredReviews = reviews.filter(review =>
        review.reviewComments.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <NavBar />
            <h1>Reviews for Movie</h1>
            <div className={styles.search}>
                <input
                    type="text"
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by review comments..."
                />
            </div>
            {filteredReviews.length === 0 ? (
                <p className={styles.noReviewsText}>No reviews found.</p>
            ) : (
                <div className={styles.reviewList}>
                    {filteredReviews.map((review) => (
                        <div key={review._id} className={styles.reviewCard}>
                            <h2>Reviewer: {review.reviewerName}</h2>
                            <p>Rating: {review.rating}</p>
                            <p>Comments: {review.reviewComments}</p>
                            <button className={styles.deleteButton} onClick={() => handleDeleteReview(review._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsPage;

