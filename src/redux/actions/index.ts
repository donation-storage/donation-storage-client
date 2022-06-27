import type { AnyAction, Dispatch } from 'redux';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login =
  (state: { isLogin: boolean; oauth: string; id: string; userName: string }) =>
  (dispatch: Dispatch<AnyAction>) => {
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
