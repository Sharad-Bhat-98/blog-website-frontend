import { AppBar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import React from 'react'
import { LogoutCall, isAuthenticated } from './backendcalls/signupcall'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import { ListItemText } from '@material-ui/core'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

function ElevationScroll(props) {
    const { children, window } = props

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    })

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    })
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}

const Header = (props) => {
    const classes = useStyles()

    const [view, setView] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    const { mobileView, drawerOpen } = view

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 700
                ? setView({ ...view, mobileView: true })
                : setView({ ...view, mobileView: false })
        }
        setResponsiveness()
        window.addEventListener('resize', () => setResponsiveness())
    }, [])

    const dispDesktop = () => {
        if (isAuthenticated()) {
            return (
                <React.Fragment>
                    <Link
                        to="/createblog"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button color="inherit" style={{ padding: '15px' }}>
                            Add A New Blog
                        </Button>
                    </Link>
                    <Button
                        color="inherit"
                        style={{ padding: '15px' }}
                        onClick={LogoutCall}
                    >
                        LOGOUT
                    </Button>

                    <div>
                        <Link
                            to="/profile"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button color="inherit" style={{ padding: '15px' }}>
                            LOGIN
                        </Button>
                    </Link>
                    <Link
                        to="/signup"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Button color="inherit" style={{ padding: '15px' }}>
                            SIGNUP
                        </Button>
                    </Link>
                </React.Fragment>
            )
        }
    }

    const dispMobile = () => {
        const handleDrawerOpen = () => {
            setView({ ...view, drawerOpen: true })
        }
        const handleDrawerClose = () => {
            setView({ ...view, drawerOpen: false })
        }

        if (isAuthenticated()) {
            return (
                <React.Fragment>
                    <IconButton
                        {...{
                            edge: 'end',
                            color: 'inherit',
                            'aria-label': 'menu',
                            'aria-haspopup': 'true',
                            onClick: handleDrawerOpen,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        {...{
                            anchor: 'top',
                            open: drawerOpen,
                            onClick: handleDrawerClose,
                        }}
                    >
                        <div>
                            <ListItem button>
                                <Link
                                    to="/profile"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <ListItemText primary={'YOUR PROFILE'} />{' '}
                                    <Divider />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link
                                    to="/createblog"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <ListItemText primary={'ADD A NEW BLOG'} />{' '}
                                    <Divider />
                                </Link>
                            </ListItem>
                            <ListItem button onClick={LogoutCall}>
                                <ListItemText primary={'LOGOUT'} />
                            </ListItem>
                        </div>
                    </Drawer>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <IconButton
                        {...{
                            edge: 'end',
                            color: 'inherit',
                            'aria-label': 'menu',
                            'aria-haspopup': 'true',
                            onClick: handleDrawerOpen,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        {...{
                            anchor: 'top',
                            open: drawerOpen,
                            onClick: handleDrawerClose,
                        }}
                    >
                        <div>
                            <ListItem button>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <ListItemText primary={'LOGIN'} />{' '}
                                    <Divider />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link
                                    to="/signup"
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <ListItemText primary={'SIGNUP'} />{' '}
                                    <Divider />
                                </Link>
                            </ListItem>
                        </div>
                    </Drawer>
                </React.Fragment>
            )
        }
    }

    return (
        <div style={{ paddingBottom: '100px' }}>
            <AppBar>
                <Toolbar>
                    {' '}
                    <Typography
                        variant="h6"
                        style={{
                            padding: '15px',
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'default',
                        }}
                    >
                        {' '}
                        <Link
                            to="/"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {' '}
                            News{' '}
                        </Link>{' '}
                    </Typography>
                    <ElevationScroll {...props}>
                        {mobileView ? dispMobile() : dispDesktop()}
                    </ElevationScroll>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
