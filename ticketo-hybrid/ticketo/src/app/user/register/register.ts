import { AngularFireAuth } from 'angularFire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { LoginPageComponent } from "../login/login";
import { User } from "../../shared/models/User";

/**
 * Generated class for the RegisterPageComponent page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'sg-page-register',
  templateUrl: 'register.html',
})
export class RegisterPageComponent {

  user = { } as User;

  constructor(
    public navCtrl: NavController,
    private ofAuth : AngularFireAuth
  ) {}


  async register(user: User){
    try{
      this.ofAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
        if(result){
          this.navCtrl.setRoot(LoginPageComponent)
        }
      });
    }catch (e) {
      console.log(e)
    }
  }
}
