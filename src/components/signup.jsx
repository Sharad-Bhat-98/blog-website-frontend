import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Header from './header'
import Joi from 'joi-browser'
import { useState, useEffect } from 'react'
import { signupcall } from './backendcalls/signupcall'
import Snackbar from '@material-ui/core/Snackbar'
import { Redirect } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { makeStyles } from '@material-ui/core/styles'
import SnackBarComponent from './snackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '7%',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    root1: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}))

const SignUp = () => {
    const classes = useStyles()
    const [data, setData] = useState({
        formData: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
    })
    const [Error, setError] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
    })
    const [alerterror, setAlertError] = useState({ type: 'error', error: '' })

    const [open, setOpen] = useState(true)
    const [erropen, setErrOpen] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const [redirectvalue, setRedirectValue] = useState({ value: null })
    const [Alert, setAlert] = useState({ type: false, message: '' })

    useEffect(() => {
        setData({ ...data, formData: new FormData() })
    }, [])

    useEffect(() => {
        if (redirect) {
            setTimeout(() => {
                setRedirectValue({
                    ...redirectvalue,
                    value: <Redirect to="/login" />,
                })
            }, 2000)
        }
    }, [redirect])

    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }

    const handleChange = (e) => {
        data.formData.set(e.target.name, e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })
        const obj = { [e.target.name]: e.target.value }
        const schema1 = { [e.target.name]: schema[e.target.name] }
        const { error } = Joi.validate(obj, schema1)
        const res = error ? error.details[0].message : null
        setError({ ...Error, [e.target.name]: res })
    }
    const handleConfrim = (e) => {
        setData({ ...data, confirmPassword: e.target.value })
        const pass = e.target.value
        checkpassword(pass)
    }

    const checkpassword = (pass) => {
        if (data.password != pass) {
            const res = 'Password does not match'
            setError({ ...Error, confirmPassword: res })
        } else {
            setError({ ...Error, confirmPassword: null })
        }
    }
    const setDisabled = () => {
        if (
            Error.email == null &&
            Error.password == null &&
            Error.confirmPassword == null &&
            Error.photo == null
        ) {
            return false
        } else {
            return true
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        setErrOpen(false)
    }

    const handleimageupload = (e) => {
        const img = e.target.files[0]
        if (img.size > 1000000) {
            setAlert({
                ...Alert,
                type: true,
                message: 'image should be less than 1MB',
            })
            return
        }

        data.formData.set(e.target.name, img)
        setData({ ...data, photo: img })
        setError({ ...Error, photo: null })
    }

    const submit = () => {
        signupcall(data)
            .then((data) => {
                if (data.errors) {
                    setErrOpen(true)
                    setAlertError({ ...alerterror, error: data.errors.email })
                } else {
                    setOpen(true)
                    setAlertError({ ...alerterror, type: 'success', error: '' })
                    setRedirect(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const displayalert = () => {
        if (alerterror.error != '') {
            const data = alerterror.error
            return (
                <Snackbar
                    open={erropen}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        {data}
                    </Alert>
                </Snackbar>
            )
        } else if (alerterror.type === 'success') {
            return (
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        User created
                    </Alert>
                </Snackbar>
            )
        }
    }

    const handleState = () => {
        setAlert({ ...Alert, type: false, message: '' })
    }

    const alertMessage = () => {
        if (Alert.type) {
            return (
                <SnackBarComponent
                    erroropensnack={true}
                    alerttype={'error'}
                    alertMessage={Alert.message}
                    handleState={handleState}
                />
            )
        } else {
            return null
        }
    }
    return (
        <div>
            <Header buttons={0} />
            <div style={{ textAlign: 'center', marginTop: '200px' }}>
                <TextField
                    placeholder="enter email"
                    label="email"
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
                    error={Error.email ? true : false}
                    helperText={Error.email}
                    style={{ marginBottom: '20px', minWidth: '330px' }}
                />
                <br></br>

                <TextField
                    placeholder="enter password"
                    label="password"
                    name="password"
                    variant="outlined"
                    onChange={handleChange}
                    error={Error.password ? true : false}
                    helperText={Error.password}
                    style={{ marginBottom: '20px', minWidth: '330px' }}
                />
                <br></br>

                <TextField
                    placeholder="Reenter password"
                    label="confirm password"
                    variant="outlined"
                    onChange={handleConfrim}
                    error={Error.confirmPassword ? true : false}
                    helperText={Error.confirmPassword}
                    style={{ marginBottom: '20px', minWidth: '330px' }}
                />
                <br></br>
                <div className={classes.root1}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="photo"
                        onChange={handleimageupload}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            size="large"
                            endIcon={<PhotoCamera />}
                        >
                            Profile Pic
                        </Button>
                    </label>
                </div>
                <br></br>
                {displayalert()}

                <Button
                    color="primary"
                    variant="contained"
                    disabled={setDisabled()}
                    onClick={submit}
                >
                    SignUP
                </Button>
                {redirectvalue.value}
            </div>
            {alertMessage()}
        </div>
    )
}

export default SignUp
