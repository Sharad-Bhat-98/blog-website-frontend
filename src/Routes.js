import { BrowserRouter, Switch, Route } from 'react-router-dom'
import createblog from './components/createblog'
import Homepage from './components/homepage'
import Login from './components/login'
import profilepage from './components/profilepage'
import SignUp from './components/signup'
import updateblog from './components/updateblog'
import ProtectedRoute from './protectedroutes'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import BlogDetail from './components/BlogDetail'

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#1B98F5',
        },
    },
})

const Routes = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/signup" exact component={SignUp}></Route>
                    <ProtectedRoute
                        path="/createblog"
                        exact
                        component={createblog}
                    />
                    <ProtectedRoute
                        path="/updateblog/:id"
                        exact
                        component={updateblog}
                    />
                    <ProtectedRoute
                        path="/profile"
                        exact
                        component={profilepage}
                    />
                    <Route
                        path="/blog/:id"
                        exact
                        component={BlogDetail}
                    ></Route>
                    <Route path="/" exact component={Homepage}></Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Routes
