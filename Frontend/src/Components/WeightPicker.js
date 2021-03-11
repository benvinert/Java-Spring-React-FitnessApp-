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

export default function WeightPicker(props) {
  const classes = useStyles();
  const [weight, setWeights] = useState('');
  const [open, setOpen] = useState(false);

  var weights = [];
  var i;
  var cell = -1;
  for(i = 45.5 ; i < 100.0;i++){
        cell++;
        weights[cell] = i;
  }

  function handleChange(event){
    var val = event.target.value
    setWeights(val);
    props.reg({name : props.for ,value : val})
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
        <InputLabel id="demo-controlled-open-select-label">Weight</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={weight}
          onChange={handleChange}
          name={props.for}
          id={props.for}
          
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {weights.map((each,index) => {
              return <MenuItem key={index} value={each}>{each}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    </div>
  );
}