import React,{ useContext,useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { UserContext } from './UserContext';
import UploadFile from './UploadFile';
import cookiesjs from 'js-cookie';

const noImage ="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"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  var Cook = cookiesjs.get("token");
  var OurUsers = cookiesjs.get("OurUsers");
  const header = new Headers();
  header.append('Content-Type','application/json');
  header.append('Authorization','Basic ' + OurUsers);
  header.append("token",Cook);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const {User,setUser} = useContext(UserContext);
  const [ShowPicture,SetShowPicture] = useState(true)
  const [Picture,SetPicture] = useState(null);

  
  const Onsubmit = async(dataform) => {
    const postman = new FormData();
    postman.append("Picture",dataform.picture[0])
 
    
    const res = await fetch(`/Webfitness/uploadFile/${User.user.id}`,{
        method : "POST",
        headers : header,
        body : postman}).then((back) => {
            return back.json()
        })
        console.log("Upload Image")
        console.log(res)
        
}


useEffect(() => {
  async function getdata(){

    const res = await fetch(`/Secure/GetImage`,{
      headers : header
    })
    .then((data) => {
        return data.text();
    })
    if(res == "Null"){
      SetPicture(noImage) 
    }else{
      SetPicture(res)
    }
    SetShowPicture(true)
  }
  getdata();
},[])

const handlerImage = (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    if(reader.readyState === 2){
        SetPicture(reader.result)
    }
  }
  SetShowPicture(false);
  reader.readAsDataURL(e.target.files[0])
}

const ImageDatabase = (props) => {
  return <img width="400" height="300" src={"data:image/png;base64," +  Picture}  />
}

const DefaultImage = () => {
  return <img width="400" height="300" src={Picture}  />
}


  return (
    <Container className="back" component="main" maxWidth="md" style={{marginTop : "80px"}}>
    <Card className={classes.root} variant="outlined">
      <CardContent >
      <div className="twoelements">
        <Typography variant="h5" component="h2">
          Username : {User.user.username}<br/><br/>
          Email : {User.user.email}<br/><br/>
          Age : {User.user.age}<br/><br/>
          Birthday : {User.user.birthday}<br/><br/>
          ID : {User.user.id}<br/><br/>
          </Typography>
          <div className="TableClient" style={{zIndex : 0}}>
          {ShowPicture ? <ImageDatabase/> : <DefaultImage/>}
          <br></br>
          <UploadFile onchange={handlerImage} onsubmit={Onsubmit} />
          </div>
          </div>
      </CardContent>
    
      
    </Card>
    
    </Container>
  );
}