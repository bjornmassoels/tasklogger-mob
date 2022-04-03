import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormService} from "./services/form.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {ApiService} from "./services/api.service";
import {AutoLoginComponent} from "./auto-login/auto-login.component";
import {FormsModule} from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";


@NgModule({
  declarations: [AppComponent, AutoLoginComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
        FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     FormService,
      AuthGuardService,
      ApiService,
      NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
