import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AppNativeCameraProvider, ICameraCallBack } from '../../providers/app-native-service/app-native-camera';
import { AccountProvider, REG_EXP_IDCARD, REG_EXP_PHONE } from '../../providers/account/account';

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

  private personForm: FormGroup;
  private sex: any;
  private realName: any;
  private identityCard: any;
  private phone: any;
  private address: any;

  private user: UserViewModel;
  private whichPhoto: number;
  private idCardFront: string;
  private idCardBack: string;
  private healthCertificate: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private account: AccountProvider,
    private camera: AppNativeCameraProvider,
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.personForm = formBuilder.group({
      sex: ["", Validators.compose([Validators.required])],
      realName: ["", Validators.compose([Validators.required])],
      identityCard: ["", Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(18)/*, Validators.pattern(REG_EXP_IDCARD)*/])],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(REG_EXP_PHONE)])],
      address: [""]
    });
    this.sex = this.personForm.controls['sex'];
    this.realName = this.personForm.controls['realName'];
    this.identityCard = this.personForm.controls['identityCard'];
    this.phone = this.personForm.controls['phone'];
    this.address = this.personForm.controls['address'];
  }

  ngOnInit() {
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
    this.baseHttp.post<PersonPictureModule, JsonResult>(new PersonPictureModule(this.user.GUID, type, encodeURIComponent(base64)),
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

  savePerson(value) {
    console.log("PersonDetailsPage: savePerson:: " + JSON.stringify(this.user));

    this.baseHttp.post<UserViewModel, JsonResult>(this.user, this.urlConfig.userConfig.personDetailsUpdateUrl)
      .then(
      (res) => {
        console.log("PersonDetailsPage: savePerson result:: " + JSON.stringify(res));
        this.showToast(res.message);
      })
      .catch(this.handleError);
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
}
