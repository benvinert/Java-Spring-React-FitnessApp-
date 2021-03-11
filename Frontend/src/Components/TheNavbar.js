import React,{useEffect,useContext,useState} from 'react';
import {Navbar,Nav,NavDropdown,Button,FormControl,Form,Badge} from 'react-bootstrap';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { BrowserRouter as Router, Link, Route,Redirect } from "react-router-dom";
import { useHistory ,useLocation} from 'react-router'
import Cookies from 'js-cookie';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from './UserContext';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition, animated, config,useSpring } from 'react-spring';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function TheNavbar(props){

  const {User,setUser} = useContext(UserContext);
  const classes = useStyles();

  const {push,location} = useHistory();

  const AdminOptions = () => {

    var ShowAdminOptions = "";
    if(User.online){
      ShowAdminOptions = User.user.roles.map((eachrole) => {
      if(eachrole.role == "Admin"){
        return <NavDropdown  style={{marginTop : '4px'}} title="Admin Options" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={() => push("/Search")}>Add menu</NavDropdown.Item>
        <NavDropdown.Item onClick={() => push('/Admin/UsersList')}>List Users</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Add New Admin</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      }
    })}
    return ShowAdminOptions;
  }

  const StateClick = () => {
    if(StateUser() == "Logout"){
      props.handleclickopen();
    }else{
      push("/Signin")
    }
    
    
  }

  const StateUser = (props) => {
    if(User.online){
      console.log("Logout state")
      console.log(User)
      return "Logout"
    }
    console.log("Sign in")
    console.log(User)
    return <div><h5 className="StyleNavBarRightButtons">Sign in</h5></div>
  }

  const SignUp = (props) => {
    var StatusInOut =  <Nav.Link  style={{marginTop : '4px'}} eventKey={2} onClick={() => push("/SignUp")}><h7>Sign Up</h7></Nav.Link>;
    if(User.online){
      StatusInOut = User.user.roles.map((eachrole) => {
        if(eachrole.role == "Admin"){
          return " ";
          }
        else if(eachrole.role == "User"){
          return <Nav><Nav.Link onClick={() => push("/Search")}>Create menu</Nav.Link><NavDropdown style={{marginTop : '0px'}} title={<AccountCircleIcon/>} style={{ height : '20px'}}id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => push("/MyProfile")}>My Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={() => push("/MyMenu")}>My Menu</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
        </NavDropdown></Nav>
        }

      })
    }
    return StatusInOut;
  }

  const sss = useSpring({transform: 'translate3d(0,0px,0)', from: { transform: 'translate3d(0,-40px,0)' }})
    return (
          <h5>
        <animated.div style={sss}>
        <Navbar bg="white" expand="lg" >
        <Navbar.Brand onClick={() => push("/")}><mark className="grayicon"><FitnessCenterIcon/></mark><mark style={{color : 'black', background: 'none'}}>Fitness</mark><mark className="blueicon">App</mark></Navbar.Brand>
        <Navbar.Toggle className='basic-navbar-nav' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="center-navbar">
            <Nav.Link style={{marginTop : '4px'}}onClick={() => push("/")}>Home</Nav.Link>
            <Nav.Link style={{marginTop : '4px'}} onClick={() => push("/Getdiet")}>Get Diet</Nav.Link>
            <Nav.Link style={{marginTop : '4px'}} onClick={() => push("/UserPosts")}>Add Posts</Nav.Link>
            <AdminOptions/>
            <Nav  className="NavBarRightButtons">
        <Nav.Link onClick={StateClick}> <StateUser style={{marginTop : '4px'}}/> </Nav.Link>
        <SignUp/>
        </Nav>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        
        </animated.div>
        
        </h5>
      
      
    )



}
export default TheNavbar;