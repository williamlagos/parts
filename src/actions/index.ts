import {
  CloseAction,
  CloseRegisterAction,
  OpenAction,
  OpenProfileAction,
  OpenRegisterAction,
  RevokeTokenAction,
  SetTokenAction,
  SkipIntroAction,
  SkipTourAction,
  UpdateProfileAction
} from './session';

import {
  RegisterOrderAction,
  SetMerchantOrderAction,
  ShowMyOrdersAction,
  ShowOrderBidsAction
} from './customer';

import {
  CancelOrderAction,
  FinishOrderAction,
  PlaceOrderAction,
  RateOrderAction,
  SelectOrderAction,
  ShowMerchantOrdersAction,
  ShowOrderAction,
  StartOrderAction
} from './merchant';

export interface NullAction {
  type: TypeKeys.NULL;
}

// Keep this type updated with each known action
export type ActionTypes =
  | NullAction
  | SetTokenAction
  | SkipIntroAction
  | SkipTourAction
  | OpenRegisterAction
  | CloseRegisterAction
  | RevokeTokenAction
  | RegisterOrderAction
  | SelectOrderAction
  | ShowOrderAction
  | CloseAction
  | OpenAction
  | PlaceOrderAction
  | ShowMyOrdersAction
  | ShowOrderBidsAction
  | SetMerchantOrderAction
  | ShowMerchantOrdersAction
  | CancelOrderAction
  | StartOrderAction
  | FinishOrderAction
  | OpenProfileAction
  | RateOrderAction
  | UpdateProfileAction
;

export enum TypeKeys {
  NULL = 'NULL',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  ERROR = 'ERROR',
  SET_TOKEN = 'SET_TOKEN',
  REVOKE_TOKEN = 'REVOKE_TOKEN',
  SKIP_INTRO = 'SKIP_INTRO',
  SKIP_TOUR = 'SKIP_TOUR',
  OPEN_REGISTER = 'OPEN_REGISTER',
  CLOSE_REGISTER = 'CLOSE_REGISTER',
  REGISTER_ORDER = 'REGISTER_ORDER',
  SELECT_ORDER = 'SELECT_ORDER',
  SHOW_ORDER = 'SHOW_ORDER',
  PLACE_ORDER = 'PLACE_ORDER',
  MY_ORDERS = 'MY_ORDERS',
  ORDER_BIDS = 'ORDER_BIDS',
  ORDER_MERCHANT = 'ORDER_MERCHANT',
  MERCHANT_ORDERS = 'MERCHANT_ORDERS',
  START_ORDER = 'START_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  FINISH_ORDER = 'FINISH_ORDER',
  RATE_ORDER = 'RATE_ORDER',
  OPEN_PROFILE = 'OPEN_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE'
}
