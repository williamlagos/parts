// import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  orders: any[];
  bids: any[];
}

const prepareState = () => {
  const defaultState = {
    orders: [],
    bids: []
  };
  return {
    ...defaultState
  };
};

const customer = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.REGISTER_ORDER: {
      return { ...state };
    }
    case TypeKeys.MY_ORDERS: {
      return { ...state, orders: action.orders };
    }
    case TypeKeys.ORDER_BIDS: {
      return { ...state, bids: action.bids };
    }
    case TypeKeys.ORDER_MERCHANT: {
      return { ...state };
    }
  }

  return state;
};

export default customer;
