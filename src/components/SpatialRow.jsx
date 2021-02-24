import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { TextareaAutosize, TextField } from '@material-ui/core';
import { ColorPicker } from 'material-ui-color';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { SpatialContext } from '../contexts/SpatialContext';
import { ActiveSpatialContext } from './../contexts/ActiveSpatialContext'
import { UserMessageContext } from '../contexts/UserMessageContext';


export default function SpatialRow({ spatial }) {

    const { activeSpatialID, setActiveSpatialID } = useContext(ActiveSpatialContext)
    const { deleteSpatialByID } = useContext(SpatialContext)
    const { setAlertDelete } = useContext(UserMessageContext)

    return <li className={"spatial-row flex-col"}>
        <div
            className="row-header flex-row"
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
                <p className="creation-date">Created: 
                    <span>{moment(spatial.creationDate).fromNow()} on {moment(spatial.creationDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                </p>
                <p className="ElectDist">Electoral District: 
                    <span>{spatial.properties.ElectDist ? spatial.properties.ElectDist : "No Dist"}</span>
                </p>
                <p className="shape-area">Area: 
                    <span>{spatial.properties.Shape__Area ? spatial.properties.Shape__Area : "No Shape Area"}<span>Sq m</span></span>
                </p>
                <p className="comment-title">Comment: </p>
                <SpatialComment spatial={spatial} />
            </div>
            <div className="edit-info">
                <SpatialColorPicker spatial={spatial} className="color-picker" />
                <SpatialNameInput spatial={spatial} />
                <a
                    className="delete"
                    title="Remove Forever"
                    onClick={() => {
                        deleteSpatialByID(spatial.id)
                        setAlertDelete(true)
                    }}
                >
                    <DeleteForeverOutlinedIcon />
                </a>
            </div>
        </div>}
        
    </li>
}

const SpatialComment = ({ spatial }) => {
    const { saveSpatial } = useContext(SpatialContext)
    const [commentText, setCommentText] = useState(spatial.comment)
    useEffect(() => {
        spatial.comment = commentText
        saveSpatial(spatial)
    }, [commentText, saveSpatial, spatial])
    return <TextareaAutosize
        aria-label="comment-content"
        className="comment-content"
        value={commentText}
        placeholder="No Comment."
        onChange={e => {
            setCommentText(e.target.value)
            // spatial.comment = commentText
            // saveSpatial(spatial)
        }}
    />;
}

const SpatialNameInput = ({ spatial }) => {
    const { saveSpatial } = useContext(SpatialContext)
    const [nameText, setNameText] = useState(spatial.name)
    useEffect(() => {
        spatial.name = nameText ? nameText : spatial.name
        saveSpatial(spatial)
    }, [nameText, saveSpatial, spatial])
    return <TextField
        className="change-name"
        value={nameText}
        placeholder="Required"
        onChange={e => {
            setNameText(e.target.value)
            // spatial.name = nameText ? nameText : spatial.name
            // saveSpatial(spatial)
        }}
    />
}

const SpatialColorPicker = ({ spatial }) => {
    const { saveSpatial } = useContext(SpatialContext)
    const [color, setColor] = useState(spatial.color)
    useEffect(() => {
        spatial.color = color
        saveSpatial(spatial)
    }, [color, saveSpatial, spatial])
    return <ColorPicker
        disableAlpha
        hideTextfield
        value={color}
        onChange={e => {
            setColor(e.css.backgroundColor.toLocaleLowerCase())
            // spatial.color = color
            // saveSpatial(spatial)
        }}
    />
}