import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp, Keyboard, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

      // this.getProtocol();
      this.checkLogin();
      //注册返回键事件
      this.registerBackButtonAction();
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

  // getProtocol(): void {
  //   this.baseHttp.get(this.urlConfig.employeeConfig.protocolUrl).then(
  //     res => {

  //     });
  // }

  // showProtocol(): void {
  //   this.alertCtrl.create({
  //     title: "使用协议",
  //     message: `<div>
  //         &nbsp; &nbsp;请您在使用本软件前仔细阅读如下条款。包括免除或者限制作者责任的免责条款及对用户的权利限制。您的安装使用行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。<br />
  //       &nbsp;&nbsp;本<strong>《用户许可协议》</strong>（以下称《协议》）是您（个人或单一机构团体）与上述&nbsp;桌面日历秀XDeskCal&nbsp;软件（以下称“软件”或“软件产品”）版权所有&nbsp;鱼鱼软件&nbsp;之间的法律协议。在您使用本软件产品之前,请务必阅读此《协议》，任何与《协议》有关的软件、电子文档等都应是按本协议的条款而授予您的，同时本《协议》亦适用于任何有关本软件产品的后期发行和升级。您一旦安装、复制、下裁、访问或以其它方式使用本软件产品，即表示您同意接受本《协议》各项条款的约束。如果您拒绝接受本《协议》条款，请您停止下载、安装或使用本软件及其相关服务。&nbsp;<br />
  //       一、许可证的授予。本《协议》授予您下列权利：<br />
  //       <strong>安装和使用：</strong><br />
  //       &nbsp;&nbsp;您可安装无限制数量的本软件产品来使用。<br />
  //       复制、分发和传播：<br />
  //       &nbsp;&nbsp;您可以复制、分发和传播无限制数量的软件产品，但您必须保证每一份复制、分发和传播都必须是完整和真实的，包括所有有关本软件产品的软件、电子文档，版权和商标宣言，亦包括本协议。&nbsp;二、其它权利和限制说明。<br />
  //       付费注册版本：<br />
  //       &nbsp;&nbsp;个人使用授权版本只能由单个用户在一台或多台计算机上亲自使用；<br />
  //       &nbsp;&nbsp;公司使用授权版本允许公司内部员工在固定场所使用。<br />
  //       禁止反向工程、反向编译和反向汇编：<br />
  //       &nbsp;&nbsp;您不得对本软件产品进行反向工程、反向编译和反向汇编，不得删除本软件及其他副本上一切关于版权的信息，不得制作和提供该软件的注册机及破解程序。除非适用法律明文允许上述活动，否则您必须遵守此协议限制。<br />
  //       组件的分隔：<br />
  //       &nbsp;&nbsp;<span style="color:#00D5FF;">本软件产品是被当成一个单一产品而被授予许可使用，不得将各个部分分开用于任何目的行动。</span>&nbsp;保证：<br />
  //       &nbsp;&nbsp;本软件版权人&nbsp;鱼鱼软件&nbsp;特此申明对本软件产品之使用不提供任何保证。版权人将不对任何用户保证本软件产品的适用性，不保证无故障产生；亦不对任何用户使用此软件所遭遇到的任何理论上的或实际上的损失承担负责。<br />
  //       终止：<br />
  //       &nbsp;&nbsp;如您未遵守本《协议》的各项条件，在不损害其它权利的情况下，版权人可将本《协议》终止。如发生此种情况，则您必须销毁“软件产品”及其各部分的所有副本。<br />
  //       <strong>三、作者特别授权</strong><br />
  //       &nbsp;&nbsp;本软件为共享软件，版权归作者所有。欢迎各用户试用。各有关单位及个人在保证不修改本系统任何程序及文档的前提下，本系统的作者特授权如下：&nbsp;<br />
  //       1、各报社、杂志社、出版发行商可将本软件收录进其发行的各种光盘中供试用。<br />
  //       2、各计算机生产商、销售商可将本软件安装在其生产或销售的计算机中，供其客户试用。<br />
  //       3、任何人不得修改本软件，也不得将被修改过的软件收录进光盘、磁盘、主页等媒介中或安装在计算机中。更不得进行非法解密或注册的任何活动，否则本作者将保留依法追纠的权利。<br />
  //       四、免责声明：<br />
  //       &nbsp;&nbsp;<span style="color:#E53333;">本软件并无附带任何形式的明示的或暗示的保证，包括任何关于本软件的适用性,&nbsp;无侵犯知识产权或适合作某一特定用途的保证。&nbsp;</span> 
  //       </div>`,
  //     buttons: [{
  //       text: "不同意",
  //       handler: () => {
  //         console.log("Disagree clicked");
  //         this.platform.exitApp();
  //       }
  //     }, {
  //       text: "同意",
  //       handler: () => {
  //         console.log("Agree clicked");
  //       }
  //     }]
  //   }).present();
  // }
}
