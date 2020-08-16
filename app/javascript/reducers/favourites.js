import {
  FAVOURITES_SUCCESS, FAVOURITES_FAILED, SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVOURITES_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case FAVOURITES_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
