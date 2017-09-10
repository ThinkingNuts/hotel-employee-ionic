import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppUrlConfigProvider {

  /**
   * 用户登陆以及用户信息获取 Url配置
   */
  public  userConfig: UserConfig = new UserConfig();

  /**
   * Signalr 服务器信息配置
   */
  public signalrConfig: SignalrConfig = new SignalrConfig();

  constructor(public http: Http) {
    console.log('全局信息配置 Provider');
    
  }

}

class UserConfig {
  public userLoginUrl: string = "http://192.168.200.250/webrtc/home/login";
  
  public userGetListUrl: string = "http://192.168.200.250/webrtc/home/list";

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