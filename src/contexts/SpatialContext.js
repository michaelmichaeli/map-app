import React, { createContext, useState } from 'react'
import { getData } from './../api'

export const SpatialContext = createContext()

export const SpatialProvider = props => {

    const data = getData()

    const [spatials, setSpatials] = useState(data)

    return (
        <SpatialContext.Provider value={[spatials, setSpatials]}>
            { props.children }
        </SpatialContext.Provider>
    )
}