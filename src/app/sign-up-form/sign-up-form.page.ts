import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-sign-up-form",
  templateUrl: "./sign-up-form.page.html",
  styleUrls: ["./sign-up-form.page.scss"]
})
export class SignUpFormPage implements OnInit {
  username;
  department;
  emails;
  password;
  confirmPassword;

  constructor(
    public alertController: AlertController,
    public NavCtrl: NavController,
    private authservice: AuthService
  ) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Please make sure you have entered the right details",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            this.NavCtrl.navigateForward("/home");
            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() { }

  signUp(){
    this.authservice.SignUp(this.emails,this.password,this.department,this.username);
    this.NavCtrl.navigateForward("/home");
  }
}
