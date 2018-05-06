import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import './profStyles.css';

import axios from 'axios';

class Profile extends Component {

	validPass() {
	    const length = this.state.newPassword.length;
	    if (length > 6) return 'success';
	    else if (length > 0) return 'error';
	    return null;
   }

   confirmPass() {
	    const confirmed = this.state.confirmPassword;
	    const original = this.state.newPassword;
	    if (confirmed.length == 0) return null;
	    else if (confirmed == original) return 'success';
	    else return 'error';
   }

	constructor (props) {
		super(props);

		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			error: '',
			success: ''
		}

		this.validPass = this.validPass.bind(this);
		this.confirmPass = this.confirmPass.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNewPass = this.handleNewPass.bind(this);

	}

	handleChange (evt, type) {
		const newState = {};
		newState[type] = evt.target.value;

		this.setState(newState)
	}

	handleNewPass (evt) {
		evt.preventDefault();

		axios.post('/api/user/changePassword', {
			userID: this.props._id,
			password: this.state.newPassword
		})
		.then(() => {
			this.setState({
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
				error: '',
				success: 'Password Successfully Changed!'
			})
		})
		.catch(err => {
			console.error(err);
		})

	}


  render () {
		if (!this.props._id) {
			return (
				<h1>Login to view profile</h1>
			)
		} else {
			return (
				<div>
				<h1> My Profile </h1>
				<PanelGroup accordion id="infoPanels">
					<Panel>
							<Panel.Heading>
								<Panel.Title componentClass="h3"> Username </Panel.Title>
							</Panel.Heading>
							<Panel.Body>
							{ this.props.username }
							</Panel.Body>
						</Panel>
						<Panel>
							<Panel.Heading>
								<Panel.Title componentClass="h3"> Email </Panel.Title>
							</Panel.Heading>
							<Panel.Body>
							{ this.props.email }
							</Panel.Body>
						</Panel>
						<Panel>
							<Panel.Heading>
								<Panel.Title componentClass="h3"> Change Password </Panel.Title>
							</Panel.Heading>
							<Panel.Body>
								<form onSubmit={this.handleNewPass}>
						      		<FormGroup >
							      		<ControlLabel> Current Password </ControlLabel>
							      		<FormControl type="password" value={this.state.oldPassword} onChange={(evt) => { this.handleChange(evt, 'oldPassword')} }/>
							      	</FormGroup>
							      	<FormGroup validationState={this.validPass()}>
							      		<ControlLabel> New Password </ControlLabel>
							      		<FormControl type="password" value={this.state.newPassword} onChange={(evt) => { this.handleChange(evt, 'newPassword')} }/>
							      	</FormGroup>
							      	<FormGroup validationState={this.confirmPass()}>
							      		<ControlLabel> Confirm New Password </ControlLabel>
							      		<FormControl type="password" value={this.state.confirmPassword} onChange={(evt) => { this.handleChange(evt, 'confirmPassword')} }/>
							      	</FormGroup>
							      	<Button type="submit">Change Password</Button>
											{
												this.state.success ? <HelpBlock>{ this.state.success }</HelpBlock> : ''
											}
							    </form>
							</Panel.Body>
					</Panel>
				</PanelGroup>
				</div>
			);
		}
  }
}

import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		_id: state.account._id,
		username: state.account.username,
		email: state.account.email
	}
}

export default connect(mapStateToProps)(Profile);
