import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Button from 'react-bootstrap/lib/Button';

import './styles.css';

// This will be our main component container for the rest of our site
class Home extends Component {
  render () {
    return (
      <div>
        <Jumbotron className="landing">
    		  <h1>Welcome to Bets R Us</h1>
    		  <p>
    		    "Do you have what it takes to rise to the top?" - Chirayu Poudel (Crystal Palace)
    		  </p>
    		  <p>
    		    <Button bsStyle="primary">Learn more</Button>
    		  </p>
    	   </Jumbotron>
      </div>
    );
  }
}

export default Home;
