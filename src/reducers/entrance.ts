import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  name: string;
  skipIntro: number;
  registerOpened: boolean;
}

const prepareState = () => {
  const defaultState = {
    name: 'Stencil Redux',
    skipIntro: false,
    registerOpened: false
  };
  return {
    ...defaultState,
    skipIntro: + Storage.getItem('skipIntro')
  };
};

const entrance = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.APP_SET_NAME: {
      return { ...state, name: action.name };
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
  }

  return state;
};

export default entrance;
