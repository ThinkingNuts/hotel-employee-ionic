import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';

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
    this.baseHttp.postJson<EmployeeViewModel, EmployeeViewModel[]>(new EmployeeViewModel(),
      this.urlConfig.employeeConfig.employeeListUrl)
      .subscribe(
      (res) => {
        console.log(res);
        if (!res || res.length === 0) {
          this.showResult(true, "当前没有用工信息");
          return;
        }
        this.showResult(false, "已获取用工信息");
        this.applyRecords = [];
        res.forEach(e => {
          let newApply = new ApplyViewModel();
          newApply.Order = e;
          this.applyRecords.push(newApply);
        });
        this.getApplyList();
        if (refresher) {
          refresher.complete();
        }
      },
      (error) => {
        this.handleError(error);
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
              item.ApplyTime = apply.ApplyTime;
              item.Status = apply.Status;
              item.StatusStr = apply.StatusStr;
            }
          });
        });
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

  showItemDetails(item: ApplyViewModel): void {
    console.log(item);
    this.app.getRootNav().push("EmployeeDetailsPage", item);
  }
}