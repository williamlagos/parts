import { Component, Prop, State } from '@stencil/core';
// import { UserData } from '../../providers/user-data';

import { closeRegister, openRegister, register, setToken, toggleIntro } from '../../actions/session';
import { Entrance as EntranceContainer } from '../../containers/entrance';

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
  @State() introduced: boolean;
  @State() submitted = false;
  @State() registered = false;
  @Prop({ context: 'store' }) store: Store;
  // @Event() userDidLogIn: EventEmitter;

  setToken: Action;
  register: Action;
  appSetName: Action;
  toggleIntro: Action;
  openRegister: Action;
  closeRegister: Action;
  entrance: EntranceContainer;

  async componentWillLoad() {

    this.store.mapStateToProps(this, (state) => {
      const { session: { name, introduced, registered } } = state;
      return { name, introduced, registered };
    });
    this.store.mapDispatchToProps(this, {
      setToken,
      toggleIntro,
      openRegister,
      closeRegister,
      register
    });
    // Check for Facebook login
    this.entrance = new EntranceContainer();
    const registerObj: any = await this.entrance.checkFacebookCode();
    if (registerObj !== null) {
      const { email, password } = registerObj;
      this.register(registerObj);
      this.setToken(email, password);
    }
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
    this.password = { ...this.password, value: ev.target.value };
  }

  validateUsername() {
    if (this.username.value && this.username.value.length > 0) {
      this.username = { ...this.username, valid: true };
      return;
    }
    this.username = { ...this.username, valid: false };
  }

  validatePassword() {
    if (this.password.value && this.password.value.length > 0) {
      this.password.valid = true;
      this.password = { ...this.password, valid: true };
      return;
    }
    this.password = { ...this.password, valid: false };
  }

  async onLogin(e: any) {
    e.preventDefault();
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;

    // console.log(this.name);
    // console.log(this.name);

    if (this.password.valid && this.username.valid) {
      this.setToken(this.username.value, this.password.value);
    }
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
                    <ion-label position="stacked" color="primary">E-mail</ion-label>
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
                <ion-row responsive-sm>
                  <ion-col>
                    <ion-button onClick={() => this.entrance.openFacebook()} color="tertiary" expand="block">Entrar com o Facebook</ion-button>
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
    if (!this.introduced) {
      return (
        <generic-carousel>
          <div slot="slide1">
            <div class="slide-image-container">
              <img src="assets/img/tour_1_clipper.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">
              Bem-vindo ao <b>Frete Fácil</b>
            </h2>
            <p>
              O <b>Frete Fácil</b> é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido.
            </p>
            <ion-button fill="clear" href="#" onClick={() => this.toggleIntro(true)}>
              Continuar
              <ion-icon slot="end" name="arrow-forward"></ion-icon>
            </ion-button>
          </div>

          <div slot="slide2">
            <div class="slide-image-container">
              <img src="assets/img/tour_2_map.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Por que usar o Frete Fácil?</h2>
            <p>
              <b>Frete Fácil</b> conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe.</p>
              <ion-button fill="clear" href="#" onClick={() => this.toggleIntro(true)}>
                Continuar
                <ion-icon slot="end" name="arrow-forward"></ion-icon>
              </ion-button>
          </div>

          <div slot="slide3">
            <div class="slide-image-container">
              <img src="assets/img/tour_3_payment.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Pago a mais para usar este serviço?</h2>
            <p>
              O aplicativo é <b>100% gratuito</b>, apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você.</p>
              <ion-button fill="clear" href="#" onClick={() => this.toggleIntro(true)}>
                Continuar
                <ion-icon slot="end" name="arrow-forward"></ion-icon>
              </ion-button>
          </div>

          <div slot="slide4">
            <div class="slide-image-container">
              <img src="assets/img/tour_4_start.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Pronto para Começar?</h2>
            <ion-button fill="clear" href="#" onClick={() => this.toggleIntro(true)}>
              Começar
              <ion-icon slot="end" name="arrow-forward"></ion-icon>
            </ion-button>
          </div>
        </generic-carousel>
      );
    }
    return !this.registered ?
      <register-wizard action={(d: any) => this.register(d)} exit={() => this.closeRegister()}/> :
      this.renderLogin();
  }
}
