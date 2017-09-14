import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  content = [{
    content: "我的资料",
    pageName: "MyDetailsPage"
  }, {
    content: "申请记录",
    pageName: "ApplyRecordsPage"
  }, {
    content: "我的工单",
    pageName: "MyEmployeeListPage"
  }, {
    content: "修改密码",
    pageName: "ModifyPasswordPage"
  }, {
    content: "关于",
    pageName: "AboutPage"
  }];

  constructor(
    private app: App,
    private navCtrl: NavController) { }

  openPage(pageName: string): void {
    // this.navCtrl.push(pageName);
    this.app.getRootNav().push(pageName);
  }
}
