import React, { useContext,useState} from 'react';
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
import BodyFatPicker from './BodyFatPicker';
import { useHistory } from 'react-router'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useTransition, animated, config,useSpring } from 'react-spring';
import UploadFile from './UploadFile'; 
import { UserContext } from './UserContext';
import cookiesjs from 'js-cookie';


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

  


export default function UserPosts(){

  const {User,setUser} = useContext(UserContext);
    const [Picture,SetPicture] = useState({
      before : null,
      after : null
    });
    const [ShowPicture,SetShowPicture] = useState({
      before : false,
      after : false
    })
    const {handleSubmit,register,errors} = useForm({reValidateMode : "onSubmit"});

    const handlerImage = (e) => {
      
      if(e.target.name == "before"){
        const reader1 = new FileReader();
        reader1.onload = () => {
          if(reader1.readyState === 2){
              SetPicture((prev) => { return {...prev,before : reader1.result}})
              SetShowPicture((prev) => {return {...prev,before : true}});
          }else{
              SetPicture(null);
          }
        }
        reader1.readAsDataURL(e.target.files[0]);
      }if(e.target.name == "after"){
        const reader2 = new FileReader();
        reader2.onload = () => {
          if(reader2.readyState === 2){
              SetPicture((prev) => { return {...prev,after : reader2.result}})
              SetShowPicture((prev) => {return {...prev,after : true}});
          }else{
              SetPicture(null);
          }
        }
        reader2.readAsDataURL(e.target.files[0]);
      }
        
      }

      const ImagefromClient1 = () => {
        return <div className="ImageProfile"><h3 align='center'>Before</h3><img width="400" height="300" src={Picture.before}  /></div>
      }

      const ImagefromClient2 = () => {
        return <div className="ImageProfile"><h3 align='center'>After</h3><img width="400" height="300" src={Picture.after}  /></div>
      }
        


  const classes = useStyles();
  const [items, set] = useState({text : "Posts"})
  const [AfterPost,SetAfterPost] = useState(false);

  const transitions = useTransition(items, item => item.key, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
    config: config.slow
    })
  const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -100,marginRight: 100}})


  async function onSubmit(data){

    let header = new Headers();
    var Cook = cookiesjs.get("token");
    var OurUsers = cookiesjs.get("OurUsers");
    header.append('Content-Type','application/json');
    header.append('Authorization','Basic ' + OurUsers);
    header.append("token",Cook);
    const posts = new FormData();
    posts.append("before",data.before[0]);
    posts.append("after",data.after[0]);
    posts.append('posts', new Blob([JSON.stringify(data)], {
      type: "application/json"
  }));
    console.log(posts);
    const res = await fetch(`/Secure/${User.user.username}/AddPost`,{
      method : "POST",
      headers : header,
      body : posts}).then((back) => {
          return back.json();
      })
      console.log(res);

  }
    return (
        <animated.div style={sss}>
          
          <Grid alignItems='center' item xl={9} lg={9} >
          <div className="back" >
        <Container  component="main" maxWidth="sm">
        
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
    
                
                <Grid item xs={12}>
                  <TextField
                    inputRef={register({required:true,minLength:3})}
                    autoComplete="Title"
                    name="title"
                    variant="outlined"
                    required
                    fullWidth
                    id="Title"
                    label="Title"
                    autoFocus
                  />
                  {errors.title && <div className="required">field required</div>}
                </Grid >
                <Grid item xs={12}>
                <TextField
                 inputRef={register({required:true,minLenght:8})}
                 id="filled-multiline-static"
                 label="Content"
                 name="content"
                 multiline
                 rows={10}
                 defaultValue="Content"
                 variant="filled"
                 fullWidth
                />
                {errors.content && <div className="required">Minimum lenght 8 characters</div>}
                </Grid>
                <Grid item xs={12}>
                 {ShowPicture.before ? <ImagefromClient1/> : <h1>Before</h1>}   
                 <input ref={register({required:true})} type="file" name="before" onChange={handlerImage}/>
                 {errors.before && <div className="required">field required</div>}
                 <WeightPicker reg={register} for='weightbefore'/>
                 {errors.weightbefore && <div className="required">field required</div>}
                  <BodyFatPicker reg={register} for='bodyfatbefore'/>
                  {errors.bodyfatbefore && <div className="required">field required</div>}
                </Grid>
                <Grid item xs={12}>
                 {ShowPicture.after ? <ImagefromClient2/> : <h1>After</h1>}   
                 <input ref={register({required:true})} type="file" name="after" onChange={handlerImage}/>
                 {errors.after && <div className="required">field required</div>}
                 <WeightPicker reg={register({required:true})} for='weightafter'/>
                 {errors.weightafter && <div className="required">field required</div>}
                 <BodyFatPicker reg={register({required:true})} for='bodyfatafter'/>
                 {errors.bodyfatafter && <div className="required">field required</div>}
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Post
              </Button>
              <br/>
              <br/>
            </form>
          </div>
        </Container>
        <br/>
        <br/>
        <br/>
        </div>
        </Grid>
        </animated.div>

    )
}
