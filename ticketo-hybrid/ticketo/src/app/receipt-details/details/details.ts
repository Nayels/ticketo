import { AlertController, App, IonicPage, Navbar, NavController, NavParams, Platform } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Toast } from '@ionic-native/toast';


import { TabsPageComponent } from "../../shared/tabs/tabs";
import {CategoryProvider} from "../../receipt-list/category.provider";
import {FirebaseProvider} from "../../shared/firebase/firebase.provider";
import {GeolocationProvider} from "../../shared/geolocation/geolocation.provider";
import {SqliteProvider} from "../../shared/sqlite/sqlite.provider";
import {DateFormatPipe} from "../DateFormatPipe";
/**
 * Generated class for the DetailsPageComponent page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'sg-page-details',
  templateUrl: 'details.html',
  providers: [FirebaseProvider, CategoryProvider, GeolocationProvider, SqliteProvider]
})
export class DetailsPageComponent {

  data: {
    title: string;
    category: string;
    image: string;
    creationDate: Date;
    total: string;
    long: number;
    lat: number;
  } = {
      title: "",
    category: "",
    image: "",
    creationDate: this.dateFormatPipe.transform(),
    total: "",
    long: 0,
    lat: 0,
  }

  id: string = null;
  editing: boolean = true;
  shouldPopToRoot: boolean = false;

  categories: Object[];

  @ViewChild(Navbar) navBar: Navbar;
  constructor(
    private alertCtrl : AlertController,
    private app: App,
    private dateFormatPipe: DateFormatPipe,
    private categoryProvider: CategoryProvider,
    private firebase: FirebaseProvider,
    private geolocation: GeolocationProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private plt : Platform,
    private sqlite: SqliteProvider,
    private toast: Toast
  ) {

    this.categoryProvider.getCategories((categories) => {
      this.categories = categories;
    });
    this.data.image = navParams.get('base64');
    this.id = navParams.get('id');

    if (this.id != null && this.id != undefined) {
      this.data = this.firebase.getData(this.id);
      this.editing = false;
    } else {
      this.geolocation.getCurrentCoordinations().then((resp) => {
        this.data.long = resp.coords.longitude;
        this.data.lat = resp.coords.latitude;
      });

      this.shouldPopToRoot = true;
    }
  }

  ionViewDidLoad() {
    this.setBackButtonAction();
  }

  //Method to override the default back button action
  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.popToRoot();

      if (this.shouldPopToRoot) {
        this.app.getRootNav().setRoot(TabsPageComponent);
      }
    }
  }


  saveData() {
    this.editing = !this.editing;

    this.saveToFirebase();
    this.saveToPhone();
  }

  saveToFirebase() {
    this.id = this.firebase.saveData(this.data, this.id);
  }

  saveToPhone() {
    if(this.plt.is('cordova')){

      let success = this.sqlite.saveData(this.data, this.id);

    this.toast.show("Saved", '5000', 'center').subscribe(
      toast => {
        if (success == 'Data saved') this.navCtrl.popToRoot();
      }
    );
  } else {
      let alert = this.alertCtrl.create({
        title: 'Platform',
        message: 'SQL Lite does not work on your platform. Saving to Firebase',
        buttons: ['OK']
      });
      alert.present()
    }
  }

}
