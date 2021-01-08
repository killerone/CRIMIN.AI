import { Injectable, NgZone } from "@angular/core";
import { User } from "src/app/services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: any;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  SignIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email, password, department, username) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
        // this.SendVerificationMail();
        result.user["department"] = department;
        result.user["username"] = username;
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email-address"]);
    });
  }

  SetUserData(user) {
    console.log(user);

    const userData = {
      email: user.email,
      department: user.department,
      username: user.username,
      isAdmin: false,
    };

    return this.db.list("users").set(user.uid, userData);
  }

  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    });
  }
}
