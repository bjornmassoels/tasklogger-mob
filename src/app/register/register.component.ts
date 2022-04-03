import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import {Router} from "@angular/router";
import {Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm;
  innerHeight: number;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toast: ToastController,
    private platform: Platform
  ){
    this.innerHeight = window.innerHeight;
    this.buildform();
  }
  ionViewWillEnter(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
    });
  }
  buildform(){
    this.registerForm = this.fb.group({
      achternaam: ['',Validators.required],
      voornaam:  ['',Validators.required],
      gebruikersnaam:  ['',Validators.required],
      password:  ['',Validators.required],
      password2:  ['',Validators.required],
      code:  ['',Validators.required],
      email:  ['',Validators.required]
    });
  }

  ngOnInit() {

  }

  async failedToast(text: string) {
    const toast = await this.toast.create({
      message: text,
      duration: 2500,
      cssClass : "toast-custom-class-failed",
      position: 'middle',
      color: 'danger',
      buttons: [
        {
          text: 'Oké',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    toast.present();
  }
  async companyIdToast() {
    const toast = await this.toast.create({
      message: '',
      duration: 2500,
      cssClass : "toast-custom-class-failed",
      position: 'middle',
      color: 'danger',
      buttons: [
        {
          text: 'Oké',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
  async successToast() {
    const toast = await this.toast.create({
      message: 'Uw account werd succesvol aangemaakt. Login met uw logingegevens',
      duration: 2500,
      cssClass : "toast-custom-class-success",
      position: 'middle',
      color: 'success',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }


    submitter(form){
    form.gebruikersnaam = form.gebruikersnaam.trim();
    form.email = form.email.trim();
    form.name = form.voornaam + '' + form.achternaam;
    this.user = form as User;
      if(this.registerForm.invalid){
        this.failedToast('Gelieve alle velden in te vullen.');
        return;
      }
      if(form.gebruikersnaam.includes(' ')){
      this.failedToast('Uw gebruikersnaam mag geen spaties bevatten.');
      return;
    }
    if(this.user.password.length < 6){
      this.failedToast('Uw wachtwoord moet minimaal 6 tekens bevatten.');
      return;
    }
    if(this.user.password !== this.user.password2){
      this.failedToast("De ingegeven wachtwoorden komen niet overeen.");
      return;
    }
    this.apiService.addUser(this.user).subscribe(async x =>{
          if(x === 'companyid'){
            this.failedToast('Uw bedrijfscode klopt niet, vraag dit even na bij uw werkgever.');
          }
          else if(x === 'email') {
            this.failedToast('Deze email is alreeds in gebruik.');
          } else if(x === 'gebruikersnaam'){
            this.failedToast('Deze gebruikersnaam is alreeds in gebruik.');
          } else if(x === 'succes'){
            this.successToast();
            await this.router.navigate(['/login']);
          }
      });
    }

  presentAlert() {
    this.router.navigate(['/login']);
  }
}


