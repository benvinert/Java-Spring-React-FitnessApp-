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

export default function TypeDiet(props) {
  const classes = useStyles();
  const [TypeDiet, SetTypeDiet] = useState('');
  const [open, setOpen] = useState(false);


  function handleChange(event){
    var val = event.target.value
    SetTypeDiet(val);
    props.chooseDiet(val);


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
        <InputLabel id="demo-controlled-open-select-label">Type diet</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={TypeDiet}
          onChange={handleChange}
          name="TypeDiet"
          id="TypeDiet"

        >
          <MenuItem value={TypeDiet}>
            <em>None</em>
          </MenuItem>
            <MenuItem value="Mass">Mass</MenuItem>
            <MenuItem value="Cut">Cut</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}