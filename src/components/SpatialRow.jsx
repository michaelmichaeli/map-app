import React from 'react';


export default function SpatialRow({ spatial }) {

    return <li className="spatial-row" >
        <p>{spatial.id}</p>
        <div className="color-sample" style={{ backgroundColor: spatial.color }}></div>
        <h4>{spatial.name}</h4>
    </li>
}