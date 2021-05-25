import { Component, NgZone } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {




  constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private modalctrl: ModalController)  {

  }

  changefunc() {
this.modalctrl.create ({
  component: ModalPage
}).then(modalres => {
  modalres.present();
})

  }



}
