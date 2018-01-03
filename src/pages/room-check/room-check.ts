import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RoomCheckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-check',
  templateUrl: 'room-check.html',
})
export class RoomCheckPage {

  private rooms = [
    {
      id: 0,
      finished: true
    },
    {
      id: 1,
      finished: true
    },
    {
      id: 2,
      finished: true
    },
    {
      id: 3,
      finished: false
    },
    {
      id: 4,
      finished: false
    },
    {
      id: 5,
      finished: false
    },
    {
      id: 6,
      finished: false
    },
    {
      id: 7,
      finished: false
    },
    {
      id: 8,
      finished: false
    },
    {
      id: 9,
      finished: false
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCheckPage');
  }

  addRoom() {
    this.rooms.push({
      id: this.rooms.length,
      finished: false
    });
  }
  submit() {
    
  }
}
