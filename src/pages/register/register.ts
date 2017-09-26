import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';

import { UserViewModel } from '../../view-model/user-model';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user: UserViewModel = new UserViewModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  onRegister() {
    console.log('onRegister RegisterPage  ' + this.user.toString());
    this.toRegister();
  }

  toRegister(): void {
    this.baseHttp.post<UserViewModel, JsonResult>(this.user,
      this.urlConfig.userConfig.userRegisterUrl).then(
      d => {
        let msg: string = d.message;
        console.log("Register result " + msg);
        this.toastCtrl.create({
          duration: 1500,
          position: "top",
          message: msg,
        }).present();
        if (d.state) {
          this.goBack();
        }
      }).catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to register: \n", error);
  }

  goBack(): void {
    this.navCtrl.pop();
  }
}
