import * as types from './types';

export const SET_AUTH_LOADING = 'auth/SET_AUTH_LOADING';
export const SET_AUTH_NOT_LOADING = 'auth/SET_AUTH_NOT_LOADING';
export const SET_AUTH_FETCHING = 'auth/SET_AUTH_FETCHING';
export const SET_AUTH_NOT_FETCHING = 'auth/SET_AUTH_NOT_FETCHING';
export const SET_AUTH_ERROR = 'auth/SET_AUTH_ERROR';
export const SET_AUTH_MESSAGE = 'auth/SET_AUTH_MESSAGE';
export const AUTH_USER = 'auth/AUTH_USER';
export const UNAUTH_USER = 'auth/UNAUTH_USER';

export const setAuthLoading = () => ({
  type: SET_AUTH_LOADING,
});

export const setAuthNotLoading = () => ({
  type: SET_AUTH_NOT_LOADING,
});

export const setAuthFetching = () => ({
  type: SET_AUTH_FETCHING,
});

export const setAuthNotFetching = () => ({
  type: SET_AUTH_NOT_FETCHING,
});

export const setAuthError = errorMessage => ({
  type: SET_AUTH_ERROR,
  payload: errorMessage,
});

export const setAuthMessage = message => ({
  type: SET_AUTH_MESSAGE,
  payload: message,
});

export const authUser = () => ({
  type: AUTH_USER,
});

export const unauthUser = () => ({
  type: UNAUTH_USER,
});

export const login = params => ({
  type: types.LOGIN_REQUEST,
  params,
});

export const logout = () => ({
  type: types.LOGOUT_REQUEST,
});

export const forgot = params => ({
  type: types.FORGOT_REQUEST,
  params,
});

export const resetLoginError = () => ({
  type: types.RESET_LOGIN_ERROR,
});

export const resetForgotMessage = () => ({
  type: types.RESET_FORGOT_MESSAGE,
});
