import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: UserViewModel;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private storage: Storage) {
    this.user = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(userName: string, pwd: string): void {
    console.log("login userName: " + userName + ", pwd: " + pwd);
    if (this.infoInvalid(userName, pwd)) return;

    this.user.name = userName;
    this.user.password = pwd;
    // TODO login, and move lines below to callback when login successfully
    this.saveUserInfo();
    this.navCtrl.pop();
  }

  saveUserInfo(): void {
    this.storage.ready().then(() => {
      this.storage.set("user", this.user);
    });
  }

  gotoRegister(): void {
    console.log('gotoRegister');
    this.navCtrl.push("RegisterPage");
  }

  infoInvalid(userName: string, pwd: string): boolean {
    return this.isEmpty(userName) || this.isEmpty(pwd);
  }

  isEmpty(obj: string): boolean {
    if (obj === null) return true;
    if (typeof obj === 'undefined') {
      return true;
    }
    if (typeof obj === 'string') {
      if (obj.trim() === "") {
        return true;
      }
      var reg = new RegExp("^([ ]+)|([　]+)$");
      return reg.test(obj);
    }
    return false;
  }
}
