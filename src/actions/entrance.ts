import { Storage } from '../providers/storage';
import { TypeKeys } from '../actions/index';
import { Backend } from '../providers/backend';

export interface AppSetNameAction {
  type: TypeKeys.APP_SET_NAME;
  name: string;
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

export const appSetName = (name: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain('http://localhost:3000');
  const u = {
    user: {
      email: name,
      password: '123456'
    }
  };
  const d = await (await Backend.authenticateUser(u)).json();
  console.log(d);
  /*fetch('http://localhost:3000/user/authenticate/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email: 'lpachecoquevedo@gmail.com',
      password: '123456'
    })
  }).then((response) => console.log(response));*/
  return dispatch({
    type: TypeKeys.APP_SET_NAME,
    name // : d
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
  const file = data.file;
  delete data.file;
  Backend.setDomain('http://localhost:3000');
  const d = await (await Backend.createUser({ 'user': data })).json();
  /*const formData = new FormData();
  formData.append('files[]', file);
  await fetch('http://localhost:3000/picture/save', {
    method: 'POST',
    headers: {
      'x-access-token': d.token
    },
    body: formData
  });*/
  await (await Backend.addPicture({ 'xAccessToken': d.token, 'files': file })); // .json();
  // console.log(d);
  // console.log(f);
  const option = 0;
  dispatch({ type: TypeKeys.REGISTER, option });
  return dispatch({
    type: TypeKeys.CLOSE_REGISTER,
    registerOpened: false
  });
};
