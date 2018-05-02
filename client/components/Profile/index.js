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
import './profStyles.css';

class Profile extends Component {


  render () {
    return (
      <div>
      <h1> My Profile </h1>
      <Grid>
      	<Row className="headerGrid">
      		<Col xsOffset={3} xs={3}>
      			<Image src="http://via.placeholder.com/250x250"/>
      		</Col>
      		<Col xs={3}>
      			<PanelGroup accordion id="infoPanels">
  				<Panel>
			      	<Panel.Heading>
			      		<Panel.Title componentClass="h3"> Username </Panel.Title>
			      	</Panel.Heading>
			      	<Panel.Body>
			      	Cool League Guy
			      	</Panel.Body>
	  				</Panel>
	  				<Panel>
			      	<Panel.Heading>
			      		<Panel.Title componentClass="h3"> Email </Panel.Title>
			      	</Panel.Heading>
			      	<Panel.Body>
			      	myEmail@web.com
			      	</Panel.Body>
	  				</Panel>
	  				<Panel eventKey="1">
			      	<Panel.Heading>
			      		<Panel.Title toggle componentClass="h3"> Change Password </Panel.Title>
			      	</Panel.Heading>
			      	<Panel.Body collapsible>
				      	<form>
				      		<FormGroup>
					      		<ControlLabel> Current Password </ControlLabel>
					      		<FormControl type="text"/>
					      	</FormGroup>
					      	<FormGroup>
					      		<ControlLabel> New Password </ControlLabel>
					      		<FormControl type="text"/>
					      	</FormGroup>
					      	<FormGroup>
					      		<ControlLabel> Confirm New Password </ControlLabel>
					      		<FormControl type="text"/>
					      	</FormGroup>
					      	<Button type="submit">Change Password</Button>
					    </form>
			      	</Panel.Body>
  				</Panel>
  				</PanelGroup>
	  		</Col>
	  	</Row>
	  </Grid>
     
	  <Panel>
      	<Panel.Heading>
      		<Panel.Title componentClass="h2"> Achievements </Panel.Title>
      	</Panel.Heading>
      	<Panel.Body className="leagueCol">
      		<Image src="http://via.placeholder.com/125x125" />
      		<Image src="http://via.placeholder.com/125x125" />
      		<Image src="http://via.placeholder.com/125x125" />
      		<Image src="http://via.placeholder.com/125x125" />
      		<Image src="http://via.placeholder.com/125x125" />
	    </Panel.Body>
	  </Panel>

      </div>
    );
  }
}

import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		username: state.account.username,
		email: state.account.email
	}
}

export default connect(mapStateToProps)(Profile);
