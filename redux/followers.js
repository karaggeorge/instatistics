import Api from '../services/api';

const initialState = {
  follows: null,
  followedBy: null,
  fetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FOLLOWERS_LOADED':
      return {
        ...state,
        follows: action.follows,
        followedBy: action.followedBy,
        fetching: false,
      };
    case 'FOLLOWERS_FETCH_STARTED':
      return {
        ...state,
        fetching: true,
      }
    default:
      return state;
  }
};

export default reducer;

export const fetchFollowers = () => async (dispatch) => {
  dispatch({ type: 'FOLLOWERS_FETCH_STARTED' });

  try {
    const [followsResponse, followedByResponse] = await Promise.all([ Api.fetchFollows(), Api.fetchFollowedBy() ]);
    const [{ data: follows }, { data: followedBy }] = await Promise.all([ followsResponse.json(), followedByResponse.json() ]);

    dispatch({
      type: 'FOLLOWERS_LOADED',
      follows,
      followedBy,
    });
  } catch(error) {
    dispatch({
      type: 'ERROR',
      error,
    });
  }
}
