import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export const URL_ROOT: string = "http://123.56.15.145:5000/";

@Injectable()
export class AppUrlConfigProvider {

  /**
   * 用户登陆以及用户信息获取 Url配置
   */
  public userConfig: UserConfig = new UserConfig();

  /**
   * Signalr 服务器信息配置
   */
  public signalrConfig: SignalrConfig = new SignalrConfig();

  /**
   * 用工信息及申请配置
   */
  public employeeConfig: EmployeeConfig = new EmployeeConfig();

  constructor(public http: Http) {
    console.log('全局信息配置 Provider');
  }
}

class EmployeeConfig {
  public employeeListUrl: string = URL_ROOT + "HotelOrder/AreaOrders/";//+区域id(可选)
  public applyRecordsUrl: string = URL_ROOT + "ServicePerson/Orders/";//+用户GUID(必须)
  public applyUrl: string = URL_ROOT + "PersonOrder/Apply";
  public hotelDetailsUrl: string = URL_ROOT + "Hotel/HotelDetail/";//+酒店GUID(必须)
  public areasInfoUrl: string = URL_ROOT + "Area/Areas";
  public myOrderUrl: string = URL_ROOT + "ServicePerson/Orders/";//+用户GUID(必须)
}

class UserConfig {
  public userLoginUrl: string = URL_ROOT + "ServicePerson/Login";
  public userRegisterUrl: string = URL_ROOT + "ServicePerson/Create";
  public updatePwdUrl: string = URL_ROOT + "ServicePerson/UpdatePwd";
  public userUploadUrl: string = URL_ROOT + "ServicePerson/Upload";
  public personDetailsUrl: string = URL_ROOT + "ServicePerson/Details/";//+用户Id
  public personDetailsUpdateUrl: string = URL_ROOT + "ServicePerson/Update";
}

class SignalrConfig {

  /**
   * Signalr Hub名称
   */
  public hubName: string = "userHub";
  /**
   * Signalr Host地址
   */
  public hostUrl: string = "http://192.168.200.250/webrtc/signalr";

  /**
   * Signalr 监听服务器事件名称
   */

  public proxyOnEvnetName: string = "receiveMessage";
}