import _ from 'lodash';
import Api from '../services/api';

const initialState = {
  username: null,
  full_name: null,
  profile_picture: null,
  bio: null,
  counts: {
    media: null,
    follows: null,
    followed_by: null,
  },
  fetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        ..._.pick(action.data, _.keys(initialState)),
        fetching: false,
      };
    case 'USER_FETCH_STARTED':
      return {
        ...state,
        fetching: true,
      };
    case 'USER_LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
};

export default reducer;

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: 'USER_FETCH_STARTED' });
  console.log(' =============== FETCHED ===============');

  try {
    const response = await Api.fetchUser();
    const { data } = await response.json();

    dispatch({
      type: 'USER_LOADED',
      data,
    });
  } catch(error) {
    dispatch({
      type: 'ERROR',
      error,
    });
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: 'USER_LOGGED_OUT' });
};
