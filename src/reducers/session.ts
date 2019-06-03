import { Storage } from '../providers/storage';
import { ActionTypes, TypeKeys } from '../actions/index';

interface AppState {
  token: string;
  explained: number;
  introduced: number;
  registered: boolean;
  directions: any[];
}

const prepareState = () => {
  const defaultState = {
    token: '',
    explained: 0,
    introduced: 0,
    registered: true,
    directions: [{
      component: 'LOGIN',
      url: '/login'
    }],
  };
  const sessionOpen = Storage.getItem('token');
  return {
    ...defaultState,
    token: sessionOpen || defaultState.token,
    explained: + Storage.getItem('explained') || + defaultState.explained,
    introduced: + Storage.getItem('introduced') || + defaultState.introduced,
    directions: sessionOpen && [...defaultState.directions, { component: 'DRAWER', url: '/' }] || defaultState.directions
  };
};

const session = (state: AppState = prepareState(), action: ActionTypes) => {
  switch (action.type) {
    case TypeKeys.SKIP_INTRO: {
      return {
        ...state,
        introduced: action.introduced
      };
    }
    case TypeKeys.SKIP_TOUR: {
      return {
        ...state,
        explained: action.explained
      };
    }
    case TypeKeys.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
        directions: [...state.directions, action.directions]
      };
    }
    case TypeKeys.REVOKE_TOKEN: {
      return {
        ...state,
        token: action.token,
        directions: [ action.directions ]
      };
    }
    case TypeKeys.OPEN_REGISTER: {
      return {
        ...state,
        registered: action.registered,
        directions: [...state.directions, action.directions]
      };
    }
    case TypeKeys.CLOSE_REGISTER: {
      return {
        ...state,
        registered: action.registered,
        directions: [ action.directions ]
      };
    }
    case TypeKeys.OPEN: {
      return {
        ...state,
        directions: action.directions ?
                    [...state.directions, action.directions] :
                    [...state.directions]
      };
    }
    case TypeKeys.CLOSE: {
      return {
        ...state,
        directions: state.directions.slice(0, -1)
      };
    }
    case TypeKeys.OPEN_PROFILE: {
      return {
        ...state,
        profile: action.profile
      };
    }
  }

  return state;
};

export default session;
