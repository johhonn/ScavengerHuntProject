import React, { Component } from 'react'

import { Route, Link,Switch,BrowserRouter  } from 'react-router-dom';
import getWeb3 from './utils/getWeb3'
import GameCreation from './components/GameCreation/GameCreation'
import GameInfoDisplay from './components/GameInfoDisplay/GameInfoDisplay'
import GoalSetup from './components/GoalSetup/GoalSetup'
import UserSubmit from './components/UserSubmit/UserSubmit'
import OwnerConsole from './components/OwnerConsole/OwnerConsole'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')


    // Declaring this for later so we can chain functions on SimpleStorage.


    // Get accounts.

  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">

        <li><Link to="/creation">CreateGame</Link></li>
        <li><Link to="/mygames">ViewMyGames</Link></li>
        <Switch>
          <Route path="/creation"  component={GameCreation} />
          <Route path="/mygames"  component={GameInfoDisplay} />
          <Route path="/GameSetup" component={GoalSetup}/>
          <Route path="/UserSubmit"  component={UserSubmit}/>
          <Route path="/OwnerConsole"  component={OwnerConsole}/>
          </Switch>

      </div>
        </BrowserRouter>
    );
  }
}

export default App
