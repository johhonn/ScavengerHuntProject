import React, { Component } from 'react';

class SubmissionView extends Component {

    render () {
      let Display=null
      console.log(this.props)
      if(this.props.display==true){
        Display=(
        <div>
            <h1>Selected Submission</h1>
            <p>The Submission owner is {this.props.address}</p>
            <p>the submission ipfs hash is {this.props.ipfshash}</p>
        </div>
      )
    }
        if(this.props.display==false){
        Display=(<div> <h1>Selected Submission</h1></div>)
        }



        return (
          <div>
            {Display}
          </div>  
        );
    }
}

export default SubmissionView;
