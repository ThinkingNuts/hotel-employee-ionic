import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { OrderViewModel } from '../../view-model/order-model';
import { UserViewModel } from '../../view-model/user-model';
import { AreaViewModel } from '../../view-model/area-model';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListPage implements OnInit {

  private noEmployee: boolean = true;
  private whyEmpty: string = "正在获取用工信息";
  private orders: OrderViewModel[] = [];
  private ordersCache: OrderViewModel[] = [];
  private user: UserViewModel;
  private areaNow: AreaViewModel;
  private score: any = {
    star: 3,
    starMap: ["不满意", "还行", "一般", "满意", "很满意"]
  };

  @Input()
  set area(areaInfo: AreaViewModel) {
    this.areaNow = areaInfo;
    console.log("EmployeeListPage: set area: " + JSON.stringify(this.areaNow));
    this.getEmployeeList(areaInfo, null);
  }
  @Input()
  set searchText(text: string) {
    this.orders = this.ordersCache.filter((item) => {
      if (!text) {
        console.log("EmployeeListPage: set searchText: text is empty");
        return true;
      }
      let s: string = "" + item.HotelName + item.AreaName;
      let res = (s.indexOf(text) > -1);
      console.log("res::::: " + res);
      return res;
    });
  }

  constructor(
    private app: App,
    private navCtrl: NavController,
    private navParams: NavParams,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ngOnInit(): void {
    console.log('EmployeeListPage ngOnInit');

    this.account.getUserInfo((value) => {
      this.user = value;
      this.getEmployeeList(this.areaNow, null);
    })
  }

  getEmployeeList(area: AreaViewModel, refresher): void {
    // let url: string = this.urlConfig.employeeConfig.employeeListUrl;
    let url: string = this.urlConfig.employeeConfig.areaEmployeeListUrl;
    // if (area && area.id) {
      url += area.id;
      // url = this.urlConfig.employeeConfig.areaEmployeeListUrl + area.id;
    // }
    // this.baseHttp.postJson<any, OrderViewModel[]>(null, url)
    //   .subscribe(
    this.baseHttp.get<OrderViewModel[]>(url)
      .then(
      (res) => {
        console.log("EmployeeList getEmployeeList res: " + JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有用工信息");
        } else {
          this.showResult(false, "已获取用工信息");
          this.orders = res;
          this.ordersCache = this.orders;
          if (this.user) {
            this.getApplyList();
          }
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

  getApplyList(): void {
    let personGUID = this.user.GUID;
    this.baseHttp.get<ApplyViewModel[]>(this.urlConfig.employeeConfig.applyRecordsUrl + personGUID)
      .then(
      (res) => {
        console.log("EmployeeList getApplyList res: " + JSON.stringify(res));
        if (!res) {
          return;
        }
        this.orders.forEach(item => {
          item.Works.forEach(work => {
            res.forEach(apply => {
              if (work.GUID === apply.Order.GUID) {
                work.IsApplied = true;
              }
            });
          });
        });
      },
      (error) => {
        this.handleError(error);
      });
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
    this.getEmployeeList(this.areaNow, refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.navCtrl.push("EmployeeDetailsPage", {
      "item": item,
      "callback": (state) => {
        return new Promise((resolve, reject) => {
          console.log("EmployeeListPage: callback:: " + state);
          this.getEmployeeList(this.areaNow, null);
        })
      }
    });
  }
}