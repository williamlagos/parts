// import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  orders: any[];
}

const prepareState = () => {
  const defaultState = {
    orders: []
  };
  return {
    ...defaultState
  };
};

const merchant = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.SELECT_ORDER: {
      return { ...state };
    }
    case TypeKeys.CANCEL_ORDER: {
      return { ...state };
    }
    case TypeKeys.START_ORDER: {
      return { ...state };
    }
    case TypeKeys.SHOW_ORDER: {
      return { ...state, orders: action.orders };
    }
    case TypeKeys.PLACE_ORDER: {
      return { ...state, orderId: action.orderId };
    }
    case TypeKeys.MERCHANT_ORDERS: {
      return { ...state, orders: action.orders };
    }
  }

  return state;
};

export default merchant;
