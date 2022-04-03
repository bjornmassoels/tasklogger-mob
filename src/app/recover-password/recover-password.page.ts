import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  wachtwoord1: any;
  wachtwoord2: any;
  code: string;
  id: string;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toast: ToastController

   ){}

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("code");
    this.id = this.route.snapshot.paramMap.get("id");
  }

  async recoverPassword() {
    if(this.wachtwoord1 == null || this.wachtwoord2 == null){
      const toast = await this.toast.create({
        message: 'Wachtwoord is niet ingevuld!',
        duration: 2500,
        color: "danger"
      });
      toast.present();
    } else if(this.wachtwoord1 === this.wachtwoord2){
        this.apiService.recoverPassword(this.wachtwoord1, this.code, this.id).subscribe(async x => {
        const toast = await this.toast.create({
          message: 'Uw wachtwoord is gewijzigd',
          duration: 2500,
          color: "success"
        });
        toast.present();
        this.router.navigate(['login']);
      })
    } else {
      const toast = await this.toast.create({
        message: 'Wachtwoord 1 en wachtwoord 2 zijn niet hetzelfde!',
        duration: 2500,
        color: "danger"
      });
      toast.present();
    }
  }

}
