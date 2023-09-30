import React, {useEffect, useState} from 'react';
import './adventures.css';
import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Sidebar from "../Sidebar";
import { FaHeart } from 'react-icons/fa';
import axios from "axios";

// Import your CSS file for footer styles

function Science() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const adventureBooks = (searchQuery ? searchResults : books).filter(book => book.type === "Science");

    useEffect(() => {
        // Make an HTTP GET request to your Spring Boot API to fetch book data
        axios.get('http://localhost:8888/api/v1/mybooks')
            .then(response => {
                // Update the 'books' state with the retrieved data
                setBooks(response.data);

                // Update the 'searchResults' state based on the search query
                if (searchQuery) {
                    const results = response.data.filter(book =>
                        book.type === "Science" &&
                        book.titre.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setSearchResults(results);
                } else {
                    // Reset searchResults when searchQuery is empty
                    setSearchResults([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [searchQuery]);
    return (
        <div>
            <Sidebar />
            <main
                className="main-content"
                style={{
                    marginLeft: '190px',
                    height: '100%',
                    backgroundImage: `url("http://localhost:3000/images/b3.jpg")`,
                    backgroundRepeat: 'no-repeat', // Prevent background image from repeating
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Center the background image horizontally and vertically
                    width: '85%', // Adjust the width to 100% to ensure it

                }}
            >
                <Header onSearch={(query) => setSearchQuery(query)} />

                <center>
                    <h2 style={{
                        fontSize: '40px', // Adjust the font size as needed
                        color: '#a39999',    // Choose your desired text color
                        borderBottom: '2px solid #333', // Add a bottom border
                        paddingBottom: '30px', // Adjust the spacing between text and border
                        fontFamily: 'Georgia, serif', // Replace with your desired font family
                    }}>
                        The Adventure books
                    </h2>
                </center>
                <ul className="category">
                    {adventureBooks.map(book => (
                        <li className="category-card" key={book.id}>
                            <center>
                                <Link to={`/book/${book.id}`}>{book.titre}
                                    <img
                                        src={book.image}
                                        alt={`Image for ${book.titre}`}
                                    />
                                </Link>

                                <p>Likes: {book.likes}</p>
                            </center>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />

        </div>
    );
}

export default Science;
