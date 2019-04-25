import { Component, Element, Prop } from '@stencil/core';
import { UserData } from '../../providers/user-data';

@Component({
  tag: 'page-tutorial',
  styleUrl: 'page-tutorial.css',
})
export class PageTutorial {
  @Element() el: HTMLElement;
  @Prop({ connect: 'ion-menu-controller' }) menuCtrl: HTMLIonMenuControllerElement;
  @Prop({ connect: 'ion-nav' }) navCtrl: HTMLIonNavElement;

  async componentDidLoad() {
    UserData.hasSeenTutorial(true);
    // const menuCtlr: HTMLIonMenuControllerElement = await (this.menuCtrl as any).componentOnReady();
    // menuCtlr.enable(false);
    setTimeout(() => this.el.querySelector('ion-slides').update(), 100);
  }

  async componentWillUnload() {
    // let menu: HTMLIonMenuControllerElement;
    // menu = await this.menuCtrl.componentOnReady();
    // await menu.enable(true);
  }

  async finishTutorial(event: any) {
    event.preventDefault();
    let navi: HTMLIonNavElement;
    navi = await this.navCtrl.componentOnReady();
    await navi.pop();
    console.log('tutorial closed');
  }

  render() {
    return [
      <ion-header no-border>
        <ion-toolbar color="light">
          <ion-buttons slot="end">
            <ion-button color="primary" href="/" onClick={(e) => this.finishTutorial(e)}>Sair</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content scrollY={false}>
        <ion-slides pager={false}>

          <ion-slide>
            <img src="assets/img/ica-slidebox-img-1.png" class="slide-image"/>
            <h2 class="slide-title">
              Bem-vindo ao <b>Frete Fácil</b>
            </h2>
            <p>
              O <b>Frete Fácil</b> é um aplicativo de serviços de mudança e fretagem, simples, prático e rápido.
            </p>
          </ion-slide>

          <ion-slide>
            <img src="assets/img/ica-slidebox-img-2.png" class="slide-image"/>
            <h2 class="slide-title">Por que usar o Frete Fácil?</h2>
            <p>
              <b>Frete Fácil</b> conta com prestadores de entrega e mudança bem selecionados e revisados pela nossa equipe.</p>
          </ion-slide>

          <ion-slide>
            <img src="assets/img/ica-slidebox-img-3.png" class="slide-image"/>
            <h2 class="slide-title">Pago a mais para usar este serviço?</h2>
            <p>
              O aplicativo é <b>100% gratuito</b>, apenas é cobrado o valor que é combinado pela plataforma entre o freteiro e você.</p>
          </ion-slide>

          <ion-slide>
            <img src="assets/img/ica-slidebox-img-4.png" class="slide-image"/>
            <h2 class="slide-title">Pronto para Começar?</h2>
            <ion-button fill="clear" href="#schedule" onClick={(e) => this.finishTutorial(e)}>
              Continuar
              <ion-icon slot="end" name="arrow-forward"></ion-icon>
            </ion-button>
          </ion-slide>

        </ion-slides>
      </ion-content>
    ];
  }
}
