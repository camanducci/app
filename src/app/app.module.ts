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
import { AboutPage } from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestProvider } from '../providers/rest/rest';
import { EducationPage } from '../pages/education/education';
import { SigninPage } from '../pages/signin/signin';
import { OneSignal } from '@ionic-native/onesignal';
import { ResultPage } from '../pages/result/result';
import { CashPage } from '../pages/cash/cash';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Ionic2RatingModule } from 'ionic2-rating';

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
    ResultPage,
    CashPage,
    AboutPage
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'bottom',
    scrollAssist: false,    
    autoFocusAssist: false  }),
    HttpModule,
    Ionic2RatingModule 
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
    ResultPage,
    CashPage,
    AboutPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    RestProvider,
    OneSignal,
    LaunchNavigator,
  ]
})

export class AppModule {}
