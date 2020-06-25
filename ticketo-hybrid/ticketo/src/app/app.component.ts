import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPageComponent } from "./user/login/login";

@Component({
  templateUrl: 'app.html'
})
export class TicketoComponent {
  rootPage: any = LoginPageComponent;

  constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
