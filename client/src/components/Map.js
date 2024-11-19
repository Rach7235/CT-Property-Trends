import React,{useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import '../css/Map.css';
import features from '../data/ct_towns.json';


const Map = ()=>{
    const [onselect, setOnselect] = useState({});
    const highlightFeature = (e=> {
        var layer = e.target;
        const {TOWN_NAME} = e.target.feature.properties;
        setOnselect({
            TOWN_NAME: TOWN_NAME
        });
            layer.setStyle({
            weight: 1,
            color: "black",
            fillOpacity: 1
        });
    });

    // Resets the state i.e no properties should be displayed when a feature is not clicked or hovered over
    const resetHighlight= (e =>{
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    })
    // Function is called when a feature in the map is hovered over or when a mouse moves out of it
    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }


   // const feature = data_ct_towns_json.features.map(feature=> {
       // return(feature);
   // });

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
    }
    return(
         <div className='container'>
            <div className="">
                <div className="">
                    <div className="town-info-hover">
                    </div>
                    {onselect.TOWN_NAME && (
                        <ul className="town-info">
                            <strong>Real Estate Information</strong>
                            <li>Town: {onselect.TOWN_NAME}</li>
                            <br/>
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
                        <GeoJSON data={features}
                                 style={style}
                                 onEachFeature={onEachFeature}/>
                    </MapContainer>
                </div>
            </div>
         </div>

    )
}
export default Map;