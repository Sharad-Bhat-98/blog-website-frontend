import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Header from './header'
import { getBlog } from './backendcalls/blogcalls'
import { Link } from 'react-router-dom'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        transition: 'transform 1s',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    media: {
        height: 250,
    },
}))

const Homepage = () => {
    const classes = useStyles()
    const [data, setData] = useState([])

    const preload = () => {
        getBlog()
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setData(data.blogs)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        //   const data=await getBlog();
        //   const obj=await data.json()
        //  // console.log(obj.)
        //   return obj
    }

    useEffect(() => {
        console.log('woarking')
        preload()
    }, [])

    return (
        <React.Fragment>
            <Header />

            <Grid
                container
                spacing={2}
                direction="row"
                justify="space-evenly"
                alignItems="baseline"
            >
                <Grid item xs={12}>
                    <Typography variant="h3" style={{ textAlign: 'center' }}>
                        Welcome Degerates!!!
                    </Typography>
                    <Typography variant="h6" style={{ textAlign: 'center' }}>
                        to my website
                    </Typography>
                </Grid>

                {data[0] ? (
                    data.map((e) => {
                        return (
                            <Grid item xs={3} key={e._id}>
                                <Card className={classes.root}>
                                    <Link
                                        to={`/blog/${e._id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                alt="Contemplative Reptile"
                                                image={`http://localhost:4000/blogimg/${e._id}`}
                                                title={e.blogtitle}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {e.blogtitle}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    component="p"
                                                    noWrap="true"
                                                    gutterBottom
                                                >
                                                    {e.blogdata}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                </Card>
                            </Grid>
                        )
                    })
                ) : (
                    <Typography variant="h5" style={{ marginTop: '10%' }}>
                        Loading.....
                    </Typography>
                )}
            </Grid>
        </React.Fragment>
    )
}

export default Homepage
