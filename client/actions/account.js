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
		axios.post('/api/user/authenticate', {
			username,
			password,
		})
		.then(res => {
      const user = res.data;
      dispatch(loginActionCreator(user));
			dispatch(push('/'));
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
      dispatch(loginActionCreator(res.data))
      dispatch(push('/'));
    })
    .catch(err => {
      console.error(err);
    })
  }
};
