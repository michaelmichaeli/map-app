import React from 'react';
import SpatialRow from './SpatialRow'


export default function SpatialList({ data }) {

    console.log('data', data);

    return <div className="spatial-list-container">
        <ul>
            {data.map((spatial) => <SpatialRow spatial={spatial} key={spatial.id} />)}
        </ul>
    </div>
}