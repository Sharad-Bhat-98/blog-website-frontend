import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { deleteBlog, getBlogDetails } from './backendcalls/blogcalls'
import Header from './header'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogDetail = () => {
    const [blogdetails, setBlogdetails] = useState([])
    const [redirect, setRedirect] = useState(false)
    const id = useParams()

    useEffect(() => {
        getBlogDetails(id.id)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setBlogdetails(data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDelete = () => {
        deleteBlog(blogdetails._id)
            .then(() => {
                setRedirect(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleRedirect = () => {
        if (redirect) {
            return <Redirect to="/" />
        }
    }

    const displayButtons = () => {
        const obj = JSON.parse(localStorage.getItem('jwt'))
        if (obj) {
            if (obj.user === blogdetails.userid) {
                return (
                    <div style={{ marginTop: '5px' }}>
                        <br></br>
                        <Link
                            to={`/updateblog/${blogdetails._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                            >
                                Update
                            </Button>
                        </Link>
                        &nbsp;&nbsp;
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                )
            } else {
                return null
            }
        }
        return null
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={6}>
                <img
                    src={`http://localhost:4000/blogimg/${id.id}`}
                    height="70%"
                    width="80%"
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h6" style={{ textAlign: 'justify' }}>
                    {blogdetails.blogdata}
                </Typography>
                {displayButtons()}
                {handleRedirect()}
            </Grid>
        </Grid>
    )
}

export default BlogDetail
