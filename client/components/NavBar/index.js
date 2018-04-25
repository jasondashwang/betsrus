import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import NavItem from 'react-bootstrap/lib/NavItem'

// This will be our main component container for the rest of our site
class NavBar extends Component {
  render () {

		const account = {
			id: 1
		}

    return (
      <Navbar>
  		  <Navbar.Header>
  		    <Navbar.Brand>
  		      <Link to="/">Bets R Us</Link>
  		    </Navbar.Brand>
  		  </Navbar.Header>
  		  <Nav>
					{
						account.id ?
						( <NavDropdown title="My Account" id="basic-nav-dropdown">
								<MenuItem href="/profile">Profile</MenuItem>
								<MenuItem>Log Out</MenuItem>
							</NavDropdown>) :
						(
							<NavItem href="/login">
								Login / Sign Up
							</NavItem> )
					}
  		  </Nav>
  		</Navbar>
    );
  }
}

export default NavBar;
