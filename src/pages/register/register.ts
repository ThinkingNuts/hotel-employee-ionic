import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { BaseHttpServiceProvider, JsonResult } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { REG_EXP_PHONE } from '../../providers/account/account';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup;
  private user: UserViewModel = new UserViewModel();
  private veriCodeBtnState = {
    text: "获取验证码",
    disable: false
  };
  private veriMsgId: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.registerForm = formBuilder.group({
      phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])],
      veriCode: ["", Validators.compose([Validators.required])]
    });
  }

  get phone() { return this.registerForm.get("phone"); }
  get veriCode() { return this.registerForm.get("veriCode"); }

  getVeriCode(): void {
    if (!this.phone || !this.phone.valid) {
      this.showToast("手机号码不正确");
      return;
    }
    console.log("RegisterPage getVeriCode phone: " + this.phone.value);

    this.baseHttp.get(this.urlConfig.userConfig.registerVeriCodeUrl + this.phone.value)
      .then(
      d => {
        console.log("RegisterPage getVeriCode msg_id: " + d["msg_id"]);
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

  register(value) {
    console.log("RegisterPage register  " + JSON.stringify(value));
    this.user.Phone = value.phone;
    this.toRegister();
  }

  toRegister(): void {
    let data = {
      RealName: "",
      Sex: "女",
      Pwd: "",
      IdentityCard: "",
      Phone: this.user.Phone,
      MsgId: this.veriMsgId,
      Code: this.veriCode.value
    }
    this.baseHttp.postJson2<any, JsonResult>(data,
      this.urlConfig.userConfig.userRegisterUrl).then(
      d => {
        let msg: string = d.message;
        console.log("Register result " + msg);
        this.showToast(msg);
        if (d.state) {
          this.goBack();
        }
      }).catch(this.handleError);
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

  goBack(): void {
    this.navCtrl.pop();
  }
}
