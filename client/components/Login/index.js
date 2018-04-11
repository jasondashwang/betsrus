import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import FormGroup from 'react-bootstrap/lib/FormFroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

// This will be our main component container for the rest of our site
class Login extends Component {
  render () {
    return (
      <div>
	      <h1>Login/Signup</h1>
	      <Panel>
		      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
			      <Tab eventKey={1} title="Login">
			      <div id='loginBox' class="logHolder">
			      	// <form method="GET" action="/processLog" id="myLogin">
			      	<form>
			      		<ControlLabel>Username</ControlLabel>
			      		<FormControl
			      		 type="text" 
			      		 id="userLog"/>
			      		<p>Password</p>
			      		<input type="text" id="passLog"/>
			      		<input type="submit" id="subLog" value="Login"/>
			      	</form>
			      </div>
		      	</Tab>

		      <Tab eventKey={2} title="Sign Up">
		      <div id='signupBox' class="logHolder">
		      	<form method="GET" action="/processSignup" id="mySignup">
		      		<p>Email</p>
		      		<input type="text" id="emailSign"/>
		      		<p>Username</p>
		      		<input type="text" id="userSign"/>
		      		<p>Password</p>
		      		<input type="text" id="passSign"/>
		      		<p>Confirm Password</p>
		      		<input type="text" id="passSign2"/>
		      		<input type="submit" id="subSign" value="Sign Up"/>
		      	</form>
		      </div>
		      </Tab>
		      </Tabs>
	      </Panel>
      </div>
    );
  }
}

export default Login;
