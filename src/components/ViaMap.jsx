import React, { useContext, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet';

import { SpatialContext } from '../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext'

export default function ViaMap(props) {
	const FGref = React.useRef();

	const { spatials, setSpatials } = useContext(SpatialContext)
	const { setActiveSpatial, activeSpatial } = useContext(ActiveSpatialContext)

	const _onEdited = (e) => {
		let numEdited = 0;
		e.layers.eachLayer((layer) => {
			numEdited += 1;
		});
		console.log(`_onEdited: edited ${numEdited} layers`, e);

		// _onChange();
	};

	const _onCreated = (e) => {
		let type = e.layerType;
		let layer = e.layer;
		if (type === 'marker') {
			// Do marker specific actions
			console.log('_onCreated: marker created', e);
		} else {
			console.log('_onCreated: something else created:', type, e);
		}
		// Do whatever else you need to. (save to db; etc)

		// _onChange();
	};

	const _onDeleted = (e) => {
		let numDeleted = 0;
		e.layers.eachLayer((layer) => {
			numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);

		// _onChange();
	};

	const _onMounted = (drawControl) => {
		console.log('_onMounted', drawControl);
	};

	const _onEditStart = (e) => {
		console.log('_onEditStart', e);
	};

	const _onEditStop = (e) => {
		console.log('_onEditStop', e);
	};

	const _onDeleteStart = (e) => {
		console.log('_onDeleteStart', e);
	};

	const _onDeleteStop = (e) => {
		console.log('_onDeleteStop', e);
	};

	let _editableFG = null;

	// const leafletGeoJSON = new L.GeoJSON(spatials);

	const _onFeatureGroupReady = (reactFGref) => {
		// populate the leaflet FeatureGroup with the geoJson layers

		let leafletGeoJSON = new L.GeoJSON(spatials, {
			style: feature => {
				// console.log('feature: ', feature)
				return ({
					fillColor: feature.color,
					fillOpacity: 0.8,
					// opacity: 0,
					stroke: false
				})
			}
		}
		);

		let leafletFG = reactFGref;

		leafletGeoJSON.eachLayer((layer) => {
			layer.on({
				click: () => {
					console.log('clicked on map layer:', layer)
					layer.options.color = "black"
					layer.options.opacity = 1
					layer.options.fillOpacity = 1
					setActiveSpatial(layer.feature.id)
				},
				// mouseover: () => {
				// 	console.log('mouseover', layer.feature.id)
				// 	setActiveSpatial(layer.feature.id)
				// }
			})
			leafletFG.leafletElement.addLayer(layer);
		});

		// store the ref for future access to content

		_editableFG = reactFGref;
	};

	useEffect(() => {
		setTimeout(() => {
			_onFeatureGroupReady(FGref.current)
		}, 0);
	}, [])
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		_onFeatureGroupReady(FGref.current)
	// 	}, 0);
	// }, [])

	// const _onChange = () => {
	// 	// this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

	// 	const { onChange } = props;

	// 	if (!_editableFG || !onChange) {
	// 		return;
	// 	}

	// 	const geojsonData = _editableFG.toGeoJSON();
	// 	onChange(geojsonData);
	// };

	return (
		<Map
			className="via-map"
			center={[spatials.features[0].geometry.coordinates[0][0][1],
			spatials.features[0].geometry.coordinates[0][0][0]]}
			zoom={14}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<FeatureGroup
				ref={FGref}
			>
				<EditControl
					position="topright"
					onEdited={e => {
						e.layers.eachLayer(a => {
							this.props.updatePlot({
								// id: id,
								feature: a.toGeoJSON()
							});
						});
					}}
					onCreated={_onCreated}
					onDeleted={_onDeleted}
					onMounted={_onMounted}
					onEditStart={_onEditStart}
					onEditStop={_onEditStop}
					onDeleteStart={_onDeleteStart}
					onDeleteStop={_onDeleteStop}
				/>
			</FeatureGroup>
		</Map>
	);
}