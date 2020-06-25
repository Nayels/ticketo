import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CategoryProvider} from "../category.provider";



/**
 * Generated class for the CategoriesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sg-categories',
  templateUrl: 'categories.html',
  providers: [CategoryProvider]
})
export class CategoriesComponent {

  categories: Object[];
  @Input() selCategory: string;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private categoryProvider: CategoryProvider) {
    if (categoryProvider != null) {
      this.categoryProvider.getCategories((categories) => {
        this.categories = categories;
      });
    }
  }

  selectCategory(category) {
    this.selected.emit({
      category: category
    })
  }

  getClass(category) {
    return this.selCategory == category ? "selected" : "";
  }

}
