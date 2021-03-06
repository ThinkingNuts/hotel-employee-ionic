import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp, Keyboard, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';

import { BaseHttpServiceProvider, JsonResult } from '../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../providers/app-url-config/app-url-config';
import { AccountProvider, LoginState } from '../providers/account/account'
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage: any = TabsPage;
  backButtonPressed: boolean = false;
  @ViewChild('myNav') nav: Nav;
  private protocol;

  constructor(
    private sanitizer: DomSanitizer,
    private storage: Storage,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private alertCtrl: AlertController,
    public account: AccountProvider,
    public ionicApp: IonicApp,
    public toastCtrl: ToastController,
    public platform: Platform,
    private keyboard: Keyboard,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.checkLogin();
      //注册返回键事件
      this.registerBackButtonAction();
    });
  }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get("agreeProtocol").then(
        (value) => {
          if (!value) {
            this.getProtocol();
          }
        });
    });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      console.log("Back button pressed. ");

      //如果键盘开启则隐藏键盘
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      console.log("App page: " + this.nav.getActive().name);

      if (page instanceof LoginPage) {
        this.platform.exitApp();
        return;
      }

      let tabs = page.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  checkLogin(): void {
    this.account.checkLogin((res: LoginState) => {
      console.log("TabsPage: checkLogin res:: " + res.desc);

      if (res.state) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
  }

  getProtocol(): void {
    this.baseHttp.get<string>(this.urlConfig.employeeConfig.protocolUrl).then(
      res => {
        // this.protocol = res;
        this.protocol = this.sanitizer.bypassSecurityTrustHtml(res);
        this.showProtocol();
      });
  }

  showProtocol(): void {
    this.alertCtrl.create({
      title: "软件允许使用协议",
      message: this.protocol,
      buttons: [{
        text: "不同意",
        handler: () => {
          console.log("Disagree clicked");
          this.platform.exitApp();
        }
      }, {
        text: "同意",
        handler: () => {
          console.log("Agree clicked");
          this.storage.ready().then(() => {
            this.storage.set("agreeProtocol", true);
          });
        }
      }]
    }).present();
  }
}
