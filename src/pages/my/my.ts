import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  content = [{
    content: "我的资料",
    pageName: "MyDetails"
  }, {
    content: "申请记录",
    pageName: "ApplyRecords"
  }, {
    content: "我的工单",
    pageName: "MyEmployeeList"
  }, {
    content: "修改密码",
    pageName: "ModifyPassword"
  }, {
    content: "关于",
    pageName: "About"
  }];

  constructor(public navCtrl: NavController) {

  }

  openPage(pageName: string): void {
    this.navCtrl.push(pageName);
  }
}
