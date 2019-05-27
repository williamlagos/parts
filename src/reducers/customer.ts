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

const customer = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.REGISTER_ORDER: {
      return { ...state, orderId: action.orderId };
    }
    case TypeKeys.MY_ORDERS: {
      return { ...state, orders: action.orders };
    }
  }

  return state;
};

export default customer;
