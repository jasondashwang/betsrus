import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import Panel from 'react-bootstrap/lib/Panel';
import './profStyles.css';

class Profile extends Component {


  render () {
    return (
      <div>
      <Image src="http://via.placeholder.com/250x250" />
      <h1> My Profile </h1>
      <Panel>
      	<Panel.Heading>
      		<Panel.Title componentClass="h2"> Leagues at a Glance </Panel.Title>
      	</Panel.Heading>
      	<Panel.Body>
	      <Grid>
	      		<Row className="glanceGrid">
		      		<Col xs={8}>
		      		<h3>
		      			<Label bsStyle="primary">Current Leagues</Label>{' '}
		      		</h3>
		      		<Image src="http://via.placeholder.com/125x125" />
		      		<Image src="http://via.placeholder.com/125x125" />
		      		</Col>
		      		<Col xs={3} xsOffset={1}>
		      		<h3>
		      			<Label bsStyle="info">Past Leagues</Label>{' '}
		      		</h3>
		      		<Image src="http://via.placeholder.com/125x125" />
		      		</Col>
	      		</Row>
	      </Grid>
	    </Panel.Body>
	  </Panel>
	  <Panel>
      	<Panel.Heading>
      		<Panel.Title componentClass="h2"> Achievements </Panel.Title>
      	</Panel.Heading>
      	<Panel.Body>
	      <Grid>
	      		<Row className="achieveGrid">
		      		<Col xs={12}>
		      		<Image src="http://via.placeholder.com/125x125" />
		      		<Image src="http://via.placeholder.com/125x125" />
		      		<Image src="http://via.placeholder.com/125x125" />
		      		<Image src="http://via.placeholder.com/125x125" />
		      		<Image src="http://via.placeholder.com/125x125" />
		      		</Col>
	      		</Row>
	      </Grid>
	    </Panel.Body>
	  </Panel>

      </div>
    );
  }
}

export default Profile;
