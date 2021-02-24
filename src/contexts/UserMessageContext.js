import React, { createContext, useState } from "react";

export const UserMessageContext = createContext();

export const UserMessageProvider = ({ children }) => {
	const [ alertEdit, setAlertEdit] = useState(false);
	const [ alertDelete, setAlertDelete ] = useState(false);
	const [ alertCreate, setAlertCreate ] = useState(false);

	return (
		<UserMessageContext.Provider
			value={{
				alertEdit,
				setAlertEdit,
				alertDelete,
				setAlertDelete,
				alertCreate,
				setAlertCreate,
			}}
		>
			{children}
		</UserMessageContext.Provider>
	);
};
