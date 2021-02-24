import React, { useContext } from 'react';
import SpatialRow from './SpatialRow'
import Icon from '@material-ui/core/Icon';

import { SpatialContext } from './../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext';


export default function SpatialList() {

    const { spatials } = useContext(SpatialContext)
    const { activeSpatialID, setActiveSpatialID } = useContext(
        ActiveSpatialContext
    );

    return spatials ? (<div className="spatial-list-container">
        <div className="list-header flex-row flex-space-between">
            <h3>Spatials:</h3>
            {activeSpatialID && <a
                href="/#"
                className="done"
                title="Done"
                onClick={() => setActiveSpatialID(null)
                }
            >
                <Icon className="done-icon">done</Icon>
            </a>}
        </div>
        <ul>
            {spatials.features.map((spatial) => {
                return <SpatialRow
                    spatial={spatial}
                    key={spatial.id} />
            })}
        </ul>
        <p className="list-end">----List-End----</p>
    </div>)
        : null
}