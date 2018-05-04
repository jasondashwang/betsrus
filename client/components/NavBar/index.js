import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import NavItem from 'react-bootstrap/lib/NavItem'
import './navStyle.css';

import { LinkContainer } from 'react-router-bootstrap';

// This will be our main component container for the rest of our site
class NavBar extends Component {

	constructor (props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	logout () {
		this.props.logout();
	}

  render () {

    return (
      <Navbar>
  		  <Navbar.Header>
  		    <Navbar.Brand>
  		      <Link to="/">Bets R Us</Link>
  		    </Navbar.Brand>
  		  </Navbar.Header>
  		  <Nav>
					{
						this.props.accountId ?
						( <NavDropdown title="My Account" id="basic-nav-dropdown">
								<LinkContainer to="/profile"><MenuItem>Profile</MenuItem></LinkContainer>
								<MenuItem onClick={this.logout} >Log Out</MenuItem>
							</NavDropdown>) :
						(
							<LinkContainer to="/login"><NavItem>Login / Sign Up</NavItem></LinkContainer>
						)
					}
  		  </Nav>
  		</Navbar>
    );
  }
}

import { connect } from 'react-redux';
import { logoutThunk } from '../../actions/account';

const mapStateToProps = (state) => {
	return {
		accountId: state.account._id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout () {
			dispatch(logoutThunk());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
