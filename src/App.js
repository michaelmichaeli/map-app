import "./App.scss";
import SpatialList from "./components/SpatialList";

import { SpatialProvider } from "./contexts/SpatialContext";

function App() {
	return (
		<SpatialProvider>
			<div className="App">
				<SpatialList />
			</div>
		</SpatialProvider>
	);
}

export default App;
