import React from 'react';
import {Routes, Route} from 'react-router-dom';
import FormPage from './pages/FormPage.js';
import HomePage from './pages/HomePage.js';


const App = () => {
    return (
            <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/form" element={<FormPage/>}/>
            </Routes>
    );
};

export default App;