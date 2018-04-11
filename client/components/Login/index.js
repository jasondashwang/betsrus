import React, { Component } from 'react';

// This will be our main component container for the rest of our site
class Login extends Component {
  render () {
    return (
      <div>
	      <h1>Login/Signup</h1>

	      <div id='loginBox' class="logHolder">
	      	<form method="GET" action="/processLog" id="myLogin">
	      		<p>Username</p>
	      		<input type="text" id="userLog"/>
	      		<p>Password</p>
	      		<input type="text" id="passLog"/>
	      		<input type="submit" id="subLog" value="Login"/>
	      	</form>
	      </div>

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
	      		<input type="submit" id="subSign" value="Signup"/>
	      	</form>
	      </div>
      </div>
    );
  }
}

export default Login;
