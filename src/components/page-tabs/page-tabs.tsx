import { Component, Method, Prop } from '@stencil/core';

@Component({
  tag: 'page-tabs',
  styleUrl: 'page-tabs.css',
})
export class PageTabs {

  @Prop({ connect: 'ion-menu-controller' }) menuCtrl: HTMLIonMenuControllerElement;
  @Prop({ connect: 'ion-tabs' }) tabCtrl: HTMLIonTabsElement;
  @Prop() role: any;

  async componentDidLoad() {
    const menuCtlr: HTMLIonMenuControllerElement = await (this.menuCtrl as any).componentOnReady();
    menuCtlr.enable(true);
  }

  @Method()
  async select(tab: string) {
    const tabsCtlr: HTMLIonTabsElement = await (this.tabCtrl as any).componentOnReady();
    tabsCtlr.select('tab-' + tab);
  }

  render() {
    console.log(this.role);
    return [
      <ion-tabs>
        <ion-tab tab="tab-map" component="page-map"></ion-tab>
        <ion-tab tab="tab-schedule" component="page-schedule"></ion-tab>
        <ion-tab tab="tab-create" component="page-create"></ion-tab>
        <ion-tab tab="tab-speakers" component="page-speaker-list"></ion-tab>
        <ion-tab tab="tab-about" component="page-about"></ion-tab>

        <ion-tab-bar slot="bottom">
          {this.role === 'CUSTOMER' && [
            <ion-tab-button tab="tab-map">
              <ion-icon name="map"></ion-icon>
              <ion-label>Mapa</ion-label>
            </ion-tab-button>,
            <ion-tab-button tab="tab-create">
              <ion-icon name="cube"></ion-icon>
              <ion-label>Frete</ion-label>
            </ion-tab-button>
          ]}
          {this.role === 'MERCHANT' && [
            <ion-tab-button tab="tab-schedule">
              <ion-icon name="calendar"></ion-icon>
              <ion-label>Agenda</ion-label>
            </ion-tab-button>,
            <ion-tab-button tab="tab-speakers">
              <ion-icon name="cash"></ion-icon>
              <ion-label>Oferta</ion-label>
            </ion-tab-button>
          ]}
          <ion-tab-button tab="tab-about">
            <ion-icon name="information-circle"></ion-icon>
            <ion-label>Sobre</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    ];
  }
}
