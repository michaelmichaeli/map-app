import React from 'react';
import { SpatialContext } from './SpatialContext';
import { ActiveSpatialContext } from './ActiveSpatialContext';

export const CentralContextProvider = ({ children }) => {
    return (
        <SpatialContext>
            <ActiveSpatialContext>
                {children}
            </ActiveSpatialContext>
        </SpatialContext>
    )
}