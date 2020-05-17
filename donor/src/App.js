import React, { Component, useState, useEffect } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Join from './components/Join'
import './App.css';

class App extends Component {

  render() {

    return (
      <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/join' component={Join}/>
      </Router>
      
    );
  }
}

export default App;