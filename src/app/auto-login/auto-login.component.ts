import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import {AlertController, Platform} from "@ionic/angular";
import {Network} from "@ionic-native/network/ngx";
import {SpeedTestService} from "ng-speed-test";

@Component({
    selector: 'app-auto-login',
    templateUrl: './auto-login.component.html',
    styleUrls: ['./auto-login.component.scss']
})
export class AutoLoginComponent {
    email: string;
    password: string;
    hasInternetConnection : boolean;
    isOnThisPage: boolean;
    private hasInternetConnectionPopup: boolean = false;
    hasLoggedIn: boolean = false;
    constructor(
        private nativeStorage: NativeStorage,
        private authService: AuthService,
        private router: Router,
        public formService: FormService,
        private platform: Platform,
        private network: Network,
        private alertController: AlertController,
        private speedTestService: SpeedTestService
    ) {}

    async ionViewWillEnter() {
        this.isOnThisPage = true;
        this.network.onDisconnect().subscribe(() => {
            this.hasInternetConnection = false;
        });
        this.network.onConnect().subscribe(() => {
            this.hasInternetConnection = true;
        });
        this.platform.ready().then( async () => {
            this.formService.isAutoLogin = false;
            await this.checkInternetConnection();
            if(this.hasInternetConnection) {
                this.nativeStorage
                    .getItem('email')
                    .then((data) => {
                        this.email = data.property;
                        this.nativeStorage
                            .getItem('password')
                            .then((data2) => {
                                this.password = data2.property;
                                if (this.email !== '' && this.password !== '') {
                                    this.formService.comingFromAutoLogin = true;
                                    Promise.resolve(
                                        this.authService.login(this.email, this.password)
                                    );
                                    this.isOnThisPage = false;
                                } else {
                                    this.isOnThisPage = false;
                                    this.router.navigate(['/login']);
                                    this.formService.comingFromAutoLogin = false;
                                }
                            })
                            .catch((x) => {
                                this.isOnThisPage = false;
                                this.formService.comingFromAutoLogin = false;
                                this.router.navigate(['/login']);
                            });
                    })
                    .catch((x) => {
                        this.isOnThisPage = false;
                        this.formService.comingFromAutoLogin = false;
                        this.router.navigate(['/login']);
                    });
            } else {
                this.hasInternetConnectionPopup = true;
                while(this.hasInternetConnectionPopup){
                    await this.delay(2000);
                    await this.checkInternetConnection();
                    if(this.hasInternetConnection) {
                        this.nativeStorage
                            .getItem('email')
                            .then((data) => {
                                this.email = data.property;
                                this.nativeStorage
                                    .getItem('password')
                                    .then((data2) => {
                                        this.password = data2.property;
                                        if (this.email !== '' && this.password !== '') {
                                            this.formService.comingFromAutoLogin = true;
                                            Promise.resolve(
                                                this.authService.login(this.email, this.password)
                                            );
                                            this.hasInternetConnectionPopup = false;
                                        } else {
                                            this.hasInternetConnectionPopup = false;
                                            this.router.navigate(['/login']);
                                            this.formService.comingFromAutoLogin = false;
                                        }
                                    })
                                    .catch((x) => {
                                        this.hasInternetConnectionPopup = false;
                                        this.formService.comingFromAutoLogin = false;
                                        this.router.navigate(['/login']);
                                    });
                            })
                            .catch((x) => {
                                this.hasInternetConnectionPopup = false;
                                this.formService.comingFromAutoLogin = false;
                                this.router.navigate(['/login']);
                            });
                    }
                }
            }
        });
    }
    async presentAlert() {
        if(this.isOnThisPage){
            const alert = await this.alertController.create({
                header: 'Verbinding',
                message: 'U heeft geen internetverbinding.',
                buttons: [
                    {
                        text: 'Oké',
                        handler: async () => {}
                    }
                ]
            });
            await alert.present();
        }
    }

    async checkInternetConnection() {
        this.speedTestService.isOnline().subscribe(
            (isOnline) => {
                if(isOnline == true){
                    this.hasInternetConnection = true;
                    return true;
                } else {
                    if(!this.hasInternetConnectionPopup){
                        this.hasInternetConnectionPopup = true;
                        this.presentAlert();
                        return false;
                    }
                }
            }
        );
        await this.delay(300);
    }
    delay(ms: number) {
        return new Promise((resolve) => setTimeout(() => resolve(), ms)).then(() =>
            {}
        );
    }
}
