import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  clearCache(): void {
    this.alertCtrl.create({
      title: "确认清除缓存？",
      buttons: [{ text: "取消" },
      {
        text: "确定",
        handler: () => {
          // TODO add real clear-cache
          setTimeout(() => {
            this.toastCtrl.create({
              message: "缓存已清除",
              position: "top",
              duration: 2000
            }).present();
          }, 2000);
        }
      }
      ]
    }).present();
  }
}
