import React, { useContext } from "react";

import { UserMessageContext } from './../contexts/UserMessageContext'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function UserMessages() {

    const {
        alertEdit,
        setAlertEdit,
        alertDelete,
        setAlertDelete,
        alertCreate,
        setAlertCreate,
    } = useContext(UserMessageContext)

    return (
        <div className="user-message">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alertEdit}
                autoHideDuration={6000}
                onClose={() => setAlertEdit(false)}>
                <MuiAlert
                    onClose={() => setAlertEdit(false)}
                    severity="info"
                    elevation={6}
                    variant="filled"
                >
                    Spatial was saved successfully
                </MuiAlert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alertDelete}
                autoHideDuration={6000}
                onClose={() => setAlertDelete(false)}>
                <MuiAlert
                    onClose={() => setAlertDelete(false)}
                    severity="warning"
                    elevation={6}
                    variant="filled"
                >
                    Spatial was deleted succssfully
                </MuiAlert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={alertCreate}
                autoHideDuration={6000}
                onClose={() => setAlertCreate(false)}>
                <MuiAlert
                    onClose={() => setAlertCreate(false)}
                    severity="success"
                    elevation={6}
                    variant="filled" >
                    Spatial created successfully
                </MuiAlert>
            </Snackbar>
        </div>
    )
}