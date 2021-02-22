import React, { useContext } from 'react';

import { ActiveSpatialContext } from './../contexts/ActiveSpatialContext'


export default function SpatialRow({ spatial }) {

    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)

    return <li
        className={"spatial-row flex-col"}
        onClick={() => {
            setActiveSpatialID(spatial.id)
            console.log('clicked row spatial:', spatial);
        }}
    >
        <div className="row-header flex-row">
            <p className="id">{spatial.id}</p>
            <div className="color-sample" style={{ backgroundColor: spatial.color }}></div>
            <h4 className="name">{spatial.name}</h4>
        </div>
        {spatial.id === activeSpatialID && <div className="row-content">
            <p className="comment">Comment: {spatial.comment}</p>
        </div>}
    </li>
}
