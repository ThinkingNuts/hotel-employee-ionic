import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelViewModel } from '../../view-model/hotel-model';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the HotelCommentsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-comments-list',
  templateUrl: 'hotel-comments-list.html',
})
export class HotelCommentsListPage {

  private hotel: HotelViewModel;
  private comments: Comments;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.hotel = this.navParams.get("hotel");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelCommentsListPage');
    this.baseHttp.get<Comments>(this.urlConfig.employeeConfig.hotelCommentsUrl + this.hotel.GUID)
      .then(res => {
        console.log("HotelCommentsListPage res: " + JSON.stringify(res));
        this.comments = res;
      })
  }

}

class Comments {
  Average: number;
  OrderNum: number;
  Total: number;
  Details: CommentDetails[];
}

class CommentDetails {
  CommentTime: string;
  HotelComment: string;
  HotelEvaluate: number;
}