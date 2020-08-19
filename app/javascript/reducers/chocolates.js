import {
  CHOCOLATE_SUCCESS, CHOCOLATE_FAILED,
  SEARCH_CHOCOLATE_SUCCESS, SELECT_CHOCOLATE,
  CHOC_FETCH, SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  list: [],
  query: [],
  loading: false,
  selectedChoc: {
    id: null,
    name: null,
    description: null,
    image: null,
    favourites: null,
    isFavourited: false,
  },
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHOC_FETCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHOCOLATE_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case CHOCOLATE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case SEARCH_CHOCOLATE_SUCCESS:
      return {
        ...state,
        query: action.payload,
      };
    case SELECT_CHOCOLATE:
      return {
        ...state,
        selectedChoc: {
          ...action.payload.chocolate,
          isFavourited: action.payload.isFavourited,
        },
      };
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
