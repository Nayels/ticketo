import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { Subject } from 'rxjs/Subject';

import { DetailsPageComponent } from "../../receipt-details/details/details";
import { FirebaseProvider } from "../../shared/firebase/firebase.provider";
import { SqliteProvider } from "../../shared/sqlite/sqlite.provider";

@Component({
  selector: 'sg-page-home',
  templateUrl: 'home.html',
  providers: [FirebaseProvider, SqliteProvider]
})
export class HomePageComponent {

  receipt: Object[] = [];
  filteredReceipts: Object[] = [];
  selectedCategory: string;
  selectedCategoryObservable: Subject<string> = new Subject<string>();
  platformAlertShown: boolean = false;

  constructor(
    private alertCtrl : AlertController,
    private firebase: FirebaseProvider,
    public navCtrl: NavController,
    private ofAuth: AngularFireAuth,
    private plt : Platform,
    private sqlite: SqliteProvider
  ) {}

  ionViewDidLoad() {
    this.ofAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.getData();
      }
    });

    this.selectedCategoryObservable.subscribe(category => {
      this.selectedCategory = category;
      if (category != "All receipts") {
        this.filteredReceipts = this.receipt.filter(x => x['category'] == category);
      } else {
        this.filteredReceipts = this.receipt;
      }
    });
  }

  getData() {
    this.getPhoneData();
    this.getFirebaseData();
  }

  getFirebaseData() {
    let self = this;

    this.firebase.getRef().on('value', snapshot => {
      let data = snapshot.val();

      this.receipt = [];

      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          data[key].id = key;
          self.receipt.push(data[key]);
        }
      }

      this.selectedCategoryObservable.next("All receipts");
    });
  }

  getPhoneData() {
    if(this.plt.is('cordova')){
      this.receipt = this.sqlite.getData();
    } else if(!this.platformAlertShown) {
      let alert = this.alertCtrl.create({
        title: 'Platform',
        message: 'You are running on a platform that does not support cordova',
        buttons: ['OK']
      });
      alert.present().then((() => {
        this.platformAlertShown = true;
      }));
    }
  }



  showDetails(id) {
    this.navCtrl.push(DetailsPageComponent, {id: id});
  }

  delete(id) {
    this.firebase.deleteData(id);
    this.sqlite.deleteData(id);
  }

  selectCategory(event) {
    this.selectedCategoryObservable.next(event.category);
  }
}
