import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function Kalenteri() {
  const [trainings, setTrainings] = React.useState([])
  const [customers, setCustomers] = React.useState([])
  const [customerstrain, setCustomerstrain] = React.useState([])
  var events2=[{id:'',title:''},[{start:''},{end:''}]];
  let nimilista=[];
  var nimi=[];   

  
  useEffect(() => {
    getCustomers();
  }, [])

  

  const getCustomers = () => {

    fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(response => response.json())
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err))
    
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
      
  }

  useEffect(() => {
    
  getCustomerstrain(); 
      
  },[trainings.length])
  
    const getCustomerstrain = () => {

      for (let i = 0; i < trainings.length; i++) {
      
      console.log(trainings[i].links[2].href)
      fetch(trainings[i].links[2].href)
      .then(response => response.json())
      .then(name => setCustomerstrain(name.firstname + " " + name.lastname))  
      //.then(data => nimilista[i]= [{firstname: data.firstname, lastname:data.lastname}])
      //.then(data => nimilista[i] =data.firstname + " " + data.lastname)
      .catch(err => console.error(err))
      }   
         
    } 
  

  const localizer = momentLocalizer(moment);
  
  //const now = new Date();
  // end: new Date(new Date().setHours(new Date().getHours() + 3)),
 // for (let i = 0; i < customers.length; i++) {
 //   console.log(customers[i].links[0].href)
 // }
 
  

 
//setCustomerstrain(...nimilista,["John Johnson","Mary Philips","Dan Davidson"])
    
    
    //const myArr = ["John Johnson","Mary Philips","Dan Davidson"];
    
      
     

console.log(customerstrain)
//console.log(trainings)
      
      for (let i = 0; i < trainings.length; i++) {

        



    if (i===0) {
      events2=[{id: i, title:trainings[i].activity + "/"+ customerstrain[i], start:new Date(trainings[i].date),end:new Date(new Date(trainings[i].date).setHours(new Date().getHours() + trainings[i].duration / 60))}]
      
  }else{
    events2=[...events2, {id: i, title:trainings[i].activity + "/" + customerstrain[i], start:new Date(trainings[i].date),end:new Date(new Date(trainings[i].date).setHours(new Date().getHours() + trainings[i].duration / 60))}]
  }
  
     // console.log(trainings[i].date)
     // console.log(trainings[i].activity)
     // console.log(trainings[i].duration)
   //   console.log(trainings[i].links[2].href)
   //   console.log(trainings[i].links[2].href.substring(49, 51))
    //  console.log("start:" + new Date(trainings[i].date))
    //  console.log("end:" + new Date(new Date(trainings[i].date).setHours(new Date().getHours() + trainings[i].duration / 60))+ "TÄTÄ PITÄÄ VIELÄ HIOA")
    //  console.log("harjoituksia yhteensä "+i)
    }

    
    
//console.log(events2)
//var lista = JSON.stringify(nimilista);
//console.log(JSON.parse(JSON.stringify(nimilista)));
//console.log(JSON.parse(JSON.stringify(events2)));
 //const myArr = [{date:'bacon',start:'letuce',end:'tomatoes'}];
 //console.log(events)

 // lista = JSON.stringify(events2);
 
 //console.log(myArrStr);
 // "["bacon","letuce","tomatoes"]"
 
 //console.log(JSON.parse(lista));
 // ["bacon","letuce","tomatoes"]
 


  return (
    <div>
      <p>
        A test for the React Big Calendar.
          </p>
      <div style={{ height: '500pt' }}>
        <Calendar
          events={events2}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
        />
      </div>
      
    </div>
  );

}