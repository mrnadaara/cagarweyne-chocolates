import {
  AUTH_FETCH, AUTH_SUCCESS, AUTH_FAILED, SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  username: null,
  id: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_FETCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        loading: false,
        error: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
