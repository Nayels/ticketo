import { AngularFireAuth } from 'AngularFire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import { RegisterPageComponent } from "../register/register";
import { TabsPageComponent } from "../../shared/tabs/tabs";
import { User } from "../../shared/models/User";

@IonicPage()
@Component({
  selector: 'sg-page-login',
  templateUrl: 'login.html',
})
export class LoginPageComponent {

  user = {} as User;

  constructor(
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController) {
  }

  register(){
    this.navCtrl.push(RegisterPageComponent)
  }

  async login(user: User){
    try{
      const result = await this.ofAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(TabsPageComponent)
      }
    }catch (e) {
      console.log(e)
    }
  }
}
