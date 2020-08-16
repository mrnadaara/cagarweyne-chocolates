import {
  AUTH_FETCH, AUTH_SUCCESS, AUTH_FAILED, CHOCOLATE_SUCCESS,
  SEARCH_CHOCOLATE_SUCCESS, CHOCOLATE_FAILED, CHOC_FETCH,
  FAVOURITES_SUCCESS, FAVOURITES_FAILED, SELECT_CHOCOLATE,
} from './types';

const fetchAuth = () => (
  {
    type: AUTH_FETCH,
  }
);

const fetchChoc = () => (
  {
    type: CHOC_FETCH,
  }
);

const authSuccess = payload => (
  {
    type: AUTH_SUCCESS,
    payload,
  }
);

const authFailed = payload => (
  {
    type: AUTH_FAILED,
    payload,
  }
);

const chocolateSuccess = payload => (
  {
    type: CHOCOLATE_SUCCESS,
    payload,
  }
);

const searchChocolateSuccess = payload => (
  {
    type: SEARCH_CHOCOLATE_SUCCESS,
    payload,
  }
);

const searchChocolateFailed = payload => (
  {
    type: CHOCOLATE_FAILED,
    payload,
  }
);

const favSuccess = payload => (
  {
    type: FAVOURITES_SUCCESS,
    payload,
  }
);

const selectChocolateSuccess = payload => (
  {
    type: SELECT_CHOCOLATE,
    payload,
  }
);

const favFailed = payload => (
  {
    type: FAVOURITES_FAILED,
    payload,
  }
);

export const signIn = username => async dispatch => {
  dispatch(fetchAuth);
  try {
    const result = await fetch('/v1/auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
        },
      }),
    });
    const response = await result.json();
    dispatch(authSuccess(response));
  } catch (e) {
    dispatch(authFailed(e.message));
  }
};

export const fetchChocolates = () => async dispatch => {
  dispatch(fetchChoc);
  const result = await fetch('/v1/chocolates', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await result.json();
  dispatch(chocolateSuccess(response));
};

export const searchChocolate = query => async dispatch => {
  dispatch(fetchChoc);
  try {
    const result = await fetch('/v1/chocolates/search', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chocolate: {
          query,
        },
      }),
    });
    const response = await result.json();
    dispatch(searchChocolateSuccess(response));
  } catch (e) {
    dispatch(searchChocolateFailed(e.message));
  }
};

export const fetchFavourites = () => async (dispatch, getState) => {
  try {
    const result = await fetch('/v1/favourites', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favourite: {
          user: getState().auth.id,
        },
      }),
    });
    const response = await result.json();
    dispatch(favSuccess(response));
  } catch (e) {
    dispatch(favFailed(e.message));
  }
};

export const selectChocolate = chocolate => async (dispatch, getState) => {
  try {
    const result = await fetch('/v1/favourites/is-favourited', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favourite: {
          user: getState().auth.id,
          chocolate: chocolate.id,
        },
      }),
    });
    const response = await result.json();
    dispatch(selectChocolateSuccess({ chocolate, isFavourited: response.isFavourited }));
  } catch (e) {
    dispatch(favFailed(e.message));
  }
};

export const toggleFav = () => async (dispatch, getState) => {
  const { chocolate } = getState();
  try {
    const result = await fetch('/v1/favourites/toggle-fav', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favourite: {
          user: getState().auth.id,
          chocolate: chocolate.selectedChoc.id,
        },
      }),
    });
    const response = await result.json();
    dispatch(selectChocolateSuccess({ chocolate, isFavourited: response.isFavourited }));
  } catch (e) {
    dispatch(favFailed(e.message));
  }
};