// import { App } from '../app/';

const hostname = window && window.location && window.location.hostname;
const endpoint = hostname === 'localhost' ? 'https://localhost:4000/' : 'https://api.fretefacil.net/';

export class Entrance {

  // _store: any;
  private client_id: string;
  private client_secret: string;
  private facebook_url: string;

  constructor() {
    this.client_id = '411855926099953';
    this.client_secret = '0ac7ffb57319900adc896968f9dc9ccd';
    this.facebook_url = 'https://graph.facebook.com/v4.0';
  }

  startTimer() {
    // this._store = configureStore({});
    // let storeState: any = this._store.getState();
    // this._store.subscribe(() => { storeState = this._store.getState(); });
    // const interval = setInterval(() => { }, 5000);
    // setTimeout(() => clearInterval(interval), 30000);
  }

  async storeFacebookToken(response: any) {
    const res = await response.json();
    const url = `${this.facebook_url}/me?fields=id%2Cname%2Cemail%2Cpicture%2Cbirthday%2Caddress&access_token=${res['access_token']}`;
    const responseObj = await fetch(url);
    const { birthday, email, id, name, address, picture } = await responseObj.json();
    return {
      name,
      email,
      address,
      password: id,
      birthDate: birthday,
      files: [await (await fetch(picture.data.url)).blob()]
    };
  }

  async checkFacebookCode() {
    const params = Entrance.parseUrl();
    if (params.hasOwnProperty('code')) {
      const authorization_code = params['code'];
      const url = `${this.facebook_url}/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&redirect_uri=${endpoint}&code=${authorization_code}`;
      console.log(url);
      return this.storeFacebookToken(await fetch(url));
    } else {
      return null;
    }
  }

  openFacebook() {
    const app_id = '411855926099953';
    const facebook_url = 'https://www.facebook.com/v4.0/dialog/oauth';
    window.location.href = `${facebook_url}?client_id=${app_id}&redirect_uri=${endpoint}&state=loggedin`;
  }

  static parseUrl() {
    return window.location.search.slice(1).split('&').reduce((map, obj) => {
      map[obj.split('=').slice(0)[0]] = obj.split('=').slice(1)[0];
      return map;
    }, {});
  }
}
