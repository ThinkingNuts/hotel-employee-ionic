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

  private item: MessageViewModel;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.item = this.navParams.get("message");
  }

  ngOnInit(): void {
    console.log("MessagePage ngOnInit");

  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }

}
