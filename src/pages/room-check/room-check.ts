import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  private finished: boolean;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage,
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.pOrderId = navParams.get("POrderId");
    this.finished = navParams.get("finished");
    console.log("pOrderId: " + this.pOrderId + ", finished: " + this.finished);
  }

  ionViewDidLoad() {
    this.getRoomList(null);
  }

  getRoomList(refresher) {
    this.api.getRoomList<Room[]>(this.pOrderId).then(res => {
      this.roomList = res;
      this.getLocalRooms();
      if (refresher) {
        refresher.complete();
      }
    });
  }

  roomStatusChange(room: Room) {
    console.log(room.RommStatus);
    if (this.finished) {
      return;
    }
    if (room.RommStatus == 0) {
      room.RommStatus = 1;
    } else if (room.RommStatus == 1) {
      room.RommStatus = 0;
    }
    console.log(room.RommStatus);
    this.saveLocalRooms();
  }

  getLocalRooms() {
    this.storage.ready().then(() => {
      this.storage.get("rooms" + this.pOrderId).then(
        (value) => {
          if (value) {
            this.mergeRooms(value as Room[]);
          }
        });
    });
  }

  mergeRooms(localRooms: Room[]) {
    this.roomList.forEach(room => {
      localRooms.forEach(lRoom => {
        if (room.GUID == lRoom.GUID && room.RommStatus != 2 && room.RommStatus != 3) {
          room.RommStatus = lRoom.RommStatus;
        }
      });
    });
    console.log(this.roomList);
  }

  saveLocalRooms() {
    this.storage.ready().then(() => {
      this.storage.set("rooms" + this.pOrderId, this.roomList);
    });
  }

  doRefresh(refresher): void {
    console.log("doRefresh ");
    this.getRoomList(refresher);
  }

  addRoom() {
    let lastRoom = this.roomList[this.roomList.length - 1];
    let newRoom = {
      OrderId: lastRoom.OrderId,
      POrderId: this.pOrderId,
      PersonId: lastRoom.PersonId,
    };
    this.api.addRoom<any>(newRoom).then(res => {
      // this.showToast(res.message);
      if (res.state) {
        this.getRoomList(null);
      }
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
  RoomIndex: number;
}
