import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApplyViewModel } from '../../view-model/apply-model';
import { HotelViewModel } from '../../view-model/hotel-model';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

/**
 * Generated class for the ApplyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply-details',
  templateUrl: 'apply-details.html',
})
export class ApplyDetailsPage implements OnInit {

  private item: ApplyViewModel = null;
  private hotelDetails: HotelViewModel = null;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.item = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeDetailsPage');
  }

  ngOnInit(): void {
    console.log('ngOnInit EmployeeDetailsPage');

    this.getHotelDetails(this.item.Order.HotelGUID);
  }

  getHotelDetails(hotelId: string | number): void {
    this.baseHttp.post<any, JsonResult>(null,
      this.urlConfig.employeeConfig.hotelDetailsUrl + hotelId)
      .then(d => {
        console.log("HotelDetails:: " + JSON.stringify(d));
        if (d.state == true) {
          this.hotelDetails = d["data"];
        }
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }
}
