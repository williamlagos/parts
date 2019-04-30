import { Storage } from '../providers/storage';
import { TypeKeys } from '../actions/index';
import { Backend } from '../providers/backend';

// const endpoint = 'http://localhost:3000';
const endpoint = 'https://api.fretefacil.net';

export interface SetTokenAction {
  type: TypeKeys.SET_TOKEN;
  token: string;
}

export interface RevokeTokenAction {
  type: TypeKeys.REVOKE_TOKEN;
  token: string;
}

export interface SkipIntroAction {
  type: TypeKeys.SKIP_INTRO;
  skipIntro: number;
}

export interface OpenRegisterAction {
  type: TypeKeys.OPEN_REGISTER;
  registerOpened: boolean;
}

export interface CloseRegisterAction {
  type: TypeKeys.CLOSE_REGISTER;
  registerOpened: boolean;
}

export interface RegisterAction {
  type: TypeKeys.REGISTER;
  option: number;
}

export const setToken = (email: string, password: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  const u = { user: { email, password } };
  const d = await (await Backend.authenticateUser(u)).json();
  Storage.setItem('token', String(d.token));
  return dispatch({
    type: TypeKeys.SET_TOKEN,
    token: d.token
  });
};

export const revokeToken = () => (dispatch: any, _getState: any) => {
  Storage.removeItem('token');
  return dispatch({
    type: TypeKeys.REVOKE_TOKEN,
    token: ''
  });
};

export const toggleIntro = (option: boolean) => async (dispatch: any, _getState: any) => {
  Storage.setItem('skipIntro', String(+ option));
  return dispatch({
    type: TypeKeys.SKIP_INTRO,
    skipIntro: + option
  });
};

export const openRegister = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.OPEN_REGISTER,
    registerOpened: true
  });
};

export const closeRegister = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.CLOSE_REGISTER,
    registerOpened: false
  });
};

export const register = (data: any) => async (dispatch: any, _getState: any) => {
  const files = data.files;
  delete data.files;
  data['role'] = data.option === 0 ? 'CUSTOMER' : 'MERCHANT';
  const option = data.option === 0 ? 0 : 1;
  console.log(data);
  Backend.setDomain(endpoint);
  const d = await (await Backend.createUser({ 'user': data })).json();
  await (await Backend.addPicture({ 'xAccessToken': d.token, 'files': files })); // .json();
  dispatch({ type: TypeKeys.REGISTER, option });
  return dispatch({
    type: TypeKeys.CLOSE_REGISTER,
    registerOpened: false
  });
};
