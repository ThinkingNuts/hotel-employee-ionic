import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  page: string = "employee-list";
  private searchText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoListPage');
  }

  searchItems(event: any) {
    this.searchText = event.target.value;
    console.log("InfoListPage: searchItems:: searchText == " + this.searchText);
  }

  selectCity(): void {
    console.log("InfoListPage: selectCity");

  }
}
