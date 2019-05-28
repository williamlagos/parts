// import { Storage } from '../providers/storage';
import { Backend } from '../providers/backend';
import { TypeKeys } from '../actions/index';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.fretefacil.net';

export interface RegisterOrderAction {
  type: TypeKeys.REGISTER_ORDER;
  orderId: string;
}

export interface ShowMyOrdersAction {
  type: TypeKeys.MY_ORDERS;
  orders: any;
}

export interface ShowOrderBidsAction {
  type: TypeKeys.ORDER_BIDS;
  bids: any;
}

export interface SetMerchantOrderAction {
  type: TypeKeys.ORDER_MERCHANT;
}

export const registerOrder = (data: any, token: string) => async (dispatch: any, _getState: any) => {
  const files = data.files;
  delete data.files;
  Backend.setDomain(endpoint);
  const pictures = await (await Backend.addPicture({ 'xAccessToken': token, 'files': files })).json();
  data.pictures = pictures.map((picture: any) => picture._id);
  const order = await (await Backend.createOrder({ 'xAccessToken': token, 'order': data })).json();
  return dispatch({
    type: TypeKeys.REGISTER_ORDER,
    orderId: order._id
  });
};

export const showMyOrders = (token: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const userId = JSON.parse(window.atob(base64))._id;
  const initialOrders = await (await Backend.getOrders({ 'xAccessToken': token })).json();
  const pictures = initialOrders.map((order: any) => order.pictures).flat();
  /* const bids = initialOrders.map((order: any) => order.bids).flat();
  const bidsObj = await (await Backend.getBids({ 'xAccessToken': token, 'ids': bids.flat() })).json(); */
  const picturesObj = await(await Backend.getPictures({ 'xAccessToken': token, 'ids': pictures.flat() })).json();
  // console.log(picturesObj);
  const ordersWithPictures = initialOrders.map(async (order: any) => {
    if (order.bids.length > 0) {
      const bids = await (await Backend.getOrderBids({ 'xAccessToken': token, 'order': order._id })).json();
      const result = bids.filter((bid: any) => userId === bid.user._id);
      order.placed = result.length > 0;
    }
    for (let i = 0; i < picturesObj.length; i++) {
      const foundOne = order.pictures.indexOf(picturesObj[i]._id);
      if (foundOne !== -1) order.pictures[foundOne] = picturesObj[i];
    }
    return order;
  });
  const orders = await Promise.all(ordersWithPictures);
  // console.log(orders);
  return dispatch({
    type: TypeKeys.MY_ORDERS,
    orders
  });
};

export const showOrderBids = (token: string, orderId: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  const bids = await (await Backend.getOrderBids({ 'xAccessToken': token, 'order': orderId })).json();
  return dispatch({
    type: TypeKeys.ORDER_BIDS,
    bids
  });
};

export const selectMerchantForOrder = (merchantId: string, orderId: string, token: string) => async (dispatch: any, _getState: any) => {
  Backend.setDomain(endpoint);
  await Backend.setOrderMerchant({ 'xAccessToken': token, 'id': orderId, 'merchant': merchantId });
  return dispatch({ type: TypeKeys.ORDER_MERCHANT });
};
