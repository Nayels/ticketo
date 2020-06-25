import { AngularFireAuthModule } from "AngularFire2/auth";
import { AngularFireModule } from "AngularFire2";
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from "@ionic-native/camera";
import { ErrorHandler, NgModule } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { TicketoComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from "@ionic-native/sqlite";
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from "@ionic-native/toast";

import { ComponentsModule } from "./components.module";
import { DetailsPageComponent } from "./receipt-details/details/details";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { FirebaseProvider } from './shared/firebase/firebase.provider';
import { GeolocationProvider } from './shared/geolocation/geolocation.provider';
import { HomePageComponent } from './receipt-list/home/home';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from "./user/login/login";
import { MapPageComponent } from "./map/map/map";
import { RegisterPageComponent } from './user/register/register';
import { SqliteProvider } from './shared/sqlite/sqlite.provider';
import { TabsPageComponent } from './shared/tabs/tabs';
import {CategoryProvider} from "./receipt-list/category.provider";
import {DateFormatPipe} from "./receipt-details/DateFormatPipe";

@NgModule({
  declarations: [
    DetailsPageComponent,
    HomePageComponent,
    LoginPageComponent,
    MapPageComponent,
    TicketoComponent,
    RegisterPageComponent,
    TabsPageComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(TicketoComponent),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    DetailsPageComponent,
    HomePageComponent,
    LoginPageComponent,
    MapPageComponent,
    TicketoComponent,
    RegisterPageComponent,
    TabsPageComponent
  ],
  providers: [
    Camera,
    CategoryProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    DateFormatPipe,
    Geolocation,
    GeolocationProvider,
    SplashScreen,
    SQLite,
    SqliteProvider,
    StatusBar,
    Toast
  ]
})
export class AppModule {}
