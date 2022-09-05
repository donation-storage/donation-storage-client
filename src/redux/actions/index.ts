/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyAction, Dispatch } from 'redux';

import type { LoginState } from '../../types/state';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (state: LoginState) => (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: LOGIN,
    payload: { ...state },
  });
};

export const logout = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch({
    type: LOGOUT,
  });
};
