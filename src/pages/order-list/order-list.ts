import { Component, OnInit, Input } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { OrderViewModel } from '../../view-model/order-model';
import { UserViewModel } from '../../view-model/user-model';
import { AreaViewModel } from '../../view-model/area-model';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {

  private searchText: string;
  private areaDefault: AreaViewModel = {
    id: 0,
    text: "上海"
  };
  private area: AreaViewModel = this.areaDefault;
  private noEmployee: boolean = true;
  private whyEmpty: string = "正在获取用工信息";
  private orders: OrderViewModel[] = [];
  private ordersCache: OrderViewModel[] = [];
  private user: UserViewModel;
  private areaNow: AreaViewModel = this.areaDefault;
  private score: any = {
    star: 3,
    starMap: ["不满意", "还行", "一般", "满意", "很满意"]
  };

  // @Input()
  // set area(areaInfo: AreaViewModel) {
  //   this.areaNow = areaInfo;
  //   console.log("EmployeeListPage: set area: " + JSON.stringify(this.areaNow));
  //   this.getOrderList(areaInfo, null);
  // }
  // @Input()
  // set searchText(text: string) {
  //   this.orders = this.ordersCache.filter((item) => {
  //     if (!text) {
  //       console.log("EmployeeListPage: set searchText: text is empty");
  //       return true;
  //     }
  //     let s: string = "" + item.HotelName + item.AreaName;
  //     let res = (s.indexOf(text) > -1);
  //     console.log("res::::: " + res);
  //     return res;
  //   });
  // }

  constructor(
    private app: App,
    private navCtrl: NavController,
    private navParams: NavParams,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ngOnInit(): void {
    console.log('OrderListPage ngOnInit');

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getOrderList(this.areaNow, null);
    })
  }

  searchItems(event: any) {
    this.searchText = event.target.value;
    console.log("OrderListPage: searchItems:: searchText == " + this.searchText);
  }

  switchArea(): void {
    console.log("OrderListPage: selectArea");
    this.openPage("CitySelectPage", {
      "callback": (areaSelected: AreaViewModel) => {
        return new Promise((resolve, reject) => {
          console.log("OrderListPage: callback:: " + areaSelected.text);
          this.area = areaSelected;
          console.log("OrderListPage: set area: " + JSON.stringify(this.areaNow));
          this.getOrderList(this.area , null);
        })
      }
    });
  }

  getOrderList(area: AreaViewModel, refresher): void {
    let url: string = this.urlConfig.employeeConfig.areaWorkPlusUrl;
    url += area.id;
    this.baseHttp.get<OrderViewModel[]>(url)
      .then(
      (res) => {
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有用工信息");
        } else {
          this.showResult(false, "已获取用工信息");
          this.orders = res;
          this.ordersCache = this.orders;
        }
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
        if (refresher) {
          refresher.complete();
        }
      }
      );
  }

  showResult(isEmpty: boolean, msg: string): void {
    this.noEmployee = isEmpty;
    this.whyEmpty = msg;
  }

  handleError(error: any) {//: Promise<any> {
    this.showResult(true, "获取用工信息失败");
    console.log("An error occurred: \n", error);
    // return Promise.reject(error.message || error);
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getOrderList(this.areaNow, refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.navCtrl.push("GrabOrderPage", {
      "item": item,
      "callback": (state) => {
        return new Promise((resolve, reject) => {
          console.log("OrderListPage: callback:: " + state);
          this.getOrderList(this.areaNow, null);
        })
      }
    });
  }

  showHotelComments(hotelGUID: string): void {
    this.navCtrl.push("HotelCommentsListPage", { "hotelGUID": hotelGUID });
  }

  openPage(pageName: string, param?): void {
    this.navCtrl.push(pageName, param);
  }
}
