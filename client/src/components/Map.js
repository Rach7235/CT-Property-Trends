import React, {useEffect, useState,useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import '../css/Map.css';

// Pass the queryResults from FormPage as a prop to Map so it can be used here
// Also pass the selected year and month from slider as props
const Map = ({queryResults, selectedYear, selectedMonth, isMonthSlider, clear})=> {
    const [onselect, setOnselect] = useState({});
    const [filteredResults, setFilteredResults] = useState([]);

    const yearRef = useRef(selectedYear);
    const monthRef = useRef(selectedMonth);
    const sliderRef = useRef(isMonthSlider);
    const queryResultsRef = useRef(queryResults);

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
            setFilteredResults([]);
        }
    }, [clear]);

    // Logging to ensure query results are correctly passed to map page
   // console.log('Query Results in Map:', queryResults);


    // // Necessary so that only the year selected on slider is the results that are on the map
    // useEffect(() => {
    //     console.log(isMonthSlider ? `Month ${selectedMonth}` : `Year ${selectedYear}`);
    //     if (queryResults && selectedYear || selectedMonth) {
    //         // Convert to string for comparison because year and month is a number in frontend and in geoJson properties is a string
    //         const YearOrMonthString = isMonthSlider ? (selectedMonth.toString().padStart(2, '0')) : selectedYear.toString();
    //         const monthString = selectedMonth.toString().padStart(2, '0')
    //         if (isMonthSlider) {
    //             console.log("Selected Month as String:", monthString);
    //         }

    //         // Filter properties list to just the selected year or month and value for display in the map
    //         const filtered = queryResults.map((feature) => {
    //             const {TOWN_NAME} = feature.properties;

    //             if (feature.properties[YearOrMonthString] !== undefined) {
    //                 // Return the updated feature with the modified properties
    //                 return {
    //                     ...feature,
    //                     properties: {
    //                         TOWN_NAME,
    //                         [YearOrMonthString]: feature.properties[YearOrMonthString]
    //                     }
    //                 };
    //             }
    //             // Exclude towns without data for the selected year or month
    //             return null;
    //         }).filter((feature) => feature !== null)

    //         setFilteredResults(filtered);
    //         // Logging to ensure that filtered results only has the year or month selected and not all years/months from properties
    //         console.log('Filtered Results:', filtered);
    //     }
    //     // Re-run when queryResults, selectedYear, selectedMonth, or isMonthSlider changes
    //     // Used to dynamically change map rendering dependent on year or month slider
    // }, [queryResults, selectedYear, selectedMonth, isMonthSlider]);


    // Highlight map piece (feature) when hovered over
    const highlightFeature = (e => {
        var layer = e.target;
        const properties = e.target.feature.properties;
        const TOWN_NAME = properties.TOWN_NAME;
        const YearOrMonthString = sliderRef.current ? monthRef.current.toString() : yearRef.current.toString();
        
        console.log(`properties[YearOrMonthString] = ${properties[YearOrMonthString]}`)

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

    const style = (feature => {
        return ({
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

    // TEST CODE: Log onselect to ensure it's being updated correctly
    useEffect(() => {
        console.log('Onselect:', onselect);
    }, [onselect]);


    return (
        <div className='container'>
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

