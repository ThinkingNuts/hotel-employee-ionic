import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

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
    value: "2.0.3",
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

  constructor(
    private appVersion: AppVersion,
    public navCtrl: NavController,
    public navParams: NavParams) {
    // this.appVersion.getVersionNumber().then(res=>{
    //   this.items[1].value=JSON.stringify(res);
    // });
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
