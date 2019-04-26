import { Component, Element, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { UserData } from '../../providers/user-data';

@Component({
  tag: 'generic-carousel',
  styleUrl: 'carousel.css',
})
export class Carousel {
  @Element() el: HTMLElement;
  @Prop({ connect: 'ion-menu-controller' }) menuCtrl: HTMLIonMenuControllerElement;
  @Prop({ connect: 'ion-nav' }) navCtrl: HTMLIonNavElement;
  @Prop({ context: 'store' }) store: Store;

  async componentDidLoad() {
    UserData.hasSeenTutorial(true);
    // const menuCtlr: HTMLIonMenuControllerElement = await (this.menuCtrl as any).componentOnReady();
    // menuCtlr.enable(false);
    setTimeout(() => this.el.querySelector('ion-slides').update(), 100);
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar color="light">
          <ion-buttons slot="end">
            {/*<ion-button color="primary" href="/" onClick={(e) => this.finishTutorial(e)}>Sair</ion-button>*/}
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content scrollY={false}>
        <ion-slides pager={false}>

          <ion-slide>
            <div class="slide-image-container">
              <img src="assets/img/tour_1_clipper.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">
              Bem-vindo ao <b>Frete Fácil</b>
            </h2>
            <p>
              O <b>Frete Fácil</b> é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido.
            </p>
            <slot name="1"/>
          </ion-slide>

          <ion-slide>
            <div class="slide-image-container">
              <img src="assets/img/tour_2_map.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Por que usar o Frete Fácil?</h2>
            <p>
              <b>Frete Fácil</b> conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe.</p>
              <slot name="2"/>
          </ion-slide>

          <ion-slide>
            <div class="slide-image-container">
              <img src="assets/img/tour_3_payment.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Pago a mais para usar este serviço?</h2>
            <p>
              O aplicativo é <b>100% gratuito</b>, apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você.</p>
              <slot name="3"/>
          </ion-slide>

          <ion-slide>
            <div class="slide-image-container">
              <img src="assets/img/tour_4_start.svg" class="slide-image"/>
            </div>
            <h2 class="slide-title">Pronto para Começar?</h2>
            <slot name="4"/>
          </ion-slide>

        </ion-slides>
      </ion-content>
    ];
  }
}
