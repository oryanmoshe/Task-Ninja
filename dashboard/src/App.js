import React, { PureComponent } from 'react';
import './App.css';
import GalacticaDashboard from './GalacticaDashboard'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends PureComponent {
  render(){
    return <Router>
      <Route path="/:date?/:theme?" component={GalacticaDashboard} />
    </Router>
  }
}

export default App;
