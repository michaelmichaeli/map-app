import { useContext } from "react";
import "./App.scss";
import SpatialList from "./components/SpatialList";
import ViaMap from "./components/ViaMap";
import ViaMap2 from "./components/ViaMap2";
// import MapEditTool from "./components/MapEditTool";
import { SpatialContext } from "./contexts/SpatialContext";

function App() {
	const { spatials } = useContext(SpatialContext);
	return spatials ? (
		<div className="App">
			{/* <ViaMap /> */}
			<ViaMap2 />
			<SpatialList />
		</div>
	) : null; // TODO: Loader
}

export default App;
