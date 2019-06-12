import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import user from './components/user.js'
import calories from './components/calories.js'
import weight from './components/weight.js'

class App extends Component {
  render () {
    return (
      <Router>
        <div>

          <Switch>
            <Route exact path="/" component={user}/>
            <Route exact path="/calories" component={calories}/>
            <Route path="/:id" component={weight}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
    

export default App;
