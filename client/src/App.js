import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Login from './components/login.js'
import user from './components/user.js'
import calories from './components/calories.js'
import Weight from './components/weight.js'

class App extends Component {
  state = {
    // user: null
    user: {"_id":"5d0434b9c8e2331287c6a48f","googleId":"116847055463028164541","__v":0,"email":"sekoyahicks@gmail.com","name":"Sekoya Hicks"}

  }

  login = (user) => {
    console.log(user)
    this.setState({user: user})
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            {this.state.user === null && <Route path="/" render={() => <Login onLogin={this.login}/>} />}
            <Route path="/" render={() => <Weight user={this.state.user}/>}/>
            <Route exact path="/" component={user}/>
            <Route exact path="/calories" component={calories}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
    

export default App;
