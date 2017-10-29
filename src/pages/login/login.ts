import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TabsPage } from '../../pages/tabs/tabs';

import { Storage } from '@ionic/storage';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AppNativeDeviceProvider } from '../../providers/app-native-service/app-native-device';
import { UserViewModel } from '../../view-model/user-model';
import { AccountProvider, REG_EXP_PHONE } from '../../providers/account/account';

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

  private loginForm: FormGroup;
  private user: UserViewModel = new UserViewModel();
  private veriCodeBtnState = {
    text: "获取验证码",
    disable: false
  };
  private veriMsgId: string;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private storage: Storage,
    private account: AccountProvider,
    private baseHttp: BaseHttpServiceProvider,
    private appDevice: AppNativeDeviceProvider,
    private urlConfig: AppUrlConfigProvider) {
    this.loginForm = formBuilder.group({
      phone: [this.user.Phone, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])],
      veriCode: ["", Validators.compose([Validators.required])]
    });
  }

  get phone() { return this.loginForm.get("phone"); }
  get veriCode() { return this.loginForm.get("veriCode"); }

  ngOnInit(): void {
    this.account.getUserInfo((userInfo) => {
      console.log("LoginPage: userInfo:: " + JSON.stringify(userInfo));

      if (userInfo) {
        this.user.Phone = userInfo.Phone;
        this.ngOnChanges();
      }
    });
  }

  ngOnChanges() {
    this.loginForm.reset({
      phone: this.user.Phone,
      veriCode: ""
    });
  }

  getVeriCode(): void {
    if (!this.phone || !this.phone.valid) {
      this.showToast("手机号码不正确");
      return;
    }
    console.log("LoginPage getVeriCode phone: " + this.phone.value);

    this.baseHttp.get(this.urlConfig.userConfig.loginVeriCodeUrl + this.phone.value)
      .then(
      d => {
        console.log("LoginPage getVeriCode msg_id: " + d["msg_id"]);
        this.veriMsgId = d["msg_id"];
      }
      ).catch(this.handleError);;
    this.showCountdown();
  }

  showCountdown() {
    this.veriCodeBtnState.text = "已发送 (60秒)";
    let second: number = 59;
    this.veriCodeBtnState.disable = true;
    let countdown = setInterval(() => {
      if (second <= 0) {
        this.veriCodeBtnState.text = "获取验证码";
        this.veriCodeBtnState.disable = false;
        clearInterval(countdown);
        return;
      }
      this.veriCodeBtnState.text = "已发送(" + (second--) + "秒)"
    }, 1000);
  }

  login(value) {
    let data = {
      MsgId: this.veriMsgId,
      Code: this.veriCode.value,
      Phone: this.phone.value,
      IMEI: this.appDevice.getUUID(),
      Device: this.appDevice.getManufacturer(),
      SoftVersion: this.appDevice.getVersion(),
      SystemType: this.appDevice.getPlatform(),
      AccoutType: "用工端"
    }
    this.baseHttp.postJson2(data, this.urlConfig.userConfig.userLoginUrl)
      .then((response) => {
        console.log(JSON.stringify(response));

        this.showToast(response["messgae"])
        if (response["state"]) {
          this.account.saveUserInfo(response["data"]);
          this.account.saveToken(response["token"]);
          this.navCtrl.push(TabsPage);
        }
      });
  }

  gotoRegister(): void {
    console.log('gotoRegister');
    this.navCtrl.push("RegisterPage");
  }

  showToast(msg: string): void {
    this.toastCtrl.create({
      duration: 1500,
      position: "top",
      message: msg,
    }).present();
  }

  handleError(error: any) {
    console.log("An error occurred to register: \n", error);
  }
}
