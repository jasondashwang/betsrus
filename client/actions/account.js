import axios from 'axios';
import { push } from 'react-router-redux';

export const LOGIN = 'LOGIN';
export const ADD_LEAGUE = 'ADD_LEAGUE';

export const loginActionCreator = account => {
  return {
    type: LOGIN,
    account,
  }
};

export const addLeagueActionCreator = league => {
  return {
    type: ADD_LEAGUE,
    league,
  }
}

export const checkSessionThunk = () => {
  return dispatch => {
    axios.get('/api/user/data')
    .then(res => {
      const user = res.data;
      console.log(user);
      if (user._id) {
        dispatch(loginActionCreator(user));
      }
    })
    .catch(err => {
      console.error(err);
    })
  }
}

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
