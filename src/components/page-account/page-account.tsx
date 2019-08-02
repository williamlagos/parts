import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';
import { UserData } from '../../providers/user-data';


@Component({
  tag: 'page-account',
})
export class PageAccount {

  @State() token: string;
  @State() profile: any;
  @Prop({ connect: 'ion-router' }) nav: HTMLIonRouterElement;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;
  @Prop({ context: 'store' }) store: Store;
  @Event() userDidLogOut: EventEmitter;
  changeProfile: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, profile } } = state;
      return { token, profile };
    });
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  async logout() {
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    await UserData.logout();
    this.userDidLogOut.emit({ loginStatus: false });
    // navCtrl.push('/schedule', 'root');
    // navCtrl.setRoot('page-tabs', null, { animated: true, direction: 'forward' });
  }

  async support() {
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    // navCtrl.setRoot('page-support');
    // navCtrl.push('/support', 'root');
  }

  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      inputs: [
        {
          type: 'text',
          name: 'username',
          id: 'userName',
          placeholder: 'username',
          // value: this.user
        },

      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Ok',
          handler: (data) => {
            UserData.setUsername(data.username);
            // this.getUser();
          }
        }
      ]
    });
    alert.present();
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

        <div padding-top text-center >
          <img
            src={
              this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ?
                this.profile.pictures[0] :
                'http://www.gravatar.com/avatar?d=mm&s=140'
            }
            alt="avatar"
          />
          <h2>{this.profile.name} ({this.profile.username})</h2>
          <ion-list>
            <ion-item onClick={() => this.updatePicture()}>Atualizar Foto</ion-item>
            <ion-item onClick={() => this.changeUsername()}>Mudar Nome do Usuário</ion-item>
            <ion-item onClick={() => this.changePassword()}>Mudar Senha</ion-item>
            {/*<ion-item onClick={() => this.support()}>Ajuda</ion-item>
            <ion-item onClick={() => this.logout()}>Sair</ion-item>*/}
          </ion-list>
        </div>
      </ion-content>

    ];
  }
}
