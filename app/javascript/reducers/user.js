import { AUTH_FETCH, AUTH_SUCCESS, AUTH_FAILED } from '../actions/types';

const INITIAL_STATE = {
  name: null,
  id: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH_FETCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        loading: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}