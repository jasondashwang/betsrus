import axios from 'axios';
import { push } from 'react-router-redux';
import { addLeagueActionCreator } from './account';

export const RECEIVE_LEAGUE = 'RECEIVE_LEAGUE';
export const CLEAR_LEAGUE = 'CLEAR_LEAGUE';

export const receiveLeagueActionCreator = league => {
  return {
    type: RECEIVE_LEAGUE,
    league,
  }
};

export const clearLeagueActionCreator = () => {
  return {
    type: CLEAR_LEAGUE
  }
}

export const getLeagueThunk = (id) => {
  return (dispatch) => {
    axios.get(`/api/league/${id}`)
    .then(res => {
      const league = res.data;

      dispatch(receiveLeagueActionCreator(league));
    })
  }
}

export const joinLeagueThunk = (leagueID) => {
  axios.defaults.withCredentials = true;
  return (dispatch, getState) => {
    axios.post('/api/league/joinLeague', {
      leagueID,
      userID: getState().account._id
    })
    .then(res => {
      const league = res.data;

      dispatch(receiveLeagueActionCreator(league));
      dispatch(push(`/leagues/${league._id}`));
      dispatch(addLeagueActionCreator(league));
    })
    .catch(err => {
      console.error(err);
    })
  }
}

export const createLeagueThunk = () => {
  axios.defaults.withCredentials = true;
  return (dispatch, getState) => {
    axios.post('/api/league/createLeague', {
      userID: getState().account._id
    })
		.then(res => {
			const league = res.data;
      dispatch(receiveLeagueActionCreator(league));
      dispatch(push(`/leagues/${league._id}`));
      dispatch(addLeagueActionCreator(league));
		})
		.catch(err => {
			console.error(err);
		})
  }
};
