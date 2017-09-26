import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { BaseHttpServiceProvider, JsonResult, BaseViewModel } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';
import { AppNativeCameraProvider, ICameraCallBack } from '../../providers/app-native-service/app-native-camera';

import { UserViewModel } from '../../view-model/user-model';

/**
 * Generated class for the PersonDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private actionSheetCtrl: ActionSheetController,
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private camera: AppNativeCameraProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonDetailsPage');
  }

  ngOnInit() {
    this.getPersonDetails();
  }

  getPersonDetails(): void {
    let personId = 6;
    this.baseHttp.post<BaseViewModel, JsonResult>(new BaseViewModel,
      this.urlConfig.userConfig.personDetailsUrl + personId)
      .then(d => {
        console.log("PersonDetails:: " + JSON.stringify(d));
        if (d.state == true) {
          this.user = d["data"];
        }
      })
      .catch(this.handleError);
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
    console.log("getSuccessPicture");
    switch (this.whichPhoto) {
      case PHOTO_IDCARD_FRONT:
        this.idCardFront = base64Str;
        break;
      case PHOTO_IDCARD_BACK:
        this.idCardBack = base64Str;
        break;
      case PHOTO_HEALTH_CERTIFICATE:
        this.healthCertificate = base64Str;
        break;
      default:
        break;
    }
  }
  getErrorPicture(error: any) {
    console.log("getErrorPicture error:: " + error);
  }
}


