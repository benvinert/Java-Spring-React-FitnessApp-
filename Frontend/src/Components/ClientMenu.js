import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import App from '../App.css'
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import SaveIcon from '@material-ui/icons/Save';
import Total_menu from './Total_menu';
import { withStyles } from '@material-ui/core/styles';
import { useTransition, animated, config,useSpring } from 'react-spring';
import Ilus from '../undraw_diet_ghvw.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #21CBF3 30%, #879bff 90%)',
    borderRadius: 4,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const SaveButton = withStyles({
  root: {
    background: '#C38D9E',
    borderRadius: 14,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);









const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },Tab : {
      widht : 48
    }
  }}));

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.food[0].time_eat}
        </TableCell>
        <TableCell align="right">{row.m_Calories}</TableCell>
        <TableCell align="right">{row.m_fat}</TableCell>
        <TableCell align="right">{row.m_Carbs}</TableCell>
        <TableCell align="right">{row.m_Protein}</TableCell>
        <TableCell align="right">{row.m_fiber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>FoodName</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell align="right">Carbs</TableCell>
                    <TableCell align="right">Protein</TableCell>
                    <TableCell align="right">Fat</TableCell>
                    <TableCell align="right">fiber</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.food.map((eachfood) => (
                    <TableRow key={eachfood.foodName}>
                      <TableCell component="th" scope="row">{eachfood.foodName}</TableCell>
                      <TableCell>{eachfood.calories}</TableCell>
                      <TableCell align="right">{eachfood.carbs}</TableCell>
                      <TableCell align="right">{eachfood.protein} </TableCell>
                      <TableCell align="right">{eachfood.fat} </TableCell>
                      <TableCell align="right">{eachfood.fiber} </TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




export default function ClientMenu(props) {

  const [Addmenu,setAddmenu] = useState(false)
  const MenuofData = props.menu;
  const classes = useStyles();

  const AddMenuSucces = () =>{
    const classes = useStyles();
    if(props.addmenu){
      setAddmenu(true);
      return <div className={classes.root}>
      <Alert severity="success">
        <AlertTitle>Add Menu Succesfully </AlertTitle>
      </Alert>
      </div>
    }

    return null;
  }
  const matches = useMediaQuery('(max-width:500px)');
  var imagesize = 300;
  if(matches){
    imagesize = 200;
  }
  const sss = useSpring({opacity: 1,marginLeft : 0,marginRight: 0,from: {opacity: 0,marginLeft : -200,marginRight: 200}})
  return (
    <animated.div style={sss}>
    <div className="diss">
        
        <div className="TableClient">
        <AddMenuSucces/>
        <SaveButton onClick={props.savemenu}><SaveIcon/>Save to my menu</SaveButton>
        <h2>{MenuofData.type_diet} Menu , ID : {MenuofData.id}</h2>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell />
                <TableCell>Eating Times</TableCell>
                <TableCell align='inherit'>Calories</TableCell>
                <TableCell align='inherit'>Fat&nbsp;(g)</TableCell>
                <TableCell align='inherit'>Carbs&nbsp;(g)</TableCell>
                <TableCell align='inherit'>Protein&nbsp;(g)</TableCell>
                <TableCell align='inherit'>Fiber&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MenuofData.meals.map((row,index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        </div>
        <div className="Total_values">
          <div className="CircleValues">
            <img src={Ilus} width={imagesize} height={imagesize}/>
          </div>
          <Total_menu menutotal={MenuofData}/>
          </div>
    </div>
    </animated.div>
  );
}
