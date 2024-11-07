import React from "react";
import { Link } from 'react-router-dom';


export default function HomePage() {
    return (
        <div>
            <p>This is the home page</p>
            <Link to="/form">
            <button
           style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
            }}
            >
            Go to Form Page
            </button>
            </Link>
        </div>
    );
};