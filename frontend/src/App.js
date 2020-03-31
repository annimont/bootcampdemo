import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Networth from './Components/Networth';
import Money from './Components/Money';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/money' component={Money} />
        <Route path='/networth' component={Networth} />
        <Route render={() => '404 - Not Found!'} />
      </Switch>
    </Router>
  );
}

export default App;
