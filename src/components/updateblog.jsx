import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Header from './header'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Joi from 'joi-browser'
import { updateBlog } from './backendcalls/blogcalls'
import { Redirect } from 'react-router-dom'

const UpdateBlog = ({ match }) => {
    const [data, setData] = useState({
        blogdata: '',
        id: '',
    })
    const [Error, setError] = useState({
        blogdata: '',
    })

    const [redirect, setReditect] = useState(false)

    const schema = {
        blogdata: Joi.string().required().min(5),
    }

    const handlechange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
            id: match.params.id,
        })
        const obj = { [e.target.name]: e.target.value }
        const schema1 = { [e.target.name]: schema[e.target.name] }
        const { error } = Joi.validate(obj, schema1)
        const res = error ? error.details[0].message : null
        setError({ ...Error, [e.target.name]: res })
    }
    const setDisabled = () => {
        if (Error.blogdata == null) {
            return false
        } else {
            return true
        }
    }

    const submit = () => {
        updateBlog(data)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setReditect(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const redirectPage = () => {
        if (redirect) {
            return <Redirect to="/" />
        } else {
            return
        }
    }

    return (
        <React.Fragment>
            <Header />
            <div style={{ marginTop: '5%', textAlign: 'center' }}>
                <TextField
                    multiline
                    name="blogdata"
                    label="update a blog data"
                    rows={7}
                    variant="outlined"
                    style={{ width: '70%' }}
                    error={Error.blogdata ? true : false}
                    helperText={Error.blogdata}
                    onChange={handlechange}
                />
                <br></br>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    style={{ marginTop: '2%' }}
                    disabled={setDisabled()}
                    onClick={submit}
                >
                    UPDATE
                </Button>
            </div>
            {redirectPage()}
        </React.Fragment>
    )
}

export default withRouter(UpdateBlog)
