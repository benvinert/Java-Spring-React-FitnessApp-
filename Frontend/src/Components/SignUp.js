import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TheNavBar from './TheNavbar';
import {useForm} from 'react-hook-form'
import WeightPicker from './WeightPicker';
import HeightPicker from './HeightPicker';
import { useHistory } from 'react-router'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useTransition, animated, config,useSpring } from 'react-spring';
import ilus2 from '../undraw_sign_in_e6hj.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        FitnessApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },Tab : {
      widht : 48
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

  const {push} = useHistory();
  const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});
  const User = {
    user : {

    }
  }

  function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

  let bmr;
  function calculate_bmr(height,weight,age){
    bmr = 66 + (weight * 13.8) + (height *5) - (age * 6.8);
    bmr = (Math.round(bmr * 100)/100).toFixed(2);
   
   return bmr;
  }
  

  async function onSubmit(data){
    try{
      if(!data.weight || !data.height){
        throw new Error('Network response was not ok.');
      }
      data.age = calculate_age(new Date(data.birthday));
      data.bmr = calculate_bmr(data.height,data.weight,data.age)


      console.log(data);
      User.user = data;
      const response = await fetch("/Webfitness/AddUser", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(User) // body data type must match "Content-Type" header
      }).then(response => {
        //      CHEKING THE STATUS OF HTTP FROM JAVA TO CHECK IF USERNAME AND PASSWORD ARE UNIQUE  //
        if (response.status == 226){// Defined in Java if Username already java will return status 226
            console.log(response)
            alert("Username Already used");
        }else if(response.status == 208){// Defined in Java if Password already java will return status 208
          alert("Email Already Used");
        }else if(!response.ok){// if something wrong and we dont know it will throw exception
          throw new Error("Sorry Page Not found we will handle this")
        }
        else{// if All OK so Java will return Status 200
          console.log(response);
          Setshow(true);
          alert("You register Successfully")
          setTimeout(() => push("/"),3000);
        }
    }).catch((catched_error) => {
        alert("Sorry Page Not found ,we will handle this come back later.")
        console.log(catched_error);
    });                   

    }catch(e){
      alert("Weight or Height cannot be none")
    }


  }
  const [show,Setshow] = useState(false);

  const Signupsucces = () => {
    return <div className={classes.root}>
    <Alert severity="success">
      <AlertTitle>You're Registered Succesfull </AlertTitle>
    </Alert>
    </div>
  }
  

  const classes = useStyles();
  const [items, set] = useState({text : "Sign Up"})
  const transitions = useTransition(items, item => item.key, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
    config: config.slow
    })
    const matches = useMediaQuery('(max-width:500px)');
    console.log(matches);

    const ShowIlustrition = () => {
      return <div className='CircleLeft'>
      <div style={{marginTop : '-150px' ,marginLeft:'-50px'}}>
      <img src={ilus2} width='700' height='800' ></img>
      </div>
    </div>
    }
  const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -200,marginRight: 100}})
  return (
  <div className="marginleftForms">

    <animated.div style={sss}>
    {matches ?  null : <ShowIlustrition/>}
    <Container className="back" component="main" maxWidth="sm" style={{marginLeft: 'auto',marginRight: 'auto'}}>
    
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        {transitions.map(({item,key,props}) => {
          return <animated.div key={key} style={props}>{item.text}</animated.div>
        })}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
          <Grid container spacing={3}>

            {show ? <Signupsucces/> : null}
            <h4>All fields are required</h4>
            <Grid item xs={12}>
            {errors.username && <div className="required">field required and minLength : 3</div>}
              <TextField
                inputRef={register({required:true,minLength:3})}
                autoComplete="Username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid >
            <Grid item xs={4}>
            {errors.birthday && <div className="required">field required</div>}
            <TextField
              id="date"
              label="Birthday"
              type="date"
              defaultValue="none"
              name="birthday"
              InputProps={{ inputProps: { max: "2012-01-01" } }}
              className={classes.textField}
              inputRef={register({required:true})}
              InputLabelProps={{
                shrink: true,
              }}
              />
            </Grid>
            <Grid>         
            <WeightPicker reg={register} for='weight'/>
            </Grid>
            <Grid>
            
            <HeightPicker reg={register}/>
            </Grid>
            <Grid item xs={12}>
            {errors.email && <div className="required">field required and Pattern Email</div>}
              <TextField
                inputRef={register({required:true,minLength:3,pattern:emailpattern})}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            
            <Grid item xs={12}>
            {errors.password && <div className="required">field required and minLenght 7</div>}
              <TextField
                inputRef={register({required:true,minLength:7})}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox inputRef={register} name="remember" defaultValue={false} color="primary" />}
                label="I want recive email With my details"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/Signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <br/>
          <br/>
        </form>
      </div>
    </Container>
    <br/>
    <br/>
    <br/>
    </animated.div>
    </div>
    
  );
}