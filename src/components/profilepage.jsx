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
import { getProfile, updateProfile } from './backendcalls/profilecall'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import SnackBarComponent from './snackbar'
import { Link, Redirect } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

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

const ProfilePage = () => {
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const [profile, setProfile] = useState({
        user: { _id: '', email: '', password: '' },
        blog: [],
    })
    const [profilepic, setProfilepic] = useState({
        formData: '',
        actionButtons: false,
    })
    const [Redirectprofile, setRedirectprofile] = useState(false)
    const [Alert, setAlert] = useState({ type: false, message: '' })
    const useStyles = makeStyles((theme) => ({
        root: {
            [theme.breakpoints.down('sm')]: {
                flexGrow: 1,
                marginTop: '13%',
                backgroundColor: theme.palette.background.paper,
                width: '100%',
            },
            [theme.breakpoints.up('sm')]: {
                flexGrow: 1,
                marginTop: '7%',
                backgroundColor: theme.palette.background.paper,
                width: '100%',
            },
        },
        root1: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
        style: {
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: '300px',
            },
            [theme.breakpoints.up('sm')]: {
                widht: '100%',
                borderRight: '0.5px solid grey',
                height: `${window.screen.height}px`,
                textAlign: 'center',
            },
        },
        style1: {
            [theme.breakpoints.down('sm')]: {
                width: '40%',
                height: '60%',
                border: '1px solid black',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '15%',
                borderRadius: '50%',
                backgroundImage: ` url(https://blog-website-sharad.herokuapp.com/profile/img/${profile.user._id})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            },
            [theme.breakpoints.up('sm')]: {
                width: '80%',
                height: '35%',
                border: '1px solid black',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '25%',
                borderRadius: '50%',
                backgroundImage: ` url(https://blog-website-sharad.herokuapp.com/profile/img/${profile.user._id})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            },
            [theme.breakpoints.up('lg')]: {
                width: '70%',
                height: '40%',
                border: '1px solid black',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '25%',
                borderRadius: '50%',
                backgroundImage: ` url(https://blog-website-sharad.herokuapp.com/profile/img/${profile.user._id})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            },
        },
    }))
    const classes = useStyles()

    useEffect(() => {
        getProfile()
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setProfile(data)
            })
            .catch((err) => {
                console.log(err)
            })
        setProfilepic({ formData: new FormData() })
        setAlert({ ...Alert, type: false, message: '' })
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue)
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
        profilepic.formData.append('photo', img)
        setProfilepic({ ...profilepic, actionButtons: true })
    }
    const removePic = () => {
        setProfilepic({ ...profilepic, actionButtons: false })
    }
    const handleSubmitPic = () => {
        updateProfile(profilepic.formData)
            .then(() => {
                setRedirectprofile(true)
            })
            .catch((err) => {
                console.log(err, 'here!!!')
                setAlert({
                    ...Alert,
                    type: true,
                    message: 'Profile not updated',
                })
            })
    }

    const RedirectHome = () => {
        if (Redirectprofile) {
            return <Redirect to="/" />
        } else {
            return null
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

    const dispButtons = () => {
        if (profilepic.actionButtons) {
            return (
                <div style={{ marginTop: '2%', textAlign: 'center' }}>
                    <CheckCircleIcon
                        fontSize="large"
                        onClick={handleSubmitPic}
                    />
                    &nbsp;
                    <CancelIcon fontSize="large" onClick={removePic} />
                </div>
            )
        } else {
            return
        }
    }

    const handleChangeIndex = (index) => {
        setValue(index)
    }

    return (
        <Grid container>
            <Header />
            <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
                className={classes.style}
            >
                <div className={classes.style1}></div>
                <br></br>

                <div className={classes.root1} style={{ textAlign: 'center' }}>
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
                            Change Profile Pic
                        </Button>
                    </label>
                </div>
                {dispButtons()}
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
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
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={4}
                                        xl={4}
                                        key={e._id}
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
                                                        component="img"
                                                        alt="couldnt load image"
                                                        height="140"
                                                        image={`https://blog-website-sharad.herokuapp.com/blogimg/${e._id}`}
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
            {RedirectHome()}
            {alertMessage()}
        </Grid>
    )
}

export default withRouter(ProfilePage)
