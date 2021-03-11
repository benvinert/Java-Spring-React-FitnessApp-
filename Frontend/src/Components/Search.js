import React, { useState, useEffect } from "react";
import Navbar from './TheNavbar';
import {Button} from 'react-bootstrap';
import { useHistory } from 'react-router'
import App from '../App.css';
import Searchinput from "./Searchinput";
import Menu from './Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TypeDiet from './TypeDiet';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import cookiesjs from 'js-cookie';
import { useTransition, animated, config,useSpring } from 'react-spring';


const useStyles = makeStyles((theme) => ({

    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },}))

function Search(){
    const classes = useStyles();
    const [ErrorsType,SetErrorsType] = useState({
        error : false,
        MenuAddSucces : false
    });

    var menuis = {
        
        menu : {
            type_diet : null,
            meals : []
        }
    }

    const [Breakfast,SetBreakfast] = useState([
        {TimeEat : "Breakfast" ,foodName: "", calories :null , carbs : null,protein : null,fat : null,fiber: null}]);

    const [elevenses,Setelevenses] = useState([
        {TimeEat : "elevenses" ,foodName: "", calories  :null , carbs : null,protein : null,fat : null,fiber: null},]);
    
    const [Lunch,SetLunch] = useState([
        {TimeEat : "Lunch" ,foodName: "", calories : null, carbs : null,protein : null,fat : null,fiber: null}]);
    
    
    const [Dinner,SetDinner] = useState([
        {TimeEat : "Dinner" ,foodName: "", calories : null, carbs : null,protein : null,fat : null,fiber: null}]);

        const [Beforesleep,SetBeforesleep] = useState([
            {TimeEat : "Beforesleep" ,foodName: "", calories : null, carbs : null,protein : null,fat : null,fiber: null}]);
    
    const setters = [
        SetBreakfast,
        Setelevenses,
        SetLunch,
        SetDinner,
        SetBeforesleep

    ]

      const rows = [
        Breakfast,
        elevenses,
        Lunch,
        Dinner,
        Beforesleep
      ];


    const [Caption,SetCaption] = useState("");
    const {push} = useHistory();
    const [show,SetShow] = useState(false);
    let header = new Headers();
    var Cook = cookiesjs.get("token");
    var OurUsers = cookiesjs.get("OurUsers");
    header.append('Content-Type','application/json');
    header.append('Authorization','Basic ' + OurUsers);
    header.append("token",Cook);


    var showsearch = () =>{
        if(show){
            if(Caption == Breakfast[0].TimeEat){
                return <div><Searchinput setter={SetBreakfast} Timeeat={Caption} /></div>;
            }
            else if(Caption == elevenses[0].TimeEat){
                return <div><Searchinput setter={Setelevenses} Timeeat={Caption} /></div>;
            }
            else if(Caption == Lunch[0].TimeEat){
                return <div><Searchinput setter={SetLunch} Timeeat={Caption} /></div>;
            }
            else if(Caption == Dinner[0].TimeEat){
                return <div><Searchinput setter={SetDinner} Timeeat={Caption} /></div>;
            }
            else if(Caption == Beforesleep[0].TimeEat){
                return <div><Searchinput setter={SetBeforesleep} Timeeat={Caption} /></div>;
            }
            
            
        }else{
            return <div className="emptySearch">
            <div className="text">
                Food Database ,
                 
                    Click on <AddCircleOutlineIcon style={{ fontSize: 30 }} color="primary"/> 
                    <div>to Start Building your Nutrition Menu</div>
                </div>
            </div>
        }
        
    }
    function Setshowtotrue(){
        SetShow(true);
    }
    
    function SelectTypeDiet(typediet){
        menuis.menu.type_diet = typediet;
    }

    const MenuAddSucces = () =>{
        if(ErrorsType.MenuAddSucces){
            return <div className={classes.root}>
            <Alert severity="success">
            <AlertTitle>Menu Added Succesfully</AlertTitle>
                We push you to home page in 2 sec.
            </Alert>
            </div>
            }
            return null;
          }
        

    const ErrorsTypes = () => {
        if(ErrorsType.error){
            return <div className={classes.root}>
                <Alert severity="error">
                <AlertTitle>You need Enter minimum 3 Meals and Select Type Diet</AlertTitle>
                    Check it Out.
                </Alert>
                </div>
                }
                return null;
              }

    async function PostMenu(){
        
        var foody = []

        foody = rows.filter( (each) => {
            return each.length > 1;
        })
        foody = foody.map( (each) => {
            return each.filter( (eachinarr) => {
                return eachinarr.foodName != "";
            })
        })
        console.log(foody);

        var i = 0;
        for(i ; i < foody.length ; i++){
            menuis.menu.meals[i] = {food : foody[i]};
        }

            try{
                if(menuis.menu.meals.length <= 2 || menuis.menu.type_diet == null){
                    throw new Error('Menu is Empty,And Type_Diet Cannot be null');
                }else{

                    console.log(menuis);
                    const response = await fetch("/Secure/AddMenu", {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: header,
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify(menuis) // body data type must match "Content-Type" header
                        
                      }).then(response => {
                        if (!response.ok){
                            throw new Error('Network response was not ok.');
                        }
                    }).catch((err) => {
                        alert("Something gonna wrong!")
                        console.log(err);
                    });
                }
                alert("Your menu is added!");
                SetErrorsType((prev) => {return {...prev,MenuAddSucces : true,error : false}})
                console.log("Your menu");
                console.log(menuis)
                setTimeout(() => push("/"), 2000);
                
            }catch(e){
                SetErrorsType((prev) => {return {...prev,error : true}});
                }
            }
            const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -200,marginRight: 200}})

    return (
        
        <div>
            <div className="whitetext" >
                <h2 >Build Your nutrition Menu</h2>
                
            </div>


                <div className="twoelements"> 
                <animated.div style={sss}>
                <div className="RightSide">
                {showsearch()}
                </div>
                </animated.div>
                <div className="LeftSide" >
                <Menu rows={rows}  SetTimeeat={SetCaption} delete={ (val) => {
                       rows.map( (each,index) => {
                         if(each[0].TimeEat === val[1]){
                             each = each.filter( (eac) => {
                                 console.log("match")
                                  return eac.foodName !== val[0];})
                                console.log("after");
                                console.log(each);
                                setters[index](each);
                                    }
                                  })
                }} showsearch={Setshowtotrue}/>
                <TypeDiet chooseDiet={SelectTypeDiet}/><ErrorsTypes/><MenuAddSucces/>
                <Button className="mt-3" onClick={PostMenu}><PostAddIcon/> Add Menu</Button>
                
                </div>

                </div>
                </div>
    );
}


export default Search;