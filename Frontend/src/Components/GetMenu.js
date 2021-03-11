import React,{useContext,useState} from 'react';
import TheNavBar from './TheNavbar';
import ClientMenu from './ClientMenu';
import App from '../App.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { UserContext } from './UserContext';
import Grid from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import { useTransition, animated, config,useSpring } from 'react-spring';
import ilus3 from '../undraw_diet_ghvw.svg';
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
}))
const MassDiet = withStyles({
    root: {
      background: '#41B3A3',
      borderRadius: 4,
      border: 0,
      color: 'white',
      borderColor : 'black',
      borderStyle : 'solid',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height: 40,
      padding: '0 10px',
      width : 300,
      '&:hover': {
        background: "rgb(170, 224, 255)",
        color : 'black'
     },
    },
    label: {
      textTransform: 'capitalize',
      fontSize: '17px',
      
    },
  })(Button);




  const BlueButton = withStyles({
    root: {
      background: '#E27D60',
      borderRadius: 4,
      border: 0,
      color: 'white',
      borderColor : 'black',
      borderStyle : 'solid',
      height: 40,
      padding: '0 10px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      zIndex : 0,
      width : 300,'&:hover': {
        background: "rgb(170, 224, 255)",
        color : 'black'
     },
    },
    label: {
      textTransform: 'capitalize',
      fontSize: '17px'
    },
  })(Button);

function MenuPage(){
    const classes = useStyles();
    const {User,setUser} = useContext(UserContext);
    const [Show,SetShow] = useState({
        showMass : false,
        showCut : false
    });
    const [StateMenu,SetStateMenu] = useState({})
    const [Showmenu,SetShowmenu] = useState(false);
    const [MenuOfData,SetMenuOfData] = useState({})
    const [Addmenu,SetAddmenu] = useState(false);
    const [menustate,setmenuState] = useState({});
    const [afterGet,setAfterget] = useState(false);
    function DeleteFood(){

    }

    async function getDiet(type_diet,consumerbmr){
      let header = new Headers();
      var Cook = cookiesjs.get("token");
      var OurUsers = cookiesjs.get("OurUsers");
      header.append('Content-Type','application/json');
      header.append('Authorization','Basic ' + OurUsers);
      header.append("token",Cook);
        SetAddmenu(false);
        const menuofdata = await fetch(`/Webfitness/GetSpecificMenu/${type_diet}/${consumerbmr}`,{
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          method:'GET',
          headers: header,
          redirect: 'follow', 
          referrerPolicy: 'no-referrer',
        }).then((result) => {
            return result.json()})
        SetMenuOfData((prevvalues) => {
            return {...prevvalues,menuofdata}
        })
        console.log(MenuOfData);
        if(type_diet == "Mass"){
            setTimeout(() => SetShow((prev) => {return {...prev,showMass: true,showCut : false}}))
        }
        else if(type_diet == "Cut"){
            setTimeout(() => SetShow((prev) => {return {...prev,showMass: false,showCut : true}}))
        }
        
    }

    function clickonmenus(eachmenu){
        SetShowmenu(false);
        SetStateMenu(eachmenu);
        
        setTimeout(() => SetShowmenu(true))
    }

    const NotfoundmenusAlert = () => {
        return <div className={classes.root}>
        <Alert severity="info">
          <AlertTitle>Menus' not found</AlertTitle>
        </Alert>
        </div>
    }


    const ButtonsMenus = () => {
        const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
        if(Show.showMass){
            
            if(MenuOfData.menuofdata[0] == null){
                console.log("Notfound")
                return <NotfoundmenusAlert/>
            }
            return <div style={{padding : '15px'}}><h4>Here List of Mass Diets,<br></br> are tailored for you</h4>
            <h4>Click on to see.</h4>
                {MenuOfData.menuofdata.map((eachmenu,index) => {
                return <animated.div style={sss} className="SpaceButtonsMenus" key={index}><MassDiet onClick={() => clickonmenus(eachmenu)}><GetAppIcon/>Get Mass diet,By : {eachmenu.createdBy.username}</MassDiet></animated.div>
            })}

            </div>
        }else if(Show.showCut){
            if(MenuOfData.menuofdata[0] == null){
                console.log("Notfound")
                return <NotfoundmenusAlert/>
            }
            return  <div style={{padding : '15px'}}><h4>Here List of Cutt Diets ,<br></br> are tailored for you</h4>
            <h4>Click on to see.</h4>
            {MenuOfData.menuofdata.map((eachmenu,index) => {
             return <animated.div style={sss}  className="SpaceButtonsMenus" key={index}><BlueButton onClick={() => clickonmenus(eachmenu)}><GetAppIcon/>Get Cut diet,By : {eachmenu.createdBy.username}</BlueButton></animated.div>}
        )}</div>
    }
        return null;
    }

    async function SaveMenu(){
      let header = new Headers();
      var Cook = cookiesjs.get("token");
      var OurUsers = cookiesjs.get("OurUsers");
      header.append('Content-Type','application/json');
      header.append('Authorization','Basic ' + OurUsers);
      header.append("token",Cook);
        const response = await fetch(`/Secure/AddMenuto/Consumer/whichMenu/${StateMenu.id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: header,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify() // body data type must match "Content-Type" header
          }).then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok,Menu Of Data');
            }else{
                console.log("Menu Saved")
                SetAddmenu(true);
                setTimeout(() => {SetAddmenu(false)},3000)
            }
    })}
    const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -200,marginRight: 200}})

    return (
        
        <div className="QueryForMobile">
            
            <Grid container style={{marginTop: '50px',padding : '20px'}} className='Clientmenu' spacing={0}>
              
            <div  style={{marginTop : '-8px',color : 'white' ,padding: '20px'}}>
            <Grid item xl={12} sm={12} md={12} lg={12}><header align='center' >Select your Diet</header></Grid>
            <div className="YourBMR">Your <mark className="grayicon">BMR</mark> is : {User.user.bmr}</div>
            <div className="YourBMR" >Choose which type diet you want,<br></br>All diets are customize for you</div>
            
            </div>
            <Grid container  style={{padding : '0px'}}  spacing={2}>
                <Grid item md={12} ><MassDiet onClick={
                     () => {return getDiet("Mass",User.user.bmr)}}><VisibilityIcon/>Mass Diets</MassDiet> </Grid>
                <Grid item md={12}><BlueButton onClick={
                    () => {return getDiet("Cut",User.user.bmr)}}><VisibilityIcon/>Cut Diets</BlueButton> </Grid>
                    <ButtonsMenus/>
                    {Showmenu ? <ClientMenu style={{padding: '0px'}} menu={StateMenu} savemenu={SaveMenu} addmenu={Addmenu}/> : null}
                </Grid>
                </Grid>
                
                
                <br/>
                <br/>
                <br/>
                <br/>
            

        </div>

    )
}

export default MenuPage;