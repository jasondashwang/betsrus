import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Label from 'react-bootstrap/lib/Label';
import Image from 'react-bootstrap/lib/Image';
import './styles.css';

// This will be our main component container for the rest of our site
class League extends Component {

  render () {
    return (
      <div>
      	<h1>Example League </h1>
      	<Grid>
      		<Row className="leagueGrid">
      			<Col md={8} mdOffset={2}>
      				<h1>
      					<Label bsStyle="primary">Upcoming Games</Label>{' '}
      				</h1>
      				<ListGroup>
  						<ListGroupItem>
  							<Grid>
  								<Row className="gameRow1">
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 1</p>
  									</Col>
  									<Col xs={4}>
  										<h2>
  										<Label bsStyle="danger">VS</Label>{' '}
  										</h2>
  										<Label bsStyle="success">1 PM(EDT) Saturday Apr. 21, 2018</Label>{' '}
  									</Col>
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 2</p>
  									</Col>
  								</Row>
  							</Grid>
  						</ListGroupItem>
  						<ListGroupItem>
  							<Grid>
  								<Row className="gameRow1">
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 3</p>
  									</Col>
  									<Col xs={4}>
  										<h2>
  										<Label bsStyle="danger">VS</Label>{' '}
  										</h2>
  										<Label bsStyle="success">3 PM(EDT) Sunday Apr. 22, 2018</Label>{' '}
  									</Col>
  									<Col xs={4}>
  										<Image src="http://via.placeholder.com/125x125" />
  										<p>Team 4</p>
  									</Col>
  								</Row>
  							</Grid>
  						</ListGroupItem>
					</ListGroup>
      			</Col>
      			<Col md={2}>
      				<h1>
      					<Label bsStyle="primary">Standings</Label>{' '}
      				</h1>
      				<ListGroup>
  						<ListGroupItem>1st Mom</ListGroupItem>
  						<ListGroupItem>2nd (You)</ListGroupItem>
  						<ListGroupItem>3rd Lil Bro</ListGroupItem>
  						<ListGroupItem>4th Dad</ListGroupItem>
					</ListGroup>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default League;
