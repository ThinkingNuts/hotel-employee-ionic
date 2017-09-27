import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { EmployeeViewModel } from '../../view-model/employee-model';
import { ApplyViewModel } from '../../view-model/apply-model';
import { HotelViewModel } from '../../view-model/hotel-model';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

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
  private hotelDetails: HotelViewModel = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private alert: AlertController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) {
    this.item = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailsPage');
  }

  ngOnInit(): void {
    console.log('ngOnInit EmployeeDetailsPage');
    this.getHotelDetails("4e99792d82ee49a8bbe2ec1dc8f2db40");//this.item.HotelId)//this.item.Order.HotelId);
  }

  askApply(): void {
    this.alert.create({
      title: "提示",
      message: "确认要申请吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.onApply();
        }
      }]
    }).present();
  }

  onApply(): void {
    console.log('onApply EmployeeDetailsPage');
    let mOrder = new OrderModule();
    mOrder.PersonId = 6;
    mOrder.OrderId = this.item.Id;
    // mOrder.Status = parseInt(this.item.Status);
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
        this.navCtrl.pop();
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

  showHotelDetails(hotel: HotelViewModel): void {
    if (!hotel) return;
    this.navCtrl.push("HotelDetailsPage", hotel);
  }

  getHotelDetails(hotelId: string | number): void {
    this.baseHttp.post<BaseViewModel, JsonResult>(new BaseViewModel,
      this.urlConfig.employeeConfig.hotelDetailsUrl + hotelId)
      .then(d => {
        console.log("HotelDetails:: " + JSON.stringify(d));
        if (d.state == true) {
          this.hotelDetails = d["data"];
        }
      })
      .catch(this.handleError);
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
