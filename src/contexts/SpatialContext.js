import React, { createContext, useContext, useEffect, useState } from "react";
import { getApiData } from "./../api"; //TODO: fetch from real API
import { ActiveSpatialContext } from "./ActiveSpatialContext";

const randomColor = require("randomcolor");
const cityseeker = require("city-seeker");

export const SpatialContext = createContext();

export const SpatialProvider = ({ children }) => {
	const { activeSpatialID, setActiveSpatialID } = useContext(
		ActiveSpatialContext
	);

	const [spatials, setSpatials] = useState(null);

	useEffect(() => {
		const asyncFunc = async () => {
			const data = await getApiData();
			data.features = data.features.map((feature) => {
				feature.name = cityseeker.any().city.name;
				feature.color = randomColor({ luminosity: "light" });
				feature.creationDate = Date.now();
				feature.comment =
					"Lorem ipsum dolor sit, amet consectetur adipisicing elit. asperiores, pariatur nihil quod commodi? Necessitatibus, amet? Fuga facere, aspernatur odio asperiores molestiae enim rerum maxime expedita repellat cumque sequi corporis sapiente officiis accusantium!";
				return feature;
			});
			setSpatials(data);
		};
		asyncFunc();
	}, []);

	const deleteSpatialByID = (spatialID) => {
		const spatialIndex = spatials.features.findIndex(
			(currSpatial) => spatialID === currSpatial.id
		);
		const newSpatials = { ...spatials };
		newSpatials.features.splice(spatialIndex, 1);

		// console.log("deleted id:", spatialID);
		// console.log(
		// 	"spatials after deletion left with:",
		// 	newSpatials.features.length
		// );

		setSpatials(newSpatials);
		setActiveSpatialID(null);
	};

	const saveSpatial = (spatial) => {
		const addNewSpatial = () => {
			const newSpatial = spatial;
			const newSpatials = { ...spatials };
			newSpatial.id = spatials.features[spatials.features.length - 1].id + 1; // TODO: NEW UNIQUE ID
			newSpatial.name = "New " + cityseeker.any().city.name;
			newSpatial.color = randomColor({ luminosity: "light" });
			newSpatial.creationDate = Date.now();
			newSpatial.comment = "";

			newSpatials.features.push(newSpatial);
			setSpatials(newSpatials);
			// console.log(spatials);
			setActiveSpatialID(newSpatial.id);
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
		// console.log("spatial saved:", spatial);
		// console.log("all spatials:", spatials.features);
	};

	return (
		<SpatialContext.Provider
			// value={{ spatials, setSpatials, saveSpatial }}
			value={{ spatials, setSpatials, saveSpatial, deleteSpatialByID }}
		>
			{children}
		</SpatialContext.Provider>
	);
};
