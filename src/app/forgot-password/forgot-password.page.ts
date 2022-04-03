import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: any;

  constructor
    (
    private apiService: ApiService,
    private router: Router,
    private toast: ToastController
    )
  {}

  ngOnInit() {}


  goBack() {
    this.router.navigate(['/login'])
  }
  async sendPasswordRecover() {
    if (this.email != null ) {
      this.apiService.forgotPassword(this.email).subscribe( async x => {
        const toast = await this.toast.create({
          message: 'Uw email is verzonden! CHECK UW SPAM FOLDER.',
          duration: 2500,
          color: "success"
        });
        toast.present();
        this.goBack();
      });
    } else{
      const toast = await this.toast.create({
        message: 'Vul uw email in!',
        duration: 2500,
        color: "danger"
      });
      toast.present();
    }
  }
}
