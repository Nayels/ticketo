import 'reflect-metadata';

import { CategoriesComponent } from '../app/receipt-list/categories/categories';

/**
 * Group the unit tests for the CategoriesComponent into one
 * test suite
 *
 */
describe('Category Component', () =>
{
   /**
    * Test that selecting a category works
    *
    */
   test('selectCategory() emits that a new category is selected', () =>
   {
     let categories = new CategoriesComponent(null);
     categories.selected.subscribe(category => {
       expect(category).toEqual({category:'Food'});
     });
     categories.selectCategory('Food');
   });

   /**
    * Test that selecting a category works
    *
    */
   test('getClass() returns "selected" if the given category is the selected category', () =>
   {
     expect.assertions(2);

     let categories = new CategoriesComponent(null);
     categories.selCategory = 'Entertainment';

     expect(categories.getClass('Food')).toEqual("");
     expect(categories.getClass('Entertainment')).toEqual("selected");
   });
});
