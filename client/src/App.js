import React, { Component } from 'react'
import { Route, Switch} from 'react-router'
import Login from './components/Login'
import Dash from './components/dashboard/Dash';
import NavBar from './components/NavBar'




class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path='/login' component={Login} />
      <div>
         <Switch>
           <Route exact path='/' component={Dash} />
         </Switch>
      </div>
      </div>
    );
  }
}

export default App;
