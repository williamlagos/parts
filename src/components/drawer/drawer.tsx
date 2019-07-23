import '@ionic/core';

import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { open, openProfile, revokeToken } from '../../actions/session';

@Component({
  tag: 'app-drawer',
  styleUrl: 'drawer.css'
})
export class Menu {
  @State() token: string;
  @State() profile: any = {};
  @State() directions: any = {};
  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-nav' }) nav: HTMLIonNavElement;
  @Prop({ connect: 'page-tabs' }) tabs: HTMLPageTabsElement;

  open: Action;
  openProfile: Action;
  revokeToken: Action;

  appPages = [
    // { title: 'Mapa', url: 'map', icon: 'map', role: 'ALL' },
    { title: 'Frete', url: 'create', icon: 'cube', role: 'CUSTOMER' },
    { title: 'Ofertas', url: 'speakers', icon: 'cash', role: 'ALL' },
    { title: 'Agenda', url: 'schedule', icon: 'calendar', role: 'ALL' },
    { title: 'Sobre', url: 'about', icon: 'information-circle', role: 'MERCHANT' }
  ];

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, profile, directions } } = state;
      return { token, profile, directions };
    });
    this.store.mapDispatchToProps(this, { revokeToken, openProfile, open });
    this.openProfile(this.token);
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
    // console.log(this.profile);
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
          {
            this.profile && ([
              <ion-item>
                <ion-avatar slot="start">
                  <img src={this.profile.hasOwnProperty('pictures') && this.profile.pictures.length > 0 ? this.profile.pictures[0] : 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'} alt="Imagem do perfil"/>
                </ion-avatar>
                <ion-label>
                  <h5>{this.profile.name}</h5>
                  <p>{this.profile.email}</p>
                </ion-label>
              </ion-item>,
              <ion-item>
                <ion-buttons class="static-stars">
                  {/*<ion-item/>*/}
                  {
                    this.profile.hasOwnProperty('rating') ? ([
                      <ion-button class={this.profile.rating >= 1 && 'marked'} id="star-1"/>,
                      <ion-button class={this.profile.rating >= 2 && 'marked'} id="star-2"/>,
                      <ion-button class={this.profile.rating >= 3 && 'marked'} id="star-3"/>,
                      <ion-button class={this.profile.rating >= 4 && 'marked'} id="star-4"/>,
                      <ion-button class={this.profile.rating >= 5 && 'marked'} id="star-5"/>
                    ]) : ([
                      <ion-button id="star-1"/>,
                      <ion-button id="star-2"/>,
                      <ion-button id="star-3"/>,
                      <ion-button id="star-4"/>,
                      <ion-button id="star-5"/>
                    ])
                  }
                </ion-buttons>
              </ion-item>
            ])
          }
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

            {/*<ion-menu-toggle autoHide={false}>
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
            </ion-menu-toggle>*/}

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

  renderNav(dir: any) {
    const role = this.parseJwt(this.token)['_role'];
    console.log(dir.slice(-1)[0].component);
    return (
      <ion-nav id="app" main>
        {
          dir.slice(-1)[0].component !== 'DRAWER' ?
          <page-tabs role={role}/> :
          <page-tabs hasTabs={false} role={role}><app-map/></page-tabs>
        }
      </ion-nav>
    );
  }

  // TODO: Add new carousel to tour customers and merchants
  render() {
    return (
      <ion-split-pane when="lg">
        {this.renderMenu()}
        {this.renderNav(this.directions)}
      </ion-split-pane>
    );
  }
}
