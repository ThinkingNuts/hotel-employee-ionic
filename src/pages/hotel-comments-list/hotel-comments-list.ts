import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  private noItem: boolean = true;
  private whyEmpty: string = "正在获取评价";
  private hotelGUID: string;
  private comments: Comments;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.hotelGUID = this.navParams.get("hotelGUID");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelCommentsListPage');
    this.getComments(null);
  }

  getComments(refresher): void {
    this.baseHttp.get<Comments>(this.urlConfig.employeeConfig.hotelCommentsUrl + this.hotelGUID)
      .then(res => {
        console.log("HotelCommentsListPage res: " + JSON.stringify(res));
        if (!res || res.Details.length === 0) {
          this.showResult(true, "当前没有评价");
        } else {
          this.showResult(false, "已获取评价");
          this.comments = res;
        }
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.showResult(true, "获取评价失败");
        this.handleError(error);
      });
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noItem = isEmpty;
    this.whyEmpty = msg;
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getComments(refresher);
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