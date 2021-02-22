import data from "./geoJSON.json";
const randomColor = require("randomcolor");
const cityseeker = require("city-seeker");

export const getApiData = () => {
    data.features = data.features
        .slice(0, 10)
        .map((feature) => {
		feature.name = cityseeker.any().city.name;
		feature.color = randomColor({ luminosity: "light" });
		feature.creationDate = Date.now();
		feature.comment = "Add a comment";
		return feature;
	})
	// console.log(data);
	return data;
};

// export const getData = () => {
//     const spatials = data.features
//         .slice(0, 30)  // dev-mod only
//         .map(item => {
//         const spatial = {}

//         spatial.id = item.id
//         spatial.name = cityseeker.any().city.name
//         spatial.color = randomColor({ luminosity: 'light' })
//         spatial.coordinates = item.geometry.coordinates[0].map(item=>[item[1], item[0]])  // reversing coords otherwise placed in antartica :)
//         spatial.creationDate = Date.now()
//         spatial.comment = 'Add a comment'
//         // spatial.isHovered = false
//         return spatial
//     })
//         return spatials
// }
