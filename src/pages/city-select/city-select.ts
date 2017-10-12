import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AreaViewModel } from '../../view-model/area-model';

/**
 * Generated class for the CitySelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-city-select',
  templateUrl: 'city-select.html',
})
export class CitySelectPage {

  private cities = [{ id: 0, text: "上海" }];
  private areas: AreaViewModel[];
  private callback;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.callback = navParams.get("callback");
  }

  ngOnInit() {
    this.getAreas();
  }

  getAreas(): void {
    this.baseHttp.post<any, AreaViewModel[]>(null, this.urlConfig.employeeConfig.areasInfoUrl)
      .then((response) => {
        console.log("AreaSelector: getAreas:: " + JSON.stringify(response));
        this.areas = response || [];
      })
      .catch(this.handleError);
  }

  selectArea(area): void {
    console.log("CitySelectPage: selectArea:: " + area.text);
    this.callback(area);
    this.navCtrl.pop();
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }
}
