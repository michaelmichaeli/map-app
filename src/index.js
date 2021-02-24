import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { SpatialProvider } from "./contexts/SpatialContext";
import { ActiveSpatialProvider } from "./contexts/ActiveSpatialContext";
import { UserMessageProvider } from "./contexts/UserMessageContext";

ReactDOM.render(
	<React.StrictMode>
		<ActiveSpatialProvider>
			<SpatialProvider>
				<UserMessageProvider>
					<App />
				</UserMessageProvider>
			</SpatialProvider>
		</ActiveSpatialProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
