import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { UserData } from '../../providers/user-data';

import { appSetName } from '../../actions/app';

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
  @State() submitted = false;
  @State() needSignup = false;
  @State() step = 1;
  @Prop({ context: 'store' }) store: Store;
  @Event() userDidLogIn: EventEmitter;

  appSetName: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { app: { name } } = state;
      return { name };
    });
    this.store.mapDispatchToProps(this, {
      appSetName
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
    this.needSignup = false;

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

  async onSignup(e: any) {
    e.preventDefault();
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    console.log('Clicked signup');
    // navCtrl.push('/signup', 'root');
    this.needSignup = true;
  }

  outSignup(e: any) {
    e.preventDefault();
    this.needSignup = false;
  }

  wizard() {
    switch (this.step) {
      case 1:
        return [
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu nome completo</ion-label>
            <ion-input name="address"></ion-input>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu endereço</ion-label>
            <ion-input name="address"></ion-input>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu telefone para contato</ion-label>
            <ion-input name="phone"></ion-input>
          </ion-item>,
        ];
      case 2:
        return [
          <ion-item>
            <ion-label position="stacked" color="primary">Informações adicionais</ion-label>
            <ion-textarea rows={4}></ion-textarea>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Insira imagens</ion-label>,
            <ion-button href="#" onClick={() => document.getElementById('file').click()}>
              <span>Selecionar imagens</span>
              <input type="file" id="file" class="upload" style={ {  'display': 'none' } } />
            </ion-button>
          </ion-item>
        ];
      case 3:
        return [
          <ion-item>
            <ion-label position="stacked" color="primary">Digite o usuário</ion-label>
            <ion-input name="username" type="text" value={this.username.value} onInput={(ev) => this.handleUsername(ev)} required>
            </ion-input>
          </ion-item>,
          <ion-text color="danger">
            <p hidden={this.username.valid || this.submitted === false} padding-left>
              Nome do usuário é requerido
            </p>
          </ion-text>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite sua senha</ion-label>
            <ion-input name="password" type="password" value={this.password.value} onInput={(ev) => this.handlePassword(ev)} required>
            </ion-input>
          </ion-item>,
          <ion-text color="danger">
            <p hidden={this.password.valid || this.submitted === false} padding-left>
              Senha é requerida
            </p>
          </ion-text>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite sua senha novamente</ion-label>
            <ion-input name="scpassword"></ion-input>
          </ion-item>
        ];

    }
  }

  next(e: any) {
    e.preventDefault();
    this.step += 1;
    this.step %= 4;
  }

  renderSignup() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button onClick={e => this.outSignup(e)}defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Registro</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>

        <div class="signup-logo">
          <img src="assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>

        <form method="POST" novalidate>
          <ion-list no-lines>{this.wizard()}</ion-list>

          <div padding>
            {this.step === 3 && <ion-button onClick={(e) => this.onSignup(e)} type="submit" expand="block">Registrar</ion-button>}
            {this.step < 3 && <ion-button onClick={(e) => this.next(e)}>Próximo</ion-button>}
          </div>
        </form>

      </ion-content>


    ];
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

  render() {
    return this.needSignup ? this.renderSignup() : this.renderLogin();
  }
}
