import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

// This will be our main component container for the rest of our site
class Login extends Component {

	validPass() {
	    const length = this.state.signupPassword.length;
	    if (length > 1) return 'success';
	    else if (length > 0) return 'error';
	    return null;
   }

   confirmPass() {
	    const confirmed = this.state.confirmPassword;
	    const original = this.state.signupPassword;
	    if (confirmed.length == 0) return null;
	    else if (confirmed == original) return 'success';
	    else return 'error';
   }

   confirmEmail() {
	   	const myMail = this.state.signupEmail;
	   	const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	   	if (emailRegex.test(myMail)) return 'success';
	   	else if (myMail.length > 0) return 'error';
	   	return null;
   }

	constructor (props) {
		super(props);

		this.state = {
			loginUsername: '',
			loginPassword: '',
			signupUsername: '',
			signupEmail: '',
			signupPassword: '',
			confirmPassword: '',
			error: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.validPass = this.validPass.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
		this.confirmEmail = this.confirmEmail.bind(this);
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

		const length = this.state.signupPassword.length;
		const myMail = this.state.signupEmail;
	   	const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	   	const confirmed = this.state.confirmPassword;
	    const original = this.state.signupPassword;
	    if((length>6)&&(emailRegex.test(myMail))&&(confirmed == original)){
	    	this.props.signup({
			username: this.state.signupUsername,
			password: this.state.signupPassword,
			email: this.state.signupEmail
			})
	    } else {
	    	this.setState({
	    		error: 'Invalid Signup Info'
	    	})
	    }
		
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
				      		<FormControl onChange={(evt) => { this.handleChange(evt, 'loginPassword')} } type="Password" />
			      		</FormGroup>
			      		<Button type="submit">Login</Button>
			      	</form>
		      	  </Tab>

		        <Tab eventKey={2} title="Sign Up">
		        	<form onSubmit={this.handleSignUp}>
			      		<FormGroup validationState={this.confirmEmail()}>
				      		<ControlLabel>Email</ControlLabel>
				      		<FormControl type="email" onChange={(evt) => { this.handleChange(evt, 'signupEmail')} } />
			      		</FormGroup>
			      		<FormGroup>
				      		<ControlLabel>Username</ControlLabel>
				      		<FormControl type="text" onChange={(evt) => { this.handleChange(evt, 'signupUsername')} } />
			      		</FormGroup>
			      		<FormGroup validationState={this.validPass()}>
				      		<ControlLabel>Password</ControlLabel>
				      		<FormControl type="password"
				      		onChange={(evt) => { this.handleChange(evt, 'signupPassword')} } />
				      		<HelpBlock>Password must be at least 7 characters long.</HelpBlock>
			      		</FormGroup>
			      		<FormGroup validationState={this.confirmPass()}>
				      		<ControlLabel>Confirm Password</ControlLabel>
				      		<FormControl type="password"
				      		onChange={(evt) => { this.handleChange(evt, 'confirmPassword')} } />
			      		</FormGroup>
			      		<Button type="submit">Sign Up</Button>
			      		{ this.state.error ? <HelpBlock>{this.state.error}</HelpBlock> : ''}
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
