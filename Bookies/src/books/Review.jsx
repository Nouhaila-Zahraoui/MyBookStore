import React, { useState } from 'react';
import Modal from 'react-modal';
import './review.css';
import Rating from 'react-rating-stars-component';

Modal.setAppElement('#root'); // Set the root element for the modal

function Review({ isOpen, closeModal, onSave }) {
    const [username, setUsername] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0); // Initialize the rating state

    const handleSave = () => {
        onSave({ username, review, rating }); // Include the rating in the onSave function
        setUsername('');
        setReview('');
        setRating(0); // Reset the rating state
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <h2>Write a Review</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <Rating
                value={rating}
                count={5}
                size={25} // Set the size to make the stars bigger
                onChange={(newRating) => setRating(newRating)}
            />

            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
        </Modal>
    );
}

export default Review;
