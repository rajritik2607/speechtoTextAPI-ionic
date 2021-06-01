import { Component, ViewChild, ElementRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['modal.page.scss']
})
export class ModalPage {

  @ViewChild('inputText') inputText: IonTextarea;
  matches: String[];
  isRecording = false;
  buttonColor: string = "dark";
  buttonColor1: string = "light";
  textColor: string = "light";
  flag: number = 0;
  inputValue: String = "HI This";
  myVal: string = "Please say your request";
  hideButton:boolean = false;
  hideButton1:boolean = true;
  disableInput: boolean = true;

  constructor(private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private modalctrl: ModalController)  {

  }



  tempfunc()
  {

    this.flag = this.flag + 1;
    if(this.flag % 2 == 0)
    {this.hideButton = true;
      this.hideButton1 = false;
      this.stopListening()
      this.myVal = "Send Request"
      this.buttonColor = "dark";
      console.log("Stopped listening")

    }
    else
    {
      this.hideButton = false;
      this.hideButton1 = true;
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
    console.log(this.matches)

  }

  closeFunc() {
    this.modalctrl.dismiss();
  }

  clearFunc(){
    this.matches[0] = "";
    this.hideButton = false;
      this.hideButton1 = true;
      this.disableInput = true;

  }
  sendFunc(){
    this.modalctrl.dismiss({query: this.matches[0]});
    console.log(this.matches[0])
  }

  enableEdit()
  {
    this.disableInput = false;
    //this.inputText.nativeElement.setFocus(10);
    this.setTextCursor()
    this.cd.detectChanges();
  }
  async setTextCursor() {
    let inputEle = await this.inputText.getInputElement();
    inputEle.setSelectionRange(this.matches[0].length,this.matches[0].length);
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

