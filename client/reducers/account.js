import {
  LOGIN,
  ADD_LEAGUE,
  LOGOUT
} from '../actions/account';

const initialAccountState = {
  _id: '',
  username: '',
  email: '',
  leagues: []
};

export default function (state = initialAccountState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case LOGIN: {
      newState._id = action.account._id;
      newState.username = action.account.username;
      newState.email = action.account.email;
      newState.leagues = action.account.leagues;
      break;
    }

    case ADD_LEAGUE: {
      newState.leagues = state.leagues.slice(0);
      newState.leagues.push(action.league);
      break;
    }

    case LOGOUT: {
      return Object.assign({}, initialAccountState);
    }

    default: {
      return newState;
    }
  }

  return newState;
}
