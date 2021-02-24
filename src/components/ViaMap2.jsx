import React, { useContext, useEffect } from "react";
import { Map, TileLayer, FeatureGroup, useLeaflet, Tooltip } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { SpatialContext } from '../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext'
import { UserMessageContext } from "../contexts/UserMessageContext";


function EditableLayer(props) {
    const { spatials, saveSpatial } = useContext(SpatialContext)
    const { setAlertEdit } = useContext(UserMessageContext)

    const leaflet = useLeaflet();
    const editLayerRef = React.useRef();
    let drawControlRef = React.useRef();
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
                saveSpatial(changedLayerGeoJson)
                setAlertEdit(true)
            }
        })
    }

    return (
        <div>
            <FeatureGroup ref={editLayerRef}>
                <EditControl
                    position="topright"
                    onMounted={onMounted}
                    onEdited={onEdited}
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
                <Tooltip sticky>{props.layer.feature.name}</Tooltip>
            </FeatureGroup>
        </div>
    );
}

function AddLayer(props) {
    const { saveSpatial } = useContext(SpatialContext)
    const { activeSpatialID } = useContext(ActiveSpatialContext)
    const { setAlertCreate } = useContext(UserMessageContext)

    const leaflet = useLeaflet();
    let drawControlRef = React.useRef();
    let { map } = leaflet;

    useEffect(() => {
        if (activeSpatialID) {
            map.removeControl(drawControlRef.current);
        } else {
            map.addControl(drawControlRef.current);
        }
    }, [props, map, activeSpatialID]);

    const onMounted = (ctl) => {
        drawControlRef.current = ctl;
    }

    const onCreated = e => {
        saveSpatial(e.layer.toGeoJSON())
        setAlertCreate(true)
    }

    return (
        <div>
            <FeatureGroup>
                <EditControl
                    position="topright"
                    onMounted={onMounted}
                    onCreated={onCreated}
                    edit={{
                        remove: false,
                        edit: false
                    }}
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

    const dataLayer = new L.GeoJSON(data, {
        style: feature => {
            return ({
                fillColor: feature.color,
                fillOpacity: activeSpatialID === feature.id ? 1 : 0.4,
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

export default function ViaMap2(props) {
    const { spatials } = useContext(SpatialContext)

    const center = [40.64564461264746, -73.84831527895031]

    return spatials ?
        (<Map
            center={center}
            // center={[spatials.features[0].geometry.coordinates[0][0][1], spatials.features[0].geometry.coordinates[0][0][0]]}
            zoom={12}>
            < TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <EditableGroup data={spatials} />
        </Map >)
        : (<Loader
            className="loader"
            type="Circles"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={3000} //3 secs
        />)
}