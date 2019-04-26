import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  name: string;
  skipIntro: boolean;
}

const getInitialState = () => {
  return {
    name: 'Stencil Redux',
    skipIntro: false
  };
};

const entrance = (state: AppState = getInitialState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.APP_SET_NAME: {
      return { ...state, name: action.name };
    }
    case TypeKeys.SKIP_INTRO: {
      return { ...state, skipIntro: true };
    }
  }

  return state;
};

export default entrance;
