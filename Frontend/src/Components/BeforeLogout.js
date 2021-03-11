import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function BeforeLogout(props) {


  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClickclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"FitnessApp Check System"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClickclose} color="primary">
            Yes i'm sure
          </Button>
          <Button onClick={props.handleClickStay} color="primary" autoFocus>
            No i want to stay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}