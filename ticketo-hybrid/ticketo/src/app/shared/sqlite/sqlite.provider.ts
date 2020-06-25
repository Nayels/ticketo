import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";


@Injectable()
export class SqliteProvider {

  constructor(private sqlite: SQLite) {}

  getData() {
    let data = [];

    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS receipt(rowid TEXT PRIMARY KEY,title TEXT, category TEXT, image TEXT, creationDate TEXT, total INT, long TEXT, lat TEXT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM receipt ORDER BY rowid DESC', [])
        .then(res => {
          for(let i=0; i<res.rows.length; i++) {
            data.push(
              {
                rowid:res.rows.item(i).rowid,
                title:res.rows.item(i).title,
                category:res.rows.item(i).category,
                image:res.rows.item(i).image,
                creationDate:res.rows.item(i).creationDate,
                total:res.rows.item(i).total,
                long:res.rows.item(i).long,
                lat:res.rows.item(i).lat
              })
          }
        })
        .catch(e => console.log(e));

    }).catch(e => console.log(e));

    return data;
  }

  saveData(data, id) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      console.log(data);
      db.executeSql('INSERT INTO receipt VALUES(?,?,?,?,?,?,?,?)', [id, data.title, data.category, data.image, data.creationDate, data.total, data.long, data.lat])
        .then(res => {
          return 'Data saved';
        })
        .catch(e => {
          return e;
        });
    }).catch(e => {
      return e;
    });
    return '';
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM receipt WHERE rowid=?', [rowid])
        .then(res => true)
        .catch(e => false);
    }).catch(e => false);
  }

}
