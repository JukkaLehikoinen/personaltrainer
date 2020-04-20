import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendar from './components/Calendar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Route } from "react-router-dom"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';


function App() {
  return (
    <div className="App">
      <AppBar posiotion="static">
        <Toolbar>
        <Typography variant="h6">Personal trainer</Typography>
          <Breadcrumbs style={{ margin: 20 }} aria-label="breadcrumb" color="white">
            <Link color="inherit" href="/Customerlist" onClick={Customerlist}>Customers</Link>
            <Link color="inherit" href="/Traininglist" onClick={Traininglist}>Trainings</Link>
            <Link color="inherit" href="/Calendar" onClick={Calendar}>Calendar</Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Customerlist">Customers</Link>{' '}
          <Link to="/Traininglist">Trainings</Link>{' '}
          <Link to="/Calendar">Calendar</Link>{' '}

          <Route path="/Customerlist" component={Customerlist} />
          <Route path="/Traininglist" component={Traininglist} />
          <Route path="/Calendar" component={Calendar} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;