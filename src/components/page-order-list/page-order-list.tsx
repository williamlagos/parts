import { Component, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';
import { Plugins } from '@capacitor/core';

import { showOrder } from '../../actions/merchant';
import { showMyOrders } from '../../actions/customer';

// import { ConferenceData } from '../../providers/conference-data';
const { Browser } = Plugins;

@Component({
  tag: 'page-order-list',
  styleUrl: 'page-order-list.css'
})
export class PageOrderList {
  mode!: string;
  speakers: any[] = [];
  @State() role: string;
  @State() token: string;
  @State() orders: any[] = [];
  @Prop({ connect: 'ion-action-sheet-controller' }) actionSheetCtrl: HTMLIonActionSheetControllerElement;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement;
  @Prop({ context: 'store' }) store: Store;

  showOrder: Action;
  showMyOrders: Action;

  async componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token } } = state;
      return { token };
    });
    this.role = this.parseJwt(this.token)['_role'];
    if (this.role === 'MERCHANT') {
      this.store.mapStateToProps(this, (state) => {
        const { merchant: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { showOrder });
      await this.showOrder(this.token);
    } else if (this.role === 'CUSTOMER') {
      console.log('YES');
      this.store.mapStateToProps(this, (state) => {
        const { customer: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { showMyOrders });
      await this.showMyOrders(this.token);
    }
    // this.speakers = await ConferenceData.getSpeakers();
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

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  async offer(e: any, order: any) {
    const modal = await this.modalCtrl.create({
      component: 'page-order-detail',
      componentProps: {
        role: this.role,
        userId: this.parseJwt(this.token)._id,
        orderId: e.target.id,
        order
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    // console.log(data);
    // console.log(data.success);
    if (data.success === 0) e.target.disabled = true;
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
              {
                this.orders.map(order => (
                  order.status === 'created' && (
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
                          {
                            this.role === 'MERCHANT' ? (
                              <ion-button id={order._id} expand="full" color="primary" disabled={order.placed} fill="clear" onClick={(e) => this.offer(e, order)}>
                                { order.placed ? 'Frete já ofertado' : 'Ofertar' }
                              </ion-button>
                            ) : (
                              <ion-button id={order._id} expand="full" color="primary" disabled={order.placed} fill="clear" onClick={(e) => this.offer(e, order)}>
                                { order.placed ? 'Frete já selecionado' : 'Ver ofertas' }
                              </ion-button>
                            )
                          }
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
                  )
                ))
              }
            </ion-row>
          </ion-grid>
        </ion-list>
      </ion-content>
    ];
  }
}
