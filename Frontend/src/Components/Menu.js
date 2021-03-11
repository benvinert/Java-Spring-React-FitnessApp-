import React,{useState, useEffect} from 'react';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from 'react-bootstrap';
import Button1 from '@material-ui/core/Button';

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
  const [show,setShow] = useState(false);
  const [showdelete,setshowdelete] = useState(false);
  

  
  const calor = () => {
    let calor = 0;
    row.map( (foodr) => {
      calor = parseFloat(calor);
      calor += foodr.calories;
      calor = (Math.round(calor * 100)/100).toFixed(2);
    });
    return calor;
  };

  const carbs = () => {
    let carbs = 0;
    row.map( (foodr) => {
      carbs = parseFloat(carbs);
      carbs += foodr.carbs;
      carbs = (Math.round(carbs * 100)/100).toFixed(2);
    });
    return carbs;
  };


  const protein = () => {
    let protein = 0;
    row.map( (foodr) => {
      protein = parseFloat(protein);
      protein += foodr.protein;
      protein = (Math.round(protein * 100)/100).toFixed(2);
    });
    return protein;
  };

  const fat = () => {
    let fat = 0;
    row.map( (foodr) => {
      fat = parseFloat(fat);
      fat += foodr.fat;
      fat = (Math.round(fat * 100)/100).toFixed(2);
    });
    return fat;
  };

  const fiber = () => {
    let fiber = 0;
    row.map( (foodr) => {
      fiber = parseFloat(fiber);
      fiber += foodr.fiber;
      fiber = (Math.round(fiber * 100)/100).toFixed(2);
    });
    return fiber;
  };

function showDeleteIcon(foodname) {
  if(open === true){
    if(foodname === ""){

    }else{
      return <IconButton 
      aria-label="delete">
        <DeleteIcon />
        </IconButton>;
    }
  }
}
  
  return (
    <React.Fragment>

      <TableRow className={classes.root}>
          
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => {
            setOpen(!open);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={props.adding}>
           <AddCircleOutlineIcon style={{ fontSize: 30 }} color="primary"/>
        </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        {row[0].TimeEat}
        </TableCell>
        <TableCell align="right">{calor()}</TableCell>
        <TableCell align="right">{carbs()}</TableCell>
        <TableCell align="right">{protein()}</TableCell>
        <TableCell align="right">{fat()}</TableCell>
        <TableCell align="right">{fiber()}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Foods
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>FoodName</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell align="right">Carbs</TableCell>
                    <TableCell align="right">Protein</TableCell>
                    <TableCell align="right">Fat</TableCell>
                    <TableCell align="right">Fiber</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((foodsRow) => (
                    <TableRow key={foodsRow.foodName}>
                      <TableCell component="th" scope="row">
                        {foodsRow.foodName}
                      </TableCell>
                      <TableCell>{foodsRow.calories}</TableCell>
                      <TableCell align="right">{foodsRow.carbs}</TableCell>
                      <TableCell align="right">{foodsRow.protein}</TableCell>
                      <TableCell align="right">{foodsRow.fat}</TableCell>
                      <TableCell align="right">{foodsRow.fiber}</TableCell>
                      <TableCell align="right>" onClick={() =>{
                        props.delete([foodsRow.foodName,row[0].TimeEat])
                      }}>
                        {
                        showDeleteIcon(foodsRow.foodName)
                        }

                         </TableCell>
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




export default function Menu(props) {

  const rows = props.rows;

  return (
    <div>


    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Open Meal</TableCell>
            <TableCell/>
            <TableCell>Eating Times</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Fiber&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.foodName} row={row}  delete={(val) => {
              props.delete(val);}}
              //Add Food 
              adding={ () => { 
              props.showsearch();
              props.SetTimeeat(row[0].TimeEat);
            }}/>))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
  );
}