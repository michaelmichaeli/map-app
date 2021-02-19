import React, { useContext } from 'react';
import { MapContainer, Polygon, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

import { SpatialContext } from './../contexts/SpatialContext'


export default function Map() {

	const [spatials, setSpatials] = useContext(SpatialContext)

	return (
		<MapContainer
			center={spatials[0].coordinates[0]}
			zoom={14}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

		{spatials.map(spatial => {
				
				return <Polygon
					key={spatial.id}
					positions={spatial.coordinates}
					pathOptions={{ color: spatial.color }}
					opacity={1}
					eventHandlers={{
						mouseover: () => {
							console.log(spatial.id);

						},
						mouseout: () => {
							console.log('Out');
						}
					}}
				/>
			})} 
			
		</MapContainer>
	);
}
