import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  items: MyItem[] = [{
    content: "我的资料",
    pageName: "ToBeDeterminedPage"
  }, {
    content: "申请记录",
    pageName: "ApplyRecordsPage"
  }, {
    content: "我的工单",
    pageName: "TaskPage"
  }, {
    content: "修改密码",
    pageName: "ToBeDeterminedPage"
  }, {
    content: "关于",
    pageName: "ToBeDeterminedPage"
  }];

  constructor(
    private app: App,
    private navCtrl: NavController) { }

  openPage(pageName: string, pageTitle: string): void {
    // this.navCtrl.push(pageName);
    this.app.getRootNav().push(pageName, pageTitle);
  }
}

class MyItem {
  content: string;
  pageName: string;
}
