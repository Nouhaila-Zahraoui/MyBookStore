import React, { useState } from 'react';
import './header.css'; // Import your CSS file for header styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Header({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Call the onSearch function from props to perform the search
        onSearch(query);
    };

    return (
        <header className="header">
            {/* Include the search bar inside the title div */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="borderless-input" // Apply the CSS class here
                />

                <FontAwesomeIcon icon={faSearch} />

            </div>
        </header>
    );
}

export default Header;
