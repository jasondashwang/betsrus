import axios from 'axios';
import { push } from 'react-router-redux';

export const LOGIN = 'LOGIN';

export const loginActionCreator = account => {
  return {
    type: LOGIN,
    account,
  }
};

export const loginThunk = (username, password) => {
  return (dispatch) => {
    console.log(username, password);
		axios.post('/api/user/authenticate', {
			username,
			password,
		})
		.then(res => {
      const user = res.data;
      dispatch(loginActionCreator(user))
			console.log(user);
		})
		.catch(err => {
			console.error(err);
		})
  }
};


export const signupThunk = user => {
  return dispatch => {
    axios.post('/api/user/register', user)
    .then(res => {
      console.log(res.data);
      dispatch(loginActionCreator(res.data));
    })
    .catch(err => {
      console.error(err);
    })
  }
};
