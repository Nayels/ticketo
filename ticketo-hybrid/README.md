# Ticketo
Ticketo is an app that makes it easy to categorise and scan receipts. That way, there is no shoebox or searching around. Just scan and throw away.

## Prerequirements

- NodeJS
- Ionic
- Cordova

## Installation

1. Run het command `npm install`.
2. Run the command `ionic serve` to develop the app in the browser, multiple parts don't work as it meant to be run on a phone.
3. Run the command `ionic cordova build ios/android` which builds IOS of Android.
4. The folder 'platforms' contains IOS/android project.



### Voordelen

- Inkt vervaagt niet van de bonnetjes
- De bonnetjes kunnen in verschillende categorieën gezet worden (automatisch/handmatig?)
- Met behulp van geolocatie is het bekend waar de aankoop was
- Totaalbedragen kunnen berekend worden
- Bonnetjes staan veilig achter een login


### Sensors

- Camera
- Geolocation

## Dependencies

- @angular/common/http
- firebase database to post and fetch data
