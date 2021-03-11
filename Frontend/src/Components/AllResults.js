import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image  from '../101860.jpg';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTransition, animated, config,useSpring } from 'react-spring';

const useStyles = makeStyles((theme) => ({
    root: {
      width : 600,
      margin: 0,
      
      
    },
    gridList: {
      width: 700,
      height: 100,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));




function AllResults(){
  const [Posts,SetPosts] = useState([]);
  useEffect(() => {
    const GetAllResults = async() => {
      const res = await fetch(`/Webfitness/GetAllResults`).then((data) => {
        return data.json()
      }).then((jsondata) => {
        console.log(jsondata);
        SetPosts(jsondata)
      })
    }
    GetAllResults();
    
  },[])
  const matches = useMediaQuery('(max-width:500px)');
    const classes = useStyles();
    var imagesize = 300;
    if(matches){
      imagesize = 180;
    }
    
    var sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0, from: {opacity: 0,marginLeft : -100,marginRight: 100}})
    
    return (
      <div className='AllSiteHome '>
        <Container className="Clientmenu" component="main" maxWidth="md">
        <div><h1 align='center'>All Results</h1>
              <Grid container spacing={2} item xs={12}>
              <table  align='center'  cellSpacing="3" border='0'><thead><tr><td></td><td></td></tr></thead>
        
      {Posts.map((each,index) => (
        
        <animated.div style={sss}>
        
        <tbody key={index}>
          <tr><th colspan='3' ><h4 align='center'>By : {each.username}</h4></th></tr>
        <tr><th><img style={{borderRadius : '50%'}} width={imagesize} height={imagesize} src={"data:image/png;base64," + atob(each.beforeImage) }  /></th>
        <th></th>
        <th><img style={{borderRadius : '50%'}} width={imagesize} height={imagesize} src={"data:image/png;base64," + atob(each.afterImage) }  /></th>
        
        </tr>
        <tr>
          <th>
            <h4 align='center'>Before</h4>
          <h4 align='center'>Weight : {each.weightbefore}<br></br>
            BodyFat : {each.bodyfatbefore}</h4> 
          </th>
          <th><h2>Vs</h2></th>
          <th align='center'>
            <h4 align='center'>After</h4>
           <h4 align='center'>Weight : {each.weightafter}<br></br>
            BodyFat : {each.bodyfatafter}</h4> 
          </th>
        </tr>
        
        <tr>
        
          <th colspan='3'style={{color : 'white',backgroundColor: '#EFE2BA',borderRadius : '1%'}} align='center' >
          <h3 style={{color : 'black'}}>Story</h3>
          <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          fullWidth={true}
          value={each.content}
          rows={6}
          // defaultValue="Default Value"
          variant="outlined"
        />
          </th>
        </tr><br></br><br></br><br></br><br></br>
        </tbody>
        
        </animated.div>
        
      ))}
      </table>
    </Grid>
    
        
        </div>
        </Container>
        </div>
    )


}

export default AllResults;