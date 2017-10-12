import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { UserViewModel } from '../../view-model/user-model';
import { AccountProvider, REG_EXP_PHONE } from '../../providers/account/account';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginForm: FormGroup;
  private phone: any;
  private password: any;
  private user: UserViewModel = new UserViewModel();

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage,
    private account: AccountProvider) {
    this.loginForm = formBuilder.group({
      phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])],
      password: ["", Validators.compose([Validators.required])]
    });
    this.phone = this.loginForm.controls['phone'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit(): void {
    this.account.getUserInfo((userInfo) => {
      console.log("LoginPage: userInfo:: " + JSON.stringify(userInfo));

      if (userInfo) {
        this.user.Phone = userInfo.Phone;
        this.user.Pwd = userInfo.Pwd || "123";
      }
    });
  }

  login(value) {
    let phone = value.phone;
    let password = value.password;
    console.log("LoginPage: login phone: " + phone + ", pwd: " + password);

    this.user.Phone = phone;
    this.user.Pwd = password;
    let _this = this;
    this.account.login(this.user, (state, message) => {
      console.log("LoginPage: in login callback");
      _this.toastCtrl.create({
        duration: 1500,
        position: "top",
        message: message,
      }).present();
      if (state) {
        _this.navCtrl.pop();
      }
    });
  }

  gotoRegister(): void {
    console.log('gotoRegister');
    this.navCtrl.push("RegisterPage");
  }
}
