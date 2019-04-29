import { Component, /*Event, EventEmitter,*/ Prop, State } from '@stencil/core';

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

  @State() data = {};

  @Prop() exit: any;
  @Prop() action: any;
  @Prop() images: any;

  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  handleFile(file: any) {
    this.data['file'] = file;
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

  wizard() {
    switch (this.step) {
      case 1:
        return [
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu nome completo</ion-label>
            <ion-input name="name" onInput={(ev) => this.handleInput(ev)}></ion-input>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu endereço</ion-label>
            <ion-input name="address" onInput={(ev) => this.handleInput(ev)}></ion-input>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu telefone para contato</ion-label>
            <ion-input name="phone" onInput={(ev) => this.handleInput(ev)}></ion-input>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Digite seu e-mail para contato</ion-label>
            <ion-input name="email" onInput={(ev) => this.handleInput(ev)}></ion-input>
          </ion-item>
        ];
      case 2:
        return [
          <ion-item>
            <ion-label position="stacked" color="primary">Informações adicionais</ion-label>
            <ion-textarea name="info" rows={4} onInput={(ev) => this.handleInput(ev)}></ion-textarea>
          </ion-item>,
          <ion-item>
            <ion-label position="stacked" color="primary">Insira imagens</ion-label>
            <image-uploader send={(file: any) => this.handleFile(file)} id="file"/>
            {/*<ion-button href="#" onClick={() => document.getElementById('file').click()}>
              <span>Selecionar imagens</span>
              <input type="file" name="files[]" id="file" accept="image/*" class="image-upload__input" onChange={($event: any) => this.handleFile($event.target.files)} style={{ 'display': 'none' }}/>
            </ion-button>*/}
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
            <ion-input type="password" name="scpassword"></ion-input>
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

  unload(e: any) {
    e.preventDefault();
    this.exit();
  }

  submit(e: any) {
    e.preventDefault();
    const data = {
      ...this.data,
      username: this.username.value,
      password: this.password.value
    };
    this.action(data);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button onClick={e => this.unload(e)}defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>Registro</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>

        <div class="signup-logo">
          <img src="assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>

        <form method="POST" action="#">
          <ion-list no-lines>{this.wizard()}</ion-list>

          <div padding>
            {this.step === 3 && <ion-button onClick={(e) => this.submit(e)} expand="block">Registrar</ion-button>}
            {this.step < 3 && <ion-button onClick={(e) => this.next(e)}>Próximo</ion-button>}
          </div>
        </form>

      </ion-content>


    ];
  }
}
