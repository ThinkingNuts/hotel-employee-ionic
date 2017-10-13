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
  private user: UserViewModel = new UserViewModel();

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage,
    private account: AccountProvider) {
    this.loginForm = formBuilder.group({
      phone: [this.user.Phone, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])],
      password: [this.user.Pwd, Validators.compose([Validators.required])]
    });
  }

  get phone() { return this.loginForm.get("phone"); }
  get password() { return this.loginForm.get("password"); }

  ngOnInit(): void {
    this.account.getUserInfo((userInfo) => {
      console.log("LoginPage: userInfo:: " + JSON.stringify(userInfo));

      if (userInfo) {
        this.user.Phone = userInfo.Phone;
        this.user.Pwd = userInfo.Pwd || "123";
        this.ngOnChanges();
      }
    });
  }

  ngOnChanges() {
    this.loginForm.reset({
      phone: this.user.Phone,
      password: this.user.Pwd
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
