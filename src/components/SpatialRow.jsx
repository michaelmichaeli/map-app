import React, { useContext } from 'react';

import { SpatialContext } from './../contexts/SpatialContext'


export default function SpatialRow({ spatial }) {


    const { activeSpatial, setActiveSpatial } = useContext(SpatialContext)

    return <li
        className={"spatial-row flex-col " + (spatial.isHovered ? "spatial-hovered" : "")}
        onClick={() => {
            setActiveSpatial(spatial.id)
            console.log('clicked row:', spatial.id);
        }}
    >
        <div className="row-header flex-row">
            <p>{spatial.id}</p>
            <div className="color-sample" style={{ backgroundColor: spatial.color }}></div>
            <h4>{spatial.name}</h4>
        </div>
        {spatial.id === activeSpatial && <div className="row-content">
            <p>Comment: {spatial.comment}</p>
        </div>}
    </li>
}
