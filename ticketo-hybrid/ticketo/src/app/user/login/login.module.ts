import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { LoginPageComponent } from './login';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(LoginPageComponent),
  ],
})
export class LoginPageModule {}
