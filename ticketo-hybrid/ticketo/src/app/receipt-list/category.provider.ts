import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  categories: Object;
  loaded: boolean = false;

  constructor(private http: HttpClient) {}

  getCategories(callback) {
    if (!this.loaded) {
      this.loadCategories((categories) => {
        callback(categories);
      });
      this.loaded = true;
    } else {
      callback(this.categories);
    }
  }

  loadCategories(callback) {
    this.http.get('assets/data/categories.json').subscribe(data => {
      this.categories = data;
      callback(data);
    });
  }

}
