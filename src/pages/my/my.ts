import { Component } from '@angular/core';
import { App, NavController, ToastController, AlertController } from 'ionic-angular';
import { AccountProvider, LoginState, LOGIN_STATE_DEFAULT } from '../../providers/account/account';
import { URL_ROOT } from '../../providers/app-url-config/app-url-config';
import { UserViewModel } from '../../view-model/user-model';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  private userPicDefault: string = "assets/img/user_default.png";
  private userAvatar: string = this.userPicDefault;
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

  ionViewDidEnter(): void {
    console.log("MyDetails ionViewDidEnter");
    this.getPersonDetails();
  }

  openPage(pageName: string, pageTitle?: string): void {
    this.navCtrl.push(pageName, pageTitle);
  }

  getPersonDetails(): void {
    this.account.getUserInfo((value) => {
      this.user = value;
      if (this.user.Icon) {
        this.userAvatar = URL_ROOT + "upload/" + this.user.GUID + "/Icon.jpg";
      }
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
      this.app.getRootNav().push(LoginPage);
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
