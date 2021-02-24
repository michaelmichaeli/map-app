import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiData } from "./../api"; //when not fetching from real API
import { ActiveSpatialContext } from "./ActiveSpatialContext";
import axios from "axios";

const randomColor = require("randomcolor");
const cityseeker = require("city-seeker");

export const SpatialContext = createContext();

export const SpatialProvider = ({ children }) => {
	const { activeSpatialID, setActiveSpatialID } = useContext(
		ActiveSpatialContext
	);

	const [spatials, setSpatials] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			// const data = await getApiData(); //when not fetching from real API
			let data = await axios.get(
				"https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Election_Districts_Water_Included/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson"
			);
			data = data.data;
			data.features = data.features
				.splice(0, 200) // TODO optimize big-data: fetching, memoizing, lazy-loading, infinite-loading...
				.map((feature) => {
					feature.name = cityseeker.any().city.name;
					feature.color = randomColor();
					feature.creationDate = Date.now();
					feature.comment =
						"Lorem ipsum dolor sit, amet consectetur adipisicing elit. asperiores, pariatur nihil quod commodi? Necessitatibus, amet?";
					return feature;
				});
			setSpatials(data);
		};
		fetchData();
	}, []);

	const getActiveSpatialCoords = () => {
		const spatialIndex = spatials.features.findIndex(
			(currSpatial) => currSpatial.id === activeSpatialID
		);
		console.log(spatials.features[spatialIndex].geometry.coordinates[0][0]);
		return [
			spatials.features[spatialIndex].geometry.coordinates[0][0][1],
			spatials.features[spatialIndex].geometry.coordinates[0][0][1],
		];
	};

	const deleteSpatialByID = (spatialID) => {
		const spatialIndex = spatials.features.findIndex(
			(currSpatial) => spatialID === currSpatial.id
		);
		const newSpatials = { ...spatials };
		newSpatials.features.splice(spatialIndex, 1);

		setSpatials(newSpatials);
		setActiveSpatialID(null);
	};

	const saveSpatial = (spatial) => {
		const addNewSpatial = () => {
			const newSpatial = spatial;
			const newSpatials = { ...spatials };
			if (spatials.length !== 0) {
				newSpatial.id = spatials.features[spatials.features.length - 1].id + 1; // TODO: NEW UNIQUE ID
			} else {
				newSpatial.id = 1; // TODO: NEW UNIQUE ID
			}
			newSpatial.name = "New " + cityseeker.any().city.name;
			newSpatial.color = randomColor({ luminosity: "light" });
			newSpatial.creationDate = Date.now();
			newSpatial.comment = "";

			newSpatials.features.push(newSpatial);
			setSpatials(newSpatials);
			setTimeout(() => {
				setActiveSpatialID(newSpatial.id);
			}, 0);
		};

		const updateSpatial = () => {
			const newSpatials = spatials;
			newSpatials.features[spatialIndex] = spatial;
			setSpatials(newSpatials);
		};

		const spatialIndex = spatials.features.findIndex(
			(currSpatial) => spatial.id === currSpatial.id
		);

		if (!spatial.id || spatialIndex < 0) addNewSpatial();
		else {
			updateSpatial();
		}
	};

	return (
		<SpatialContext.Provider
			value={{
				spatials,
				setSpatials,
				saveSpatial,
				deleteSpatialByID,
				getActiveSpatialCoords,
			}}
		>
			{children}
		</SpatialContext.Provider>
	);
};
