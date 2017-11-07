import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private items: AboutItem[] = [{
    name: "软件名称",
    value: "星加酒店Job",
    linkPage: ""
  }, {
    name: "软件版本",
    value: "1.0.1",
    linkPage: ""
  }, {
    name: "公司名称",
    value: "上海金代软件开发有限公司",
    linkPage: ""
  }, {
    name: "软件协议",
    value: "",
    linkPage: "ProtocolPage"
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(pageName: string) {
    if (!pageName || pageName.length == 0) {
      return;
    }
    this.navCtrl.push(pageName);
  }
}

class AboutItem {
  name: string;
  value: string;
  linkPage: string;
}
