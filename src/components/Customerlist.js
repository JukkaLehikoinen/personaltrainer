import React, { useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import SnackBar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Customertrain from './Customertrain';

export default function Customerlist() {
    const [customers, setCustomers] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [name, setName] = React.useState([]);
    const [dlink, setDlink] = React.useState([]); // DirectLink
    const [alist, setAlist] = React.useState([]);
  const [display, setDisplay] = React.useState([]);

    useEffect(() => {
        getCustomers();
    }, []) 

    const getCustomers = () => {
        setDisplay(0)
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(_ => getCustomers())
            .then(_ => setOpen(true))
            .then(_ => {
              setMsg('Customer deleted');
              setOpen(true); 
              
            })
            //console.log(link)
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        //console.log(customer)
        fetch('https://customerrest.herokuapp.com/api/customers', {method: 'POST',
        headers:{'Content-Type':'application/json'
        },
        body:JSON.stringify(customer)
        }
        
    )
    .then(_ => getCustomers())
    .then(_ => {
        setMsg('New customer added');
        setOpen(true);
      })
      .catch(err => console.error(err))  
    }

    const updateCustomer = (link, customer) => {
        fetch(link,{
            method:'PUT', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
        }
        
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer is editted');
            setOpen(true);
          })
          .catch(err => console.error(err))  
        }

    const handleClose = () => {
        setOpen(false);
    }


    

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
          Header: 'Streetaddress'  ,
          accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer}/>)
        },
        {
            //Cell: row => (<Button size="small" color="secondary" onClick={() => deleteCustomer(row._links.self.href)}>DELETE</Button>)
            Cell: row => (<Button size="small" color="secondary" onClick={() => deleteCustomer(row.original.links[0].href)}>DELETE</Button>)
        },
    {
        Cell: row => (<Button size="small" color="secondary" onClick={() => showActivity(row.original.links[2].href,row.original)}>Activity</Button>)
    }
        
    ]
    const showActivity = (link,info) => {
        fetch(link)
        //fetch(props.customer.links[2].href)
        .then(response => response.json())
        .then(data => setAlist(data.content))
        .catch(err => console.error(err))
        setDisplay(1)
        setDlink(info.links[0].href)
        //setDlink(link)
        //console.log(alist)
        setName(info.firstname + " " + info.lastname)
    }

    const addActivity = (link,date,activity,duration,info) => {
        setDisplay(0)
        console.log(dlink)
        console.log(date)
        console.log(activity)
        console.log(duration)
        let customero = {date: date, duration: duration, activity: activity, customer: dlink}
        ///////////////////
        fetch('https://customerrest.herokuapp.com/api/trainings',{
            method:'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(customero)
//body: {
 //              'date': date,
  //             'duration': duration,
   //            'activity':activity,
    //           'customer': dlink
     //    }
        }
        
        )
       // .then(_ => getCustomers())
        .then(_ => {
            setMsg('Activity is added');
            setOpen(true);
          })
          .catch(err => console.error(err))  
        }
        //////////////////

    
    

    if (display===1){
        const columns = [
            {
                Header: 'Date',
                accessor: 'date'
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
            <div><br></br>
                <h1>{name}'s activities</h1>
            
            <ReactTable defaultPageSize={5} filterable={true} data={alist} columns={columns}/>
            <Button color="secondary" onClick={() => getCustomers()}>Back</Button>
            <Customertrain link={dlink} addActivity={addActivity}/>
            
            </div>

        )

    } else {

    return(
        <div>
            <Addcustomer addCustomer={addCustomer}/>
        <ReactTable defaultPageSize={10} filterable={true} data={customers} columns={columns}/>
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
}