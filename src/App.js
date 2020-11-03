import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShowDetails from './components/showDetails/ShowDetails';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/showdetails/:id' component={ShowDetails} />
        <Route exact path='*' component={Dashboard} />
      </Switch>
    );
  }
}

export default App;
