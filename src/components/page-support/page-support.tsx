import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'page-support',
  styleUrl: 'page-support.css',
})
export class PageSupport {
  @State() supportQuestion = {
    valid: false,
    value: null
  };
  @State() submitted = false;

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: HTMLIonAlertControllerElement;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  async componentDidLoad() {
    const toast = await this.toastCtrl.create({
      message: 'O recurso ainda não está funcionando. Aguarde para utilizar.',
      duration: 3000
    });
    toast.present();
  }

  handleSupportQuestion(ev) {
    this.validateQuestion();
    this.supportQuestion = {
      ...this.supportQuestion,
      value: ev.target.value
    };
  }

  validateQuestion() {
    if (this.supportQuestion.value && this.supportQuestion.value.length > 0) {
      this.supportQuestion.valid = true;

      this.supportQuestion = {
        ...this.supportQuestion,
        valid: true
      };

      return;
    }

    this.supportQuestion = {
      ...this.supportQuestion,
      valid: false
    };
  }

  async submit(e) {
    e.preventDefault();
    this.validateQuestion();
    this.submitted = true;

    if (this.supportQuestion.valid) {
      this.supportQuestion = {
        ...this.supportQuestion,
        value: ''
      };

      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'A requisição de suporte foi enviada.',
        duration: 3000
      });
      toast.present();
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  ionViewCanLeave() {
    // If the support message is empty we should just navigate
    if (!this.supportQuestion.value || this.supportQuestion.value.trim().length === 0) {
      return true;
    }

    // return new Promise((resolve: any, reject: any) => {
    //   const alert = this.alertCtrl.create({
    //     title: 'Leave this page?',
    //     message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
    //     buttons: [
    //       { text: 'Stay', handler: reject },
    //       { text: 'Leave', role: 'cancel', handler: resolve }
    //     ]
    //   });

    //   alert.present();
    // });
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title>Ajuda</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <div class="support-logo">
          <img src="assets/img/appicon.svg" alt="Ionic Logo"/>
        </div>

        <form novalidate>
          <ion-list no-lines>
            <ion-item>
              <ion-label position="stacked" color="primary">Entre sua mensagem de feedback para que possamos lhe responder</ion-label>
              <ion-textarea name="supportQuestion" value={this.supportQuestion.value} onInput={(ev) => this.handleSupportQuestion(ev)} rows={6} required></ion-textarea>
            </ion-item>
          </ion-list>

          <ion-text color="danger">
            <p hidden={this.supportQuestion.valid || this.submitted === false} padding-left>
              A mensagem é requerida.
            </p>
          </ion-text>

          <div padding>
            <ion-button onClick={(e) => this.submit(e)} expand="block" type="submit">Enviar</ion-button>
          </div>
        </form>
      </ion-content>
    ];
  }
}
