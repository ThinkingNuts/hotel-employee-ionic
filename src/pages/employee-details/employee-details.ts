import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { BaseViewModel } from '../../providers/base-http-service/base-http-service';

/**
 * Generated class for the EmployeeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-details',
  templateUrl: 'employee-details.html',
})
export class EmployeeDetailsPage implements OnInit {

  private item: EmployeeViewModel = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) {
    this.item = navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailsPage');
  }

  ngOnInit(): void {
    console.log('ngOnInit EmployeeDetailsPage');

  }

  onApply(): void {
    console.log('onApply EmployeeDetailsPage');
    let mOrder = new OrderModule();
    mOrder.PersonId = 2;
    mOrder.OrderId = this.item.Id;
    mOrder.Status = 1;
    mOrder.GUID = this.item.GUID;
    mOrder.Mark = this.item.Mark;
    this.toApply(mOrder);

  }

  toApply(order: OrderModule): void {
    this.baseHttp.post<OrderModule, JsonResult>(order,
      this.urlConfig.employeeConfig.applyUrl).then(
      d => {
        let mes: string = d.message;
        console.log("Register result " + mes);
        this.showApplyResult(d);
      }).catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }

  private showApplyResult(msg: JsonResult): void {
    this.toast.create({
      message: msg.message,
      duration: 2000,
      position: "bottom"
    }).present();
  }
}

export class OrderModule extends BaseViewModel {
  public PersonId: number;
  public OrderId: number;
  public Status: number;
  public Mark: string;
  public GUID: string;

  ObjectToSerialize() {
    return `PersonId=${this.PersonId}&OrderId=${this.OrderId}&Status=${this.Status}&Mark=${this.Mark}
    &GUID=${this.GUID}`;
  }
}
