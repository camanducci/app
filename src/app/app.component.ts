import { Component } from '@angular/core';
import { Platform, App, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  lastBack : any;
  constructor(
    platform: Platform, 
    app : App, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    authService: AuthServiceProvider,
    private oneSignal: OneSignal
  ) {

    if(authService.checkAuth())
    {
      this.rootPage = TabsPage;
    }
    else{
      this.rootPage = WelcomePage;
    }

    platform.ready().then(() => {   
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#40af6e');
      splashScreen.hide();
    
      document.addEventListener("deviceready", onDeviceReady, false);
      function onDeviceReady() {
      if(window["plugins"] != undefined){
       let funcaoRetorno = (data) => {
         console.log('Notificações: ' + JSON.stringify(data));
       };
 
       window["plugins"].OneSignal.startInit("9eeb07fb-a591-48b5-a317-8db3bfb59e33","1039724336045")
       .handleNotificationOpened(funcaoRetorno)
       .endInit();
       } 
     }
     
      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNav();
        let activeView: ViewController = nav.getActive();
        if(activeView != null){
          activeView.instance.backButtonAction();
        }
      });
    });
  }
}
