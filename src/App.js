import "./App.scss";
import SpatialList from "./components/SpatialList";
import ViaMap from './components/ViaMap'
// import MapEditTool from "./components/MapEditTool";

import { SpatialProvider } from "./contexts/SpatialContext";

function App() {
	return (
		<SpatialProvider>
			<div className="App">
				<ViaMap onChange={onChange} />
				<SpatialList />
			</div>
		</SpatialProvider>
	);
}

function onChange(geojson) {
	console.log('geojson changed', geojson);
  }

export default App;
