import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmployeeListPage } from '../employee-list/employee-list';
import { MyPage } from '../my/my';

/**
 * Generated class for the InfoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info-list',
  templateUrl: 'info-list.html',
})
export class InfoListPage {

  tab1 = EmployeeListPage;
  tab2 = MyPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoListPage');
  }

}
