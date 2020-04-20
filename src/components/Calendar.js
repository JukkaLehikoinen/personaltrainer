import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function Kalenteri() {
  const [trainings, setTrainings] = React.useState([])
  let events = [{ id: '', title: '' }, [{ start: '' }, { end: '' }]];
  const localizer = momentLocalizer(moment);
  

  
  

  useEffect(() => {

    getCustomers();



  }, [])

  const getCustomers = () => {

    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        setTrainings(data)
      })
      .catch(err => console.error(err))


  }





  for (let i = 0; i < trainings.length; i++) {
    if (trainings[i].customer != null) {



      if (i === 0) {
        events = [{ id: i, title: trainings[i].activity + "/" + trainings[i].customer.firstname + " " + trainings[i].customer.lastname, start: moment.utc(new Date(trainings[i].date)), end: moment.utc(new Date(new Date(trainings[i].date).setMinutes(new Date(trainings[i].date).getMinutes() + trainings[i].duration))) }]

      } else {
        events = [...events, { id: i, title: trainings[i].activity + "/" + trainings[i].customer.firstname + " " + trainings[i].customer.lastname, start: moment.utc(new Date(trainings[i].date)), end: moment.utc(new Date(new Date(trainings[i].date).setMinutes(new Date(trainings[i].date).getMinutes() + trainings[i].duration))) }]
      }
    }
  }






  return (
    <div>
      <p>
        A test for the React Big Calendar.
          </p>
      <div style={{ height: '500pt' }}>
        <Calendar
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
        />
      </div>

    </div>
  );

}