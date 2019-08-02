import 'ionicons';
import '@ionic/core';

import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { App } from '../../containers/app';
import { toggleTour } from '../../actions/session';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() token: string;
  @State() explained: number;
  @Prop({ context: 'store' }) store: Store;
  toggleTour: Action;
  app: App;

  async componentWillLoad() {
    this.app = new App();
    this.app.startTimer();
    this.store.setStore(this.app._store);
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, explained } } = state;
      return { token, explained };
    });
    this.store.mapDispatchToProps(this, { toggleTour });
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

  checkExplainedStatus() {
    // Checks if the initial tour was presented
    return Boolean(this.explained);
  }

  render() {
    // console.log(App.parseJwt(this.token)._role);
    return (
      <ion-app>
        {this.checkLoginStatus() ? (
          this.checkExplainedStatus() ? (<app-drawer />) : (
            <generic-carousel>
              <ion-slide slot="slide1">
                <div class="slide-image-container">
                  <img src="assets/img/tour_1_clipper.svg" class="slide-image"/>
                </div>
                <h2 class="slide-title">
                  Bem-vindo ao <b>Frete Fácil</b>
                </h2>
                <p>
                  O <b>Frete Fácil</b> é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido.
                  Esta é uma versão para testes - poderá ter alguns problemas e pedimos sua compreensão. Pressione em continuar.
                </p>
                <ion-button fill="clear" href="#" onClick={() => this.toggleTour(true)}>
                  Continuar
                  <ion-icon slot="end" name="arrow-forward"></ion-icon>
                </ion-button>
              </ion-slide>
            </generic-carousel>
          )
        ) : (
          <app-entrance />
        )}
      </ion-app>
    );
  }
}
