import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  private loginForm: FormGroup;
  private username: any;
  private password: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    private account: AccountProvider) {
    this.loginForm = formBuilder.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(6)])]
    })
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

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

  login(value) {
    console.log("LoginPage: login userName: " + value.username + ", pwd: " + value.password);

    this.user.Name = value.username;
    this.user.Pwd = value.password;
    let _this = this;
    this.account.login(this.user, (isOk) => {
      console.log("LoginPage: in login callback");
      let toast = _this.toastCtrl.create({
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
