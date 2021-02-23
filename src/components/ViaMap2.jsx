import React, { useContext, useState, useEffect } from "react";
import { Map, TileLayer, FeatureGroup, useLeaflet, Tooltip } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import { SpatialContext } from '../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext'


function EditableLayer(props) {
    const { spatials, setSpatials, saveSpatial, deleteSpatialByID } = useContext(SpatialContext)
    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)

    const leaflet = useLeaflet();
    const editLayerRef = React.useRef();
    let drawControlRef = React.useRef();
    // const geoJsonRef = React.useRef();
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
    }, [props, map, spatials]);

    const onMounted = (ctl) => {
        drawControlRef.current = ctl;
    }

    const onEdited = e => {
        e.layers.eachLayer(l => {
            const changedLayerGeoJson = l.toGeoJSON();
            const { layer } = props;

            if (changedLayerGeoJson.id === layer.feature.id) {

                console.log('changedLayer: ', changedLayerGeoJson);
                console.log('currentLayer: ', layer.feature)
                saveSpatial(changedLayerGeoJson)
            }
        })
    }

    const onDeleted = e => {
        // console.log('layers',e.layers.toGeoJSON().features[0].id);
        const deletedLayerGeoJson = e.layers.toGeoJSON().features[0];
        deleteSpatialByID(deletedLayerGeoJson.id)
        // deleteSpatialByID(activeSpatialID)
        // console.log('id after deletion: ', deletedLayerGeoJson.id)
    }

    // geoJsonRef.current = geoJsonRef.current ? geoJsonRef.current + 1 : 1;
    // console.log('editableLayer ', geoJsonRef.current);
    return (
        <div>
            <FeatureGroup ref={editLayerRef}>
                <EditControl
                    position="topright"
                    onMounted={onMounted}
                    onEdited={onEdited}
                    onDeleted={onDeleted}
                    edit={{
                        remove: false,
                        edit: true
                    }}
                    draw={{
                        marker: false,
                        circle: false,
                        rectangle: false,
                        polygon: false,
                        polyline: false,
                        circlemarker: false
                    }}
                    {...props}
                />
            </FeatureGroup>
        </div>
    );
}

function AddLayer(props) {
    const { spatials, setSpatials, saveSpatial } = useContext(SpatialContext)
    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)

    const leaflet = useLeaflet();
    const editLayerRef = React.useRef();
    let drawControlRef = React.useRef();
    let { map } = leaflet;

    useEffect(() => {

        if (activeSpatialID) {
            map.removeControl(drawControlRef.current);
        } else {
            map.addControl(drawControlRef.current);
        }

    }, [props, map]);

    const onMounted = (ctl) => {
        drawControlRef.current = ctl;
    }

    const onCreated = e => {
        saveSpatial(e.layer.toGeoJSON())
    }

    return (
        <div>
            <FeatureGroup ref={editLayerRef}>
                <EditControl
                    position="topright"
                    onMounted={onMounted}
                    // onEdited={onEdited}
                    onCreated={onCreated}
                    edit={{
                        remove: false,
                        edit: false
                    }}
                    draw={{
                        marker: false,
                        circle: false,
                        rectangle: false,
                        polygon: !activeSpatialID,
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

    const dataLayer = new L.GeoJSON(data, {
        style: feature => {
            return ({
                fillColor: feature.color,
                fillOpacity: activeSpatialID === feature.id ? 1 : 0.4,
                // stroke: activeSpatialID === feature.id,
                color: "black",
                opacity: activeSpatialID === feature.id ? 1 : 0.2
            })
        },
        tooltip: feature => (feature.name)
    });
    const layers = [];
    let i = 1;
    dataLayer.eachLayer((layer) => {
        layer.feature.properties.editLayerId = i++;
        layers.push(layer);
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
                        onLayerClicked={() => {
                            setActiveSpatialID(editLayerId)
                        }}
                    >
                    </EditableLayer >
                );
            })}
            <AddLayer />
        </div>
    );
}

function ViaMap2(props) {
    const { spatials, setSpatials } = useContext(SpatialContext)
    const { setActiveSpatial, activeSpatial } = useContext(ActiveSpatialContext)

    return spatials ?
        (<Map
            center={[spatials.features[0].geometry.coordinates[0][0][1], spatials.features[0].geometry.coordinates[0][0][0]]}
            zoom={13}>
            < TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <EditableGroup data={spatials} />
            <div>kkk</div>
        </Map >)
        : null; // TODO: Loader
}

export default ViaMap2;
