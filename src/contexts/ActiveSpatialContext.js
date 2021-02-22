import React, { createContext, useState } from 'react'

export const ActiveSpatialContext = createContext()

export const ActiveSpatialProvider = ({ children }) => {

    const [activeSpatialID, setActiveSpatialID] = useState(null)

    return (
        <ActiveSpatialContext.Provider value={{ activeSpatialID, setActiveSpatialID }}>
            { children }
        </ActiveSpatialContext.Provider>
    )
}