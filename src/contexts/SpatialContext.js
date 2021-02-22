import React, { createContext, useEffect, useState } from 'react'
import { getApiData } from './../api'      //TODO: fetch from real API

export const SpatialContext = createContext()

export const SpatialProvider = ({ children }) => {
    
    const [spatials, setSpatials] = useState(null)
    useEffect(() => {
        const myAsyncFunc = async () => {
            const data = await getApiData();
            setSpatials(data);
        }
        myAsyncFunc();
    }, [])
    
    
    return (
        <SpatialContext.Provider value={{ spatials, setSpatials }}>
            { children }
        </SpatialContext.Provider>
    )
}