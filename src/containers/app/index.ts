import { configureStore } from '../../store';
import { showMyOrders } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';

export class App {

  _store: any;

  constructor() {
    this._store = configureStore({});
  }

  startTimer() {
    let storeState: any = this._store.getState();
    this._store.subscribe(() => { storeState = this._store.getState(); });
    // const interval = setInterval(() => {});
    setInterval(() => {
      // console.log(storeState);
      const { token } = storeState.session;
      const actions = this.pendingActions(storeState);
      actions.forEach(async (a: any) => this._store.dispatch(await a(token)));
    }, 5000);
    // setTimeout(() => clearInterval(interval), 30000);
  }

  static parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  updateMapDrawer(role: string, customer: any, merchant: any) {
    const actions = [];
    if (role === 'CUSTOMER') {
      if (customer.orders.length >= 0) {
        actions.push(showCustomerOrders);
      }
    } else if (role === 'MERCHANT') {
      if (merchant.orders.length >= 0) {
        actions.push(showMyOrders);
      }
    }
    return actions;
  }

  pendingActions(state: any) {
    // Show store state from redux
    const { customer, merchant, session } = state;
    const { directions, token } = session;
    const role = App.parseJwt(token)['_role'];
    // Code for select main tab, without buttons
    // await document.querySelector('ion-tabs').select('tab-drawer')
    const activeTab = directions.slice(-1)[0].component;
    if (activeTab === 'DRAWER') return this.updateMapDrawer(role, customer, merchant);
    else return [];
  }
}
