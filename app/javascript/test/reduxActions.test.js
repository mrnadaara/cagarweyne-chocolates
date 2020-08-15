import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  signIn, fetchChocolates, fetchFavourites, toggleFavourites, isFavourited,
} from '../actions';
import {
  AUTH_SUCCESS,
  AUTH_FAILED,
  CHOCOLATE_SUCCESS,
  CHOCOLATE_FAILED,
  FAVOURITES_SUCCESS,
} from '../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FAVOURITES_SUCCESS when fetching user favourites', () => {
    fetchMock.postOnce('/v1/favourites', {
      body: [],
      headers: { 'content-type': 'application/json' },
      status: 200,
    });

    const expectedActions = [
      {
        type: FAVOURITES_SUCCESS,
        payload: [],
      },
    ];
    const store = mockStore({
      favourites: {
        list: [],
        selectedChoc: {
          id: null,
          name: null,
          description: null,
          image: null,
          isFavourited: false,
        },
      },
    });

    return store.dispatch(fetchFavourites()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CHOCOLATE_FAILED when searching chocolates returns empty', () => {
    fetchMock.postOnce('/v1/chocolates/search', {
      body: {
        message: 'No chocolates found',
      },
      headers: { 'content-type': 'application/json' },
      status: 404,
    });

    const expectedActions = [
      {
        type: CHOCOLATE_FAILED,
        payload: 'No chocolates found',
      },
    ];
    const store = mockStore({
      chocolates: {
        list: [],
        query: [],
        loading: false,
        error: 'No chocolates found',
      },
    });

    return store.dispatch(fetchChocolates('dsdsadw')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CHOCOLATE_SUCCESS when fetching has been done', () => {
    fetchMock.postOnce('/v1/chocolates', {
      body: [
        {
          id: 1,
          name: 'choco',
          description: 'very nice choco indeed',
          image: 'choco_image',
        },
      ],
      headers: { 'content-type': 'application/json' },
      status: 200,
    });

    const expectedActions = [
      {
        type: CHOCOLATE_SUCCESS,
        payload: [
          {
            id: 1,
            name: 'choco',
            description: 'very nice choco indeed',
            image: 'choco_image',
          },
        ],
      },
    ];
    const store = mockStore({
      chocolates: {
        list: [
          {
            id: 1,
            name: 'choco',
            description: 'very nice choco indeed',
            image: 'choco_image',
          },
        ],
        query: [],
        loading: false,
        error: null,
      },
    });

    return store.dispatch(fetchChocolates()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates AUTH_SUCCESS when authenticating has been done', () => {
    fetchMock.postOnce('/v1/auth', {
      body: {
        username: 'sharmarke',
        id: 1,
      },
      headers: { 'content-type': 'application/json' },
      status: 200,
    });

    const expectedActions = [
      {
        type: AUTH_SUCCESS,
        payload: {
          username: 'sharmarke',
          id: 1,
        },
      },
    ];
    const store = mockStore({
      auth: {
        username: null,
        id: null,
        loading: false,
        error: null,
      },
    });

    return store.dispatch(signIn('sharmarke')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates AUTH_FAILED when username is shorter than 5 characters', () => {
    fetchMock.postOnce('/v1/auth', {
      body: {
        message: ['Username is shorter than 5 characters'],
      },
      headers: { 'content-type': 'application/json' },
      status: 403,
    });

    const expectedActions = [
      {
        type: AUTH_FAILED,
        payload: ['Username is shorter than 5 characters'],
      },
    ];
    const store = mockStore({
      auth: {
        username: null,
        id: null,
        loading: false,
        error: ['Username is shorter than 5 characters'],
      },
    });

    return store.dispatch(signIn('sh')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
