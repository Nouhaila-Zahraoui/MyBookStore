import React, { useRef } from 'react';
import './Sidebar.css'; // Import your CSS for sidebar styles
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaFolderOpen, FaSearch, FaUsers, FaUserPlus,  FaStar,  FaUser, FaCog } from 'react-icons/fa'; // Import icons from the FontAwesome library
function Sidebar({ adventureRef, bestRated, teamRef }) {
    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <aside className="sidebar">
            <h1 className="logo">
                My Bookstore
            </h1>
            <Link to="/" className="sidebar-link">
                <FaHome /> Home
            </Link>
            <Link to="/mybooks" className="sidebar-link">
                <FaBook /> My Books
            </Link>
            <Link to="/" className="sidebar-link" onClick={() => scrollToSection(adventureRef)}>
                <FaFolderOpen  /> Categories
            </Link>

            <Link to="/" className="sidebar-link" onClick={() => scrollToSection(bestRated)}>
                <FaStar  /> Best Rated
            </Link>

            <Link to="/" className="sidebar-link" onClick={() => scrollToSection(teamRef)}>
                <FaUsers  /> Our Team
            </Link>

            {/* Create a container for the links */}
            <div className="sidebar-profile-section">
                <Link to="/profile" className="sidebar-link">
                    <FaUser /> Profile
                </Link>
                <Link to="/settings" className="sidebar-link">
                    <FaCog /> Settings
                </Link>
                <Link to="/signup" className="sidebar-link">
                    <FaUserPlus /> Sign Up
                </Link>
            </div>
        </aside>
    );
}

export default Sidebar;
