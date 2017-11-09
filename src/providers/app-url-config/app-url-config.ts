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
   * 用工信息及申请配置
   */
  public employeeConfig: EmployeeConfig = new EmployeeConfig();

  constructor(public http: Http) {
    console.log('全局信息配置 Provider');
  }
}

class EmployeeConfig {
  public protocolUrl: string = URL_ROOT + "api/Declare";
  public employeeListUrl: string = URL_ROOT + "HotelOrder/AreaOrders/";//+区域id(可选)
  public areaEmployeeListUrl: string = URL_ROOT + "api/AreaWork/";//+区域id,null或0表示全部
  public applyRecordsUrl: string = URL_ROOT + "api/PersonApply/";//+用户GUID(必须)
  public applyUrl: string = URL_ROOT + "api/PersonApply";
  public hotelDetailsUrl: string = URL_ROOT + "Hotel/HotelDetail/";//+酒店GUID(必须)
  public areasInfoUrl: string = URL_ROOT + "Area/Areas";
  public myOrderUrl: string = URL_ROOT + "api/PersonEmploy/";//+用户GUID(必须)
  public finishOrderUrl: string = URL_ROOT + "api/PersonEmploy/";//+id(必须)
}

class UserConfig {
  public userMessage: string = URL_ROOT + "api/PersonMessage/";//+用户GUID(必须)
  public userLoginUrl: string = URL_ROOT + "api/Login";
  public userRegisterUrl: string = URL_ROOT + "api/Register";
  public updatePwdUrl: string = URL_ROOT + "ServicePerson/UpdatePwd";
  public userUploadUrl: string = URL_ROOT + "ServicePerson/Upload";
  public personDetailsUrl: string = URL_ROOT + "ServicePerson/Details/";//+用户Id
  public personDetailsUpdateUrl: string = URL_ROOT + "ServicePerson/Update";
  public registerVeriCodeUrl: string = URL_ROOT + "api/Register/";//+phone
  public loginVeriCodeUrl: string = URL_ROOT + "api/Login/";//+phone
}