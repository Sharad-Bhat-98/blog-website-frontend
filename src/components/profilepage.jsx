import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Header from './header'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import { getProfile } from './backendcalls/profilecall'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import SnackBarComponent from './snackbar'
import { Link } from 'react-router-dom'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

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

const ProfilePage = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const [profile, setProfile] = useState({
        user: { _id: '', email: '', password: '' },
        blog: [],
    })

    useEffect(() => {
        getProfile()
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setProfile(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleChangeIndex = (index) => {
        setValue(index)
    }

    const high = window.screen.height
    const style = {
        widht: '100%',
        borderRight: '0.5px solid grey',
        height: `${high}px`,
        marginTop: '4%',
        textAlign: 'center',
    }
    const style1 = {
        width: '40%',
        height: '20%',
        border: '1px solid black',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        borderRadius: '50%',
        backgroundImage: ` url(https://blog-website-sharad.herokuapp.com/img/${profile.user._id})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    console.log(profile)
    return (
        <Grid container>
            <Header />
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} style={style}>
                <SnackBarComponent opensnack={true} erroropensnack={true} />
                <div style={style1}></div>
                <br></br>

                <div className={classes.root1}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
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
                            Change Profile Pic
                        </Button>
                    </label>
                </div>
            </Grid>
            <Grid item xs={8}>
                <Paper className={classes.root}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Account Details" {...a11yProps(0)} />
                        <Tab label="Your Blogs" {...a11yProps(1)} />
                    </Tabs>
                </Paper>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <h4>EMAIL---{profile.user.email}</h4>
                        <h4>Joined At---{profile.user.createdAt}</h4>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid container spacing={3}>
                            {profile.blog.map((e) => {
                                return (
                                    <Grid item xs={4} key={e._id}>
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
                                                        component="img"
                                                        alt="couldnt load image"
                                                        height="140"
                                                        image={`http://localhost:4000/blogimg/${e._id}`}
                                                        title={e.title}
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h5"
                                                            component="h2"
                                                        >
                                                            {e.blogtitle}
                                                        </Typography>

                                                        <Typography noWrap>
                                                            {e.blogdata}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Link>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </TabPanel>
                </SwipeableViews>
            </Grid>
        </Grid>
    )
}

export default withRouter(ProfilePage)
