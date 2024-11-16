import React,{useState} from 'react';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import '../css/Map.css';
import {features} from '../data/ct_towns.js';


const Map = ()=>{
    const mapStyle = {
        height: '55vh',
        width: '85%',
        margin: '0 auto',
    }
    return(
         <div className='container'>
            {/* <div className="header">
            <h2 className='heading'>Kenya Population as Per 2019 National Census Exercise</h2>
            <p className="text-muted">A choropleth map displaying Kenya population density as per the national census conducted <br/>in 2019
            Each County, details displayed by the map include, total population and number of each gender.</p></div> */}
            <div className="">
                <div className="">
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
                    {/* {features && (
                    <GeoJSON data={features} 
                    style={style} 
                    onEachFeature={onEachFeature}/>
                    )} */}
                </MapContainer>
                </div>
            </div>
        </div>

    )
}
export default Map;


// var Map = L.map('map').setView([41.599998, -72.699997], 9);

// var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(Map);

// L.geoJson(townData).addTo(Map);

// export default Map;