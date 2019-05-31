import { Component, Element, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
// import { UserData } from '../../providers/user-data';

@Component({
  tag: 'generic-carousel',
  styleUrl: 'carousel.css',
})
export class Carousel {
  @Element() el: HTMLElement;
  @Prop({ connect: 'ion-menu-controller' }) menuCtrl: HTMLIonMenuControllerElement;
  @Prop({ connect: 'ion-nav' }) navCtrl: HTMLIonNavElement;
  @Prop({ context: 'store' }) store: Store;
  // @Prop() action: any;

  async componentDidLoad() {
    // UserData.hasSeenTutorial(true);
    // const menuCtlr: HTMLIonMenuControllerElement = await (this.menuCtrl as any).componentOnReady();
    // menuCtlr.enable(false);
    setTimeout(() => this.el.querySelector('ion-slides').update(), 100);
  }

  /*unload(event: any) {
    event.preventDefault();
    this.action();
  }*/

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar color="light">
          <ion-buttons slot="end">
            {/*<ion-button color="primary" href="#" onClick={(e) => this.unload(e)}>Sair</ion-button>*/}
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content scrollY={false}>
        <ion-slides pager={false}>
          <slot name="slide1"/>
          <slot name="slide2"/>
          <slot name="slide3"/>
          <slot name="slide4"/>
        </ion-slides>
      </ion-content>
    ];
  }
}
