import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ApiService } from '../../api/api-resource';
import { BaseViewModel } from '../../providers/base-http-service/base-http-service';

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

  private roomList: Room[] = [];
  private pOrderId: number;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.pOrderId = navParams.get("POrderId");
    console.log("pOrderId: " + this.pOrderId);
  }

  ionViewDidLoad() {
    this.getRoomList();
  }

  getRoomList() {
    this.api.getRoomList<Room[]>(this.pOrderId).then(res => {
      this.roomList = res;
    });
  }

  roomStatusChange(room: Room) {
    if (room.RommStatus == 0) {
      room.RommStatus = 1;
    } else if (room.RommStatus == 1) {
      room.RommStatus = 0;
    }
  }

  addRoom() {
    this.api.addRoom<any>({}).then(res => {

    });
  }

  submit() {
    this.api.updateRoomState<any>(this.pOrderId, this.roomList).then(res => {
      this.showToast(res.message);
    });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      duration: 2000,
      position: "top",
      message: msg,
    }).present();
  }
}

class Room {
  CreateTime: string;
  GUID: string;
  Id: number;
  OrderId: number;
  POrderId: number;
  PersonId: number;
  RommStatus: number;
  RoomID: string;
}
