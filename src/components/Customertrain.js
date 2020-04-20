import React, { useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';



export default function Customertrain(props) {

    const [trainings, setTrainings] = React.useState([]);
 
    useEffect(() => {
        getTrainings();
    }, []) 

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const addToCustomer = (info,index) => {
       let date= trainings[index].date
       let duration = trainings[index].duration
       let activity = trainings[index].activity
       props.addActivity(props,date,activity,duration,info,trainings[index])

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
        Cell: row => (<Button size="small" color="secondary" onClick={() => addToCustomer(row.original.links[2].href,row.index)}>Add to Customer</Button>)
    }
      ,            
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
    }
    
]

return(
    <div>

    <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns} />
    
    </div>
    )
}