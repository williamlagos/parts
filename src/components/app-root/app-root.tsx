import '@ionic/core';

import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { UserData } from '../../providers/user-data';
import { Plugins } from '@capacitor/core';

import { Store } from '@stencil/redux';
import { configureStore } from '../../store/index';

const { SplashScreen } = Plugins;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  @State() loggedIn = false;
  hasSeenTutorial = false;

  @Element() el: HTMLElement;

  @Prop({ context: 'isServer' }) isServer: boolean;
  @Prop({ context: 'store' }) store: Store;
  // @Prop({ connect: 'ion-router' }) nav;

  appPages = [
    {
      title: 'Frete',
      url: '#create',
      icon: 'cube'
    },
    {
      title: 'Mapa',
      url: '#map',
      icon: 'map'
    },
    {
      title: 'Ofertas',
      url: '#speakers',
      icon: 'cash'
    },
    {
      title: 'Agenda',
      url: '#schedule',
      icon: 'calendar'
    },
    {
      title: 'Sobre',
      url: '#about',
      icon: 'information-circle'
    }
  ];

  async componentWillLoad() {
    this.store.setStore(configureStore({}));
    this.hasSeenTutorial = this.isServer
      ? true
      : await UserData.checkHasSeenTutorial();
  }

  async componentDidLoad() {
    this.checkLoginStatus();
    try {
      await SplashScreen.hide();
    } catch {
      return;
    }
  }

  async checkLoginStatus() {
    const loggedIn = this.loggedIn = await UserData.isLoggedIn();
    return loggedIn;
  }

  async logout() {
    await UserData.logout();
    this.loggedIn = false;
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    // navCtrl.push('/login', 'root');
  }


  @Listen('userDidLogIn')
  @Listen('userDidLogOut')
  updateLoggedInStatus(loggedEvent: any) {
    this.loggedIn = loggedEvent.detail.loginStatus;
  }

  renderRouter() {
    return (
      <ion-router useHash={false}>
          <ion-route component="page-tabs">
            <ion-route url="/schedule" component="tab-schedule">
              <ion-route component="page-schedule"></ion-route>
              <ion-route url="/session/:sessionId" component="page-session" componentProps={{ goback: '/schedule' }}></ion-route>
            </ion-route>

            <ion-route url="/speakers" component="tab-speakers">
              <ion-route component="page-speaker-list"></ion-route>
              <ion-route url="/session/:sessionId" component="page-session" componentProps={{ goback: '/speakers' }}></ion-route>
              <ion-route url="/:speakerId" component="page-speaker-detail"></ion-route>
            </ion-route>

            <ion-route url="/create" component="tab-create">
              <ion-route component="page-create"></ion-route>
            </ion-route>
            <ion-route url="/map" component="tab-map"></ion-route>
            <ion-route url="/about" component="tab-about"></ion-route>
          </ion-route>,

          <ion-route url="/tutorial" component="page-tutorial"></ion-route>,
          <ion-route url="/account" component="page-account"></ion-route>,
          <ion-route url="/support" component="page-support"></ion-route>
        ]}
      </ion-router>
    );
  }

  renderSplitPane() {
    return (
      <ion-split-pane when="lg">
        <ion-menu menuId="first" type="push">
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
                <ion-menu-toggle autoHide={false}>
                  <ion-item lines="full" href={p.url}>
                    <ion-icon slot="start" name={p.icon}></ion-icon>
                    <ion-label>{p.title}</ion-label>
                  </ion-item>
                </ion-menu-toggle>
              ))}
            </ion-list>

            <ion-list>
              <ion-list-header>Conta</ion-list-header>

              <ion-menu-toggle autoHide={false}>
                {this.loggedIn ? (
                  <ion-item href="#account">
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
                <ion-item href="#support" button>
                  <ion-icon slot="start" name="help"></ion-icon>
                  <ion-label>Ajuda</ion-label>
                </ion-item>
              </ion-menu-toggle>

              <ion-menu-toggle autoHide={false}>
                {this.loggedIn ? (
                  <ion-item onClick={() => this.logout()} button>
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

            <ion-list>
              <ion-list-header>Tutorial</ion-list-header>
              <ion-menu-toggle autoHide={false}>
                <ion-item href="#tutorial">
                  <ion-icon slot="start" name="hammer"></ion-icon>
                  <ion-label>Mostrar Tutorial</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-nav main><page-tabs/></ion-nav>
      </ion-split-pane>
    );
  }

  // TODO ion-menu should be split out
  render() {
    return (
      <ion-app>
        {this.loggedIn ? [
          // this.renderRouter(),
          this.renderSplitPane()
        ] : (
          <app-entrance />
        )}
      </ion-app>
    );
  }
}
