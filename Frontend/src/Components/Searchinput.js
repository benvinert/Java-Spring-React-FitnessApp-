
import {Button,InputGroup,FormControl} from 'react-bootstrap';
import React ,{useState} from 'react';
import App from '../App.css';
import Foodcomponent from './Foodcomponent';
import { colors } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useTransition, animated, config,useSpring } from 'react-spring';

const API_KEY = "fff8363308c52351ca7f0b7300ded8dd";
const APP_ID = "8105047b";


function Searchinput(props){


  const [foodname,setFoodname] = useState("dsafas");
  const [showValues,setshowValues] = useState(false);
  const [clickadd,setClickadd] = useState(false);

  

  const [foods,setFoods] = useState( {
    foodName : "",
    calories : 0,
    carbs: 0,
    fat : 0,
    protein : 0,
    fiber : 0,
    image :"",
    time_eat : ""
});

  function handleChange(event){
    const val = event.target.value;
    setFoodname(val);
    console.log(foodname);
}


async function work(e){
  
  const LINKFETCH = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodname}&app_id=${APP_ID}&app_key=${API_KEY}`
  e.preventDefault();
  try{
      const api_call = await fetch(LINKFETCH).then( (result) =>{// Feth data
          return  result.json().then((result2) =>{
              return result2.parsed[0].food;// Converte to JSON
          }) });

          //////////////Sets Foods on the component props////////////
       setFoods( (prevState) => {
           return {...prevState,foodName : api_call.label,
            calories : api_call.nutrients.ENERC_KCAL,
               fat : api_call.nutrients.FAT,
               carbs : api_call.nutrients.CHOCDF,
               image : api_call.image ,
               protein : api_call.nutrients.PROCNT,
               fiber : api_call.nutrients.FIBTG,
               time_eat : props.Timeeat
               
               };
       })      
       setFoodname("");// rest the input after submit
       setshowValues(true);// to show the values of the food
       console.log(foods);
      
       //// if food does not exist////
  }catch(event){
      alert("The food does not exist");
      setshowValues(false);// hide the values
      console.log(event)
  }
};

function checksetClick(tnay){
  if(tnay == true){
      props.setter( (prevValues) => {
        return [...prevValues,foods]
      });

    setFoodname("");
    setClickadd(true);
    setshowValues(false);
    setClickadd(false);
    
  }
  
}


  const show = ()=>{
    if(showValues){
        return <div><Foodcomponent setclick={checksetClick} foods={foods} />  </div>  
    }
  }

    return (
        <div>
          Adding to :
          
          <div className="textTimeEat">
  
              {props.Timeeat}
            
          </div>
          
          All nutritional values ​​are per 100(g)
          
          
<InputGroup className="mb-3" type="text" name="Searching" value={foodname} onChange={handleChange} >
<FormControl 
  placeholder="Enter food name"
  aria-label="Recipient's username"
  aria-describedby="basic-addon2"
/>
<InputGroup.Append>
  <Button onClick={work}variant="dark">Search</Button>
</InputGroup.Append>
</InputGroup>

{show()}
</div>
    )
} 

export default Searchinput;