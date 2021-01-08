import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UiComponent2Page } from './ui-component2/ui-component2.page';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
