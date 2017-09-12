import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(userName: string, pwd: string): void {
    console.log("login userName: " + userName + ", pwd: " + pwd);
    if (this.infoInvalid(userName, pwd)) return;
    //TODO login, and move line below to callback when login successfully
    this.gotoTabs();
  }

  gotoRegister(): void {
    console.log('gotoRegister');
    this.navCtrl.push("RegisterPage");
  }

  gotoTabs(): void {
    console.log('gotoTabs');
    this.navCtrl.push("TabsPage");
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
