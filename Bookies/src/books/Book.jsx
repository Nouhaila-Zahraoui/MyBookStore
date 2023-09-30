import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Rating from 'react-rating-stars-component'; // Import the Rating component
import './book.css';

import ReviewModal from "./Review"; // Import the ReviewModal component

// ... (previous imports and code)

function Book() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Make an HTTP GET request to fetch book details using Axios
        axios.get(`http://localhost:8888/api/v1/mybooks/${id}`)
            .then(response => {
                // Update the 'book' state with the retrieved book data
                setBook(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleSaveReview = (reviewData) => {
        // Handle saving the review data (e.g., send it to the server)

        // Update the comments state with the new review data
        setComments([...comments, reviewData]);

        // Clear the input fields
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="books-container">
            <Sidebar />
            <main
                className="main-content"
                style={{
                    marginLeft: '190px',
                    height: '100%',
                    backgroundImage: `url("http://localhost:3000/images/back.jpg")`,
                    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Center the background image horizontally and vertically
                    width: '85%', // Adjust the width to 100% to ensure it

                }}
            >                <Header />
                <ul>
                    <li key={book.id} className="book-card" >
                        <center className="book-content">
                            <h1>Book Details</h1>
                            <img src={book.image} alt={book.titre} />
                            <h2>{book.titre}</h2>
                            <p>Author: {book.author}</p>
                            <p>Type: {book.type}</p>
                            <p>Description: {book.description}</p>
                            <p>Price: {book.prix}</p>
                            <p>Likes: {book.likes}</p>
                            <button className="button-review" onClick={() => setIsModalOpen(true)}>Write a Review</button>
                        </center>
                    </li>
                </ul>
                <ReviewModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    onSave={handleSaveReview}
                />
                <section className="comments">
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index} className="comment">
                                <div className="comment-header">
                                    <strong>{comment.username}</strong>
                                    <div className="rating-stars">
                                        <Rating
                                            value={comment.rating}
                                            count={5}
                                            edit={false}
                                        />
                                    </div>
                                </div>
                                <div className="comment-content">{comment.review}</div>
                            </li>
                        ))}
                    </ul>
                </section>

                <Footer />

            </main>
        </div>
    );
}

export default Book;
