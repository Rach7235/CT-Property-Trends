import React from "react";
import { Link } from 'react-router-dom';
import ImageSlider from '../components/Imageslider.js';


export default function HomePage() {
    // Ordered list of query types to display on page
            const items = [
                "Average Sales Amount",
                "Total Sales Volume",
                "Average Sales Ratio",
                "Average Assessed Value",
                "Total Sales Volume Monthly"
            ];

            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',

                }}>
                    <p style={{
                        color: 'black',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        marginBottom: '30px'
                    }}>
                        Welcome to CT Property Trends!
                    </p>
                    <p>This application allows users to gain deeper insight on real estate trends in Connecticut over
                        the past 15 years.</p>
                    <p>Data was sourced from the Connecticut Office of Policy and Management for the years 2007 - 2022.</p>
                    <p style={{
                        color: 'black',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        marginBottom: '30px'
                    }}>
                        How It Works
                    </p>
                    <p>Explore detailed property sales data from within the state with five types of queries that can be
                        made:</p>
                    <ol style={{fontSize: '20px', color: 'black'}}>
                        {items.map((item, index) => (
                            <li key={index} style={{marginBottom: '10px', textAlign: 'center'}}>{item}</li>
                        ))}
                    </ol>
                    <p>The resulting data will be represented visually on a map or graph with legends. Below are sample images of what it will look like:</p>
                    <ImageSlider/>
                    <p style={{
                        color: 'black',
                        fontSize: '40px',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }}>
                        Get Started!
                    </p>
                    <p>To begin, head to the form page below and choose your selections of query type, town, sales year, sales price, sales ratio, and residential property type.</p>
                    <p>Once satisfied with your choices, hit the submit button.</p>
                    <p>To switch between map and graph representations, hit their respective map or graph button.</p>
                    <p>To clear your selections, hit the clear button. Or, you can simply just make another query and hit submit again.</p>
                    <Link to="/form" style={{marginTop: '20px'}}>
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