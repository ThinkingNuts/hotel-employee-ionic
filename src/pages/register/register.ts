import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { REG_EXP_PHONE } from '../../providers/account/account';

import { UserViewModel } from '../../view-model/user-model';

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

  private registerForm: FormGroup;
  private realName: any;
  private sex: any;
  private phone: any;
  private user: UserViewModel = new UserViewModel();

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.registerForm = formBuilder.group({
      realName: ["", Validators.compose([Validators.required])],
      sex: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])]
    });
    this.realName = this.registerForm.controls['realName'];
    this.sex = this.registerForm.controls['sex'];
    this.phone = this.registerForm.controls['phone'];
  }

  register() {
    console.log('register RegisterPage  ' + this.user.toString());
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
