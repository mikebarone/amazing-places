import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";
import {AgmCoreModule} from "@agm/core";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import {PlacesService} from "../services/places";
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3sfkvULzgzy_OqVdV0DuRr5RH-a2iFNc'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService
  ]
})
export class AppModule {}
