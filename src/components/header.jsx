import { AppBar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import React from 'react'
import { LogoutCall, isAuthenticated } from './backendcalls/signupcall'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

const Header = () => {
    const navButtons = () => {
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
    return (
        <div style={{ paddingBottom: '65px' }}>
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
                    {navButtons()}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
