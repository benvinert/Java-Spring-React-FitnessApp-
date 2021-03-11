import React,{useState,useEffect,useContext} from 'react';
import Container from '@material-ui/core/Container';
import { UserContext } from './UserContext';
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
import cookiesjs from 'js-cookie';


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

  function MyMenu(props){
    var Cook = cookiesjs.get("token");
    var OurUsers = cookiesjs.get("OurUsers");
    const header = new Headers();
    header.append('Content-Type','application/json');
    header.append('Authorization','Basic ' + OurUsers);
    header.append("token",Cook);

    const {User,setUser} = useContext(UserContext);
  const [menu,Setmenu] = useState({
    meals : []
  });
  const [Loading,SetLoading] = useState(true);
  useEffect(() => {
    const menuofdata = async() => {
    const data = await fetch(`/Secure/GetMenuto/Consumer`,{
      headers : header,
      method : "POST"
    }).then((res) => {
      if(res.status == 200){
        console.log(res);
        return res.json()
        .then((afterjson) => Setmenu((prevalues) => {
          return {...prevalues,meals : afterjson.meals}
          SetLoading(false);
        }))}else{
          SetLoading(true);
        }})
      }
    menuofdata();
    SetLoading(false);
  },[])

    

    return(
    
    <Container component="main" maxWidth="md">
    <h3 align="center">Your menu</h3>
    <TableContainer style={{zIndex : '1'}}component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Eating Times</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Fiber&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Loading ? <h1>Menu is Empty</h1> : menu.meals.map((row,index) => (
                <Row key={index} row={row} />
              )) }

            </TableBody>
          </Table>
        </TableContainer>
    </Container>
    
    )
}

export default MyMenu;