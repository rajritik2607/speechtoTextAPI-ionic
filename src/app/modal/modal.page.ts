import { Component, NgZone } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['modal.page.scss']
})
export class ModalPage {

  matches: String[];
  isRecording = false;
  buttonColor: string = "dark";
  buttonColor1: string = "light";
  buttonIcon: string = "mic";
  textColor: string = "light";
  flag: number = 0;
  inputValue: String = "HI This";
  myVal: string = "Please say your request";
  hideButton:boolean = false;

  constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private modalctrl: ModalController)  {

  }



  tempfunc()
  {

    this.flag = this.flag + 1;
    if(this.flag % 2 == 0)
    {this.hideButton = true;
      this.stopListening()
      this.myVal = "Send Request"

      this.buttonColor = "dark";
      console.log("Stopped listening")

    }
    else
    {
      this.buttonIcon = "mic";
      this.hideButton = false;
      this.startListening()
      this.myVal = "Listening..."
      this.buttonColor = "success";
      console.log("Start Listening")
    }
  }

  startListening() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if(!hasPermission){
        this.speechRecognition.requestPermission()
      }
    });
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(
      matches => {
        this.matches = matches;
        this.cd.detectChanges();
      });
       this.isRecording = true;

  }

  stopListening() {
    this.speechRecognition.stopListening().then(() =>
    { this.isRecording = false
    });
    this.buttonIcon = "send";
  }

  closeFunc() {
    this.modalctrl.dismiss();
  }

  clearFunc(){

    this.buttonIcon = "mic";
    this.matches[0] = "";

  }
  sendFunc(){
    this.modalctrl.dismiss(this.matches[0]);
  }

// Start the recognition process


// Stop the recognition process (iOS only)
//this.speechRecognition.stopListening()

// Get the list of supported languages



// Request permissions
// this.speechRecognition.requestPermission()
  // .then(
  //   () => console.log('Granted'),
  //   () => console.log('Denied')
  // )

  // }

}

