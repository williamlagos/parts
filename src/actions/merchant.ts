// import { Storage } from '../providers/storage';
import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.fretefacil.net';

export interface SelectOrderAction {
  type: TypeKeys.SELECT_ORDER;
  orderId: string;
}

export interface ShowOrderAction {
  type: TypeKeys.SHOW_ORDER;
  orders: any[];
}

export const showOrder = (token: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  console.log(await (await Backend.getOrders({ 'xAccessToken': token })).json());
  return dispatch({
    type: TypeKeys.SHOW_ORDER,
    orders: []
  });
};

export const selectOrder = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.SELECT_ORDER,
    orderId: ''
  });
};
