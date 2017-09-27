import { Component, OnInit, Input } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { OrderViewModel } from '../../view-model/order-model';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListPage implements OnInit {

  private noEmployee: boolean = true;
  private whyEmpty: string = "正在获取用工信息";
  private applyRecords: ApplyViewModel[] = [];
  private applyRecordsCache: ApplyViewModel[] = [];
  private orders: OrderViewModel[] = [];
  private ordersCache: OrderViewModel[] = [];

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

    // this.applyRecords = this.applyRecordsCache.filter((item) => {
    //   if (!text) {
    //     console.log("EmployeeListPage: set searchText: text is empty");
    //     return true;
    //   }
    //   let s: string = "" + item.Order.DepartName + item.Order.WorkTypeName + item.Order.Num;
    //   let res = (s.indexOf(text) > -1);
    //   console.log("res::::: " + res);
    //   return res;
    // });
  }

  constructor(
    private app: App,
    private navCtrl: NavController,
    private navParams: NavParams,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ngOnInit(): void {
    console.log('EmployeeListPage ngOnInit');

    this.getEmployeeList(null);
  }

  getEmployeeList(refresher): void {
    this.baseHttp.postJson<EmployeeViewModel, OrderViewModel[]>(new EmployeeViewModel(),
      this.urlConfig.employeeConfig.employeeListUrl)
      .subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有用工信息");
          return;
        }
        this.showResult(false, "已获取用工信息");
        this.orders = res;
        this.orders.push({
          HotelId: 4,
          HotelName: "上海希尔顿",
          AreaId: 5,
          AreaName: "浦东新区",
          Works: [
            {
              HotelId: 2,
              AreaName: "浦东新区",
              AreaId: 5,
              DepartName: "餐饮部",
              HotelName: "上海希尔顿",
              ScheduleName: "白班",
              WorkTypeName: "擦玻璃",
              Num: 12,
              Start: "2017-01-01 12:00:00",
              End: "2017-02-01 12:00:00",
              Billing: "20元/小时",
              Mark: "健康证",
              Id: 14,
              GUID: "9108639cadd6408f9bc0716d557b3f7c",
              TimeStr: "2017-09-25 22:59:22",
              AppliedNum: 1,
              NewApply: 0,
              Title: "",
              ObjectToSerialize: () => {
                return "";
              }
            }
          ],
          ObjectToSerialize: () => {
            return "";
          }
        });
        this.orders.push({
          HotelId: 6,
          HotelName: "上海格林豪泰",
          AreaId: 2,
          AreaName: "杨浦区",
          Works: [
            {
              HotelId: 2,
              AreaName: "杨浦区",
              AreaId: 2,
              DepartName: "客房部",
              HotelName: "上海格林豪泰",
              ScheduleName: "白班",
              WorkTypeName: "清洁工",
              Num: 22,
              Start: "2017-10-01 12:00:00",
              End: "2017-10-08 12:00:00",
              Billing: "80元/间",
              Mark: "健康证",
              Id: 12,
              GUID: "9108639cadd6408f9bc0716d557b3f7c",
              TimeStr: "2017-09-27 22:59:22",
              AppliedNum: 4,
              NewApply: 0,
              Title: "",
              ObjectToSerialize: () => {
                return "";
              }
            }
          ],
          ObjectToSerialize: () => {
            return "";
          }
        });
        this.ordersCache = this.orders;
        // this.applyRecords = [];
        // res.forEach(e => {
        //   let newApply = new ApplyViewModel();
        //   newApply.Order = e;
        //   this.applyRecords.push(newApply);
        // });
        this.getApplyList();
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
    let personId = 6;
    this.baseHttp.postJson<ApplyViewModel, ApplyViewModel[]>(new ApplyViewModel(),
      this.urlConfig.employeeConfig.applyRecordsUrl + personId)
      .subscribe(
      (res) => {
        console.log(res);
        if (!res) {
          return;
        }
        this.applyRecords.forEach(item => {
          res.forEach(apply => {
            if (item.Order.GUID === apply.Order.GUID) {
              item.TotalApply = apply.TotalApply;
              item.ApplyTime = apply.ApplyTime;
              item.Status = apply.Status;
              item.StatusStr = apply.StatusStr;
            }
          });
        });
        this.applyRecordsCache = this.applyRecords;
      },
      (error) => {
        this.handleError(error);
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
    this.getEmployeeList(refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.app.getRootNav().push("EmployeeDetailsPage", item);
  }
}