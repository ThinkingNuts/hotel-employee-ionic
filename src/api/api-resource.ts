import { Injectable, Inject } from "@angular/core"
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http"
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Subject, BehaviorSubject, Observable } from "rxjs";

// import API_ROOT from "./config";
const API_ROOT: string = "http://123.56.15.145:5000/";

@Injectable()
export class ApiService {

  private headers: Headers = new Headers();
  private opts: RequestOptions = new RequestOptions();

  constructor(private http: Http, private storage: Storage) {
    this.headers.append("Content-Type", "application/json");
    // this.interceptor();
  }

  interceptor() {
    this.opts.headers = this.headers;
    this.storage.get("token").then(res => {
      if (res && !this.opts.headers.get("Authorization")) {
        this.opts.headers.append("Authorization", `Bearer ${res}`);
      }
    });
  }

  public login<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "api/Login", data, this.opts).toPromise().then(d => d.json());
  }

  public register<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "api/Register", data, this.opts).toPromise().then(d => d.json());
  }

  public updatePwd<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "ServicePerson/UpdatePwd", data, this.opts).toPromise().then(d => d.json());
  }

  public upload<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "ServicePerson/Upload", data, this.opts).toPromise().then(d => d.json());
  }

  public getPersonDetails<T>(personId, data): Promise<T> {
    return this.http.post(API_ROOT + "ServicePerson/Details/" + personId, data, this.opts).toPromise().then(d => d.json());
  }

  public updatePersonDetails<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "ServicePerson/Update", data, this.opts).toPromise().then(d => d.json());
  }

  public getRegisterVeriCode<T>(phone): Promise<T> {
    return this.http.get(API_ROOT + "api/Register/" + phone, this.opts).toPromise().then(d => d.json());
  }

  public getLoginVeriCode<T>(phone): Promise<T> {
    return this.http.get(API_ROOT + "api/Login/" + phone, this.opts).toPromise().then(d => d.json());
  }

  public getEmpolyeeList<T>(areaId, data): Promise<T> {
    return this.http.post(API_ROOT + "HotelOrder/AreaOrders/" + areaId, data, this.opts).toPromise().then(d => d.json());
  }

  public getAreaEmpolyeeList<T>(areaId, data): Promise<T> {
    return this.http.post(API_ROOT + "api/AreaWork/" + areaId, data, this.opts).toPromise().then(d => d.json());
  }

  public getApplyRecordsList<T>(personGUID): Promise<T> {
    return this.http.get(API_ROOT + "api/PersonApply/" + personGUID, this.opts).toPromise().then(d => d.json());
  }

  public applyWork<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "api/PersonApply", data, this.opts).toPromise().then(d => d.json());
  }

  public getHotelDetails<T>(hotelGUID): Promise<T> {
    return this.http.post(API_ROOT + "Hotel/HotelDetail/" + hotelGUID, null, this.opts).toPromise().then(d => d.json());
  }

  public getAreas<T>(): Promise<T> {
    return this.http.post(API_ROOT + "Area/Areas", null, this.opts).toPromise().then(d => d.json());
  }

  public getMyWorkList<T>(personGUID, data): Promise<T> {
    return this.http.post(API_ROOT + "api/PersonEmploy/" + personGUID, data, this.opts).toPromise().then(d => d.json());
  }

  public finishWork<T>(orderId, data): Promise<T> {
    return this.http.post(API_ROOT + "api/PersonEmploy/" + orderId, data, this.opts).toPromise().then(d => d.json());
  }

  // new -------
  public getOrderList<T>(areaId = 0): Promise<T> {
    return this.http.get(API_ROOT + "api/AreaWorkPlus/" + areaId, this.opts).toPromise().then(d => d.json());
  }
  public grabOrder<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "api/PersonApply", data, this.opts).toPromise().then(d => d.json());
  }
  public getRoomList<T>(id): Promise<T> {
    return this.http.get(API_ROOT + "api/GrabOrder/" + id, this.opts).toPromise().then(d => d.json());
  }
  public updateRoomState<T>(id, data): Promise<T> {
    return this.http.put(API_ROOT + "api/GrabOrder/" + id, data, this.opts).toPromise().then(d => d.json());
  }
  public addRoom<T>(data): Promise<T> {
    return this.http.post(API_ROOT + "api/GrabOrder", data, this.opts).toPromise().then(d => d.json());
  }
  public deleteRoom<T>(id): Promise<T> {
    return this.http.delete(API_ROOT + "api/GrabOrder/" + id, this.opts).toPromise().then(d => d.json());
  }
}


/*
public employeeListUrl: string = URL_ROOT + "HotelOrder/AreaOrders/";//+区域id(可选)
public areaEmployeeListUrl: string = URL_ROOT + "api/AreaWork/";//+区域id,null或0表示全部
public applyRecordsUrl: string = URL_ROOT + "api/PersonApply/";//+用户GUID(必须)
public applyUrl: string = URL_ROOT + "api/PersonApply";
public hotelDetailsUrl: string = URL_ROOT + "Hotel/HotelDetail/";//+酒店GUID(必须)
public areasInfoUrl: string = URL_ROOT + "Area/Areas";
public myOrderUrl: string = URL_ROOT + "api/PersonEmploy/";//+用户GUID(必须)
public finishOrderUrl: string = URL_ROOT + "api/PersonEmploy/";//+id(必须)

public userLoginUrl: string = URL_ROOT + "api/Login";
public userRegisterUrl: string = URL_ROOT + "api/Register";
public updatePwdUrl: string = URL_ROOT + "ServicePerson/UpdatePwd";
public userUploadUrl: string = URL_ROOT + "ServicePerson/Upload";
public personDetailsUrl: string = URL_ROOT + "ServicePerson/Details/";//+用户Id
public personDetailsUpdateUrl: string = URL_ROOT + "ServicePerson/Update";
public registerVeriCodeUrl: string = URL_ROOT + "api/Register/";//+phone
public loginVeriCodeUrl: string = URL_ROOT + "api/Login/";//+phone
*/