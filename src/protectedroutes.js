import React from 'react';
import {Route,Redirect}from 'react-router-dom'
import { isAuthenticated } from './components/backendcalls/signupcall';



const ProtectedRoute = ({component:Component, ...rest}) => {
    const test=isAuthenticated()
    console.log(test)
    return (  
        <Route {...rest}
            render={(props)=>{
                if(test){
                    return <Component {...props} />
                }else{
                   return ( <Redirect to={{pathname:'/signup',state:{from:props.location}}}/>)
                }
            }}
        />
    );
}
 
export default ProtectedRoute;