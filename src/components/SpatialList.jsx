import React, { useContext, useEffect } from 'react';
import SpatialRow from './SpatialRow'
import Icon from '@material-ui/core/Icon';

import { SpatialContext } from './../contexts/SpatialContext'
import { ActiveSpatialContext } from '../contexts/ActiveSpatialContext';

import scrollIntoView from 'scroll-into-view-if-needed'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'


export default function SpatialList() {

    const { spatials } = useContext(SpatialContext)
    const { activeSpatialID, setActiveSpatialID } = useContext(
        ActiveSpatialContext
    );

    useEffect(() => {
        console.log('activeSpatialID', activeSpatialID);
        if (activeSpatialID) {
            const scrollIntoViewSmoothly = 
                'scrollBehavior' in document.documentElement.style
                    ? smoothScrollIntoView
                    : scrollIntoView
                
            const node = document.getElementById(activeSpatialID)
            scrollIntoViewSmoothly(node, {
                behavior: 'smooth',
                // scrollMode: 'if-needed',
                block: 'center',
                // inline: 'nearest',
            })
            // node.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }, [activeSpatialID])

    return spatials ? (<div className="spatial-list-container">
        <div className="list-header flex-row flex-space-between">
            <h3>Spatials:</h3>
            {activeSpatialID && <a
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