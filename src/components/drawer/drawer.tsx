import '@ionic/core';

import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { open, revokeToken } from '../../actions/session';

@Component({
  tag: 'app-drawer',
  styleUrl: 'drawer.css'
})
export class Menu {
  @State() token: string;
  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-nav' }) nav: HTMLIonNavElement;
  @Prop({ connect: 'page-tabs' }) tabs: HTMLPageTabsElement;

  open: Action;
  revokeToken: Action;

  appPages = [
    { title: 'Frete', url: 'create', icon: 'cube', role: 'CUSTOMER' },
    { title: 'Mapa', url: 'map', icon: 'map', role: 'CUSTOMER' },
    { title: 'Ofertas', url: 'speakers', icon: 'cash', role: 'MERCHANT' },
    { title: 'Agenda', url: 'schedule', icon: 'calendar', role: 'MERCHANT' },
    { title: 'Sobre', url: 'about', icon: 'information-circle', role: 'ALL' }
  ];

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token } } = state;
      return { token };
    });
    this.store.mapDispatchToProps(this, { revokeToken, open });
  }

  checkLoginStatus() {
    // Checks if the token is empty for login status
    return Boolean(this.token);
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  async changeTab(tab: string) {
    this.open(tab.toUpperCase(), '/' + tab);
    const tabCtrl: HTMLPageTabsElement = await (this.tabs as any).componentOnReady();
    await tabCtrl.select(tab);
  }

  async showPage(event: any, page: string) {
    event.preventDefault();
    const navCtrl = document.querySelector('ion-nav');
    await navCtrl.setRoot('page-tabs');
    await navCtrl.push('page-' + page);
  }

  renderMenu() {
    const role = this.parseJwt(this.token)['_role'];
    // console.log(this.parseJwt(this.token));
    return (
      <ion-menu contentId="app" menuId="first" type="push">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <img src="assets/img/applogo.svg" height="42" alt="Frete Fácil" />
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content forceOverscroll={false}>
          <ion-list>
            <ion-list-header>Navegar</ion-list-header>

            {this.appPages.map((p) => (
              (p.role === role || p.role === 'ALL') &&
                <ion-menu-toggle autoHide={false}>
                  <ion-item lines="full" href="#" onClick={() => this.changeTab(p.url)}>
                    <ion-icon slot="start" name={p.icon}></ion-icon>
                    <ion-label>{p.title}</ion-label>
                  </ion-item>
                </ion-menu-toggle>
            ))}
          </ion-list>

          <ion-list>
            <ion-list-header>Conta</ion-list-header>

            <ion-menu-toggle autoHide={false}>
              {this.checkLoginStatus() ? (
                <ion-item href="#" onClick={(e) => this.showPage(e, 'account')}>
                  <ion-icon slot="start" name="person"></ion-icon>
                  <ion-label>Perfil</ion-label>
                </ion-item>
              ) : (
                <ion-item href="#login">
                  <ion-icon slot="start" name="log-in"></ion-icon>
                  <ion-label>Entrar</ion-label>
                </ion-item>
              )}
            </ion-menu-toggle>

            <ion-menu-toggle autoHide={false}>
              <ion-item href="#support" button onClick={(e) => this.showPage(e, 'support')}>
                <ion-icon slot="start" name="help"></ion-icon>
                <ion-label>Ajuda</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <ion-menu-toggle autoHide={false}>
              {this.checkLoginStatus() ? (
                <ion-item onClick={() => this.revokeToken()} button>
                  <ion-icon slot="start" name="log-out"></ion-icon>
                  <ion-label>Sair</ion-label>
                </ion-item>
              ) : (
                <ion-item href="#signup" button>
                  <ion-icon slot="start" name="person-add"></ion-icon>
                  <ion-label>Registrar</ion-label>
                </ion-item>
              )}
            </ion-menu-toggle>
          </ion-list>

          {/*<ion-list>
            <ion-list-header>Tutorial</ion-list-header>
            <ion-menu-toggle autoHide={false}>
              <ion-item href="#" onClick={(e) => this.showPage(e, 'tutorial')}>
                <ion-icon slot="start" name="hammer"></ion-icon>
                <ion-label>Mostrar Tutorial</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>*/}
        </ion-content>
      </ion-menu>
    );
  }

  renderNav() {
    const role = this.parseJwt(this.token)['_role'];
    return (<ion-nav id="app" main><page-tabs role={role}/></ion-nav>);
  }

  // TODO: Add new carousel to tour customers and merchants
  render() {
    return (
      <ion-split-pane when="lg">
        {this.renderMenu()}
        {this.renderNav()}
      </ion-split-pane>
    );
  }
}
