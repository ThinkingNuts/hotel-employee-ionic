import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the PersonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person-details',
  templateUrl: 'person-details.html',
})
export class PersonDetailsPage {

  private user: UserViewModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonDetailsPage');
  }

  ngOnInit() {
    this.getPersonDetails();
  }

  getPersonDetails(): void {
    let personId = 6;
    this.baseHttp.post<BaseViewModel, JsonResult>(new BaseViewModel,
      this.urlConfig.userConfig.personDetailsUrl + personId)
      .then(d => {
        console.log("PersonDetails:: " + JSON.stringify(d));
        if (d.state == true) {
          this.user = d["data"];
        }
      })
      .catch(this.handleError);
  }
  
  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }
}
