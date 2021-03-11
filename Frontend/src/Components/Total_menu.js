import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import App from '../App.css';
import { useTransition, animated, config,useSpring } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 200,
    background: '#41B3A3',
    borderRadius: 3,
  },
}));

export default function Total_menu(props) {
  const classes = useStyles();
  const item1 = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,delay : 200,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
  const item2 = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,delay : 400,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
  const item3 = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,delay : 600,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
  const item4 = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,delay : 800,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
  const item5 = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,delay : 1000,from: {opacity: 0,marginLeft : -100,marginRight: 100}})
  return (
  <div>
    <h4>Total Values</h4>
    <List className={classes.root}>
    <animated.div style={item1}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <img widht="50" height="50" src="https://www.kindpng.com/picc/m/157-1573514_transparent-holy-spirit-png-calories-icon-vector-png.png"></img> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Calories" secondary={props.menutotal.total_Calories}/>
      </ListItem>
      </animated.div>
      <Divider variant="inset" component="li" />
      <animated.div style={item2}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <img widht="50" height="50" src="https://www.nicepng.com/png/detail/131-1314049_carbohydrates-carbs-icon.png"></img> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Carbs" secondary={props.menutotal.total_Carbs} />
      </ListItem>
      </animated.div>
      <Divider variant="inset" component="li" />
      <animated.div style={item3}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <img widht="50" height="50" src="https://cdn.pixabay.com/photo/2017/10/25/06/13/protein-icon-2887050_640.png"></img> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Protein" secondary={props.menutotal.total_Protein} />
      </ListItem>
      </animated.div>
      <Divider variant="inset" component="li" />
      <animated.div style={item4}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <img widht="50" height="50" src="https://www.iconbunny.com/icons/media/catalog/product/1/9/1956.9-fruits-vegetables-icon-iconbunny.jpg"></img> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Fiber" secondary={props.menutotal.total_fiber} />
      </ListItem>
      </animated.div>
      <Divider variant="inset" component="li" />
      <animated.div style={item5}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <img widht="50" height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3ftrGLMZO22omBSK0ShVTZfexVLYpP25SUg&usqp=CAU"></img> 
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Fat" secondary={props.menutotal.total_fat} />
      </ListItem>
      </animated.div>
    </List>
    </div>
  );
}