import React, { useState, useEffect, useContext } from 'react';
import Home from './Components/Home';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './Components/Search';
import GetMenu from './Components/GetMenu';
import SignUp from './Components/SignUp';
import Signin from './Components/Signin';
import TheNavbar from './Components/TheNavbar';
import Cookies from 'js-cookie';
import MyProfile from './Components/MyProfile';
import { UserContext } from './Components/UserContext';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BeforeLogout from './Components/BeforeLogout';
import MyMenu from './Components/MyMenu';
import UploadFile from './Components/UploadFile';
import Pictures from './Components/Pictures';
import AllResults from './Components/AllResults';
import UserPosts from './Components/UserPosts';
import UsersList from './Components/UsersList';
import cookie from 'react-cookies'
import Grid from '@material-ui/core/Grid';
import cookiesjs from 'js-cookie';
import 'react-app-polyfill/stable';

function App() {

  const [open, setOpen] = useState(false);

  function handleClickOpen(){
    setOpen(true);
  };

  useEffect(() => {
    async function GetCookiess(){
      var Cook = cookiesjs.get("token");
      var OurUsers = cookiesjs.get("OurUsers");
      const header = new Headers();
      header.append('Content-Type','application/json');
      header.append('Authorization','Basic ' + OurUsers);
      header.append("token",Cook);

      const user = await fetch(`Webfitness/CheckCookie`,{
        method : "POST",
        headers : header,
        }).then((response) => {
          if(response.status == 200) response.json().then((user) => {
          setUser((prevvalues) =>
          {
            return {...prevvalues,user,online : true}
          }
          )

        })}).catch((e) => new Error("Not Cookie"))}
        
        
              
    GetCookiess();

    
    
  },[])

  function handleClose(){
    setOpen(false);
    console.log("Remove Cookie")
    Cookies.remove("OurUsers");
    Cookies.remove("token")
    setUser((prevvalues) => {
      return {...prevvalues,online : false, user : {}}
    })
    console.log(User);

    
  };

  function handleCloseStay(){
    setOpen(false);
    
  };

  const [User, setUser] = useState({
    user : {
 
    }
  });

  const Beforelogout = () => {
    if(open){
      return <BeforeLogout open={open} setopen={setOpen} handleclickopen={handleClickOpen} handleClickclose={handleClose} handleClickStay={handleCloseStay}/>
    }
    return null
  }

  


  const ProtectedRoute = ({ component: Component, ...rest }) => {

    return <Route {...rest}
      render={(props) => {
        console.log(props)
        return  User.online || Cookies.get(`${User.username}`) ? <Component {...props} /> : <Redirect to="/Signin"/>
      }} />
  }

  const ProtectedRouteProfile = ({ component: Component, ...rest }) => {

    return <Route {...rest}
      render={(props) => {
        console.log(props)
        return  User.online || Cookies.get(`${User.username}`) ? <Component {...props} /> : <Redirect to="/Signin"/>
      }} />
  }

  const ProtectedRouteMenu = ({ component: Component, ...rest }) => {

    return <Route {...rest}
      render={(props) => {
        console.log(props)
        return  User.online || Cookies.get(`${User.username}`) ? <Component user={User} {...props} /> : <Redirect to="/Signin"/>
      }} />
  }

  const ProtectedAddmenu = ({ component: Component, ...rest }) => {

    return <Route {...rest}
      render={(props) => {
        console.log(props)
        return  User.online || Cookies.get(`${User.username}`) ? <Component user={User} {...props} /> : <Redirect to="/Signin"/>
      }} />
  }

  const ProtectedUserPost = ({component : Component ,...rest}) => {
    return <Route {...rest} 
    render={(props) => {
      return User.online || Cookies.get(`${User.username}`) ? <Component user={User} {...props} /> : <Redirect to="/Signin"/>
    }}/>
  }

  const ProtectedAdminUsersList = ({component : Component ,...rest}) => {
    return <Route {...rest} 
    render={(props) => {
      return User.online || Cookies.get(`${User.username}`) ? <Component user={User} {...props} /> : <Redirect to="/Signin"/>
    }}/>
  }
  

  

  return (
    
      
      <Router>
        <UserContext.Provider value={{User,setUser}}>
        <Grid container spacing={0}>

          <Grid className='index1' xl={12} sm={12} md={12} lg={12} >
            <TheNavbar handleclickopen={handleClickOpen}/>
          </Grid>

        <Beforelogout open={open} setopen={setOpen} handleclickopen={handleClickOpen} handleClickclose={handleClose}/>
        <Switch>
        <Grid className="Allsite" item xl={12} sm={12} md={12} lg={12}  spacing={0}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/SignUp" exact={true} component={SignUp} />
          <Route path="/pictures" exact={true} component={Pictures} />
          <Route path="/Signin" render={(props) => { return <Signin/> }} />
          <Route path="/Upload" exact={true} component={UploadFile}/>
          <Route path="/Allresults" exact={true} component={AllResults}/>

          <ProtectedAddmenu path="/Search" component={Search} />
          <ProtectedRoute path="/Getdiet" component={GetMenu} />
          <ProtectedRouteProfile path="/MyProfile" component={MyProfile} />
          <ProtectedRouteMenu path="/MyMenu" component={MyMenu} />
          <ProtectedUserPost path="/UserPosts" exact={true} component={UserPosts}/>
          <ProtectedAdminUsersList path="/Admin/UsersList"  component={UsersList}/>
          </Grid>
        </Switch>
        </Grid>
        </UserContext.Provider>
      </Router>

    
  );
}

export default App;
