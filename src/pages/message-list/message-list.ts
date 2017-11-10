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
        this.messages = res;
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      });
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
