import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'address-input',
  styleUrl: 'address.css',
})
export class AddressInput {
  @Prop() input: any;
  @Prop() label: string;
  @Prop() name: string;
  @State() data = { address: {} };

  address(e: any) {
    e.preventDefault();
    this.data.address[e.target.name] = e.target.value;
    this.input(e, this.data);
  }

  render() {
    return (
      <ion-item>
        <ion-label position="stacked" color="primary">{this.label}</ion-label>
        <ion-grid>
          <ion-row>
            <ion-col size="9">
              <ion-input
                name="address"
                placeholder="Endereço"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
            <ion-col size="3">
              <ion-input
                name="number"
                placeholder="Num."
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                name="compliment"
                placeholder="Complemento"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                name="neighborhood"
                placeholder="Bairro"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="9">
              <ion-input
                name="city"
                placeholder="Cidade"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
            <ion-col size="3">
              <ion-input
                name="state"
                placeholder="UF"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                name="vicinity"
                placeholder="Dica de endereço"
                type="text"
                onInput={(e) => this.address(e)}
                clearInput
                value=""
                required>
              </ion-input>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>
    );
  }
}
