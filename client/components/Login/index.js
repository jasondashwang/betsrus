import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';

import axios from 'axios';

// This will be our main component container for the rest of our site
class Login extends Component {

	constructor (props) {
		super(props);

		this.state = {
			loginUsername: '',
			loginPassword: '',
			signupUsername: '',
			signupEmail: '',
			signupPassword: '',
			confirmPassword: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange (evt, type) {
		const newState = {};
		newState[type] = evt.target.value;

		this.setState(newState)
	}

	handleLogin (evt) {
		evt.preventDefault();

		axios.post('/api/user/authenticate', {
			username: this.state.loginUsername,
			password: this.state.loginPassword
		})
		.then(user => {
			console.log(user);
		})
		.catch(err => {
			console.error(err);
		})
	}


  render () {
    return (
      <div>
	      <h1>Login/Signup</h1>
	      <Panel>
		      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
			      <Tab eventKey={1} title="Login">
			      	<form onSubmit={this.handleLogin}>
			      		<FormGroup>
				      		<ControlLabel>Username</ControlLabel>
				      		<FormControl onChange={(evt) => { this.handleChange(evt, 'loginUsername')} } type="text" />
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Password</ControlLabel>
				      		<FormControl onChange={(evt) => { this.handleChange(evt, 'loginPassword')} } type="text" />
			      		</FormGroup>
			      		<Button type="submit">Login</Button>
			      	</form>
		      	  </Tab>

		        <Tab eventKey={2} title="Sign Up">
		        	<form>
			      		<FormGroup>
				      		<ControlLabel>Email</ControlLabel>
				      		<FormControl type="text" onChange={(evt) => { this.handleChange(evt, 'signupEmail')} } />
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Username</ControlLabel>
				      		<FormControl type="text" onChange={(evt) => { this.handleChange(evt, 'signupUsername')} } />
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Password</ControlLabel>
				      		<FormControl type="text" onChange={(evt) => { this.handleChange(evt, 'signupPassword')} } />
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Confirm Password</ControlLabel>
				      		<FormControl type="text" onChange={(evt) => { this.handleChange(evt, 'confirmPassword')} } />
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

import { connect } from 'react-redux';
import { loginThunk, signupThunk } from '../../actions/account';

const mapDispatchToProps = dispatch => {
	return {
		login (username, password) {
			dispatch(loginThunk(username, password))
		}
	}
}


export default Login;
