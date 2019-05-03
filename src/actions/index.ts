import {
  CloseRegisterAction,
  OpenRegisterAction,
  RegisterAction,
  RevokeTokenAction,
  SetTokenAction,
  SkipIntroAction
} from './entrance';

import {
  RegisterOrderAction
} from './customer';

import {
  SelectOrderAction
} from './merchant';

export interface NullAction {
  type: TypeKeys.NULL;
}

// Keep this type updated with each known action
export type ActionTypes =
  | NullAction
  | SetTokenAction
  | SkipIntroAction
  | OpenRegisterAction
  | CloseRegisterAction
  | RegisterAction
  | RevokeTokenAction
  | RegisterOrderAction
  | SelectOrderAction
;

export enum TypeKeys {
  NULL = 'NULL',
  ERROR = 'ERROR',
  SET_TOKEN = 'SET_TOKEN',
  REVOKE_TOKEN = 'REVOKE_TOKEN',
  SKIP_INTRO = 'SKIP_INTRO',
  OPEN_REGISTER = 'OPEN_REGISTER',
  CLOSE_REGISTER = 'CLOSE_REGISTER',
  REGISTER = 'REGISTER',
  REGISTER_ORDER = 'REGISTER_ORDER',
  SELECT_ORDER = 'SELECT_ORDER'
}
