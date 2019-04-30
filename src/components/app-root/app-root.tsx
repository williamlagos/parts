import '@ionic/core';

import { Component, Prop, State } from '@stencil/core';
import { Plugins } from '@capacitor/core';

import { Store } from '@stencil/redux';
import { configureStore } from '../../store/index';

const { SplashScreen } = Plugins;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() token: string;
  @Prop({ context: 'store' }) store: Store;

  async componentWillLoad() {
    this.store.setStore(configureStore({}));
    this.store.mapStateToProps(this, (state) => {
      const { entrance: { token } } = state;
      return { token };
    });
  }

  async componentDidLoad() {
    this.checkLoginStatus();
    try {
      await SplashScreen.hide();
    } catch {
      return;
    }
  }

  checkLoginStatus() {
    // Checks if the token is empty for login status
    return Boolean(this.token);
  }

  render() {
    return (
      <ion-app>
        {this.checkLoginStatus() ? [
          <app-drawer />
        ] : (
          <app-entrance />
        )}
      </ion-app>
    );
  }
}
