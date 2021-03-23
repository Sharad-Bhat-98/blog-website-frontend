import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Header from './header';
import { useState } from 'react';
import Joi from 'joi-browser'
import {SigninCall,Authenticate} from './backendcalls/signupcall'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {Redirect}from 'react-router-dom'

const schema={
    email:Joi.string().required().email(),
    password:Joi.string().required().min(6)
}

const Login = () => {
    const [data,setData]=useState({
        email:'',
        password:'',
    })
    const [Error, setError]=useState({
        email:'',
        password:'',
    })
    const [alerterror, setAlertError]=useState({type:'error',emailerr:'',passerr:''})
    const [erropen,setErrOpen]=useState(true);
    const [redirect,setRedirect]=useState(false);



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrOpen(false);
      };
    
const redirectPage=()=>{
    if(redirect){
            return <Redirect to='/' />
     
    }
}
  

    const handlechange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        const obj={[e.target.name]:e.target.value}
        const schema1={[e.target.name]: schema[e.target.name]}
        const {error}=Joi.validate(obj,schema1)
        const res=error ? error.details[0].message:null
        setError({...Error,[e.target.name]:res})

    }
    const handleSubmit=()=>{
        SigninCall(data)
        .then((data)=>{
            if(data.errors){
                console.log(data.errors)
                const emailerr=data.errors.email
                const passerr=data.errors.password
                const obj={error:data.errors}
                console.log(obj)
                 setErrOpen(true);
                setAlertError({...alerterror ,emailerr,passerr})
                   }else{
                    Authenticate(data);
                    setAlertError({...alerterror, type:'success',emailerr:'',passerr:''}) 
                    setRedirect(true)
                    }
               
           })
    



    }

    const displayalert=()=>{

    
        if(alerterror.emailerr != ''){
      
            const data=alerterror.emailerr
            return (<Snackbar open={erropen} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                           {data}
                         </Alert>
                    </Snackbar>)
        }else if (alerterror.passerr!= ''){

            const data=alerterror.passerr
            return (<Snackbar open={erropen} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                           {data}
                         </Alert>
                    </Snackbar>)
        }
    }


    const setDisabled=()=>{
        if(Error.email== null && Error.password== null){
            return false
        }else{
            return true
        }
    }
    return ( <div>
        <Header buttons={0}/>
        <div style={{textAlign:'center',marginTop:'200px'}}>
            <TextField
            name='email'
            type='email'
            placeholder='enter email'
            label='email'
            variant='outlined'
            style={{marginBottom:'20px',minWidth:'330px'}}
            onChange={handlechange}
            error={Error.email ? true:false}
            helperText={Error.email}/><br></br>

            <TextField
            name='password'
            placeholder='enter password'
            label='password'
            variant='outlined'
            style={{marginBottom:'20px',minWidth:'330px'}}
            onChange={handlechange}
            error={Error.password ? true:false}
            helperText={Error.password}/><br></br>
            {displayalert()}
            {redirectPage()}

            <Button color="primary" variant='contained' disabled={setDisabled()} onClick={handleSubmit} >Login</Button>

        </div>
        </div>
     );
}
 
export default Login;