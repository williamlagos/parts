import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { updateProfile } from '../../actions/session';

@Component({
  tag: 'page-account',
})
export class PageAccount {
  @Prop({ connect: 'ion-router' }) nav: HTMLIonRouterElement;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;
  @Prop({ context: 'store' }) store: Store;
  @Prop() exit: any;
  @Prop() images: any;

  @State() token: string;
  @State() profile: any;
  @State() submitted = false;
  @State() username = { valid: false, value: '' };
  @State() password = { valid: false, value: '' };
  @State() data = { };

  updateProfile: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, profile } } = state;
      return { token, profile };
    });
    this.store.mapDispatchToProps(this, { updateProfile });
  }

  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  handleRadio(ev: any) {
    this.data[ev.target.name] = [ev.target.value];
  }

  handleFile(files: FileList) {
    this.data['files'] = [files[0]];
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

  async submit(e: any) {
    e.preventDefault();
    const data = {
      ...this.data,
      username: this.username.value !== '' ?
        this.username.value :
        this.profile.username
    };
    // console.log(data);
    await this.updateProfile(data, this.token);
    const toast = await this.toastCtrl.create({
      message: 'Perfil atualizado com sucesso.',
      duration: 3000
    });
    toast.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
            <ion-back-button></ion-back-button>
          </ion-buttons>

          <ion-title>Conta</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-list>
          <div padding-top text-center>
            <img
              src={
              this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ?
                this.profile.pictures[0] :
                'http://www.gravatar.com/avatar?d=mm&s=140'
              }
              style={{ maxHeight: '120px' }}
              alt="avatar"
            />
            <h2>{this.profile.name} ({this.profile.username})</h2>
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Atualize seu nome completo</ion-label>
                <ion-input placeholder={this.profile.name} name="name" onInput={(ev: any) => this.handleInput(ev)}></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Atualize seu endereço</ion-label>
                <ion-input placeholder={this.profile.address.street} name="address" onInput={(ev: any) => this.handleAddress(ev)}></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Atualize seu telefone para contato</ion-label>
                <ion-input placeholder={this.profile.phone} name="phone" onInput={(ev: any) => this.handleInput(ev)}></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Substituir imagem</ion-label>
                <image-uploader send={(file: any) => this.handleFile(file)} id="file"/>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Atualize seu e-mail para o login</ion-label>
                <ion-input placeholder={this.profile.email} name="email" onInput={(ev: any) => this.handleInput(ev)}></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Atualize o nome de usuário</ion-label>
                <ion-input placeholder={this.profile.username} name="username" type="text" value={this.username.value} onInput={(ev: any) => this.handleUsername(ev)} required>
                </ion-input>
              </ion-item>
              <ion-text color="danger">
                <p hidden={this.username.valid || this.submitted === false} padding-left>
                  Nome do usuário é requerido
                </p>
              </ion-text>
              <ion-button style={{ 'flex': '1' }} onClick={(e: any) => this.submit(e)} color="primary" expand="block">Atualizar</ion-button>
            </ion-list>
          </div>
        </ion-list>
      </ion-content>
    ];
  }
}
