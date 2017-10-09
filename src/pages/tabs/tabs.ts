import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

import { InfoListPage } from '../info-list/info-list';
// import { EmployeeListPage } from '../employee-list/employee-list';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

import { UserViewModel } from '../../view-model/user-model';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root = HomePage;
  tab2Root = InfoListPage;
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
    //TODO judge if in login
    // this.storage.ready().then(() => {
    //   this.storage.get("user").then((value) => {
    //     console.log(JSON.stringify(value));
    //     let user: UserViewModel = value;
    this.openPage("LoginPage");
    //   });
    // });
  }

  openPage(pageName: string) {
    this.navCtrl.push(pageName);
  }
}
