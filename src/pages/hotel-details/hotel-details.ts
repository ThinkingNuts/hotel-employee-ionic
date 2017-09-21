import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotelViewModel } from '../../view-model/hotel-model';

/**
 * Generated class for the HotelDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-details',
  templateUrl: 'hotel-details.html',
})
export class HotelDetailsPage {

  private hotel: HotelViewModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.hotel = navParams.data;
    console.log("HotelDetailsPage: hotel:: " + this.hotel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelDetailsPage');
  }

}
