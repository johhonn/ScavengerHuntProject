import React, { Component } from 'react';
import getWeb3 from '../../utils/getWeb3'
import PhotoBounty from '../../../build/contracts/PhotoBounty.json'
import {Link,Route} from 'react-router-dom';
import UserSubmit from '../UserSubmit/UserSubmit'
import OwnerConsole from  '../OwnerConsole/OwnerConsole'
let PB
class GameInfoDisplay extends Component{
state={
  CreatedGames:0,
  RegisteredGames:0,
  CGameArray:[],
  RGameArray:[],
  BountyID:'',
  BountyID2:'',
  cID:0,
  rID:0,
  RGameClicked:false,
  CGameClicked:false
}
getGameInfo=()=>{
  const contract = require('truffle-contract')
  let  PBB = contract(PhotoBounty)
  PBB.setProvider(this.state.web3.currentProvider)
  this.state.web3.eth.getAccounts((error, accounts) => {
    PBB.deployed().then((instance) => {

       PB = instance
       PB.gettotalCreatedBounties(accounts[0]).then(result=>{
         console.log(result)
         this.setState({CreatedGames:result.c[0]})
         this.setState({CGameArray:result})
         console.log(result)
       })
       PB.gettotalRegisterdBounties(accounts[0]).then(result=>{
          console.log( result)

         this.setState({RegisteredGames:result.c[0]})
         this.setState({GameArray:result})
       })
       console.log(PB.address +"constract address")
       console.log(PB)
     })
   })

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
    this.getGameInfo()
  })
  .catch(() => {
    console.log('Error finding web3.')
  })
}
handleChange1 = (fieldName, event) => {
  const state = {
    ...this.state,
  };
  state[fieldName] = event.target.value;
  this.setState(state);
  this.setCBountyID(event.target.value)
  console.log(state)
};
handleChange2 = (fieldName, event) => {
  const state = {
    ...this.state,
  };
  state[fieldName] = event.target.value;
  console.log(event.target.value)
  let t=event.target.value
  this.setState(state);
  this.setrBountyID(t)
  console.log(state)
};
setCBountyID=(id)=>{
    this.state.web3.eth.getAccounts((error, accounts) => {
  PB.getCreatedBounties(accounts[0]).then(result=>{
    console.log(result[id])
    let r=result[id-1].c[0]
   this.setState({cID:r})
 })
})
}
setrBountyID=(id)=>{
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(PB)
      console.log(accounts[0])
  PB.getRegisterdBounties(accounts[0]).then(result=>{
    console.log(result[id-1].c[0])
    let r=result[id-1].c[0]
   this.setState({rID:r})
 })
})
}
getRegistered=()=>{

}
render(){
 console.log(this.state.CreatedGames)
  let BountyID=this.state.BountyID
  let BountyID2=this.state.BountyID2

  console.log(this.state)
  return(<div><h1>You Game Info</h1>
        <div><p>You have Created {this.state.CreatedGames} Bounties</p>
          <form>

            <label>
              Find Created Game
              <input type='text' value={this.state.BountyID} onChange={this.handleChange1.bind(this,'BountyID')} ></input>
              </label>
              <Link to={{pathname:"/OwnerConsole"+ '/'+this.state.BountyID}}>
              <button onClick={this.getCreated}>Submit</button>
              </Link>
            </form>
        </div>

        <div><p>You are registered for {this.state.RegisteredGames} Bounties</p>
          <form>

          <label>
            Find Registered Game
            <input type='text' value={this.state.BountyID2} onChange={this.handleChange2.bind(this,'BountyID2')} ></input>
            </label>
            <Link to={{pathname:"/UserSubmit"+ '/'+this.state.BountyID2}}>
            <button onClick={this.Registered}>Submit</button>
            </Link>
          </form>
        </div>
        <Route path={'/UserSubmit'+'/:id'} exact component={UserSubmit} />
        <Route path={'/OwnerConsole'+'/:id'} exact component={OwnerConsole} />
       </div>)
}






}
export default GameInfoDisplay;
