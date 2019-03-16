import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { UserData } from '../../providers/user-data';

import { appSetName } from '../../actions/app';

import { Action, Store } from '@stencil/redux';


@Component({
  tag: 'page-login',
  styleUrl: 'page-login.css',
})
export class PageLogin {
  @State() username = {
    valid: false,
    value: ''
  };
  @State() password = {
    valid: false,
    value: ''
  };
  @State() submitted = false;
  @Prop({ connect: 'ion-router' }) nav;
  @Prop({ context: 'store' }) store: Store;
  @Event() userDidLogIn: EventEmitter;

  appSetName: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      appSetName
    });
  }

  handleUsername(ev) {
    this.validateUsername();
    this.username = {
      ...this.username,
      value: ev.target.value
    };
  }

  handlePassword(ev) {
    this.validatePassword();
    this.password.value = ev.target.value;
    this.password = {
      ...this.password,
      value: ev.target.value
    };
  }

  validateUsername() {
    if (this.username.value && this.username.value.length > 0) {
      this.username = {
        ...this.username,
        valid: true
      };

      return;
    }

    this.username = {
      ...this.username,
      valid: false
    };
  }

  validatePassword() {
    if (this.password.value && this.password.value.length > 0) {
      this.password.valid = true;

      this.password = {
        ...this.password,
        valid: true
      };

      return;
    }

    this.password = {
      ...this.password,
      valid: false
    };
  }

  async onLogin(e) {
    e.preventDefault();
    const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();

    console.log('Clicked login');
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;

    this.appSetName('lpachecoquevedo@gmail.com');

    if (this.password.valid && this.username.valid) {
      await UserData.login(this.username.value);

      this.userDidLogIn.emit({ loginStatus: true });
      console.log(navCtrl);
      navCtrl.push('/schedule', 'root');
    }
  }

  async onSignup(e) {
    e.preventDefault();
    const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    console.log('Clicked signup');
    navCtrl.push('/signup', 'root');
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle auto-hide={false}>
              <ion-icon name="menu"></ion-icon>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title>Entrar</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <ion-grid>
          <ion-row>
            <ion-col size-md="4" offset-md="4">
              <div class="login-logo">
                <img src="assets/img/appicon.svg" alt="Ionic logo" />
              </div>

              <form novalidate="true" onSubmit={(e) => this.onLogin(e)}>
                <ion-list no-lines>
                  <ion-item>
                    <ion-label position="stacked" color="primary">Usuário</ion-label>
                    <ion-input name="username" type="text" value={this.username.value} onInput={(ev) => this.handleUsername(ev)} spellcheck={false} autocapitalize="off" required></ion-input>
                  </ion-item>

                  <ion-text color="danger">
                    <p hidden={this.username.valid || this.submitted === false} padding-left>
                      Nome do usuário é requerido
                    </p>
                  </ion-text>

                  <ion-item>
                    <ion-label position="stacked" color="primary">Senha</ion-label>
                    <ion-input name="password" type="password" value={this.password.value} onInput={(ev) => this.handlePassword(ev)} required></ion-input>
                  </ion-item>

                  <ion-text color="danger">
                    <p hidden={this.password.valid || this.submitted === false} padding-left>
                      Senha é requerida
                    </p>
                  </ion-text>
                </ion-list>

                <ion-row responsive-sm>
                  <ion-col>
                    <ion-button type="submit" expand="block">Entrar</ion-button>
                  </ion-col>
                  <ion-col>
                    <ion-button onClick={(e) => this.onSignup(e)} color="light" expand="block">Registrar</ion-button>
                  </ion-col>
                </ion-row>
              </form>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>

    ];
  }
}
