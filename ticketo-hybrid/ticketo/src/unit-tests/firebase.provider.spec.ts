import 'reflect-metadata';

import { FirebaseProvider } from '../app/shared/firebase/firebase.provider';

/**
 * Block level variable for assigning the FirebaseProvider to
 *
 */
let firebase: FirebaseProvider;

/**
 * Re-create the FirebaseProvider class object before each
 * unit test is run
 *
 */
beforeEach(() => {
   firebase = new FirebaseProvider();
});

/**
 * Group the unit tests for the FirebaseProvider into one
 * test suite
 *
 */
describe('Firebase Provider', () =>
{
   /**
    * Test that ref from firebase is received
    *
    */
   test('getRef() returns the reference', () =>
   {
      expect.assertions(2);

      let ref = firebase.getRef();

      expect(ref).not.toBe(null);
      expect(ref.constructor.name).toBe('Reference');
   });

   /**
    * Test that data from firebase is received
    *
    */
   test('getData() with nonexisting id returns null', () =>
   {
      expect.assertions(1);

      let data = firebase.getData(1);

      expect(data).toBe(null);
   });
});
