import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

import { OrderViewModel } from '../../view-model/order-model';
import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the MyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage {

  private noRecords: boolean = true;
  private whyEmpty: string = "正在获取订单";
  private orders: OrderViewModel[] = [];
  private ordersCache: OrderViewModel[] = [];
  private user: UserViewModel;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) {
  }

  ngOnInit(): void {
    console.log("MyOrderPage ngOnInit");

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getList(null);
    });
  }

  getList(refresher): void {
    let personGUID = this.user.GUID;
    this.baseHttp.get<OrderViewModel[]>(this.urlConfig.employeeConfig.myOrderUrl + personGUID)
      .then(
      (res) => {
        console.log("MyOrderPage order: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有订单");
        } else {
          this.showResult(false, "已获取订单");
          // this.orders = res;
          // this.ordersCache = res;
        }
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      });
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noRecords = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {//: Promise<any> {
    this.showResult(true, "获取订单失败");
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getList(refresher);
  }

  showItemDetails(item: OrderViewModel): void {
    // this.navCtrl.push("ApplyDetailsPage", item);
  }

  finishOrder(order: OrderViewModel): void {
    this.askFinishOrder(order);
  }

  askFinishOrder(order: OrderViewModel): void {
    this.alertCtrl.create({
      title: "提示",
      message: "确认要终止该订单吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.doFinishOrder(order);
        }
      }]
    }).present();
  }

  doFinishOrder(order: OrderViewModel): void {
    console.log("MyOrderPage doFinishOrder");

    //TODO
  }
}
