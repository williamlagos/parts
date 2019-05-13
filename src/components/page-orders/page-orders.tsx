import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';
import { Plugins } from '@capacitor/core';

import { showOrder } from '../../actions/merchant';

import { ConferenceData } from '../../providers/conference-data';
const { Browser } = Plugins;

@Component({
  tag: 'page-orders',
  styleUrl: 'page-orders.css'
})
export class PageOrders {
  mode!: string;
  speakers: any[] = [];
  @State() token: string;
  @State() orders: any[] = [];
  @Prop({ connect: 'ion-action-sheet-controller' }) actionSheetCtrl: HTMLIonActionSheetControllerElement;
  @Prop({ context: 'store' }) store: Store;

  showOrder: Action;

  async componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const {
        merchant: { orders },
        session: { token }
      } = state;
      return { orders, token };
    });
    this.store.mapDispatchToProps(this, { showOrder });
    this.showOrder(this.token);
    this.speakers = await ConferenceData.getSpeakers();
  }

  goToSpeakerTwitter(speaker: any) {
    console.log('goToSpeakerTwitter', speaker);

    Browser.open({
      url: `https://twitter.com/${speaker.twitter}`
    });
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any)['cordova'] &&
              (window as any)['cordova'].plugins.clipboard
            ) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = this.mode;

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        }
      ]
    });

    actionSheet.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Ofertar</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="outer-content">
        <ion-list>
          <ion-grid fixed>
            <ion-row align-items-stretch>
              {this.orders.map(order => {
               console.log(order.job.origin.items);
               return (
                <ion-col size="12" size-md="6">
                  <ion-card class="speaker-card">
                    <a style={{ 'text-decoration': 'none' }} href={`/speakers/${order.id}`}>
                      {
                        order.pictures.length > 0 ?
                        <img style={{ 'text-align': 'center' }} src={order.pictures[0].externalRef} alt="Aqui fica a imagem do pedido"/> :
                        <img style={{ 'text-align': 'center' }} alt="Aqui fica a imagem do pedido"/>
                      }
                    </a>
                    <ion-card-header>
                      <ion-card-subtitle>{order.job.origin.address.street + ', ' + order.job.origin.address.number}</ion-card-subtitle>
                      <ion-card-title>{order.title}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      {
                        order.job.origin.items.length > 1 ?
                          <ion-list>{order.job.origin.items.map((item: any) => <ion-item>{item.description}</ion-item>)}</ion-list> :
                          order.job.origin.items.length > 0 && order.job.origin.items[0].description
                      }
                    </ion-card-content>

                    {/*<ion-row no-padding justify-content-center>
                      <ion-col size="4" text-left>
                        <ion-button
                          fill="clear"
                          size="small"
                          color="primary"
                          onClick={() => this.goToSpeakerTwitter(order)}>
                          <ion-icon name="logo-twitter" slot="start"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col size="4" text-center>
                        <ion-button
                          fill="clear"
                          size="small"
                          color="primary"
                          onClick={() => this.openSpeakerShare(order)}>
                          <ion-icon name="share-alt" slot="start"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col size="4" text-right>
                        <ion-button
                          fill="clear"
                          size="small"
                          color="primary"
                          onClick={() => this.openContact(order)}>
                          <ion-icon name="chatboxes" slot="start"></ion-icon>
                        </ion-button>
                      </ion-col>
                    </ion-row>*/}
                  </ion-card>
                </ion-col>
              ); })}
            </ion-row>
          </ion-grid>
        </ion-list>
      </ion-content>
    ];
  }
}
