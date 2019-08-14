import { Config } from '@ionic/core';
import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { cancelOrder, selectOrder, showMyOrders, startOrder } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';
import { close } from '../../actions/session';


@Component({
  tag: 'page-schedule',
  styleUrl: 'page-schedule.css',
})
export class PageSchedule {
  excludeTracks: any = [];
  dayIndex = 0;
  scheduleList: HTMLIonListElement;
  fab: HTMLIonFabElement;
  close: Action;
  startOrder: Action;
  cancelOrder: Action;
  selectOrder: Action;
  showMyOrders: Action;
  showCustomerOrders: Action;

  @Element() el: any;
  @State() groups: any = [];
  @State() shownSessions: any = [];
  @State() segment = 'awaiting';
  @State() queryText = '';
  @State() role: string;
  @State() token: string;
  @State() orders: any[] = [];
  @State() scheduleOrders: any[] = [];
  @State() awaitingOrders: any[] = [];
  @State() slided = false;

  @Prop({ context: 'store' }) store: Store;
  @Prop({ context: 'config' }) config: Config;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;
  @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: HTMLIonLoadingControllerElement;
  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: HTMLIonModalControllerElement;
  @Prop({ connect: 'ion-tabs' }) tab: HTMLIonTabsElement;


  async componentWillLoad() {
    this.updateSchedule();
    this.store.mapStateToProps(this, (state) => {
      const { session: { token } } = state;
      return { token };
    });
    this.store.mapDispatchToProps(this, { close });
    this.role = this.parseJwt(this.token)['_role'];
    if (this.role === 'MERCHANT') {
      this.store.mapStateToProps(this, (state) => {
        const { merchant: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { showMyOrders, selectOrder, cancelOrder, startOrder });
    } else if (this.role === 'CUSTOMER') {
      this.store.mapStateToProps(this, (state) => {
        const { customer: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { showCustomerOrders, cancelOrder });
    }
    await this.populateOrders();
  }

  componentDidLoad() {
    this.scheduleList = this.el.querySelector('#scheduleList');
    this.fab = this.el.querySelector('#socialFab');
  }

  async populateOrders() {
    this.role === 'MERCHANT' ? await this.showMyOrders(this.token) : await this.showCustomerOrders(this.token);
    this.scheduleOrders = this.orders.filter((order: any) => order.status === 'accepted');
    this.awaitingOrders = this.orders.filter((order: any) => order.status === 'awaiting_for_confirmation');
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  @Listen('ionChange')
  segmentChanged(event: any) {
    this.segment = event.target.value;
    this.updateSchedule();
  }

  @Listen('ionInput')
  searchbarChanged(event: any) {
    this.queryText = event.target.value;
    console.log(this.queryText);
    this.updateSchedule();
  }

  @Listen('body:ionModalDidDismiss')
  modalDidDismiss(event: CustomEvent) {
    if (event) {
      this.excludeTracks = event.detail.data;
      this.updateSchedule();
    }
  }

  @Listen('body:ionLoadingWillDismiss')
  loadingWillDismiss() {
    this.fab.close();
  }

  async updateSchedule() {
    const data = await ConferenceData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment);
    this.shownSessions = data.shownSessions;
    this.groups = data.groups;

    this.el.forceUpdate();
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: 'page-schedule-filter',
      componentProps: {
        excludedTracks: this.excludeTracks,
      }
    });
    await modal.present();
  }

  async cancelCurrentOrder(orderId: string) {
    await this.cancelOrder(orderId, this.token);
    await this.populateOrders();
    const tabs: HTMLIonTabsElement = await (this.tab as any).componentOnReady();
    tabs.select('tab-drawer');
    this.close();
  }

  async startCurrentOrder(orderId: string) {
    await this.startOrder(orderId, this.token);
    const tabs: HTMLIonTabsElement = await (this.tab as any).componentOnReady();
    tabs.select('tab-drawer');
    this.close();
  }

  async confirmOrder(orderId: string) {
    /*if (UserData.hasFavorite(session.name)) {
      // oops, this session has already been favorited, prompt to remove it
      this.removeFavorite(session, 'Frete confirmado!');
    } else {
      // remember this session as a user favorite
      UserData.addFavorite(session.name);
    }*/

    // create an alert instance
    const alert = await this.alertCtrl.create({
      header: 'Confirmar o frete para o horário?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // close the sliding item
            // this.toggleSlide(orderId);
          }
        },
        {
          text: 'Confirmar',
          handler: async () => {
            this.selectOrder(orderId, this.token);
            await this.populateOrders();
            // close the sliding item
            // this.toggleSlide(orderId);
          }
        }
      ]
    });

