// import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  orderId: string;
  orders: any[];
}

const prepareState = () => {
  const defaultState = {
    orderId: '',
    orders: []
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
    case TypeKeys.SHOW_ORDER: {
      return { ...state, orders: action.orders };
    }
    case TypeKeys.PLACE_ORDER: {
      return { ...state, orderId: action.orderId };
    }
  }

  return state;
};

export default merchant;
