import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router } from '@angular/router';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email;
  department;
  username;
  imageUrl;
  constructor(
    public NavCtrl: NavController,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.user.subscribe(current => {
      // console.log(current.uid);
      this.db.object("users/" + current.uid).valueChanges().subscribe(user => {
        console.log(user);
        this.email = user["email"];
        this.department = user["department"];
        this.username = user["username"];
        this.imageUrl = user["imageUrl"];
      });
    })
  }

  EditProfile() {
    this.NavCtrl.navigateForward("/edit-profile");
  }

  ChangePassword() {
    this.NavCtrl.navigateForward("/change-password");
  }

}
