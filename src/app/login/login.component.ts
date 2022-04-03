import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { FormService } from '../services/form.service';
import { Project } from '../models/project';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from '../models/company';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  optionToggle = false;
  loginForm: FormGroup;
  hasInternetConnection = true;
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private network: Network,
    private toast: ToastController,
    private nativeStorage: NativeStorage
  ) {
    this.network.onDisconnect().subscribe(() => {
      this.hasInternetConnection = false;
    });
    this.network.onConnect().subscribe(() => {
      this.hasInternetConnection = true;
    });
  }

  ngOnInit() {
    this.formService._hasPaused = false;
    this.buildForm();

   //Promise.resolve(this.authService.login('demo2', 'test1234'));
  }

  ionViewWillEnter() {
    this.email = '';
    this.password = '';
  }

  async login(form) {
    if (this.hasInternetConnection === true) {
      if (form.email !== '' || form.password !== '') {
        Promise.resolve(this.authService.login(form.email, form.password));
      }
    } else {
      const toast = await this.toast.create({
        message: 'U heeft geen internetverbinding!',
        duration: 2500,
        cssClass: 'toast-custom-class-failed-login'
      });
      toast.present();
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop =
      this.myScrollContainer.nativeElement.scrollHeight * 0.25;
  }
  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
