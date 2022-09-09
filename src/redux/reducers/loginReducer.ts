import type { AnyAction } from 'redux';

import type { LoginState } from '../../types/state';
import { LOGIN, LOGOUT } from '../actions';

const initialState: LoginState = {
  isLogin: false,
  userName: '',
  userSeq: Number.MAX_SAFE_INTEGER,
};

const loginReducer = (state = initialState, action: AnyAction): LoginState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default loginReducer;
