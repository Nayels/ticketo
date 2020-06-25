import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  serviceAccount = require('../../../../firebase.json');
  receiptRef = null;

  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp(this.serviceAccount);
    }
    this.receiptRef = firebase.database().ref('receipt');
  }

  getRef() {
    return this.receiptRef;
  }

  saveData(data, id = null) {
    if (id == null) {
      return this.receiptRef.push(data).key;
    } else {
      let refReceipt = this.receiptRef.child(id);
      refReceipt.update(data);
    }
    return id;
  }

  getData(id) {
    let refReceipt = this.receiptRef.child(id);
    let data = null;
    refReceipt.once("value", function(snapshot) {
      data = snapshot.val();
    }, function (errorObject) {
      console.log(errorObject.code);
    });

    return data;
  }

  deleteData(id) {
    if (id != null) {
      this.receiptRef.child(id).remove(error => {
        return error;
      });
    }

    return false;
  }

}
