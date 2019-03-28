import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'page-create',
  styleUrl: 'page-create.css',
})
export class PageCreate {

  @Prop({ connect: 'ion-router' }) nav;

  async handleSubmit(e) {
    e.preventDefault();
    const navCtrl: HTMLIonRouterElement = await (this.nav as any).componentOnReady();
    console.log('Clicked signup');
    navCtrl.push('/map', 'root');
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

        <form novalidate>
          <ion-list no-lines>
            <ion-item>
              <ion-label position="stacked" color="primary">Insira o título do seu anúncio</ion-label>
              <ion-input name="username" type="text" required></ion-input>
            </ion-item>
            {/*<ion-text color="danger">
              <p padding-left>Username is required</p>
            </ion-text>*/}

            <ion-item>
              <ion-label position="stacked" color="primary">Descreva a operação que você precisa</ion-label>
              <ion-textarea rows={3} name="password" required></ion-textarea>
            </ion-item>
            {/*<ion-text color="danger">
              <p padding-left>Password is required</p>
            </ion-text>*/}

            <ion-item>
              <ion-label position="stacked" color="primary">Insira imagens do produto</ion-label>
              <input name="file" type="file"/>
              {/*<ion-button expand="block" size="small" href="#">Selecionar imagens</ion-button></label>*/}
            </ion-item>

            <ion-item>
              <ion-label position="stacked" color="primary">Selecione categorias</ion-label>
              <ion-chip><ion-label>Trabalho</ion-label></ion-chip>
              <ion-chip><ion-label>Quarto</ion-label></ion-chip>
              <ion-chip><ion-label>Jantar</ion-label></ion-chip>
              <ion-chip><ion-label>Living</ion-label></ion-chip>
              <ion-chip><ion-label>Comercial</ion-label></ion-chip>
              <ion-chip><ion-label>Perecível</ion-label></ion-chip>
              <ion-chip><ion-label>Equipamento</ion-label></ion-chip>
              <ion-chip><ion-label>Eletrônico</ion-label></ion-chip>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Data de saída</ion-label>
              <ion-datetime display-format="MMM DD, YYYY HH:mm"></ion-datetime>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Endereço de saída</ion-label>
              <ion-input name="departure" type="text" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked" color="primary">Endereço de chegada</ion-label>
              <ion-input name="arrival" type="text" required></ion-input>
            </ion-item>
          </ion-list>

          <div padding>
            <ion-button onClick={e => this.handleSubmit(e)}type="submit" expand="block">Criar</ion-button>
          </div>
        </form>

      </ion-content>
    ];
  }
}
