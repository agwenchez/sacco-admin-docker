import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';



const ConfirmDelete = ({onDelete,name,openDialog}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const deleteAndClose = () => {
    onDelete();
    setOpen(openDialog);
}

  return (
    <div >

      <DeleteIcon  onClick={handleClickOpen} style={{ cursor: 'pointer', color: 'red' }}/>
      <Dialog
        id="confirm_delete"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"   style={{marginTop:'5%'}}>{"Delete Sacco Member"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginBottom:'5%'}} >
          <Button onClick={deleteAndClose} color="primary">
           Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
           No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete