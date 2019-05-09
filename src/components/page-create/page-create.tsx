import { Component, /*Listen,*/ Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { registerOrder } from '../../actions/customer';

// const omapURL = 'https://nominatim.openstreetmap.org/search?';
const gmapURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

@Component({
  tag: 'page-create',
  styleUrl: 'page-create.css',
})
export class PageCreate {

  @Prop({ connect: 'ion-router' }) nav: any;
  @Prop({ context: 'store' }) store: Store;
  @State() token: any;
  @State() data = {
    job: {
      origin: {},
      destination: {}
    }
  };

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
    /* OpenStreetMap geocoding requests */
    // const res = await fetch(mapURL + 'street=847 Rua Duque de Caxias&city=Porto Alegre&limit=1&format=json');
    // const place = await res.json()[0];
    this.data['job']['scheduledTo'] = document.querySelector('ion-datetime').value;
    const origAddrObj = this.data['job']['origin']['address'];
    const destAddrObj = this.data['job']['destination']['address'];
    const origAddr = origAddrObj['address'] + ', ' + origAddrObj['number'];
    const destAddr = destAddrObj['address'] + ', ' + destAddrObj['number'];
    /* Code for geocoding API on Google Maps */
    const apiKey = 'AIzaSyC8B5IrTvSbGt9Akb5f00CiDmO86RTb1ec';
    const origResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + origAddr);
    const destResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + destAddr);
    const origPlace = (await origResponse.json()).results[0].geometry.location;
    const destPlace = (await destResponse.json()).results[0].geometry.location;
    this.data['job']['origin']['address']['location'] = { lat: origPlace.lat, lng: origPlace.lng };
    this.data['job']['destination']['address']['location'] = { lat: destPlace.lat, lng: destPlace.lng };
    this.registerOrder(this.data, this.token);
  }

  handleAddress(e: any, data: any, type: string) {
    e.preventDefault();
    this.data['job'][type] = data;
  }

  handleFile(files: FileList) {
    this.data['files'] = files;
  }

  // @Listen('ionChange')
  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  handleDescription(e: any) {
    e.preventDefault();
    this.data.job.origin['items'] = [{ description: e.target.value }];
    // console.log(this.data);
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
              <ion-textarea rows={2} name="description" onInput={(e) => this.handleDescription(e)} required></ion-textarea>
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
