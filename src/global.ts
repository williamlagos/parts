import { configureStore } from './store';

const store = configureStore({});
console.log('store');

setInterval(() => {
  /*const actions = */calculate_pending_actions(store.getState());
  // actions.forEach(store.dispatch);
}, 5000);

function calculate_pending_actions(state: any) {
  // console.log(state);
  const { customer } = state;
  const actions = [];
  // put all your conditions here...
  if (customer.orders.length === 0) {
    actions.push();
  }
  return actions;
}
