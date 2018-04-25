import axios from 'axios';
import { push } from 'react-router-redux';

export const RECEIVE_LEAGUE = 'RECEIVE_LEAGUE';

export const receiveLeagueActionCreator = league => {
  return {
    type: RECEIVE_LEAGUE,
    league,
  }
};

export const createLeagueThunk = () => {
  return (dispatch) => {
    axios.post('/api/league/createLeague')
		.then(res => {
			const league = res.data;
      dispatch(receiveLeagueActionCreator(league));
      dispatch(push(`/leagues/${league._id}`));
		})
		.catch(err => {
			console.error(err);
		})
  }
};
