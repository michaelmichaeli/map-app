import React, { useContext, useEffect } from 'react';
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw'
import L from 'leaflet';

import { SpatialContext } from '../contexts/SpatialContext'

export default function ViaMap(props) {
	const FGref = React.useRef();

	useEffect(() => {
		FGref.current && _onFeatureGroupReady(FGref.current);
		setTimeout(() => {
			_onFeatureGroupReady(FGref.current)
		}, 100);
	}, [FGref.current])


	const { spatials, setSpatials, setActiveSpatial, activeSpatial } = useContext(SpatialContext)

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
		console.log(spatials);
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

	const _onFeatureGroupReady = (reactFGref) => {
		// populate the leaflet FeatureGroup with the geoJson layers
		console.log('!!! FEATUREGROUP ready !!!')
		let leafletGeoJSON = new L.GeoJSON(spatials, {
			style: feature => {
				// console.log('feature: ', feature)
				return ({
					fillColor: feature.color,
					fillOpacity: 0.5,
					// opacity: 0,
					stroke: false
				})
			}
		}
		);
		console.log(leafletGeoJSON);

		let leafletFG = reactFGref;

		leafletGeoJSON.eachLayer((layer) => {
			layer.on({
				click: () => {
					console.log('clicked', layer)
					layer.options.color = "black"
					layer.options.fillOpacity = 1
					layer.options.opacity = 1
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

	let leafletGeoJSON = new L.GeoJSON(spatials);
	// console.log(leafletGeoJSON);

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
					onEdited={_onEdited}
					onCreated={_onCreated}
					onDeleted={_onDeleted}
					onMounted={_onMounted}
					onEditStart={_onEditStart}
					onEditStop={_onEditStop}
					onDeleteStart={_onDeleteStart}
					onDeleteStop={_onDeleteStop}
				/>

				{/* {/* {spatials.map(spatial => {

					const isActive = activeSpatial === spatial.id ? 0.9 : 0 */}

				{/* // return <Polygon */}
				{/* // 	key={spatial.id} */}
				{/* // 	positions={spatial.coordinates} */}
				{/* // 	pathOptions={{ color: spatial.color, fillColor: spatial.color, fillOpacity: 1 }} */}
				{/* // 	opacity={isActive} */}
				{/* // 	eventHandlers={{ */}
				{/* // 		click: () => { */}
				{/* // 			console.log('active id', spatial.id); */}
				{/* // 			setActiveSpatial(spatial.id) */}
				{/* // 			console.log('activeSpatial', activeSpatial); */}
				{/* // 		} */}
				{/* // 	}} */}
				{/* // > */}
				{/* // </Polygon> */}
				{/* // })} */}
			</FeatureGroup>

		</Map>
	);
}