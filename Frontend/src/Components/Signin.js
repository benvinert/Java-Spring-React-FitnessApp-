import React,{useContext,useState,useEffect} from 'react';
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
import Cookies from 'js-cookie';
import { useHistory } from 'react-router'
import { UserContext } from './UserContext';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useTransition, animated, config,useSpring } from 'react-spring';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Ilus1 from '../undraw_Login_re_4vu2.svg';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
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
    },
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signin(props) {

  const {User,setUser} = useContext(UserContext);
  const classes = useStyles();
  const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});
  const {push} = useHistory();
  const [ErrorLogin,SetErrorLogin] = useState(false);
  const [ErrorsDetails,SetErrorsDetails] = useState({
    isLogin : false,
    Username_NotCorrect : false,

  });



  const ShowLoggin = (props) =>{
    if(ErrorsDetails.isLogin){
      return <div className={classes.root}>
      <Alert severity="success">
        <AlertTitle>Login Sucssfully </AlertTitle>
            We push you to home page in 2 sec.
      </Alert>
      </div>
    }
    return null;
  }
  

  const User_pass_NotCorrect = (props) =>{
    if(ErrorsDetails.Username_NotCorrect){
      return <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Username not correct</AlertTitle>
            Check it Out.
      </Alert>
      </div>
    }
    return null;
  }

  function CheckStatus(UserResponse,data,encoded){
    if(UserResponse.status != 200){
      console.log("dasdasdasdas")
      throw new Error("User not found");
    }else{            //Get Text From the Response
      UserResponse.json().then((user) => {
        console.log(user)
        setUser((prevvalues) => {
          return {...prevvalues,user,online : true,auth : encoded}
        });
        Cookies.set("OurUsers",encoded);
        Cookies.set("token",user.customtoken);
      })

      SetErrorsDetails((prevvalues) => {//Login Succesfully
        return {...prevvalues,isLogin : true,OnlyPasswordWrong : false,Username_NotCorrect : false}
      })
      setTimeout(() => push("/"), 2000);
    }
  }



async function onSubmit(data){
  const body = {
    username : data.Username
  }
  let header = new Headers();
  let encoded = window.btoa(`${data.Username}:${data.password}`);
  header.append('Content-Type','application/json')
  header.append('Authorization','Basic ' + encoded)

  try{
    const RequestLogin = await fetch(`/Webfitness/Login`,{
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      method:'POST',
      headers: header,
      redirect: 'follow', 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(body) } )
      .then((UserResponse) => CheckStatus(UserResponse,data,encoded))
      }catch(e){
        SetErrorsDetails((prevvalues) => {
          return {...prevvalues,Username_NotCorrect : true}
        })
      }
  }



  const [items, set] = useState({text : "Sign in"})
  
  const transitions = useTransition(items, item => item.key, {
  from: { transform: 'translate3d(0,-40px,0)' },
  enter: { transform: 'translate3d(0,0px,0)' },
  leave: { transform: 'translate3d(0,-40px,0)' },
  config: config.slow
  })
  const matches = useMediaQuery('(max-width:500px)');
  const ShowIlustrition = () => {
    return <div className='CircleLeft'>
    <div style={{marginTop : '-150px' ,marginLeft:'-95px'}}>
    <img src={Ilus1} width='700' height='800' ></img>
    </div>
  </div>
  }
  const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -200,marginRight: 100}})
  return (
      <div className="marginleftForms">
        <animated.div style={sss}>
        {matches ?  null : <ShowIlustrition/> }
        
    <Container className="back" component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {transitions.map(({ item, props, key }) =>{
            return <animated.div key={key} style={props}>{item.text}</animated.div> 
          })}
        
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => onSubmit(data))}>
            <ShowLoggin/>
            <User_pass_NotCorrect/>
            {errors.Username && <div className="required">Username cannot be empty</div>}
          <TextField
            inputRef={register({required:true,minLength:5})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="Username"
            autoComplete="Username"
            autoFocus
          />
          
          {errors.password && <div className="required">Password cannot be empty</div>}
          <TextField
            inputRef={register({required:true,minLength:6})}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
          
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <br/>
          <br/>
        </form>
      </div>
    </Container>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </animated.div>
    </div>
  );
}