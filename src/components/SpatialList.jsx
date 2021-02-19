import React, { useContext } from 'react';
import SpatialRow from './SpatialRow'

import { SpatialContext } from './../contexts/SpatialContext'


export default function SpatialList() {

    const [spatials, setSpatials] = useContext(SpatialContext)
    console.log('data', spatials);

    return <div className="spatial-list-container">
        <h3>Spatials:</h3>
        <ul>
            {spatials.map((spatial) => <SpatialRow spatial={spatial} key={spatial.id} />)}
        </ul>
    </div>
}