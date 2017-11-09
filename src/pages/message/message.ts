import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';
import { UserViewModel } from '../../view-model/user-model';
import { MessageViewModel } from '../../view-model/message-model';

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
    console.log("MessagePage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getMessage();
    });
  }

  getMessage(): void {
    let personGUID = this.user.GUID;
    this.baseHttp.get<MessageViewModel[]>(this.urlConfig.userConfig.userMessage + personGUID)
      .then(
      (res) => {
        console.log("MessagePage order: " + JSON.stringify(res));
        this.messages = res;
      },
      (error) => {
        this.handleError(error);
      });
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }

  deleteMsg(item) {

  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getMessage();
  }
}
