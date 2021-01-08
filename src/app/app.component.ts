import { Component } from '@angular/core';


import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from "@ionic/angular";

class User {
  constructor(public name) { }
}


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastController: ToastController,
    public NavCtrl: NavController
  ) 
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  Profile() {
    this.NavCtrl.navigateForward("/profile");
  }

  Dashboard() {
    this.NavCtrl.navigateForward("/dashboard");
  }

 
  async showToast(message) {
    const toast = await this.toastController.create({
      color: "medium",
      message: message,
      duration: 700
    });
    toast.present();
  }
}
