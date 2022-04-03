import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Company } from '../models/company';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { FormService } from './form.service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string;

  public options = { headers: { 'Content-Type': 'application/json' } };
  public token: BehaviorSubject<Token | undefined> = new BehaviorSubject(
    undefined
  );

  public userId;

  public company_id;

  public role;

  public token$ = this.token.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController,
    private nativeStorage: NativeStorage,
    private formService: FormService
  ) {
    this.authUrl = environment.apiURL + 'auth.login'; // 'http://localhost:4100/api/v1/auth.login';
  }

  async login(email: string, password: string) {
    let inlog = JSON.stringify({
      email: email,
      password: password
    });
    return await fetch(this.authUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: inlog,
      method: 'post'
    })
      .then(async (res) => {
        const userInfo = await res.json();
        this.token.next(userInfo['token']);
        this.company_id = userInfo['company_id'];
        this.role = userInfo['role'];
        this.userId = userInfo['userid'];
        this.nativeStorage.setItem('email', { property: email }).then(
          () => {},
          (error) => console.error('Error storing item', error)
        );
        this.nativeStorage.setItem('password', { property: password }).then(
          () => {},
          (error) => console.error('Error storing item', error)
        );
        if (this.formService.comingFromAutoLogin) {
          this.formService.isAutoLogin = true;
          await this.delay(1000);
          this.formService.isAutoLogin = false;
          this.formService.comingFromAutoLogin = false;
        }
        await this.router.navigate(['/grouphome']);
      })
      .catch(async (err) => {
        if (this.formService.comingFromAutoLogin) {
          await this.router.navigate(['/login']);
        } else {
          console.error('error logging in ' + err);
          const toast = await this.toast.create({
            message: 'Uw email en/of wachtwoord klopt niet.',
            duration: 2500,
            cssClass: 'toast-custom-class-failed-login',

            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {}
              }
            ]
          });
          toast.present();
        }
      });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() => {});
  }

  public isAuthenticated(): boolean {
    if (this.token.value !== undefined) {
      return true;
    } else {
      return false;
    }
  }
}
