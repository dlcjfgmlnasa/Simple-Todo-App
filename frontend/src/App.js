import React, { Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {LoginPage, MainPage, } from './pages'


class App extends Component {

  
  render() {
    return(
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/main">Default</Link></li>
          </ul>
          <hr/>
          <Route exact path="/" component={LoginPage}/>
          <Route path="/main" component={MainPage}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
