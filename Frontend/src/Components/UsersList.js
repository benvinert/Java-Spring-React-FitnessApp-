import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import cookiesjs from 'js-cookie';


const columns = [{
  id: 'id',
  label: 'id',
  minWidth: 50,
  align: 'right',
},
  { id: 'username', label: 'username', minWidth: 50 },
  { id: 'email', label: 'email', minWidth: 50 },
  {
    id: 'password',
    label: 'password',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'age',
    label: 'age',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'birthday',
    label: 'birthday',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  }
];

const useStyles = makeStyles({
  root: {
    width: '1000px',
    
  },
  container: {
    maxHeight: 440,
    width: '100%',
  },
});

export default function UsersList() {
  var Cook = cookiesjs.get("token");
  var OurUsers = cookiesjs.get("OurUsers");
  const header = new Headers();
  header.append('Content-Type','application/json');
  header.append('Authorization','Basic ' + OurUsers);
  header.append("token",Cook);
  const [Loading,SetLoading] = useState(true);

  const [Users,SetUsers] = useState([
    {menu : {
      id : 2
    }}
  ]);

  useEffect(() => {
   const GetUsers = async() => {
     const Allusers = await fetch(`/Secure/Admin/GetAllUsers`,{
       headers : header,
     }).then((data) => {
       console.log("User List");
       console.log(data);
     return data.json()}
     ).then((datajson) => {
       if(datajson != null){
          SetLoading(false); 
          return SetUsers(datajson);
        }})
   }
   GetUsers();
  console.log(Users)
   
  })

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div align='center'>
    {Loading ? < CircularProgress />  : <Container className="Clientmenu" component="main" maxWidth="md">
      <TableContainer className={classes.container}>
      <Paper className={classes.root}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => {
                    var value = user[column.id];

                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </Paper>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
        
      </Container>
            }</div>
  );
}
