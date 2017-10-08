import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BaseHttpServiceProvider, BaseViewModel } from '../base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../app-url-config/app-url-config';
import { UserViewModel } from '../../view-model/user-model';

@Injectable()
export class AccountProvider {

  constructor(
    public urlConfig: AppUrlConfigProvider,
    public baseHttp: BaseHttpServiceProvider,
    public storage: Storage
  ) { }

  getUserInfo(callback): void {
    this.storage.ready().then(() => {
      this.storage.get("user").then(
        (value) => {
          callback(value as UserViewModel);
        });
    });
  }

  saveUserInfo(user:any): void {
    this.storage.ready().then(() => {
      this.storage.set("user", user);
      console.log("user::" + JSON.stringify(user));
    });
  }

  getToken(callback): void {
    this.storage.ready().then(() => {
      this.storage.get("token").then(
        (value) => {
          callback(value as string);
        });
    });
  }

  saveToken(token: string): void {
    this.storage.ready().then(() => {
      this.storage.set("token", token);
    });
  }

  login(user: UserViewModel, callback) {
    console.log("AccountProvider: login phone: " + user.Phone + ", pwd: " + user.Pwd);
    // if (this.infoInvalid(user.Phone, user.Pwd)) return;

    this.baseHttp
      .post(user, this.urlConfig.userConfig.userLoginUrl)
      .then((response) => {
        console.log(JSON.stringify(response));

        if (response["state"]) {
       
          this.saveUserInfo(response["data"]);
          this.saveToken(response["token"]);
        }
        callback(response["state"], response["message"]);
      });
  }

  logout() {

  }

  infoInvalid(userName: string, pwd: string): boolean {
    return this.isEmpty(userName) || this.isEmpty(pwd);
  }

  private isEmpty(obj: string): boolean {
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