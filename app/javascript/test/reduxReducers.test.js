import chocReducer from '../reducers/chocolates';
import favouritesReducer from '../reducers/favourites';
import authReducer from '../reducers/user';
import {
  CHOCOLATE_SUCCESS, FAVOURITES_SUCCESS, FAVOURITES_FAILED, SELECT_CHOCOLATE,
  AUTH_SUCCESS, AUTH_FAILED, SIGN_OUT,
} from '../actions/types';

describe('chocolate reducer', () => {
  it('should return the initial state', () => {
    expect(chocReducer(undefined, {})).toEqual(
      {
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
      },
    );
  });

  it('should handle CHOCOLATE_SUCCESS', () => {
    const action = {
      type: CHOCOLATE_SUCCESS,
      payload: [
        {
          id: 1,
          name: 'Twix',
          description: 'Nice twix',
          image: 'twix',
          favourites: 1,
        },
      ],
    };
    expect(chocReducer([], action)).toEqual({
      list: action.payload,
    });
  });

  it('should handle SELECT_CHOCOLATE', () => {
    const action = {
      type: SELECT_CHOCOLATE,
      payload: {
        chocolate: {
          id: 1,
          name: 'Twix',
          description: 'nice twix',
          image: 'twix_img',
          favourites: 1,
        },
        isFavourited: false,
      },
    };
    expect(chocReducer([], action)).toEqual({
      selectedChoc: {
        id: 1,
        name: 'Twix',
        description: 'nice twix',
        image: 'twix_img',
        favourites: 1,
        isFavourited: false,
      },
    });
  });
});

describe('favourites reducer', () => {
  it('should return the initial state', () => {
    expect(favouritesReducer(undefined, {})).toEqual(
      {
        list: [],
        error: null,
      },
    );
  });

  it('should handle FAVOURITES_SUCCESS', () => {
    const action = {
      type: FAVOURITES_SUCCESS,
      payload: ['fav objects'],
    };
    expect(favouritesReducer([], action)).toEqual({
      list: action.payload,
    });
  });

  it('should handle FAVOURITES_FAILED', () => {
    const action = {
      type: FAVOURITES_FAILED,
      payload: 'error occured',
    };
    expect(favouritesReducer([], action)).toEqual({
      error: action.payload,
    });
  });
});

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
        username: null,
        id: null,
        loading: false,
        error: null,
      },
    );
  });

  it('should handle AUTH_SUCCESS', () => {
    const action = {
      type: AUTH_SUCCESS,
      payload: {
        username: 'sharmarke',
        id: 1,
      },
    };
    expect(authReducer([], action)).toEqual({
      ...action.payload,
      error: null,
      loading: false,
    });
  });

  it('should handle AUTH_FAILED', () => {
    const action = {
      type: AUTH_FAILED,
      payload: 'error occured',
    };
    expect(authReducer([], action)).toEqual({
      error: action.payload,
      loading: false,
    });
  });

  it('should handle SIGN_OUT', () => {
    const action = {
      type: SIGN_OUT,
    };
    expect(authReducer([], action)).toEqual({
      username: null,
      id: null,
      loading: false,
      error: null,
    });
  });
});
