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
