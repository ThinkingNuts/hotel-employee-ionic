import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AccountProvider } from '../../providers/account/account';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the UpdatePwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-pwd',
  templateUrl: 'update-pwd.html',
})
export class UpdatePwdPage {

  private user: UserViewModel;
  private oldPwd: string;
  private newPwd: string;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.getPersonDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePwdPage');
  }

  getPersonDetails(): void {
    this.account.getUserInfo((value) => {
      this.user = value;
      console.log("UpdatePwdPage: user:: " + JSON.stringify(this.user));
    });
  }

  updatePwd(): void {
    this.askUpdatePwd();
  }

  askUpdatePwd(): void {
    this.alertCtrl.create({
      title: "提示",
      message: "确认要修改吗？",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("Disagree clicked");
        }
      }, {
        text: "确认",
        handler: () => {
          console.log("Agree clicked");
          this.doUpdatePwd();
        }
      }]
    }).present();
  }

  doUpdatePwd(): void {
    let form: UpdatePwdModel = new UpdatePwdModel();
    form.newPassword = this.newPwd;
    form.oldPassword = this.oldPwd;
    form.GUID = this.user.GUID;
    this.baseHttp.post<BaseViewModel, JsonResult>(form,
      this.urlConfig.userConfig.updatePwdUrl)
      .then(d => {
        console.log("UpdatePwdPage:: " + JSON.stringify(d));
        this.showToast(d.message);
        if (d.state == true) {
          this.navCtrl.pop();
        }
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000
    }).present();
  }
}

class UpdatePwdModel extends BaseViewModel {
  public newPassword: string;
  public oldPassword: string;
  public GUID: string;

  ObjectToSerialize() {
    return `newPassword=${this.newPassword}&oldPassword=${this.oldPassword}&GUID=${this.GUID}`;
  }
}
