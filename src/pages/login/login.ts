import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { UserViewModel } from '../../view-model/user-model';
import { AccountProvider } from '../../providers/account/account';

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
  private user: UserViewModel = new UserViewModel();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage,
    private account: AccountProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  login(phone: string, password: string) {
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

  infoInvalid(userName: string, pwd: string): boolean {
    return this.account.infoInvalid(userName, pwd);
  }
}
