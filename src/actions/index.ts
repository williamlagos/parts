import {
  AppSetNameAction,
  CloseRegisterAction,
  OpenRegisterAction,
  RegisterAction,
  SkipIntroAction
} from './entrance';

export interface NullAction {
  type: TypeKeys.NULL;
}

// Keep this type updated with each known action
export type ActionTypes =
  | NullAction
  | AppSetNameAction
  | SkipIntroAction
  | OpenRegisterAction
  | CloseRegisterAction
  | RegisterAction
;

export enum TypeKeys {
  NULL = 'NULL',
  ERROR = 'ERROR',
  APP_SET_NAME = 'APP_SET_NAME',
  SKIP_INTRO = 'SKIP_INTRO',
  OPEN_REGISTER = 'OPEN_REGISTER',
  CLOSE_REGISTER = 'CLOSE_REGISTER',
  REGISTER = 'REGISTER'
}
