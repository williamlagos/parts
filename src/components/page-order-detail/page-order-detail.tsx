import { Config } from '@ionic/core';
import { Component, Element, Prop, State } from '@stencil/core';
import { Action, Store } from '@stencil/redux';
// import { ConferenceData } from '../../providers/conference-data';

import { placeOrder } from '../../actions/merchant';
import { selectMerchantForOrder, showOrderBids } from '../../actions/customer';

@Component({
  tag: 'page-order-detail',
  styleUrl: 'page-order-detail.css'
})
export class PageOrderDetail {
  // private speaker: any;

  @Element() el: any;
  @Prop() order: any;
  @Prop() orderId: string;
  @Prop() userId: any;
  @Prop() role: string;
  @Prop({ context: 'config' }) config: Config;
  @Prop({ context: 'store' }) store: Store;
  @State() data = { 'value': 0.0, 'description': '' };
  @State() token: string;
  @State() bids: any;

  placeOrder: Action;
  acceptOrder: Action;
  showOrderBids: Action;
  selectMerchantForOrder: Action;

  async componentWillLoad() {
    // this.speaker = await ConferenceData.getSpeaker('1');
    this.store.mapStateToProps(this, (state) => {
      const {
        session: { token },
        customer: { bids }
      } = state;
      return { token, bids };
    });
    this.store.mapDispatchToProps(this, { placeOrder, showOrderBids, selectMerchantForOrder });
    await this.showOrderBids(this.token, this.orderId);
  }

  dismiss(data?: any) {
    // dismiss this modal and pass back data
    (this.el.closest('ion-modal') as any).dismiss(data === null ? { 'success': 0 } : data);
  }

  offer() {
    const bid = { ...this.data, /*order: this.orderId,*/ user: this.userId };
    this.placeOrder(bid, this.orderId, this.token);
    this.dismiss({ 'success': 0 });
  }

  schedule() {
    const merchants: HTMLIonRadioGroupElement = document.querySelector('#merchants');
    this.selectMerchantForOrder(merchants.value, this.orderId, this.token);
    this.dismiss({ 'success': 0 });
  }

  handleInput(ev: any) {
    ev.preventDefault();
    this.data[ev.target.name] = ev.target.name !== 'description' ?
                              + ev.target.value : ev.target.value;
  }

  render() {
    const mode = this.config.get('mode');
    // console.log(this.order);
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot={mode === 'md' ? 'end' : 'start'}>
            <ion-button onClick={() => this.dismiss()}>Cancelar</ion-button>
          </ion-buttons>

          <ion-title>
            {this.order.title}
          </ion-title>

          {/*<ion-buttons slot="end">
            <ion-button onClick={() => this.applyFilters()} strong>Confirmar</ion-button>
          </ion-buttons>*/}
        </ion-toolbar>
      </ion-header>,
      <ion-content class="outer-content">
        <ion-grid>
          <ion-row>
            <ion-col style={{ 'text-align' : 'center' }} col-10 push-1 col-sm-6 push-sm-3>
            <ion-item>
              {
                this.order.hasOwnProperty('pictures') && this.order.pictures.length > 0 ?
                <img style={{ 'text-align': 'center' }} src={this.order.pictures[0].externalRef} alt="Aqui fica a imagem do pedido"/> :
                <img style={{ 'text-align': 'center' }} alt="Aqui fica a imagem do pedido"/>
              }
              <div style={{ 'text-align' : 'left' }}>
                <p>Origem: { this.order.job.origin.address.street + ', ' + this.order.job.origin.address.number }</p>
                <p>Destino: { this.order.job.destination.address.street + ', ' + this.order.job.destination.address.number }</p>
                <p>
                  {
                  this.order.job.origin.items.length > 1 ?
                  <ion-list>{this.order.job.origin.items.map((item: any) => <ion-item>{item.description}</ion-item>)}</ion-list> :
                  this.order.job.origin.items.length > 0 && this.order.job.origin.items[0].description
                  }
                </p>
              </div>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              {
                this.role === 'MERCHANT' ? (
                  <form style={{ 'width': '100%' }}>
                  <ion-item>
                    <ion-label position="stacked" color="primary">Digite uma observação</ion-label>
                    <ion-textarea name="description" value="" onInput={(e) => this.handleInput(e)}></ion-textarea>
                    </ion-item>
                    <ion-item>
                      <ion-label position="stacked" color="primary">Digite o valor desejado</ion-label>
                      <ion-input name="value" type="number" value="" onInput={(e) => this.handleInput(e)}></ion-input>
                      </ion-item>
                    <ion-button expand="full" color="primary" onClick={() => this.offer()} fill="clear">Ofertar</ion-button>
                  </form>
                ) : (
                  <ion-list>
                    <ion-radio-group id="merchants">
                      <ion-list-header>
                        <ion-label>Selecione a oferta de um freteiro:</ion-label>
                      </ion-list-header>
                      {
                        this.bids.map((bid: any, i: number) => (
                          <ion-item>
                            <ion-label>{bid.user.name} ofereceu R$ {bid.value}</ion-label>
                            <ion-radio slot="start" value={bid.user._id} checked={i === 0} ></ion-radio>
                          </ion-item>
                        ))
                      }
                    </ion-radio-group>
                    <ion-button expand="block" onClick={() => this.schedule()}>Agendar frete</ion-button>
                  </ion-list>
                )
              }
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
