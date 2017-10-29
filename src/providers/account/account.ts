import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BaseHttpServiceProvider, BaseViewModel } from '../base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../app-url-config/app-url-config';
import { UserViewModel } from '../../view-model/user-model';

// export const REG_EXP_IDCARD: string = "^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$";
export const REG_EXP_IDCARD: string = "^(\d{15})$|^(\d{18})$|^(\d{17}(\d|X|x))$";
export const REG_EXP_PHONE: string = "^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$";

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

  saveUserInfo(user: any): void {
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

  checkLogin(callback): void {
    this.getToken(value => {
      if (value && value.length > 0) {
        callback({ state: true, desc: "已登录" } as LoginState);
      } else {
        callback(LOGIN_STATE_DEFAULT);
      }
    });
  }

  login(user, callback) {
    console.log("AccountProvider: login phone: " + user.Phone + ", pwd: " + user.Pwd);

    this.baseHttp.post({
        phone: user.Phone,
        password: user.Pwd
      }, this.urlConfig.userConfig.userLoginUrl)
      .then((response) => {
        console.log(JSON.stringify(response));

        if (response["state"]) {

          this.saveUserInfo(response["data"]);
          this.saveToken(response["token"]);
        }
        callback(response["state"], response["message"]);
      });
  }

  logout(callback) {
    console.log("AccountProvider: logout");

    this.storage.ready().then(() => {
      this.storage.remove("token").then(
        () => {
          callback("已退出登录");
        });
    });
  }
}

export const LOGIN_STATE_DEFAULT: LoginState = {
  state: false,
  desc: "未登录"
};
export class LoginState {
  state: boolean;
  desc: string;
}
