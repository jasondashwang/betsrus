import axios from 'axios';

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const SELECT_GAME = 'SELECT_GAME';

export const receiveGamesActionCreator = games => {
  return {
    type: RECEIVE_GAMES,
    games
  }
};

export const selectGameActionCreator = gameID => {
  return {
    type: SELECT_GAME,
    gameID
  }
}

export const getGamesThunk = () => {
  return (dispatch) => {
    axios.get('/api/game/remainingFixtures')
    .then(res => {
      const games = res.data;
      console.log(games);

      dispatch(receiveGamesActionCreator(games));
    })
  };
};

