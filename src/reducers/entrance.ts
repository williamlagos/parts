import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  name: string;
  skipIntro: number;
}

const prepareState = () => {
  const defaultState = {
    name: 'Stencil Redux',
    skipIntro: false
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
  }

  return state;
};

export default entrance;
