import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './books.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { FaHeart } from 'react-icons/fa';
import { useRef } from 'react';

function Books() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [likes, setLikes] = useState({});
    const [likedBooks, setLikedBooks] = useState(new Set());
    const popularBooks = (searchQuery ? searchResults : books).filter(book => book.likes > 20);

    const adventureRef = useRef(null);
    const bestRated = useRef(null)
    const teamRef = useRef(null);


    const teamMembers = [
        {
            id: 1,
            name: 'Nouhaila Zahraoui',
            role: 'CEO',
            bio: 'A passionate reader willing to helps fellow readers finding their desired books.',
            image: './images/nouhaila.jpeg',
        },
        {
            id: 2,
            name: 'Majda Hadjioui',
            role: 'CTO',
            bio: 'Working to make my dream library come true.',
            image: './images/majda.jpeg',
        },
        {
            id: 3,
            name: 'Meriem Nasih',
            role: 'Lead Developer',
            bio: 'When the programming and reading passions meet.',
            image: '../images/meriem.jpeg',
        },
        {
            id: 4,
            name: 'Nouhaila Ohappoune',
            role: 'Designer',
            bio: 'My passion for designing outstanding websites is enormous.',
            image: './images/noune.jpeg',
        },
    ];

    useEffect(() => {
        // Make an HTTP GET request to your Spring Boot API to fetch book data
        axios.get('http://localhost:8888/api/v1/mybooks')
            .then(response => {
                // Update the 'books' state with the retrieved data
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Define the onSearch function to filter books by titre
    const handleSearch = () => {
        // Filter the books based on the searchQuery
        const results = books.filter(book => book.titre.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(results);
    };
    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleIncrementLikes = (bookId) => {
        // Make an HTTP POST request to update likes in the backend
        if (!likedBooks.has(bookId)) {
            // Book hasn't been liked before
            // Make an HTTP POST request to your Spring Boot API to increment likes
            axios.post(`http://localhost:8888/api/v1/mybooks/increment-likes/${bookId}`)
                .then(response => {
                    // Update the 'likedBooks' set to prevent further liking
                    setLikedBooks(new Set(likedBooks).add(bookId));

                    // Update the likes count of the book in the state
                    const updatedBooks = books.map(book => {
                        if (book.id === bookId) {
                            book.likes = response.data.likes; // Assuming your response has 'likes' field
                        }
                        return book;
                    });
                    setBooks(updatedBooks);
                })
                .catch(error => {
                    console.error('Error liking book:', error);
                });
        }
    };

    useEffect(() => {
        handleSearch(); // Trigger the search whenever the searchQuery changes
    }, [searchQuery]);

    return (
        <div className="books-container">
            <Sidebar adventureRef={adventureRef} bestRated={bestRated} teamRef={teamRef} />
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
            >                        <Header onSearch={(query) => setSearchQuery(query)} />
                <center>
                    <h2 style={{
                        fontSize: '40px', // Adjust the font size as needed
                        color: '#a39999',    // Choose your desired text color
                        borderBottom: '2px solid #333', // Add a bottom border
                        paddingBottom: '30px', // Adjust the spacing between text and border
                        fontFamily: 'Georgia, serif', // Replace with your desired font family
                    }}>
                        The books list
                    </h2>
                </center>
                <ul className= "category">
                    {(searchQuery ? searchResults : books).map(book => (
                        <li className="category-card" key={book.id}>
                            <center>
                                <Link to={`/book/${book.id}`}>{book.titre}
                                <img
                                    src={book.image}
                                    alt={`Image for ${book.titre}`}
                                />
                                </Link>

                                <p>Likes: {book.likes}</p>
                                <button
                                    className={`like-button ${likedBooks.has(book.id) ? 'liked' : ''}`}
                                    disabled={likedBooks.has(book.id)}
                                    onClick={() => handleIncrementLikes(book.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '20px',
                                        color: likedBooks.has(book.id) ? '#cc0000' : 'black', // Set the heart color
                                        cursor: 'pointer',
                                        outline: 'none', // Remove outline on focus
                                    }}
                                >
                                    <FaHeart />
                                </button>
                            </center>
                        </li>
                    ))}
                </ul>
                <center>
                    <h2 style={{
                        fontSize: '40px', // Adjust the font size as needed
                        color: '#a39999',    // Choose your desired text color
                        borderBottom: '2px solid #333', // Add a bottom border
                        paddingBottom: '30px', // Adjust the spacing between text and border
                        paddingTop: '30px', // Adjust the spacing between text and border

                        fontFamily: 'Georgia, serif', // Replace with your desired font family
                    }}>
                        The books Categories
                    </h2>
                </center>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ul className="category">
                    <li className="category-card">
                        <section ref={adventureRef} className="category-section">
                            <center>
                            <Link to={`/adventure`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/adventure.jpg'}
                                        alt="Adventure Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Adventure</h3>
                                </div>
                            </Link>
                        </center>
                        </section>

                    </li>
                    <li className="category-card">
                        <center>
                            <section id="horror" className="category-section">
                            <Link to={`/horror`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/horror.jpg'}
                                        alt="Horror Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Horror</h3>
                                </div>
                            </Link>
                            </section>
                        </center>
                    </li>
                    <li className="category-card">
                        <center>
                            <section id="poetry" className="category-section">
                            <Link to={`/poetry`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/poetry.jpg'}
                                        alt="Poetry Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Poetry</h3>
                                </div>
                            </Link>
                            </section>
                        </center>
                    </li>
                    <li className="category-card">
                        <center>
                            <section id="science" className="category-section">
                            <Link to={`/science`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/science.jpg'}
                                        alt="science Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Science</h3>
                                </div>
                            </Link>
                            </section>
                        </center>
                    </li>

                    <li className="category-card">
                        <center>
                            <section id="comedy" className="category-section">
                            <Link to={`/comedy`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/comedy.jpg'}
                                        alt="Adventure Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Comedy</h3>
                                </div>
                            </Link>
                            </section>
                        </center>
                    </li>

                    <li className="category-card">
                        <center>
                            <section id="religion" className="category-section">
                            <Link to={`/religion`} style={{ textDecoration: 'none' }}>
                                <div style={{ width: '200px', height: '390px' }}>
                                    <img
                                        src={'./images/religion.jpg'}
                                        alt="Religion Category"
                                        style={{ width: '100%', height: '80%', objectFit: 'cover' }}
                                    />
                                    <h3 style={{ marginTop: '20px' }}>Religion</h3>
                                </div>
                            </Link>
                            </section>
                        </center>
                    </li>
                </ul>
                </div>
<center>
                <h2 style={{
                    fontSize: '40px', // Adjust the font size as needed
                    color: '#a39999',    // Choose your desired text color
                    borderBottom: '2px solid #333', // Add a bottom border
                    paddingBottom: '30px', // Adjust the spacing between text and border
                    paddingTop: '30px', // Adjust the spacing between text and border

                    fontFamily: 'Georgia, serif', // Replace with your desired font family
                }}>
                    The best rated books
                </h2>
            </center>



                <ul className="category">
                    {popularBooks.map(book => (
                        <li className="category-card" key={book.id}>
                            <section ref={bestRated} className="bestRated-section">
                            <center>
                                <Link to={`/book/${book.id}`}>{book.titre}
                                    <img
                                        src={book.image}
                                        alt={`Image for ${book.titre}`}
                                    />
                                    <p>Likes: {book.likes}</p>
                                </Link>
                            </center>
                            </section>
                        </li>
                    ))}
                </ul>
                <section ref={teamRef} className="team-section">

                <center>
                    <h2 style={{
                        fontSize: '40px', // Adjust the font size as needed
                        color: '#a39999',    // Choose your desired text color
                        borderBottom: '2px solid #333', // Add a bottom border
                        paddingBottom: '30px', // Adjust the spacing between text and border
                        paddingTop: '30px', // Adjust the spacing between text and border

                        fontFamily: 'Georgia, serif', // Replace with your desired font family
                    }}>
                        Our Team
                    </h2>

                <div className="team-cards">
                    {teamMembers.map((member) => (
                        <div className="team-card" key={member.id}>
                            <div className="team-image-container">
                            <img src={member.image} alt={member.name} className="team-image" />
                            </div>
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <p>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
                </center>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default Books;
