import React, { createContext, useState } from 'react'
import { getData } from './../api'

export const SpatialContext = createContext()

export const SpatialProvider = ({ children }) => {

    const data = getData()

    const [spatials, setSpatials] = useState(data)

    const [activeSpatial, setActiveSpatial] = useState(null)

    return (
        <SpatialContext.Provider value={{ spatials, setSpatials, activeSpatial, setActiveSpatial }}>
            { children }
        </SpatialContext.Provider>
    )
}