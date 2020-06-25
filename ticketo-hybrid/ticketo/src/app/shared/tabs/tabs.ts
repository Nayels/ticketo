import { ActionSheetController, NavController, normalizeURL } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular/platform/platform';

import { DetailsPageComponent } from "../../receipt-details/details/details";
import { HomePageComponent } from '../../receipt-list/home/home';
import { MapPageComponent } from "../../map/map/map";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPageComponent {

  tab1Root: any = HomePageComponent;
  tab2Root: any = HomePageComponent;
  tab3Root: any = MapPageComponent;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public navCtrl: NavController,
    private plt : Platform
  ) {}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    };

    this.camera.getPicture(options).then((imageData) => {
      this.navCtrl.push(DetailsPageComponent, {
        base64: normalizeURL(imageData)
      });
    }, (err) => {
      console.log(err)
    });
  }

  openGallery() {
    const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE,
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
     };

     this.camera.getPicture(options).then((imageData) => {
       this.navCtrl.push(DetailsPageComponent, {
         base64: normalizeURL(imageData)
       });
     }, (err) => {
       console.log(err)
     });
  }

  presentActionSheet() {
    if(this.plt.is('cordova')){
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Add receipts',
        buttons: [
          {
            text: 'Open Camera',
            handler: () => {
              this.takePicture();
            }
          },{
            text: 'File from gallery',
            handler: () => {
              this.openGallery();
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              // this.navCtrl.push(DetailsPageComponent, {
              //   base64: "string"
              // });
            }
          }
        ]
      });
      actionSheet.present();
    }
  }
}