    // now present the alert
    alert.present();
  }

  async removeFavorite(session: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            UserData.removeFavorite(session.name);
            this.updateSchedule();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  async openSocial(social: string) {
    this.toggleList();
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${social}`,
      duration: (Math.random() * 1000) + 500
    });

    await loading.present();
  }

  toggleList() {
    const fabButton = this.fab.querySelector('ion-fab-button');
    fabButton.activated = !fabButton.activated;

    const fabList = this.fab.querySelector('ion-fab-list');
    fabList.activated = !fabList.activated;
  }

  async toggleSlide(sliderId: string) {
    const slider: any = document.getElementById(sliderId);
    !this.slided ? await slider.open('end') : await slider.close();
    this.slided = !this.slided;
  }

  render() {
    return [
      <ion-header class="aligned">
        <ion-toolbar class="aligned">
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>

          <ion-segment class="aligned" value={this.segment}>
            <ion-segment-button value="awaiting">
              Aguardando
            </ion-segment-button>
            <ion-segment-button value="schedule">
              Agendados
            </ion-segment-button>
          </ion-segment>

          <ion-buttons slot="end">
            {/*<ion-button onClick={() => this.presentFilter()}>
              <ion-icon slot="icon-only" name="options"></ion-icon>
            </ion-button>*/}
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
      {/*<ion-searchbar value={this.queryText} placeholder="Buscar"></ion-searchbar>*/}
        <ion-list id="scheduleList" hidden={this.shownSessions === 0}>
          {
            (this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).map((order: any) =>
              <ion-item-group>
                {/*<ion-item-divider class="sticky">
                  <ion-label>
                    {group.time}
                  </ion-label>
                </ion-item-divider>

                {order.sessions.map((session: any) =>*/}
                <ion-item-sliding class="item-sliding-track" id={order._id} onClick={() => this.toggleSlide(order._id)}>
                  <ion-item-options side="start">
                    {
                      order.status === 'accepted' && (
                        <ion-item-option color="danger" onClick={() => this.cancelCurrentOrder(order._id)}>
                          Cancelar
                        </ion-item-option>
                      )
                    }
                  </ion-item-options>
                  <ion-item class="item-sliding-track-trabalho" href="#">
                    <ion-label>
                      <h3>{order.job.destination.address.street + ' ' + order.job.destination.address.number}</h3>
                      <p> {order.job.scheduledTo} - {order.job.origin.address.street + ' ' + order.job.origin.address.number}</p>
                    </ion-label>
                  </ion-item>
                  <ion-item-options side="end">
                    {
                      this.role === 'MERCHANT' && (
                        order.status === 'awaiting_for_confirmation' ? (
                          <ion-item-option color="favorite" onClick={() => this.confirmOrder(order._id)}>
                            Confirmar
                          </ion-item-option>
                        ) : (
                          <ion-item-option color="tertiary" onClick={() => this.startCurrentOrder(order._id)}>
                            Começar
                          </ion-item-option>
                        )
                      )
                    }
                  </ion-item-options>
                </ion-item-sliding>
              </ion-item-group>
            )
          }
        </ion-list>

        <ion-list-header hidden={(this.segment === 'awaiting' ? this.awaitingOrders : this.scheduleOrders).length > 0}>
          Não há sessões encontradas
        </ion-list-header>

        {/*<ion-fab id="socialFab" vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button onClick={() => this.toggleList()}>
            <ion-icon name="share"></ion-icon>
          </ion-fab-button>

          <ion-fab-list side="top">
            <ion-fab-button color="vimeo" onClick={() => this.openSocial('Vimeo')}>
              <ion-icon name="logo-vimeo"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="google" onClick={() => this.openSocial('Google+')}>
              <ion-icon name="logo-googleplus"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="twitter" onClick={() => this.openSocial('Twitter')}>
              <ion-icon name="logo-twitter"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="facebook" onClick={() => this.openSocial('Facebook')}>
              <ion-icon name="logo-facebook"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>*/}
      </ion-content>
    ];
  }
}
