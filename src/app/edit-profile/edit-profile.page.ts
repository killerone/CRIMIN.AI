import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  imgURL: any;
  imgPath: string;
  imagePath;
  imageTitle = "Select image"

  department;
  username;
  email;
  user;

  constructor(
    public alertController: AlertController,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public NavCtrl: NavController) { }

  ngOnInit() {
    this.afAuth.user.subscribe(current => {
      // console.log(current.uid);
      this.db.object("users/" + current.uid).snapshotChanges().subscribe(user => {
        this.user = user;
        this.department = user.payload.val()["department"];
        this.username = user.payload.val()["username"];
        this.email = user.payload.val()["email"];
      });
    })
  }

  update() {
    console.log("update")
    const ref = this.storage.ref(this.imageTitle);
    ref.put(this.imagePath[0]).then(a => {
      ref.getDownloadURL().subscribe(path => {
        this.user.payload.ref.set({ imageUrl: path, department: this.department, username: this.username, email:this.email })
        this.NavCtrl.navigateForward("/profile")
      });
    })
  }

  preview(files) {
    console.log(files);
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    this.imageTitle = files[0].name
    reader.onload = (event) => {
      this.imgURL = reader.result;
    }
  }

}
