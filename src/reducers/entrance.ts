import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  token: string;
  skipIntro: number;
  registerOpened: boolean;
  registerOption: number;
}

const prepareState = () => {
  const defaultState = {
    token: '',
    skipIntro: false,
    registerOpened: false,
    registerOption: -1
  };
  return {
    ...defaultState,
    token: Storage.getItem('token') || defaultState.token,
    skipIntro: + Storage.getItem('skipIntro') || + defaultState.skipIntro
  };
};

const entrance = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.SET_TOKEN: {
      return { ...state, token: action.token };
    }
    case TypeKeys.REVOKE_TOKEN: {
      return { ...state, token: action.token };
    }
    case TypeKeys.SKIP_INTRO: {
      return { ...state, skipIntro: action.skipIntro };
    }
    case TypeKeys.OPEN_REGISTER: {
      return { ...state, registerOpened: action.registerOpened };
    }
    case TypeKeys.CLOSE_REGISTER: {
      return { ...state, registerOpened: action.registerOpened };
    }
    case TypeKeys.REGISTER: {
      return { ...state, registerOption: action.registerOption };
    }
  }

  return state;
};

export default entrance;
