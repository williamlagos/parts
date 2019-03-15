import { TypeKeys } from '../actions/index';

export interface AppSetNameAction {
  type: TypeKeys.APP_SET_NAME;
  name: string;
}

export const appSetName = (name: string) => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.APP_SET_NAME,
    name
  });
};
