import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

/*
  Generated class for the AppNativeServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppNativeDeviceProvider {

  constructor(private device: Device) {
    console.log('Hello AppNativeDeviceProvider');
  }

  getCordova(): string {
    console.log("cordova: " + this.device.cordova);
    return this.device.cordova;
  }
  getModel(): string {
    console.log("model: " + this.device.model);
    return this.device.model;
  }
  getPlatform(): string {
    console.log("platform: " + this.device.platform);
    return this.device.platform;
  }
  getUUID(): string {
    console.log("uuid: " + this.device.uuid);
    return this.device.uuid;
  }
  getVersion(): string {
    console.log("version: " + this.device.version);
    return this.device.version;
  }
  getManufacturer(): string {
    console.log("manufacturer: " + this.device.manufacturer);
    return this.device.manufacturer;
  }
  isVirtual(): boolean {
    console.log("isVirtual: " + this.device.isVirtual);
    return this.device.isVirtual;
  }
  getSerial(): string {
    console.log("serial: " + this.device.serial);
    return this.device.serial;
  }
}