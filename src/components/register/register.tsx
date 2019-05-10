import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'register-wizard',
  styleUrl: 'wizard.css',
})
export class Register {
  @State() submitted = false;
  @State() username = { valid: false, value: '' };
  @State() password = { valid: false, value: '' };
  @State() data = { };

  @Prop() exit: any;
  @Prop() action: any;
  @Prop() images: any;

  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  handleRadio(ev: any) {
    this.data[ev.target.name] = [ev.target.value];
  }

  handleFile(files: FileList) {
    this.data['files'] = files;
  }

  handleAddress(ev: any) {
    this.data['address'] = {
      'street': ev.target.value
    };
  }

  handleUsername(ev: any) {
    this.validateUsername();
    this.username = { ...this.username, value: ev.target.value };
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

        <generic-wizard id="register" steps={4} action={(e: any) => this.submit(e)}>
          <div slot="step-1">
            <ion-item>
              <ion-label position="stacked">Digite seu nome completo</ion-label>
              <ion-input name="name" onInput={(ev) => this.handleInput(ev)}></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Digite seu endereço</ion-label>
              <ion-input name="address" onInput={(ev) => this.handleAddress(ev)}></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Digite seu telefone para contato</ion-label>
              <ion-input name="phone" onInput={(ev) => this.handleInput(ev)}></ion-input>
            </ion-item>
            <ion-radio-group name="role">
              <ion-list-header>
                <ion-label>Você é freteiro ou busca por frete?</ion-label>
              </ion-list-header>
              <ion-item>
                <ion-label>Cliente</ion-label>
                <ion-radio onClick={(ev) => this.handleRadio(ev)} slot="start" value="CUSTOMER" checked></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Freteiro</ion-label>
                <ion-radio onClick={(ev) => this.handleRadio(ev)} slot="start" value="MERCHANT"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </div>
          <div slot="step-2">
            <ion-item>
              <ion-label position="stacked">Insira imagens</ion-label>
              <image-uploader send={(file: any) => this.handleFile(file)} id="file"/>
            </ion-item>
          </div>
          <div slot="step-3">
            <ion-item>
              <ion-label position="stacked">Digite seu e-mail para o login</ion-label>
              <ion-input name="email" onInput={(ev) => this.handleInput(ev)}></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Digite um nome de usuário</ion-label>
              <ion-input name="username" type="text" value={this.username.value} onInput={(ev) => this.handleUsername(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.username.valid || this.submitted === false} padding-left>
                Nome do usuário é requerido
              </p>
            </ion-text>
            <ion-item>
              <ion-label position="stacked">Digite sua senha</ion-label>
              <ion-input name="password" type="password" value={this.password.value} onInput={(ev) => this.handlePassword(ev)} required>
              </ion-input>
            </ion-item>
            <ion-text color="danger">
              <p hidden={this.password.valid || this.submitted === false} padding-left>
                Senha é requerida
              </p>
            </ion-text>
            <ion-item>
              <ion-label position="stacked">Digite sua senha novamente</ion-label>
              <ion-input type="password" name="scpassword"></ion-input>
            </ion-item>
          </div>
          <div slot="step-4">
            <ion-item>
              <ion-label position="stacked">Informações adicionais</ion-label>
              <ion-textarea name="info" rows={4} onInput={(ev) => this.handleInput(ev)}></ion-textarea>
            </ion-item>
          </div>
        </generic-wizard>

      </ion-content>
    ];
  }
}
