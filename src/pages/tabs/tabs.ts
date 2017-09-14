import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmployeeListPage } from '../employee-list/employee-list';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

import { UserViewModel } from '../../view-model/user-model';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EmployeeListPage;
  tab3Root = MyPage;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage) { }

  ngOnInit(): void {
    console.log("TabsPage ngOnInit");
    this.checkLogin();
  }

  checkLogin(): void {
    this.storage.ready().then(() => {
      this.storage.get("user").then((value) => {
        console.log(JSON.stringify(value));
        let user: UserViewModel = value;
        this.openPage("LoginPage", user);
      });
    });
  }

  openPage(pageName: string, params) {
    this.navCtrl.push(pageName, params);
  }
}
