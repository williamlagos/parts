import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'generic-wizard',
  styleUrl: 'wizard.css',
})
export class Wizard {
  @State() step = 1;
  @State() submitted = false;
  @State() needSignup = false;

  @Prop() id: string;
  @Prop() steps: number;
  @Prop() action: any;
  @Prop() images: any;

  next(e: any) {
    e.preventDefault();
    this.step += 1;
    this.step %= this.steps + 1;
  }

  submit(e: any) {
    e.preventDefault();
    this.action(e);
  }

  render() {
    const s = [];
    for (let i = 1; i <= this.steps; i++) s.push(i);
    // console.log(this.step);
    return (
      <form id={this.id} method="POST" action="#" novalidate>
        <ion-list no-lines>
          {s.map((step) => (
            this.step === step ?
            <div><slot name={'step-' + step}/></div> :
            <div style={{ display: 'none' }}><slot name={'step-' + step}/></div>
          ))}
        </ion-list>
        <div padding>
          {this.step === this.steps && <ion-button onClick={(e) => this.submit(e)} expand="block">Registrar</ion-button>}
          {this.step < this.steps && <ion-button onClick={(e) => this.next(e)} expand="block">Próximo</ion-button>}
        </div>
      </form>
    );
  }
}
