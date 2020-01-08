import React from 'react';
import UserList from './users/UserList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {


  return (
    <div className="container">
      <div className="header"><center><h1>React app</h1></center></div>
      <Router>
      <nav className="menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
        <Switch>
        <Route path="/users">
          <div className="content"><UserList /></div>
        </Route>
        <Route path="/">
        <div className="content">Home</div>
        </Route>
        </Switch>
      </nav>
      </Router>
      
    </div>
  );
}

export default App;
