import React, { useState } from 'react';

export default function SpatialRow({ spatial }) {

    const [isOpen, toggleIsOpen] = useState(false)

    return <li className="spatial-row flex-col" onClick={() => toggleIsOpen(!isOpen)}>
        <div className="top flex-row">
            <p>{spatial.id}</p>
            <div className="color-sample" style={{ backgroundColor: spatial.color }}></div>
            <h4>{spatial.name}</h4>
        </div>
        {isOpen && <div className="open"><p>Comment: {spatial.comment}</p></div>}
    </li>
}
