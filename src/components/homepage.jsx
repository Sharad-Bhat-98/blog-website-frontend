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
import backgroundimg from '../images/coverimg.jpg'
import Container from '@material-ui/core/Container'

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

    innerdiv: {
        position: 'absolute',
        [theme.breakpoints.up('xs')]: {
            top: '25%',
        },
        [theme.breakpoints.up('sm')]: {
            top: '30%',
            left: '20%',
        },
        [theme.breakpoints.up('md')]: {
            top: '35%',
            left: '28%',
        },
        [theme.breakpoints.up('lg')]: {
            top: '35%',
            left: '35%',
        },
    },
    imgheight: {
        backgroundImage: `url(${backgroundimg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '-12%',
        [theme.breakpoints.up('xs')]: {
            height: '400px',
        },
        [theme.breakpoints.up('sm')]: {
            height: '500px',
        },
        [theme.breakpoints.up('md')]: {
            height: '550px',
        },
        [theme.breakpoints.up('lg')]: {
            height: '600px',
        },
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
                <Grid item xs={12} className={classes.imgheight}>
                    <div className={classes.innerdiv}>
                        <Typography
                            variant="h4"
                            component="h1"
                            align="center"
                            style={{ color: '#ffffff' }}
                        >
                            <b> Welcome To My BLOG Website</b>
                        </Typography>
                        <Typography
                            align="center"
                            variant="subtitle1"
                            style={{ color: '#ffffff' }}
                        >
                            Explore collection of blogs
                        </Typography>
                    </div>
                </Grid>

                {data[0] ? (
                    data.map((e) => {
                        return (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={3}
                                key={e._id}
                                style={{ marginTop: '5%' }}
                            >
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
                                                image={`https://blog-website-sharad.herokuapp.com/blogimg/${e._id}`}
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
