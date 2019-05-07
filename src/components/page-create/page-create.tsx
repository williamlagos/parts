import { Component, Listen, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { registerOrder } from '../../actions/customer';

const mapURL = ;https://nominatim.openstreetmap.org/search?'

@Component({
  tag: 'page-create',
  styleUrl: 'page-create.css',
})
export class PageCreate {

  @Prop({ connect: 'ion-router' }) nav;
  @Prop({ context: 'store' }) store: Store;
  @State() token;
  @State() data = {};

  registerOrder: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { entrance: { token } } = state;
      return { token };
    });
    this.store.mapDispatchToProps(this, { registerOrder });
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    this.data['customer'] = this.parseJwt(this.token)['_id'];
    const res = await fetch(mapURL + 'street=847 Rua Duque de Caxias&city=Porto Alegre&limit=1&format=json');
    const place = await res.json()[0];
    this.data['address']['location'] = { lat: place.lat, lng: place.lon };
    this.registerOrder(this.data);
    // const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    // console.log('Clicked signup');
    // navCtrl.push('/map', 'root');
  }

  handleAddress(e: any, data: any, type: string) {
    e.preventDefault();
    /* Code for autocomplete API on Google Maps
     * const apiKey = 'AIzaSyC8B5IrTvSbGt9Akb5f00CiDmO86RTb1ec';
     * const urlReq = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=' + apiKey +
     *               '&input=' + e.target.value.split(' ').join('+') + '&type=geocode';
     * fetch(urlReq).then(response => console.log(response)); */
    // this.data[e.target.name] = e.target.value;
    this.data[type] = data;
  }

  handleFile(files: FileList) {
    this.data['files'] = files;
  }

  @Listen('ionChange')
  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Criar Frete</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>

        <form method="POST" action="#" novalidate>
          <ion-list>
            <ion-item>
              <ion-label position="stacked" color="primary">Insira imagens do produto</ion-label>
              <image-uploader send={(files: any) => this.handleFile(files)}/>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Insira o título do seu anúncio</ion-label>
              <ion-input name="title" type="text" onInput={(e) => this.handleInput(e)} required></ion-input>
            </ion-item>
            {/*<ion-text color="danger">
              <p padding-left>Username is required</p>
            </ion-text>*/}

            <ion-item>
              <ion-label position="stacked" color="primary">Descreva a operação que você precisa</ion-label>
              <ion-textarea rows={2} name="description" onInput={(e) => this.handleInput(e)} required></ion-textarea>
            </ion-item>
            {/*<ion-text color="danger">
              <p padding-left>Password is required</p>
            </ion-text>*/}

            <ion-item>
              <ion-label position="stacked" color="primary">Data de saída</ion-label>
              <ion-datetime display-format="MMM DD, YYYY HH:mm" name="scheduledTo"></ion-datetime>
            </ion-item>
            <address-input input={(e: any, d: any) => this.handleAddress(e, d, 'origin')} label="Endereço de saída"/>
            <address-input input={(e: any, d: any) => this.handleAddress(e, d, 'destination')} label="Endereço de chegada"/>
            {/*<ion-item>
              <ion-label position="stacked" color="primary">Selecione categorias</ion-label>
              <ion-chip><ion-label>Trabalho</ion-label></ion-chip>
              <ion-chip><ion-label>Quarto</ion-label></ion-chip>
              <ion-chip><ion-label>Jantar</ion-label></ion-chip>
              <ion-chip><ion-label>Living</ion-label></ion-chip>
              <ion-chip><ion-label>Comercial</ion-label></ion-chip>
              <ion-chip><ion-label>Perecível</ion-label></ion-chip>
              <ion-chip><ion-label>Equipamento</ion-label></ion-chip>
              <ion-chip><ion-label>Eletrônico</ion-label></ion-chip>
            </ion-item>*/}
          </ion-list>

          <div padding>
            <ion-button onClick={async (e) => { await this.handleSubmit(e); }} expand="block">Criar</ion-button>
          </div>
        </form>

      </ion-content>
    ];
  }
}
