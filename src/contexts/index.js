import React from "react";
import { SpatialContext } from "./SpatialContext";
import { ActiveSpatialContext } from "./ActiveSpatialContext";
import { UserMessageContext } from "./UserMessageContext";

export const CentralContextProvider = ({ children }) => {
	return (
		<ActiveSpatialContext>
			<SpatialContext>
                <UserMessageContext>
                    {children}
                </UserMessageContext>
			</SpatialContext>
		</ActiveSpatialContext>
	);
};
