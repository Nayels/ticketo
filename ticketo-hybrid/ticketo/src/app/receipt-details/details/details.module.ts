import { DetailsPageComponent } from './details';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DetailsPageComponent,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPageComponent),
  ],
})
export class DetailsPageModule {}
