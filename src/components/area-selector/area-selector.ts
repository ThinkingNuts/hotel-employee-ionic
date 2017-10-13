import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

import { AreaViewModel } from '../../view-model/area-model';

/**
 * Generated class for the AreaSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'area-selector',
  templateUrl: 'area-selector.html'
})
export class AreaSelectorComponent {

  private areas: AreaViewModel[] = [];
  private hintMsg: string;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private viewCtrl: ViewController) {
    console.log('Hello AreaSelectorComponent Component');
  }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.baseHttp.post<any, AreaViewModel[]>(null, this.urlConfig.employeeConfig.areasInfoUrl)
      .then((response) => {
        console.log("AreaSelector: getAreas:: " + JSON.stringify(response));
        this.areas = response || [];
        this.areas.push({
          id: 0,
          text: "上海"
        })
      })
      .catch(this.handleError);
  }

  handleError(error: any) {//: Promise<any> {
    this.hintMsg = "获取城市区域失败";
    console.log("An error occurred: \n", error);
  }

  setSelectedItem(selectedItem) {
    this.viewCtrl.dismiss(selectedItem);
  }
}
