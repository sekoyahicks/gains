import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import axios from 'axios'

import Login from './components/login.js'
import Weight from './components/weight.js'

class App extends Component {
  state = {
    user: null
  }

  login = (user) => {
    console.log(user)
    this.setState({user: user})
  }

  deleteAccount = async () => {
    await axios.delete(`/users/${this.state.user._id}`)
    console.log("Account deleted")
    this.setState({user: null})
  }

  render () {
    return (
      <Router>
        <div>
          <Switch>
            {this.state.user === null && <Route path="/" render={() => <Login onLogin={this.login}/>} />}
            <Route path="/" render={() => <Weight onUserDeleted={this.deleteAccount} user={this.state.user}/>}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
    

export default App;
