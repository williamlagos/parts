// import { Storage } from '../providers/storage';
import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.fretefacil.net';

export interface RegisterOrderAction {
  type: TypeKeys.REGISTER_ORDER;
  orderId: string;
}

export const registerOrder = (data: any, token: string) => async (dispatch: any, _getState: any) => {
  const files = data.files;
  delete data.files;
  Backend.setDomain(endpoint);
  const pictures = await (await Backend.addPicture({ 'xAccessToken': token, 'files': files })).json();
  data.pictures = pictures.map((picture: any) => picture._id);
  const order = await (await Backend.createOrder({ 'xAccessToken': token, 'order': data })).json();
  console.log(data);
  console.log(order);
  console.log(token);
  // console.log(endpoint);
  return dispatch({
    type: TypeKeys.REGISTER_ORDER,
    orderId: order._id
  });
};
