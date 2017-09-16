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

  saveUserInfo(user: UserViewModel): void {
    this.storage.ready().then(() => {
      this.storage.set("user", user);
    });
  }

  login(user: UserViewModel, callback) {
    if (this.infoInvalid(user.Name, user.Pwd)) return;

    if(user.Name!=="admin" || user.Pwd!=="123456"){
      callback(false);
      return;
    }

    // TODO release lines below
    // this.baseHttp
    //   .post(user, this.urlConfig.userConfig.userLoginUrl)
    //   .then((response) => {
    //     console.log(response);
        console.log("AccountProvider: login userName: " + user.Name + ", pwd: " + user.Pwd);
        this.saveUserInfo(user);
        callback(true);
      // });
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