import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AppNativeCameraProvider, ICameraCallBack } from '../../providers/app-native-service/app-native-camera';
import { AccountProvider } from '../../providers/account/account';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the PersonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const URL_ROOT: string = "http://123.56.15.145:5000/";

const PHOTO_IDCARD_FRONT: number = 1;
const PHOTO_IDCARD_BACK: number = 2;
const PHOTO_HEALTH_CERTIFICATE: number = 3;

@IonicPage()
@Component({
  selector: 'page-person-details',
  templateUrl: 'person-details.html',
  providers: [
    Camera,
    AppNativeCameraProvider
  ]
})
export class PersonDetailsPage implements ICameraCallBack {

  private user: UserViewModel;
  private whichPhoto: number;
  private idCardFront: string;
  private idCardBack: string;
  private healthCertificate: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private camera: AppNativeCameraProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonDetailsPage');
    this.getPersonDetails();
  }

  getPersonDetails(): void {
    this.account.getUserInfo((value) => {
      this.user = value;
      console.log("PersonDetails: userInfo:: " + JSON.stringify(this.user));

      this.baseHttp.post<any, JsonResult>(null, this.urlConfig.userConfig.personDetailsUrl + this.user.Id)
        .then(d => {
          console.log("PersonDetails: getPersonDetails:: " + JSON.stringify(d));
          if (d.state) {
            this.user = d["data"];

            this.idCardFront = URL_ROOT + "upload/" + this.user.GUID + "/ICardPositive.jpg";
            this.idCardBack = URL_ROOT + "upload/" + this.user.GUID + "/ICardBack.jpg";
            this.healthCertificate = URL_ROOT + "upload/" + this.user.GUID + "/Health.jpg";
          }
        })
        .catch(this.handleError);
    });
  }

  handleError(error: any) {
    console.log("An error occurred to apply: \n", error);
  }

  addPhoto(which: number): void {
    this.whichPhoto = which;
    console.log("addPhoto which:: " + this.whichPhoto);

    this.showUploadAction();
  }

  showUploadAction(): void {
    console.log("PersonDetailsPage: showUploadAction");
    this.actionSheetCtrl.create({
      title: "图片上传",
      buttons: [
        {
          text: "拍照",
          handler: () => {
            console.log("showUploadAction take a picture");
            this.camera.getPictureFromCamera(this);
          }
        }, {
          text: "从相册选择",
          handler: () => {
            console.log("showUploadAction select a picture");
            this.camera.getPictureFromPhotoLibrary(this);
          }
        }, {
          text: "取消",
          role: "cancel",
          handler: () => {
            console.log("showUploadAction cancel");
          }
        }
      ],
      enableBackdropDismiss: true
    }).present();
  }

  getSuccessPicture(base64Str: string) {
    console.log("getSuccessPicture:::length:" + base64Str.length);
    switch (this.whichPhoto) {
      case PHOTO_IDCARD_FRONT:
        this.idCardFront = base64Str;
        this.sendPicture("ICardPositive", this.idCardFront);
        break;
      case PHOTO_IDCARD_BACK:
        this.idCardBack = base64Str;
        this.sendPicture("ICardBack", this.idCardBack);
        break;
      case PHOTO_HEALTH_CERTIFICATE:
        this.healthCertificate = base64Str;
        this.sendPicture("Health", this.healthCertificate);
        break;
      default:
        break;
    }
  }

  sendPicture(type: string, base64: string) {
    // console.log(new PersonPictureModule(this.user.GUID, type ,base64).toString());
    this.baseHttp.post<PersonPictureModule, JsonResult>(new PersonPictureModule(this.user.GUID, type, base64),
      this.urlConfig.userConfig.userUploadUrl)
      .then(d => {
        console.log("PersonDetailsPage: sendPicture:: result " + JSON.stringify(d));
        this.showToast(d.message);
      })
      .catch(this.handleError);
  }

  getErrorPicture(error: any) {
    console.log("getErrorPicture error:: " + error);
  }

  savePerson() {
    console.log("PersonDetailsPage: savePerson:: " + JSON.stringify(this.user));

    this.baseHttp.postJson<UserViewModel, JsonResult>(this.user, this.urlConfig.userConfig.personDetailsUpdateUrl)
      .subscribe(
      (res) => {
        console.log("PersonDetailsPage: savePerson result:: " + JSON.stringify(res));
        this.showToast(res.message);
      },
      (error) => {
        this.handleError(error);
      });
  }

  showToast(msg: string) {
    this.toastCtrl.create({
      duration: 2000,
      position: "top",
      message: msg,
    }).present();
  }
}

export class PersonPictureModule extends BaseViewModel {

  constructor(
    private guid: string,
    private type: string,
    private data: string
  ) {
    super();
  }

  toString() {
    console.log(`GUID=${this.guid}&type=${this.type}&data=${this.data.substr(0, 100)}`);
  }

  ObjectToSerialize() {
    return `GUID=${this.guid}&type=${this.type}&data=${encodeURIComponent(this.data)}`;
  }
}
