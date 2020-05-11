import React, { useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';
import moment from 'moment';



export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    

    useEffect(() => {
        getTrainings();
    }, []) 

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))

        
    
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getTrainings())
            .then(_ => setOpen(true))
            .then(_ => {
              setMsg('Training deleted');
              setOpen(true); 
              
            })
            //console.log(link)
            .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        console.log(training)
        
        let dateConv = new Date(training.date + " " + training.time).toISOString();
        //console.log(dateConv)
        training.date=dateConv;
        fetch('https://customerrest.herokuapp.com/api/trainings', {method: 'POST',
        headers:{'Content-Type':'application/json'
        },
        body:JSON.stringify(training)
        }
        
    )
    .then(_ => getTrainings())
    .then(_ => {
        setMsg('New training added');
        setOpen(true);
      })
      .catch(err => console.error(err))  
    }

    const updateTraining = (link, training) => {
        let dateConv = new Date(training.date + " " + training.time).toISOString();
        //console.log(dateConv)
        training.date=dateConv;
        console.log(training.date)
        
        fetch(link,{
            method:'PUT', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(training)
        }
        
        )
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('Training is editted');
            setOpen(true);
          })
          .catch(err => console.error(err))  
        }

    const handleClose = () => {
        setOpen(false);
    }
    
   const showFilteredFormat =(row) =>{
    return (
        <div>
            {moment(row.date).format("DD.MM.YYYY HH:mm:ss")}
        </div>
    )
    
   }
    
    const columns = [
               
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (showFilteredFormat(row.original))
               
            
            
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
          Header: 'Activity'  ,
          accessor: 'activity'   
        },
        {
            Cell: row => (<Edittraining training={row.original} updateTraining={updateTraining}/>)
        },
        {
            //Cell: row => (<Button size="small" color="secondary" onClick={() => deleteTraining(row._links.self.href)}>DELETE</Button>)
            Cell: row => (<Button size="small" color="secondary" onClick={() => deleteTraining(row.original.links[0].href)}>DELETE</Button>)
        }
        
    ]

    return(
        <div>
            <Addtraining addTraining={addTraining}/>
        <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
        <SnackBar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={msg}
            
            />
        </div>
    )
   
    

}