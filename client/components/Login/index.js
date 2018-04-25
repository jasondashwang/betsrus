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
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	handleChange (evt, type) {
		const newState = {};
		newState[type] = evt.target.value;

		this.setState(newState)
	}

	handleLogin (evt) {
		evt.preventDefault();

		this.props.login(this.state.loginUsername, this.state.loginPassword);
	}

	handleSignUp (evt) {
		evt.preventDefault();

		this.props.signup({
			username: this.state.signupUsername,
			password: this.state.signupPassword,
			email: this.state.signupEmail
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
		        	<form onSubmit={this.handleSignUp}>
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
		},

		signup (user) {
			dispatch(signupThunk(user));
		}
	}
}


export default connect(null, mapDispatchToProps)(Login);
