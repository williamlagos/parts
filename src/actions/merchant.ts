// import { Storage } from '../providers/storage';
// import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.fretefacil.net';

export interface SelectOrderAction {
  type: TypeKeys.SELECT_ORDER;
  orderId: string;
}

export const selectOrder = () => async (dispatch: any, _getState: any) => {
  console.log(endpoint);
  return dispatch({
    type: TypeKeys.SELECT_ORDER,
    orderId: ''
  });
};
