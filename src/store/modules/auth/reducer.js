import axios from '../../../services/axios';
import * as types from '../types';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: '',
  user: {},
};

// eslint-disable-next-line no-unused-vars, default-param-last
export default function reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case types.LOGIN_REQUEST:
      newState.isLoading = true;
      return newState;

    case types.LOGIN_SUCCESS:
      newState.token = action.payload.token;
      newState.isLoggedIn = true;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    case types.LOGIN_FAILURE:
      delete axios.defaults.headers.Authorization;
      return initialState;

    default:
      return state;
  }
}
