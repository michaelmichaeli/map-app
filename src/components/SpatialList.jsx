import React, { useContext, useEffect } from 'react';
import SpatialRow from './SpatialRow'

import { SpatialContext } from './../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext';


export default function SpatialList() {

    const { spatials } = useContext(SpatialContext)
    const { activeSpatialID, setActiveSpatialID } = useContext(
        ActiveSpatialContext
    );

    return <div className="spatial-list-container">
        <div className="list-header flex-row flex-space-between">
            <h3>Spatials:</h3>
            {activeSpatialID && <a
                className="done"
                title="Done"
                onClick={() => setActiveSpatialID(null) }
            >Done</a>}
        </div>
        <ul>
            {spatials.features.map((spatial) => <SpatialRow spatial={spatial} key={spatial.id} />)}
        </ul>
        <p className="list-end">----List-End----</p>
    </div>
}