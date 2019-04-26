import {
  AppSetNameAction,
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
;

export enum TypeKeys {
  NULL = 'NULL',
  ERROR = 'ERROR',
  APP_SET_NAME = 'APP_SET_NAME',
  SKIP_INTRO = 'SKIP_INTRO'
}
