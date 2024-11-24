import React from 'react';
import '../css/Legend.css';

// Dividing each range up into 6 segments to match example map. Can always be broken down further for more accuracy.
// Going off values on the map because querying for the minimum and maximum averages was giving wrong values and large ranges due to outliers
const Legend = ({ trendQuery }) => {
    const getLegend = () => {
        switch (trendQuery) {
            case 'Avg Sales Amount':
                return [
                    {color: '#00ff00', range: '2,000,000 - 2,862,000'},
                    {color: '#7FFF00', range: '1,000,000 - 1,999,999'},
                    {color: '#FFFF00', range: '400,000 - 999,999'},
                    {color: '#fb6a4a', range: '200,000 - 399,999'},
                    {color: '#de2d26', range: '50,000 - 199,999'},
                    {color: '#a50f15', range: '0 - 49,999'}
                ];
            case 'Total Sales Volume':
                return [
                    { color: '#32CD32', range: '501 - 1000' },
                    { color: '#7FFF00', range: '301 - 500' },
                    { color: '#FFFF00', range: '201 - 300' },
                    { color: '#fb6a4a', range: '101 - 200' },
                    { color: '#de2d26', range: '51 - 100' },
                    { color: '#a50f15', range: '0 - 50' }
                ];
            case 'Avg Sales Ratio':
                return [
                    { color: '#32CD32', range: '2.51 - 3.0' },
                    { color: '#7FFF00', range: '2.01 - 2.5' },
                    { color: '#FFFF00', range: '1.51 - 2.0' },
                    { color: '#fb6a4a', range: '1.01 - 1.5' },
                    { color: '#de2d26', range: '0.51 - 1.0' },
                    { color: '#a50f15', range: '0.0 - 0.5' }
                ];
            case 'Avg Assessed Value':
                return [
                    { color: '#32CD32', range: '833,333.34 - 1,000,000' },
                    { color: '#7FFF00', range: '666,666.68 - 833,333.33' },
                    { color: '#FFFF00', range: '500,000.01 - 666,666.67' },
                    { color: '#fb6a4a', range: '333,333.34 - 500,000' },
                    { color: '#de2d26', range: '166,666.68 - 333,333.33' },
                    { color: '#a50f15', range: '0 - 166,666.67' }
                ];
            case 'Total Sales Volume mnth':
                return [
                    { color: '#32CD32', range: '1,501 - 3,000' },
                    { color: '#7FFF00', range: '901 - 1,500' },
                    { color: '#FFFF00', range: '601 - 900' },
                    { color: '#fb6a4a', range: '301 - 600' },
                    { color: '#de2d26', range: '151 - 300' },
                    { color: '#a50f15', range: '0 - 150' }
                ];
            default:
                return [];
        }
    };

    const legendItems = getLegend();

    // Map each legend item to its color
    return (
        <div className="legend">
            <strong>{trendQuery} Legend</strong>
            {legendItems.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.color }}>
                    {item.range}
                </div>
            ))}
        </div>
    );
};


export default Legend;