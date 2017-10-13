import { Component } from '@angular/core';
import { App, NavController, ToastController, AlertController } from 'ionic-angular';
import { AccountProvider, LoginState, LOGIN_STATE_DEFAULT } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  private user: UserViewModel;
  private loginState: LoginState = LOGIN_STATE_DEFAULT;

  constructor(
    private account: AccountProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private app: App,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getPersonDetails();
    this.checkLogin();
  }

  openPage(pageName: string, pageTitle?: string): void {
    this.navCtrl.push(pageName, pageTitle);
  }

  getPersonDetails(): void {
    this.account.getUserInfo((value) => {
      this.user = value;
      console.log("MyDetails: userInfo:: " + JSON.stringify(this.user));
    });
  }

  checkLogin(): void {
    this.account.checkLogin((res) => {
      console.log("MyPage: checkLogin res:: " + res.desc);
      this.loginState = res;
    });
  }

  logout(): void {
    this.askLogout();
  }

  askLogout(): void {
    this.alertCtrl.create({
      title: "提示",
      message: "确认要退出登录吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.doLogout();
        }
      }]
    }).present();
  }

  doLogout() {
    this.account.logout((msg) => {
      this.loginState = LOGIN_STATE_DEFAULT;
      this.showToast(msg);
    });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      duration: 2000,
      position: "top",
      message: msg,
    }).present();
  }
}
