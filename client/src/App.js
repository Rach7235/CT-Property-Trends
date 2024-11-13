import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import FormPage from './pages/FormPage.js';
import HomePage from './pages/HomePage.js';
import Navbar from "./components/Navbar";
 //  <Navbar />

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/form" element={<FormPage/>}/>
            </Routes>
        </>
    );
};

export default App;