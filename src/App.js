import { useContext } from 'react';
import "./App.scss";
import SpatialList from "./components/SpatialList";
import ViaMap from "./components/ViaMap";
import MapExample from "./components/EditSingleOnlyMap";
// import MapEditTool from "./components/MapEditTool";
import { SpatialContext } from './contexts/SpatialContext'


function App() {
	const { spatials } = useContext(SpatialContext)
	return spatials ? (
		
		<div className="App">

					{/* <ViaMap /> */}
					<MapExample />
					<SpatialList />
				
		</div>
	) : null;  // TODO: Loader
}

export default App;
