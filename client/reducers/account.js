import {
  LOGIN
} from '../actions/account';

const initialAccountState = {
  id: '',
  username: '',
  email: '',
  leagues: []
};

export default function (state = initialAccountState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case LOGIN: {
      newState.id = action.account._id;
      newState.username = action.account.username;
      newState.email = action.account.email;
      newState.leagues = action.account.leagues;
      break;
    }

    default: {
      return newState;
    }
  }

  return newState;
}
