import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  ngOnInit() {
    this.getMessage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  getMessage(): void {

  }

  deleteMsg(item) {

  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getMessage();
  }
}
