import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function HeightPicker(props) {
  const classes = useStyles();
  const [height, setHeight] = useState('');
  const [open, setOpen] = useState(false);
  const [showerror,setShowerror] = useState(false);

  var heights = [];
  var i;
  var cell = -1;
  for(i = 145 ; i < 215 ;i++){
        cell++;
        heights[cell] = i;
  }

  function handleChange(event){
    var val = event.target.value
    setHeight(val);
    props.reg({name : "height" ,value : val})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
    
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Height in cm</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={height}
          onChange={handleChange}
          required={true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {heights.map((each,index) => {
              return <MenuItem key={index} value={each}>{each}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    </div>
  );
}