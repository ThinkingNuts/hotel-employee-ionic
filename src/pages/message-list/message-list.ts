import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';
import { MessageViewModel } from '../../view-model/message-model';

/**
 * Generated class for the MessageListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
})
export class MessageListPage {

  private noItem: boolean = true;
  private whyEmpty: string = "正在获取消息";
  private user: UserViewModel;
  private messages: MessageViewModel[];

  constructor(
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  ngOnInit(): void {
    console.log("MessageListPage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getMessage(null);
    });
  }

  getMessage(refresher): void {
    let personGUID = this.user.GUID;
    this.baseHttp.get<MessageViewModel[]>(this.urlConfig.userConfig.userMessage + personGUID)
      .then(
      (res) => {
        console.log("MessageListPage order: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有消息");
        } else {
          this.showResult(false, "已获取消息");
          this.messages = res;
        }
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.showResult(true, "获取消息失败");
        this.handleError(error);
      });
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noItem = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }

  showMessage(item: MessageViewModel): void {
    this.navCtrl.push("MessagePage", { "message": item });
  }

  deleteMsg(item) {

  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getMessage(refresher);
  }
}
