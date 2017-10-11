import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppNativeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppNativeCameraProvider {

  constructor(public http: Http, private camera: Camera) {
    console.log('Hello AppNativeCameraProvider Provider');
  }

  public getPictureFromCamera(callBack: ICameraCallBack) {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      quality: 100,//保存的图像质量，范围为0 - 100
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,//设置摄像机拍摄的图像是否为正确的方向
      saveToPhotoAlbum: true,
      targetWidth: 800,//缩放图像的宽度（像素）
      targetHeight: 480,//缩放图像的高度（像素）
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      callBack.getSuccessPicture(base64Image);
    }, (err) => {
      callBack.getErrorPicture(err);
    });
  }

  public getPictureFromPhotoLibrary(callBack: ICameraCallBack) {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 800,//缩放图像的宽度（像素）
      targetHeight: 480,//缩放图像的高度（像素）
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      callBack.getSuccessPicture(base64Image);
    }, (err) => {
      callBack.getErrorPicture(err);
    });
  };
}

export interface ICameraCallBack {
  getSuccessPicture(base64Str: string);
  getErrorPicture(error: any);

}
