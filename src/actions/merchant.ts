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
  const orders = await (await Backend.getReadyOrders({ 'xAccessToken': token })).json();
  const pictures = orders.map((order: any) => order.pictures).flat();
  const picturesObj = await(await Backend.getPictures({ 'xAccessToken': token, 'ids': pictures.flat() })).json();
  const ordersWithPictures = orders.map((order: any) => {
    for (let i = 0; i < picturesObj.length; i++) {
      const foundOne = order.pictures.indexOf(picturesObj[i]._id);
      if (foundOne !== -1) order.pictures[foundOne] = picturesObj[i];
    }
    return order;
  });
  // console.log(ordersWithPictures);
  return dispatch({
    type: TypeKeys.SHOW_ORDER,
    orders: ordersWithPictures
  });
};

export const selectOrder = () => async (dispatch: any, _getState: any) => {
  return dispatch({
    type: TypeKeys.SELECT_ORDER,
    orderId: ''
  });
};
