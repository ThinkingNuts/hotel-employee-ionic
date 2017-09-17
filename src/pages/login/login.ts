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
    private account: AccountProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit(): void {
    this.account.getUserInfo((userInfo) => {
      if (userInfo) {
        this.user = userInfo;
      }
    });
  }

  login(userName: string, pwd: string): void {
    console.log("LoginPage: login userName: " + userName + ", pwd: " + pwd);

    this.user.Name = userName;
    this.user.Pwd = pwd;
    let _this = this;
    this.account.login(this.user, (isOk) => {
      console.log("LoginPage: in login callback");
      let toast = _this.toastCtrl.create({
        // message: "登录成功",
        duration: 2000,
        position: "top"
      })
      if (isOk) {
        toast.setMessage("登录成功").present();
        _this.navCtrl.pop();
      } else {
        toast.setMessage("登录失败，请检查用户名和密码").present();
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
