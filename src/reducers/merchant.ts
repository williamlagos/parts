// import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  orderId: string;
}

const prepareState = () => {
  const defaultState = {
    orderId: '',
  };
  return {
    ...defaultState
  };
};

const merchant = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.SELECT_ORDER: {
      return { ...state, orderId: action.orderId };
    }
  }

  return state;
};

export default merchant;
