import React,{useContext,useEffect,useState} from 'react';
import {Image,Button} from 'react-bootstrap';
import App from '../App.css';
import { useHistory } from 'react-router'
import { UserContext } from './UserContext';
import Cookies from 'js-cookie';
import Pictures from './Pictures';
import { useTransition, animated, config } from 'react-spring'
import Posts from './Posts';
import Grid from '@material-ui/core/Grid';


function Home(){
    const {User,setUser} = useContext(UserContext);
    
    return (
        <Grid sm={12} xs={12}>
            <Pictures/>
            <div className='Posts'> <Posts/></div>
            <br></br>
        </Grid>
    )
}
export default Home;