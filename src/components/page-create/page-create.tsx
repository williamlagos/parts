import { Component, /*Listen,*/ Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';

import { registerOrder } from '../../actions/customer';
import { close } from '../../actions/session';

// const omapURL = 'https://nominatim.openstreetmap.org/search?';
const gmapURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

@Component({
  tag: 'page-create',
  styleUrl: 'page-create.css',
})
export class PageCreate {

  @Prop({ context: 'store' }) store: Store;
  @Prop({ connect: 'ion-tabs' }) tab: HTMLIonTabsElement;
  @State() descriptions: any[] = [{ description: '' }];
  @State() descriptionsLength = 1;
  @State() directions: any[];
  @State() token: any;
  @State() data = {
    job: {
      origin: {
        items: []
      },
      destination: {}
    }
  };

  open: Action;
  close: Action;
  registerOrder: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const { session: { token, directions } } = state;
      return { token, directions };
    });
    this.store.mapDispatchToProps(this, { registerOrder, close });
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
    const origAddr = origAddrObj['street'] + ', ' + origAddrObj['number'];
    const destAddr = destAddrObj['street'] + ', ' + destAddrObj['number'];
    /* Code for geocoding API on Google Maps */
    const apiKey = 'AIzaSyC8B5IrTvSbGt9Akb5f00CiDmO86RTb1ec';
    const origResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + origAddr);
    const destResponse = await fetch(gmapURL + 'key=' + apiKey + '&address=' + destAddr);
    const origPlace = (await origResponse.json()).results[0].geometry.location;
    const destPlace = (await destResponse.json()).results[0].geometry.location;
    this.data['job']['origin']['address']['location'] = { lat: origPlace.lat, lng: origPlace.lng };
    this.data['job']['destination']['address']['location'] = { lat: destPlace.lat, lng: destPlace.lng };
    this.data.job.origin['items'] = [ ...this.descriptions.slice(0, this.descriptionsLength) ];
    // console.log(this.data);
    this.registerOrder(this.data, this.token);
    const tabs: HTMLIonTabsElement = await (this.tab as any).componentOnReady();
    tabs.select('tab-drawer');
    this.close();
  }

  handleAddress(e: any, data: any, type: string) {
    e.preventDefault();
    this.data['job'][type] = data;
  }

  handleFile(f: FileList) {
    // console.log(files);
    const files = [];
    for (let i = 0; i < f.length; i++) files.push(f[i]);
    this.data['files'] = [ ...files ];
    // console.log(this.data);
  }

  // @Listen('ionChange')
  handleInput(ev: any) {
    this.data[ev.target.name] = ev.target.value;
  }

  handleDescription(e: any) {
    e.preventDefault();
    this.descriptions[this.descriptionsLength - 1] = { description: e.target.value };
    this.descriptions[this.descriptionsLength] = { description: '' };
  }

  addDescription(e: any) {
    e.preventDefault();
    // this.descriptions.push({ description: '' });
    this.descriptionsLength += 1;
  }

  dateInterval() {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = d.getFullYear();
    const yyyy_t = d.getFullYear() + 1;

    const today = yyyy + '-' + mm + '-' + dd;
    const tomorrow = yyyy_t + '-' + mm + '-' + dd;
    return { today, tomorrow };
    // document.write(today);
  }

  render() {
    const { today, tomorrow } = this.dateInterval();
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const monthShortNames = monthNames.map(month => month.slice(0, 3));
    // console.log(`${today} ${tomorrow}`);
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
        {this.directions.slice(-1)[0].component === 'CREATE' &&
        <generic-wizard id="create" steps={4} action={async (e: any) => { await this.handleSubmit(e); }}>
          <div slot="step-1">
            <ion-item>
              <ion-label position="stacked" color="primary">Insira imagens do produto</ion-label>
              <image-uploader send={(files: any) => this.handleFile(files)}/>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Insira o título do seu anúncio</ion-label>
              <ion-input name="title" type="text" value="" clearInput onInput={(e) => this.handleInput(e)} required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Data de saída</ion-label>
              <ion-datetime
                min={today}
                max={tomorrow}
                display-format="MMM DD, YYYY HH:mm"
                value=""
                monthNames={monthNames}
                monthShortNames={monthShortNames}
                cancelText="Cancelar"
                doneText="Confirmar"
                name="scheduledTo"></ion-datetime>
            </ion-item>
          </div>
          <div slot="step-2">
            {
              this.descriptions.map((description: any) => {
                return (
                  <ion-item>
                    <ion-label position="stacked" color="primary">Descreva o item que você precisa carregar</ion-label>
                    <ion-textarea rows={2} name="description" onInput={(e) => this.handleDescription(e)} required value={description['description']}></ion-textarea>
                  </ion-item>
                );
              })
            }
            <ion-button onClick={(e) => this.addDescription(e)}color="tertiary" expand="block">Adicionar outro item</ion-button>
          </div>
          <div slot="step-3">
            <address-input input={(e: any, d: any) => this.handleAddress(e, d, 'origin')} label="Endereço de saída"/>
          </div>
          <div slot="step-4">
            <address-input input={(e: any, d: any) => this.handleAddress(e, d, 'destination')} label="Endereço de chegada"/>
          </div>
        </generic-wizard>
        }

      </ion-content>
    ];
  }
}
