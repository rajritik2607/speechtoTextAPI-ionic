import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component } from '@angular/core';
import { SiriShortcuts } from '@ionic-native/siri-shortcuts/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private siriShortcuts: SiriShortcuts) {}
  siriFunc() {
    this.siriShortcuts.donate({
      persistentIdentifier: 'open-my-app',
      title: 'Open my app',
      suggestedInvocationPhrase: 'Open my app',
      userInfo: { username: 'username' },
      isEligibleForSearch: true,
      isEligibleForPrediction: true,
  })
  .then(() => console.log('Shortcut donated.'))
  .catch((error: any) => console.error(error));

this.siriShortcuts.present({
      persistentIdentifier: 'open-my-app',
      title: 'Open my app',
      suggestedInvocationPhrase: 'Open my app',
      userInfo: { username: 'username' },
  })
  .then(() => console.log('Shortcut added.'))
  .catch((error: any) => console.error(error));

this.siriShortcuts.remove('open-my-app')
  .then(() => console.log('Shortcut removed.'))
  .catch((error: any) => console.error(error));

this.siriShortcuts.removeAll()
  .then(() => console.log('All shortcuts removed removed.'))
  .catch((error: any) => console.error(error));

this.siriShortcuts.getActivatedShortcut()

  }
}

