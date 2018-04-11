import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

// This will be our main component container for the rest of our site
class Login extends Component {


  render () {
    return (
      <div>
	      <h1>Login/Signup</h1>
	      <Panel>
		      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
			      <Tab eventKey={1} title="Login">
			      	<form>
			      		<FormGroup>
				      		<ControlLabel>Username</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Password</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<Button type="submit">Login</Button>
			      	</form>
		      	  </Tab>

		        <Tab eventKey={2} title="Sign Up">
		        	<form>
			      		<FormGroup>
				      		<ControlLabel>Email</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Username</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Password</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Confirm Password</ControlLabel>
				      		<FormControl type="text"/>
			      		</FormGroup>
			      		<Button type="submit">Sign Up</Button>
			      	</form>
		        </Tab>
		      </Tabs>
	      </Panel>
      </div>
    );
  }
}

export default Login;
