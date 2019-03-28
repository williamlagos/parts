import { Component, State } from '@stencil/core';
import { UserData } from '../../providers/user-data';


@Component({
  tag: 'page-signup',
  styleUrl: 'page-signup.css',
})
export class PageSignup {
  @State() username = {
    valid: false,
    value: ''
  };
  @State() password = {
    valid: false,
    value: ''
  };
  @State() submitted = false;

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

  onSignup(e) {
    e.preventDefault();
    console.log('clicked signup');
    this.validatePassword();
    this.validateUsername();

    this.submitted = true;

    if (this.password.valid && this.username.valid) {
      UserData.signup(this.username.value);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Registro</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>

        <div class="signup-logo">
          <img src="assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>

        <form novalidate>
          <ion-list no-lines>
            <ion-item>
              <ion-label position="stacked" color="primary">Digite seu nome completo</ion-label>
              <ion-input name="address"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Digite o usuário</ion-label>
              <ion-input name="username" type="text" value={this.username.value} onInput={(ev) => this.handleUsername(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.username.valid || this.submitted === false} padding-left>
                Nome do usuário é requerido
              </p>
            </ion-text>

            <ion-item>
              <ion-label position="stacked" color="primary">Digite sua senha</ion-label>
              <ion-input name="password" type="password" value={this.password.value} onInput={(ev) => this.handlePassword(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.password.valid || this.submitted === false} padding-left>
                Senha é requerida
              </p>
            </ion-text>

            <ion-item>
              <ion-label position="stacked" color="primary">Digite sua senha novamente</ion-label>
              <ion-input name="scpassword"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary">Insira imagens</ion-label>
              <input type="file"></input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary">Digite seu endereço</ion-label>
              <ion-input name="address"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary">Digite seu telefone para contato</ion-label>
              <ion-input name="phone"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary">Informações adicionais</ion-label>
              <ion-textarea rows={4}></ion-textarea>
            </ion-item>
          </ion-list>

          <div padding>
            <ion-button onClick={(e) => this.onSignup(e)} type="submit" expand="block">Registrar</ion-button>
          </div>
        </form>

      </ion-content>


    ];
  }
}
