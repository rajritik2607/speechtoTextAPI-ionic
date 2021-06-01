import { Component, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
matches : String[];
result: String;


  constructor(private modalctrl: ModalController, private cdRef:ChangeDetectorRef)  {

  }

  async openSpeechRecModal() {

this.result = null;
let speechModal = await this.modalctrl.create({
  component: ModalPage,
  swipeToClose: true
});
speechModal.onDidDismiss().then((data) => {


  if (data && data.data) {
    this.result = data.data.query; 
    console.log(this.result)
    this.cdRef.detectChanges()
  }
});
await speechModal.present();

  }



}
