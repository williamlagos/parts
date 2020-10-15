import { Component, Element, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { ConferenceData } from '../../providers/conference-data';
import { cancelOrder, finishOrder, rateOrder, showMyOrders } from '../../actions/merchant';
import { showMyOrders as showCustomerOrders } from '../../actions/customer';
import { open } from '../../actions/session';

declare var google: any;

@Component({
  tag: 'app-map',
  styleUrl: 'map.css',
})
export class Route {
  // private cycle = null;
  private mapData: any;
  private gmapKey = require('../config').env.GOOGLE_MAP_KEY;
  open: Action;
  rateOrder: Action;
  cancelOrder: Action;
  finishOrder: Action;
  showMyOrders: Action;
  showCustomerOrders: Action;

  @State() token: string;
  @State() role: string;
  @State() orders: any[] = [];
  @State() startedOrders: any[] = [];
  @State() finishedOrders: any[] = [];
  @State() hasOrder: boolean;
  @State() hasFinishedOrder: boolean;
  @State() rating: any;
  @State() directions: any[];
  @Prop({ context: 'store' }) store: Store;
  @Element() private el: HTMLElement;

  async componentWillLoad() {
    this.mapData = await ConferenceData.getMap();
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, directions } } = state;
      return { token, directions };
    });
    this.role = this.parseJwt(this.token)['_role'];
    if (this.role === 'MERCHANT') {
      this.store.mapStateToProps(this, (state) => {
        const { merchant: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { open, showMyOrders, cancelOrder, rateOrder, finishOrder });
    } else if (this.role === 'CUSTOMER') {
      this.store.mapStateToProps(this, (state) => {
        const { customer: { orders } } = state;
        return { orders };
      });
      this.store.mapDispatchToProps(this, { open, showCustomerOrders, cancelOrder, rateOrder, finishOrder });
    }
    // this.cycle = setInterval(async () => this.prepareMap(), 30000);
    await this.populateOrders();
    await getGoogleMaps(this.gmapKey);
  }

  async componentDidLoad() {
    // if (this.hasOrder) return;
    await this.populateMap();
  }

  async populateMap() {
    const mapData = this.mapData;
    const mapEle = this.el.querySelector('.map-canvas');
    // console.log(this.mapData);
    // console.log(this.startedOrders[0].job.origin.address.location);
    const map = new google.maps.Map(mapEle, {
      center: this.startedOrders.length > 0 ?
              this.startedOrders[0].job.origin.address.location :
              mapData.find((d: any) => d.center),
      zoom: 16
    });

    mapData.forEach((/*markerData: any*/) => {
      // console.debug(markerData);
      /*const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`
      });*/

      /*const marker = new google.maps.Marker({
        position: markerData,
        map,
        title: markerData.name
      });*/

      /*marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });*/

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }

  async componentWillUpdate() {
    await this.populateOrders(false);
  }

  async populateOrders(update = true) {
    if (update) this.role === 'MERCHANT' ? await this.showMyOrders(this.token) : await this.showCustomerOrders(this.token);
    this.startedOrders = this.orders.filter((order: any) => order.status === 'started');
    // this.awaitingOrders = this.orders.filter((order: any) => order.status === 'awaiting_for_confirmation');
    this.finishedOrders = this.orders.filter((order: any) => order.status === 'finished' && (order.customerRate < 0 || order.merchantRate < 0));
    this.hasOrder = this.startedOrders.length > 0;
    this.hasFinishedOrder = this.finishedOrders.length > 0;
  }

  isEmpty(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  navigate() {
    const gmapUrl = 'https://www.google.com/maps/dir/';
    const j = this.startedOrders[0].job;
    const daddr = `${j.destination.address.street}, ${j.destination.address.number}`;
    const oaddr = `${j.origin.address.street}, ${j.origin.address.number}`;
    window.location.replace(`${gmapUrl}?api=1&travelmode=driving&origin=${oaddr}&destination=${daddr}`);
  }

  async cancelCurrentOrder(orderId: string) {
    await this.cancelOrder(orderId, this.token);
    await this.populateOrders();
    /*if (this.hasOrder) {
      await getGoogleMaps(this.gmapKey);
      await this.populateMap();
    }*/
  }

  async finishCurrentOrder(orderId: string) {
    await this.finishOrder(orderId, this.token);
    await this.populateOrders();

  }

  async rateCurrentOrder(orderId: string) {
    await this.rateOrder(orderId, this.rating, this.token);
    await this.populateOrders();
  }

  toggleStar(ev: any, id: string) {
    ev.preventDefault();
    this.rating = + id.split('-')[1];
    console.log(this.rating);
    for (let i = 1; i <= 5; i++) document.getElementById(`star-${i}`).classList.remove('marked');
    for (let i = 1; i <= this.rating; i++) {
      const cl = document.getElementById(`star-${i}`).classList;
      // !cl.contains('marked') ? cl.add('marked') : cl.remove('marked');
      // console.log(`star-${i}`);
      cl.add('marked');
    }
  }

  render() {
    let oaddr = '';
    let daddr = '';
    const gmapUrl = 'https://www.google.com/maps/embed/v1/directions';
    if (this.hasOrder || this.hasFinishedOrder) {
      const j = this.hasFinishedOrder ? this.finishedOrders[0].job : this.startedOrders[0].job;
      daddr = `${j.destination.address.street}, ${j.destination.address.number}`;
      oaddr = `${j.origin.address.street}, ${j.origin.address.number}`;
    }
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Mapa</ion-title>
        </ion-toolbar>
      </ion-header>,

      <div style={(this.hasOrder || this.hasFinishedOrder) ? { 'display': 'none' } : { 'height': '100%' }} class="map-canvas"></div>,

      <div style={{ 'flex': '1', 'display': 'flex', 'flex-direction': 'column' }}>
        {
          (this.hasOrder || this.hasFinishedOrder) && ([
            <iframe frameborder="0" style={{ border : '0', height: '100%', width: '100%' }}
                    src={`${gmapUrl}?origin=${oaddr}&destination=${daddr}&key=${this.gmapKey}`}>
            </iframe>,
            <div>
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>{this.hasFinishedOrder ? 'Avalie seu frete' : 'Prepare seus itens'}</ion-card-subtitle>
                <ion-card-title>{this.hasFinishedOrder ? 'Frete Concluído' : 'Frete em Andamento'}</ion-card-title>
              </ion-card-header>

              {
                this.hasOrder && ([
                  <ion-card-content>
                    O freteiro está a caminho de {this.startedOrders[0].job.origin.address.street + ', ' + this.startedOrders[0].job.origin.address.number},
                    a partir de {this.startedOrders[0].job.scheduledTo}. Aguarde a chegada do prestador de serviços para começar o frete para o endereço
                    {' ' + this.startedOrders[0].job.destination.address.street + ', ' + this.startedOrders[0].job.destination.address.number}. Contate o
                    {' ' + this.startedOrders[0].merchant.name} pelo telefone {this.startedOrders[0].merchant.phone} ou e-mail {this.startedOrders[0].merchant.email} em caso de necessidade.
                  </ion-card-content>,
                  <div>
                    {
                      this.role === 'MERCHANT' ? (
                        <div style={{ 'display': 'flex', 'padding': '0px 15px' }}>
                          <ion-button style={{ 'flex': '1' }} color="danger" onClick={() => this.cancelCurrentOrder(this.startedOrders[0]._id)}>Cancelar</ion-button>
                          <ion-button style={{ 'flex': '1' }} color="tertiary" onClick={() => this.navigate()}>Navegar</ion-button>
                          <ion-button style={{ 'flex': '1' }} color="success" onClick={() => this.finishCurrentOrder(this.startedOrders[0]._id)}>Concluir</ion-button>
                        </div>
                      ) : (
                          <div style={{ 'display': 'flex', 'padding': '0px 15px' }}>
                            <ion-button style={{ 'flex': '1' }} color="danger" onClick={() => this.cancelCurrentOrder(this.startedOrders[0]._id)} expand="block">Cancelar</ion-button>
                          </div>
                      )
                    }
                  </div>,
                  <br/>
                ])
              }

              {
                this.hasFinishedOrder && ([
                  <ion-card-content>
                    <ion-buttons class="stars">
                      <ion-button id="star-1" onClick={(e: any) => this.toggleStar(e, 'star-1')}></ion-button>
                      <ion-button id="star-2" onClick={(e: any) => this.toggleStar(e, 'star-2')}></ion-button>
                      <ion-button id="star-3" onClick={(e: any) => this.toggleStar(e, 'star-3')}></ion-button>
                      <ion-button id="star-4" onClick={(e: any) => this.toggleStar(e, 'star-4')}></ion-button>
                      <ion-button id="star-5" onClick={(e: any) => this.toggleStar(e, 'star-5')}></ion-button>
                    </ion-buttons>
                  </ion-card-content>,
                  <div style={{ 'display': 'flex', 'padding': '0px 15px' }}>
                    <ion-button style={{ 'flex': '1' }} color="tertiary" onClick={() => this.rateCurrentOrder(this.finishedOrders[0]._id)} expand="block">Enviar</ion-button>
                  </div>,
                  <br/>
                ])
              }
            </ion-card>
            </div>
          ])
        }
      </div>
    ];
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
