import React, { useContext, useState, useEffect } from "react";
import { Map, TileLayer, FeatureGroup, useLeaflet } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
// import data from "./data.json";

import { SpatialContext } from '../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext'


function EditableLayer(props) {
    const leaflet = useLeaflet();
    const editLayerRef = React.useRef();
    let drawControlRef = React.useRef();
    const geoJsonRef = React.useRef();
    let { map } = leaflet;

    useEffect(() => {

        if (!props.showDrawControl) {
            map.removeControl(drawControlRef.current);
        } else {
            map.addControl(drawControlRef.current);
        }

        editLayerRef.current.leafletElement.clearLayers();

        editLayerRef.current.leafletElement.addLayer(props.layer);
        props.layer.on("click", function (e) {
            props.onLayerClicked(e, drawControlRef.current);
        });
    }, [props, map]);

    function onMounted(ctl) {
        drawControlRef.current = ctl;
    }

    const onEdited = e => {
        e.layers.eachLayer(l => {
            const changedLayerGeoJson = l.toGeoJSON();
            const { layer } = props;
            console.log('changedLayer: ', changedLayerGeoJson);
            console.log('currentLayer: ', layer.feature)
            // if (!geoJsonRef.current) {
            //     console.log('not kayam');
            //     geoJsonRef.current = l.toGeoJSON();
            //     console.log('geoJSon: ', geoJsonRef.current)
            // } else {
            //     console.log(l.toGeoJSON() === geoJsonRef.current)
            // }
            // console.log(l.toGeoJSON())
    })
        // console.log(e.layers.eachLayer(l => l.toGeoJSON()));
    }
    geoJsonRef.current = geoJsonRef.current ? geoJsonRef.current + 1 : 1;
    console.log('editableLayer ', geoJsonRef.current);
    return (
        <div>
            <FeatureGroup ref={editLayerRef}>
                <EditControl
                    position="topright"
                    onMounted={onMounted}
                    onEdited={onEdited}
                    edit={{ remove: false }}
                    draw={{
                        marker: false,
                        circle: false,
                        rectangle: false,
                        polygon: true,
                        polyline: false,
                        circlemarker: false
                    }}
                    {...props}
                />
            </FeatureGroup>
        </div>
    );
}

function EditableGroup({ data }) {
    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)

    const dataLayer = new L.GeoJSON(data);
    const layers = [];
    let i = 1;
    dataLayer.eachLayer((layer) => {
        layer.feature.properties.editLayerId = i;
        layers.push(layer);
        i++;
    });

    return (
        <div>
            {layers.map((layer, i) => {
                const { editLayerId } = layer.feature.properties;
                return (
                    <EditableLayer
                        key={i}
                        layer={layer}
                        showDrawControl={i === activeSpatialID - 1}
                        onLayerClicked={() => setActiveSpatialID(editLayerId)}
                    />
                );
            })}
        </div>
    );
}

function MapExample(props) {


    const { spatials, setSpatials } = useContext(SpatialContext)
    const { setActiveSpatial, activeSpatial } = useContext(ActiveSpatialContext)


    return (
        <Map
            center={[spatials.features[0].geometry.coordinates[0][0][1], spatials.features[0].geometry.coordinates[0][0][0]]}
            zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <EditableGroup data={spatials} />
        </Map>
    );
}

export default MapExample;
