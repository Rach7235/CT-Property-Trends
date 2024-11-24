import React, {useEffect, useState,useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import '../css/Map.css';
import Legend from './Legend.js';

// Pass the queryResults from FormPage as a prop to Map so it can be used here
// Also pass the selected year and month from slider as props
const Map = ({trendQuery, queryResults, selectedYear, selectedMonth, isMonthSlider, clear})=> {
    const [onselect, setOnselect] = useState({});

    const yearRef = useRef(selectedYear);
    const monthRef = useRef(selectedMonth);
    const sliderRef = useRef(isMonthSlider);
    const queryResultsRef = useRef(queryResults);

    //To update the values that are "captured" in the function
    useEffect(() => {
        yearRef.current = selectedYear;
        monthRef.current = selectedMonth;
        sliderRef.current = isMonthSlider;
        queryResultsRef.current = queryResults;
    }, [selectedYear, selectedMonth, isMonthSlider, queryResults]);

    // Reset map state when queryResults is cleared
    // Otherwise, old map incorrectly persists even if user makes another query
    useEffect(() => {
        if (clear) {
            setOnselect({});
            // setFilteredResults([]);
        }
    }, [clear]);

    // Logging to ensure query results are correctly passed to map page
   // console.log('Query Results in Map:', queryResults);


    // Highlight map piece (feature) when hovered over
    const highlightFeature = (e => {
        var layer = e.target;
        const properties = e.target.feature.properties;
        const TOWN_NAME = properties.TOWN_NAME;
        const YearOrMonthString = sliderRef.current ? monthRef.current.toString() : yearRef.current.toString();
        
        if (properties[YearOrMonthString] !== undefined) {
            // Set only the selected town's name and value for the selected year
            
            setOnselect({
                TOWN_NAME: TOWN_NAME,
                [YearOrMonthString]: properties[YearOrMonthString]
            });
        } else {
            console.log(`${isMonthSlider ? 'Month' : 'Year'} ${YearOrMonthString} not found in properties`);
        }

        // TEST CODE: log currently hovered over town and year or month values for debugging
        console.log(`Highlighting: ${TOWN_NAME} - ${isMonthSlider ? 'Month' : 'Year'} ${YearOrMonthString}: ${properties[YearOrMonthString]}`);


        layer.setStyle({
            weight: 1,
            color: "black",
            fillOpacity: 1
        });
    });

    const resetHighlight = (e => {
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    })

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    // Function to dynamically map values to colors based on trendQuery
    const mapPolygonColor = (value) => {
        switch (trendQuery) {
            case 'Avg Sales Amount':
                return value > 2000000 ? '#00ff00' : value > 1000000 ? '#7FFF00' : value > 400000 ? '#FFFF00' : value > 200000 ? '#fb6a4a' : value > 50000 ? '#de2d26' : '#a50f15';
            case 'Total Sales Volume':
                return value > 500 ? '#32CD32' : value > 300 ? '#7FFF00' : value > 200 ? '#FFFF00' : value > 100 ? '#fb6a4a' : value > 50 ? '#de2d26' : '#a50f15';
            case 'Avg Sales Ratio':
                return value > 2.5 ? '#32CD32' : value > 2.0 ? '#7FFF00' : value > 1.5 ? '#FFFF00' : value > 1.0 ? '#fb6a4a' : value > 0.5 ? '#de2d26' : '#a50f15';
            case 'Avg Assessed Value':
                return value > 833333 ? '#32CD32' : value > 666666 ? '#7FFF00' : value > 500000 ? '#FFFF00' : value > 333333 ? '#fb6a4a' : value > 166666 ? '#de2d26' : '#a50f15';
            case 'Total Sales Volume mnth':
                return value > 1500 ? '#32CD32' : value > 900 ? '#7FFF00' : value > 600 ? '#FFFF00' : value > 300 ? '#fb6a4a' : value > 150 ? '#de2d26' : '#a50f15';
            default:
                // Default color if no trend query matches is black
                return '#000000';
        }
    };



    const style = (feature => {
        const properties = feature.properties;
        const YearOrMonthString = sliderRef.current ? monthRef.current.toString() : yearRef.current.toString();
        return ({
            fillColor: mapPolygonColor(properties[YearOrMonthString]),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    const mapStyle = {
        height: '75vh',
        width: '85%',
        margin: '0 auto',
        position: 'relative',
        right: '7%',
    };


    return (
        <div className='container'>
            {trendQuery && <Legend trendQuery={trendQuery} />}
            <div className="">
                <div className="">
                    <div className="town-info-hover"></div>
                    {onselect.TOWN_NAME && (
                        <ul className="town-info">
                            <strong>Real Estate Information</strong>
                            <li>Town: {onselect.TOWN_NAME}</li>
                            <li>{isMonthSlider ? `Month ${selectedMonth}` : `Year ${selectedYear}`}: {onselect[isMonthSlider ? selectedMonth : selectedYear]}</li>
                        </ul>
                    )}
                    <MapContainer
                        center={[41.599998, -72.699997]}
                        zoom={9}
                        scrollWheelZoom={false}
                        style={mapStyle}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {queryResults && queryResults.length > 0 ? (
                            <GeoJSON
                                key={JSON.stringify(queryResults)}
                                data={queryResults}
                                style={style}
                                onEachFeature={onEachFeature}
                            />
                        ) : (
                            <div>Loading map data...</div>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}
export default Map;

