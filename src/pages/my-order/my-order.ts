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
  private whyEmpty: string = "正在获取工作";
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
    this.baseHttp.get<any>(this.urlConfig.employeeConfig.myOrderUrl + personGUID)
    // this.baseHttp.post<any, OrderViewModel[]>(null, this.urlConfig.employeeConfig.employeeListUrl + personGUID)
      .then(
      (res) => {
        console.log("MyOrderPage order: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有工作");
        } else {
          this.showResult(false, "已获取工作");
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
    this.showResult(true, "获取工作失败");
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getList(refresher);
  }

  finishWork(order: OrderViewModel): void {
    this.openFinishWork(order);
  }

  openFinishWork(order: OrderViewModel): void {
    this.navCtrl.push("FinishWorkPage", { "order": order });
  }
}
