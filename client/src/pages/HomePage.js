import React from "react";
import { Link } from 'react-router-dom';


export default function HomePage() {
    return (
        <div>
                <p>Welcome to CT Property Trends!</p>
                <Link to="/form">
                        <button
                            style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#0047AB',
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