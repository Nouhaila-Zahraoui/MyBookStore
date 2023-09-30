import logo from './logo.svg';
import './App.css';
import Books from "./books/Books";
import Book from './books/Book';
import {BrowserRouter, Route, Routes, Router, Switch} from "react-router-dom";
import React from "react";
import Review from "./books/Review";
import Adventure from './books/categories/Adventure';
import Horror from './books/categories/Horror';
import Poetry from './books/categories/Poetry';
import Science from './books/categories/Science';
import Comedy from "./books/categories/Comedy";
import Religion from "./books/categories/Religion";
function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                    <Route path="/"  element={<Books /> } />
                    <Route path="/book/:id" element={<Book />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/adventure" element={<Adventure />} />
                    <Route path="/horror" element={<Horror />} />
                    <Route path="/poetry" element={<Poetry />} />
                    <Route path="/science" element={<Science />} />
                    <Route path="/comedy" element={<Comedy />} />
                    <Route path="/religion" element={<Religion />} />






            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
