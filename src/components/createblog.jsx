import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Header from './header'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Joi from 'joi-browser'
import { postBlog } from './backendcalls/blogcalls'
import { Redirect } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import SnackBarComponent from './snackbar'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}))

const CreateBlog = () => {
    const [data, setData] = useState({
        formData: '',
    })
    const [Error, setError] = useState({
        blogdata: '',
        blogtitle: '',
        photo: '',
    })
    const [Alert, setAlert] = useState({ type: false, message: '' })
    const [redirect, setReditect] = useState(false)

    const schema = {
        blogdata: Joi.string().required().min(5),
        blogtitle: Joi.string().required(),
    }
    useEffect(() => {
        setData({ ...data, formData: new FormData() })
    }, [])
    const handlechange = (e) => {
        data.formData.set(e.target.name, e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })
        const obj = { [e.target.name]: e.target.value }
        const schema1 = { [e.target.name]: schema[e.target.name] }
        const { error } = Joi.validate(obj, schema1)
        const res = error ? error.details[0].message : null
        setError({ ...Error, [e.target.name]: res })
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
        data.formData.append(e.target.name, img)
        setData({ ...data, photo: img })
        setError({ ...Error, photo: null })
    }
    const setDisabled = () => {
        if (
            Error.blogdata == null &&
            Error.blogtitle == null &&
            Error.photo == null
        ) {
            return false
        } else {
            return true
        }
    }

    const submit = () => {
        postBlog(data)
            .then(() => {
                setReditect(true)
            })
            .catch((err) => {
                console.log(err)
                setAlert({
                    ...Alert,
                    type: true,
                    message: 'BLOG NOT CREATED',
                })
            })
    }

    const redirectPage = () => {
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return
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

    const classes = useStyles()

    return (
        <React.Fragment>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h3"> Create Your Blog Here</Typography>
                <TextField
                    name="blogtitle"
                    label="BLOG TITLE"
                    variant="outlined"
                    onChange={handlechange}
                    error={Error.blogtitle ? true : false}
                    helperText={Error.blogtitle}
                    style={{
                        width: '80%',
                        marginBottom: '5%',
                        marginTop: '3%',
                    }}
                />
                <br></br>
                <TextField
                    multiline
                    name="blogdata"
                    label="create a post"
                    rows={7}
                    variant="outlined"
                    style={{ width: '80%', marginBottom: '2%' }}
                    error={Error.blogdata ? true : false}
                    helperText={Error.blogdata}
                    onChange={handlechange}
                />
                <br></br>

                <div className={classes.root}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleimageupload}
                        name="photo"
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                            size="large"
                            endIcon={<PhotoCamera />}
                        >
                            Upload BLOG image
                        </Button>
                    </label>
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginTop: '2%' }}
                    disabled={setDisabled()}
                    onClick={submit}
                >
                    POST
                </Button>
            </div>
            {redirectPage()}
            {alertMessage()}
        </React.Fragment>
    )
}

export default withRouter(CreateBlog)
