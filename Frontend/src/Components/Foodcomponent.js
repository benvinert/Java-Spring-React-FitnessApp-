import React from 'react';
import {Image,Button} from 'react-bootstrap';
import App from '../App.css';

function Foodcomponent(props){

    const foods = props.foods;


    return (

        <div>
                 calories:{foods.calories}<br/>
                 carbs : {foods.carbs}<br/>

                Protein : {foods.protein}<br/>
                fiber : {foods.fiber} <br/>
                Fat : {foods.fat}
                
                <Button onClick={() => {
                    props.setclick(true);
                }} className="ButtonAdd btn-lg btn-primary">Add</Button>
                <br/>
            <Image src={foods.image}/>
        </div>

    )
}
export default Foodcomponent;