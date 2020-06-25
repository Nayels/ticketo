import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { RegisterPageComponent } from './register';

@NgModule({
  declarations: [
    RegisterPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPageComponent),
  ],
})
export class RegisterPageModule {}
