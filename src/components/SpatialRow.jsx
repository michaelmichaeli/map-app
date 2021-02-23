import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { SpatialContext } from '../contexts/SpatialContext';
import { ActiveSpatialContext } from './../contexts/ActiveSpatialContext'


export default function SpatialRow({ spatial }) {

    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)
    const { spatials, setSpatials, saveSpatial, deleteSpatialByID } = useContext(SpatialContext)

    return <li
        className={"spatial-row flex-col"}
        
    >
        <div className="row-header flex-row"
        onClick={() => {
            (activeSpatialID === spatial.id) ?
                setActiveSpatialID(null)
                :
                setActiveSpatialID(spatial.id)
            // console.log('clicked row spatial:', spatial);
        }}
        >
            <p className="id">{spatial.id}</p>
            <div className="color-sample" style={{ backgroundColor: spatial.color }}></div>
            <h4 className="name">{spatial.name}</h4>
            {/* <a
                className="find"
                title="Centralize map at spatial"
            // onClick={()=>setCenter()}
            >Find</a> */}
        </div>
        {spatial.id === activeSpatialID && <div className="row-content">
            <div className="info">
                <p className="creation-date">Created: <span>{moment(spatial.creationDate).fromNow()} on { moment(spatial.creationDate).format("dddd, MMMM Do YYYY, h:mm:ss a") }</span></p>
                <p className="ElectDist">ElectDist: <span>{spatial.properties.ElectDist ? spatial.properties.ElectDist : "No Dist"}</span></p>
                <p className="shape-area">shape-area: <span>{spatial.properties.Shape__Area ? spatial.properties.Shape__Area : "No Shape Area"}</span></p>
                <p className="shape-length">shape-length: <span>{spatial.properties.Shape__Length ? spatial.properties.Shape__Length : "No Shape length"}</span></p>
                <p className="comment-title">Comment: </p>
                <p className="comment-content">{spatial.comment ? spatial.comment : "No comment"}</p>
            </div>
            <button
                onClick={()=>console.log('info button')}
            >Edit Info</button>
            <button
                onClick={()=>deleteSpatialByID(spatial.id)}
            >Remove Spatial</button>
        </div>}
    </li>
}
