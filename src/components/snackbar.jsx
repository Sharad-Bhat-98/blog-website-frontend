import React from 'react'
import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { useState } from 'react'

const SnackBarComponent = (props) => {
    const { opensnack, erroropensnack, alerttype, alertMessage } = props
    const [alerterror, setAlertError] = useState({
        type: alerttype,
        message: alertMessage,
    })
    const [open, setOpen] = useState({ opensnack })
    const [erropen, setErrOpen] = useState({ erroropensnack })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen({ ...open, opensnack: false })
        setErrOpen({ ...erropen, erroropensnack: false })
        setAlertError({ ...alerterror, type: '', message: '' })
    }

    const displayalert = () => {
        if (alerterror.type === 'error') {
            const data = alerterror.error
            return (
                <Snackbar
                    open={erropen.erroropensnack}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        {alerterror.message}
                    </Alert>
                </Snackbar>
            )
        } else if (alerterror.type === 'success') {
            return (
                <Snackbar
                    open={open.opensnack}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        {alerterror.message}
                    </Alert>
                </Snackbar>
            )
        } else {
            return null
        }
    }
    return <React.Fragment>{displayalert()}</React.Fragment>
}

export default SnackBarComponent
