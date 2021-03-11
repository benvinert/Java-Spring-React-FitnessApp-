import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import image  from '../101860.jpg';
import Grid from '@material-ui/core/Grid';
import {Button, Container} from 'react-bootstrap';
import { useHistory } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ilusResults from '../undraw_result_5583.svg';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles((theme) => ({
  root: {

    
    
  },
  gridList: {
    width: 700,
    height: 100,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function Posts() {
  const [Posts,SetPosts] = useState([]);
  const classes = useStyles();


  useEffect(() => {
    const GetAllResults = async() => {
      const res = await fetch(`/Webfitness/GetAllResults`).then((data) => {
        console.log(data)
        return data.json()
      }).then((jsondata) => {
        console.log(jsondata);
        SetPosts(jsondata)
      })
      
    }

    const Ordetby = () => {
      Posts.filter((each,index) => {
        console.log(each.content);
        return index < 2
      })
    }
    GetAllResults();
    Ordetby();
  },[])
  const Responsive500Width = useMediaQuery('(max-width:500px)');
  const Responsive350Width = useMediaQuery('(max-width:375px)');
  var imagesize = 300;
  if(Responsive500Width){
    imagesize = 190;
  }
  if(Responsive350Width){
    imagesize = 150;
  }
  
  function Checklist(each,index){
    if(index < 3){
      return <tr key={index}><th><img width={imagesize} height={imagesize} style={{borderRadius : '50%'}} src={"data:image/png;base64," + atob(each.beforeImage) } />
        <h4 align='center' style={{color : 'white'}}>Weight : {each.weightbefore}<br></br>
          BodyFat : {each.bodyfatbefore}%</h4> 
      </th>
      <th></th>
      <th><img width={imagesize} height={imagesize} style={{borderRadius : '50%'}} src={"data:image/png;base64," + atob(each.afterImage) } />
        <h4 align='center' style={{color : 'white'}}>Weight : {each.weightafter}<br></br>
            BodyFat : {each.bodyfatafter}%</h4> 
      </th>
      </tr>
      
    }

  }
  const ShowCircle = () =>{
    return  <div className='CircleResults'>
    <button className='LikeButton' style={{marginTop : '100px',fontSize : '1.6rem',borderColor : 'gray'}} onClick={() => push("/AllResults")}><DoubleArrowIcon style={{marginBottom : "7px"}}/>SEE ALL RESULTS</button>
    <img src={ilusResults} width='600' height='600'></img>
    </div>
  }

  const SeeMoreButton = () => {
    return <button className='LikeButton' style={{marginTop : '10px',marginLeft : '30%'}} onClick={() => push("/AllResults")}>See More</button>
  }

const { push } = useHistory();
  return (
    <div>

<div className="OurResults">Clients Result</div>
    
    <Grid item xl={6} sm={6} md={6} lg={6} >
      
      <table ><thead style={{color : 'white'}}><tr><td align='center' ><h3>Before</h3></td><td><h2>Vs</h2></td><td align='center'><h3>After</h3></td></tr></thead>
      <tbody>
        {Posts.map((each,index) => (
         Checklist(each,index)
        ))}
        </tbody>
        </table>
        <br></br>
        <br></br>
        <br></br>
        {Responsive500Width ? <SeeMoreButton/> : <ShowCircle/>}
      </Grid>
      </div>
    
  );
}
