import { Storage } from '../providers/storage';
import { TypeKeys } from '../actions/index';
import { Backend } from '../providers/backend';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.fretefacil.net';

export interface OpenProfileAction {
  type: TypeKeys.OPEN_PROFILE;
  profile: any;
}

export interface SetTokenAction {
  type: TypeKeys.SET_TOKEN;
  directions: any[];
  token: string;
}

export interface RevokeTokenAction {
  type: TypeKeys.REVOKE_TOKEN;
  directions: any[];
  token: string;
}

export interface SkipIntroAction {
  type: TypeKeys.SKIP_INTRO;
  directions: any[];
  introduced: number;
}

export interface SkipTourAction {
  type: TypeKeys.SKIP_TOUR;
  directions: any[];
  explained: number;
}

export interface OpenRegisterAction {
  type: TypeKeys.OPEN_REGISTER;
  directions: any[];
  registered: boolean;
}

export interface CloseRegisterAction {
  type: TypeKeys.CLOSE_REGISTER;
  directions: any[];
  registered: boolean;
}

export interface OpenAction {
  type: TypeKeys.OPEN;
  directions: any[];
}

export interface CloseAction {
  type: TypeKeys.CLOSE;
  directions: any[];
}

export interface UpdateProfileAction {
  type: TypeKeys.UPDATE_PROFILE;
}

export const updateProfile = (data: any, token: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  if (data.hasOwnProperty('files')) {
    const files = data.files;
    // console.log(data.files);
    const pictures = await (await Backend.addPicture({ 'xAccessToken': token, 'files': files })).json();
    const picture = pictures.map((pic: any) => pic._id)[0];
    await Backend.updateUser({ 'xAccessToken': token, 'user': { ...data, 'pictures': [picture] } });
  } else {
    // console.log(data);
    await Backend.updateUser({ 'xAccessToken': token, 'user': { ...data } });
  }
  return dispatch({ type: TypeKeys.UPDATE_PROFILE });
};

export const openProfile = (token: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  const profile = await (await Backend.getUserProfile({ 'xAccessToken': token })).json();
  profile.pictures = profile.hasOwnProperty('pictures') && profile.pictures.length > 0 ?
                     [(await (await Backend.getPicture({ 'xAccessToken': token, 'id': profile.pictures[0] })).json())['externalRef']] : [ ];
  return dispatch({
    type: TypeKeys.OPEN_PROFILE,
    profile
  });
};

export const setToken = (email: string, password: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  const u = { user: { email, password } };
  const d = await (await Backend.authenticateUser(u)).json();
  Storage.setItem('token', String(d.token));
  return dispatch({
    directions: { component: 'DRAWER', url: '/' },
    type: TypeKeys.SET_TOKEN,
    token: d.token
  });
};

export const revokeToken = () => (dispatch: any, _getState: any) => {
  Storage.removeItem('token');
  return dispatch({
    directions: { component: 'LOGIN', url: '/login' },
    type: TypeKeys.REVOKE_TOKEN,
    token: ''
  });
};

export const toggleIntro = (option: boolean) => async (dispatch: any, _getState: any) => {
  Storage.setItem('introduced', String(+ option));
  return dispatch({
    type: TypeKeys.SKIP_INTRO,
    introduced: + option
  });
};

export const toggleTour = (option: boolean) => async (dispatch: any, _getState: any) => {
  Storage.setItem('explained', String(+ option));
  return dispatch({
    directions: { component: 'DRAWER', url: '/' },
    type: TypeKeys.SKIP_TOUR,
    explained: + option
  });
};

export const openRegister = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    directions: { component: 'REGISTER', url: '/register' },
    type: TypeKeys.OPEN_REGISTER,
    registered: false
  });
};

export const closeRegister = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    directions: { component: 'LOGIN', url: '/login' },
    type: TypeKeys.CLOSE_REGISTER,
    registered: true
  });
};

export const register = (data: any) => async (dispatch: any, _getState: any) => {
  const files = data.files;
  console.log(data.files);
  Backend.setDomain(endpoint);
  const d = await (await Backend.createUser({ 'user': data })).json();
  const pictures = await (await Backend.addPicture({ 'xAccessToken': d.token, 'files': files })).json();
  const picture = pictures.map((pic: any) => pic._id)[0];
  await Backend.updateUser({ 'xAccessToken': d.token, 'user': { 'pictures': [picture] } });
  return dispatch({
    type: TypeKeys.CLOSE_REGISTER,
    registered: true
  });
};

export const open = (component: string, url: string) => async (dispatch: any, _getState: any) => {
  const stateComponent = _getState().session.directions.slice(-1)[0].component;
  const directions = stateComponent === component ? null : { component, url };
  return dispatch({
    type: TypeKeys.OPEN,
    directions
  });
};

export const close = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.CLOSE,
    directions: {}
  });
};
