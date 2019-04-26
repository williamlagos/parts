import { Component, /*Event, EventEmitter, Prop,*/ State } from '@stencil/core';

// import { appSetName, toggleIntro } from '../../actions/entrance';

@Component({
  tag: 'generic-wizard',
  styleUrl: 'wizard.css',
})
export class Wizard {
  @State() step = 1;
  @State() submitted = false;
  @State() needSignup = false;
  @State() username = {
    valid: false,
    value: ''
  };
  @State() password = {
    valid: false,
    value: ''
  };

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

  render() {
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
}
