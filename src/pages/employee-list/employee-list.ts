import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';

@Component({
  selector: 'page-employee-list',
  templateUrl: 'employee-list.html'
})
export class EmployeeListPage implements OnInit {

  private url: string = "http://123.56.15.145:5000/HotelOrder/List";

  private item0: EmployeeViewModel = new EmployeeViewModel();

  private items: EmployeeViewModel[] = new Array<EmployeeViewModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public baseHttp: BaseHttpServiceProvider) { }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.item0.Id = 0;
    this.item0.Title = "000000000000000000000";
    this.item0.Num = 10;
    this.item0.HotelName = "company0";
    this.item0.ScheduleName = "白班";
    this.item0.Billing = "￥30/h";
    this.item0.TimeStr = "xxxxx";
    this.items.push(this.item0);

    this.postData(null);
  }

  postData(refresher): void {
    this.baseHttp.postJson<EmployeeViewModel, EmployeeViewModel[]>(this.item0, this.url).then((response) => {
      console.log(JSON.stringify(response));
      this.items = response;
      if (refresher) {
        refresher.complete();
      }
    });
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.postData(refresher);
  }

  showItemDetails(item: EmployeeViewModel): void {
    console.log(item);
    this.navCtrl.push("EmployeeDetailsPage", item);
  }
}