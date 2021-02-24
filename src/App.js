import { useContext } from "react";
import "./App.scss";
import SpatialList from "./components/SpatialList";
import ViaMap2 from "./components/ViaMap2";

import { SpatialContext } from "./contexts/SpatialContext";
import UserMessages from "./components/UserMessages";

function App() {
	const { spatials } = useContext(SpatialContext);
	return (
		<div className="App">
			<UserMessages />
			<ViaMap2 />
			{spatials && <SpatialList />}
		</div>
	);
}

export default App;
