import { Component } from '@angular/core';
import { App, NavController, ToastController } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  private user: UserViewModel;
  items: MyItem[] = [{
    content: "个人资料",
    pageName: "PersonDetailsPage"
  }, {
    //   content: "申请记录",
    //   pageName: "ApplyRecordsPage"
    // }, {
    //   content: "我的任务",
    //   pageName: "TaskPage"
    // }, {
    content: "修改密码",
    pageName: "UpdatePwdPage"
  }, {
    content: "关于我们",
    pageName: "AboutPage"
  }];

  constructor(
    private account: AccountProvider,
    private toastCtrl: ToastController,
    private app: App,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getPersonDetails();
  }

  openPage(pageName: string, pageTitle: string): void {
    // this.navCtrl.push(pageName);
    this.app.getRootNav().push(pageName, pageTitle);
  }

  getPersonDetails(): void {
    this.account.getUserInfo((value) => {
      this.user = value;
      console.log("PersonDetails: userInfo:: " + JSON.stringify(this.user));
    });
  }

  logout(): void {
    this.account.logout((msg) => {
      this.showToast(msg);
      this.user = null;
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

class MyItem {
  content: string;
  pageName: string;
}
