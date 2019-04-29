import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { UserData } from '../../providers/user-data';

import { appSetName, closeRegister, openRegister, register, toggleIntro } from '../../actions/entrance';

import { Action, Store } from '@stencil/redux';


@Component({
  tag: 'app-entrance',
  styleUrl: 'entrance.css',
})
export class Entrance {
  @State() username = {
    valid: false,
    value: ''
  };
  @State() password = {
    valid: false,
    value: ''
  };
  @State() name = '';
  @State() skipIntro: boolean;
  @State() submitted = false;
  @State() registerOpened = false;
  @Prop({ context: 'store' }) store: Store;
  @Event() userDidLogIn: EventEmitter;

  register: Action;
  appSetName: Action;
  toggleIntro: Action;
  openRegister: Action;
  closeRegister: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { entrance: { name, skipIntro, registerOpened } } = state;
      return { name, skipIntro, registerOpened };
    });
    this.store.mapDispatchToProps(this, {
      appSetName,
      toggleIntro,
      openRegister,
      closeRegister,
      register
    });
  }

  handleUsername(ev: any) {
    this.validateUsername();
    this.username = {
      ...this.username,
      value: ev.target.value
    };
  }

  handlePassword(ev: any) {
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

  async onRegisterSignup(e: any) {
    e.preventDefault();
    console.log('clicked signup');
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;
    this.registerOpened = false;

    if (this.password.valid && this.username.valid) {
      UserData.signup(this.username.value);
    }
  }

  async onLogin(e: any) {
    e.preventDefault();
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();

    console.log('Clicked login');
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;

    console.log(this.name);
    this.appSetName('lpachecoquevedo@gmail.com');
    console.log(this.name);

    if (this.password.valid && this.username.valid) {
      await UserData.login(this.username.value);

      this.userDidLogIn.emit({ loginStatus: true });
      // console.log(navCtrl);
      // navCtrl.push('/schedule');
    }
  }

  onSignup(event: any) {
    event.preventDefault();
    this.registerOpened = true;
  }

  renderLogin() {
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
                    <ion-button onClick={() => this.openRegister()} color="light" expand="block">Registrar</ion-button>
                  </ion-col>
                </ion-row>
              </form>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>

    ];
  }

  render() {
    if (!this.skipIntro) return <generic-carousel action={() => this.toggleIntro(true)}/>;
    return this.registerOpened ?
      <generic-wizard action={(d: any) => this.register(d)} exit={() => this.closeRegister()}/> :
      this.renderLogin();
  }
}
