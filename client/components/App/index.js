import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';

import NavBar from '../NavBar';

// This will be our main component container for the rest of our site
class App extends Component {
  render () {
    return (
      <div>
        <Jumbotron>
    		  <h1>Hello, world!</h1>
    		  <p>
    		    Welcome to Bets-R-Us
    		  </p>
    		  <p>
    		    <Button bsStyle="primary">Learn more</Button>
    		  </p>
    	   </Jumbotron>
      </div>
    );
  }
}

export default App;
