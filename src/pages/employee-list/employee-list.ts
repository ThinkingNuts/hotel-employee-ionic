import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListPage implements OnInit {

  private noEmployee: boolean = true;
  private whyEmpty: string = "正在获取用工信息";
  private item0: EmployeeViewModel = new EmployeeViewModel();
  private items: EmployeeViewModel[] = new Array<EmployeeViewModel>();

  constructor(
    private app: App,
    private navCtrl: NavController,
    private navParams: NavParams,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ngOnInit(): void {
    console.log('EmployeeListPage ngOnInit');

    // test code
    // this.noEmployee = false;
    // this.item0.Id = 0;
    // this.item0.Title = "000000000000000000000";
    // this.item0.Num = 10;
    // this.item0.HotelName = "company0";
    // this.item0.ScheduleName = "白班";
    // this.item0.Billing = "￥30/h";
    // this.item0.TimeStr = "xxxxx";
    // this.items.push(this.item0);

    this.getList(null);
  }

  getList(refresher): void {
    this.baseHttp.postJson<EmployeeViewModel, EmployeeViewModel[]>(new EmployeeViewModel(),
      this.urlConfig.employeeConfig.employeeListUrl)
      .subscribe(
      (res) => {
        console.log(res);
        if (!res) {
          this.showResult(true, "当前没有用工信息");
          return;
        }
        this.showResult(false, "已获取用工信息");
        this.items = res;
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
      }
      );
    // .then((response) => {
    //   console.log(response);
    //   if (!response) {
    //     this.showGetFailed();
    //     return;
    //   }
    //   this.noEmployee = false;
    //   this.items = response;
    //   if (refresher) {
    //     refresher.complete();
    //   }
    // })
    // .catch(this.handleError);
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
    this.getList(refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.app.getRootNav().push("EmployeeDetailsPage", item);
  }
}