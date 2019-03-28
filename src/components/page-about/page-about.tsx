import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'page-about',
  styleUrl: 'page-about.css',
})
export class PageAbout {

  @Prop({ connect: 'ion-popover-controller' }) popoverCtrl: HTMLIonPopoverControllerElement;

  async presentPopover(event: any) {
    const popover = await this.popoverCtrl.create({
      component: 'page-about-popover',
      event
    });
    popover.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Sobre</ion-title>
          {/*<ion-buttons slot="end">
            <ion-button onClick={this.presentPopover.bind(this)}>
              <ion-icon slot="icon-only" name="more"></ion-icon>
            </ion-button>
          </ion-buttons>*/}
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <div class="about-header">
          <img src="assets/img/ionic-logo-white.svg" alt="ionic logo"/>
        </div>
        <div padding class="about-info">
          <h4>Frete Fácil App</h4>

          {/*<ion-list no-lines>
            <ion-item>
              <ion-icon name="calendar" slot="start"></ion-icon>
              <ion-label>Date</ion-label>
              <ion-datetime displayFormat="MMM DD, YYYY" max="2056" value="2047-05-17"></ion-datetime>
            </ion-item>

            <ion-item>
              <ion-icon name="pin" slot="start"></ion-icon>
              <ion-label>Location</ion-label>
              <ion-select>
                <ion-select-option value="madison" selected>Madison, WI</ion-select-option>
                <ion-select-option value="austin">Austin, TX</ion-select-option>
                <ion-select-option value="chicago">Chicago, IL</ion-select-option>
                <ion-select-option value="seattle">Seattle, WA</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>*/}

          <p>
            O aplicativo Frete Fácil veio para facilitar seu dia-a-dia quando está precisando levar objetos,
            de todos os tamanhos de um ponto para o outro, com a seleção dos melhores freteiros da plataforma.
          </p>
        </div>
      </ion-content>
    ];
  }
}
