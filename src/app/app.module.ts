import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
//import { Ionic2RatingModule } from 'ionic2-rating';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestProvider } from '../providers/rest/rest';
import { EducationPage } from '../pages/education/education';
import { SigninPage } from '../pages/signin/signin';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { Network } from '@ionic-native/network';
//import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { OneSignal } from '@ionic-native/onesignal';
import {
  GoogleMaps
} from '@ionic-native/google-maps';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    SigninPage,
    EducationPage,
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom',
    scrollAssist: false,    
    autoFocusAssist: false  }),
    HttpModule,
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    LoginPage,
    SigninPage,
    TabsPage,
    ProfilePage,
    EducationPage,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    RestProvider,
    RestProvider,
    OneSignal,
    GoogleMaps,
  ]
})

export class AppModule {}
