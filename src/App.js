import "./App.scss";
import SpatialList from "./components/SpatialList";
import Map from './components/Map'

import { SpatialProvider } from "./contexts/SpatialContext";

function App() {
	return (
		<SpatialProvider>
			<div className="App">
				<Map></Map>
				<SpatialList />
			</div>
		</SpatialProvider>
	);
}

export default App;
