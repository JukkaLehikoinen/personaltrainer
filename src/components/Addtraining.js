import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({date:'', time:'', duration:'', activity:''})
    let date;
    let time;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        //training.date = date;
        //training.date = training.date + " " + time
        props.addTraining(training);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return(
        <div>
        <h1> </h1>
        <Button style={{margin:10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            type="date"
            value={training.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="time"
            name="time"
            type="time"
            value={training.time}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
            <TextField
            margin="dense"
            id="activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}