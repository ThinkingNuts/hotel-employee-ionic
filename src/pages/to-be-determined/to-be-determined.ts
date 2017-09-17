import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ToBeDeterminedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-to-be-determined',
  templateUrl: 'to-be-determined.html',
})
export class ToBeDeterminedPage {

  private pageTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.pageTitle = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToBeDeterminedPage');
  }

}
