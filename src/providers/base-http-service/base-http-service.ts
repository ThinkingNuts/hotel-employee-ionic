import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject, BehaviorSubject, Observable } from 'rxjs'
/*
  Generated class for the BaseHttpServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BaseHttpServiceProvider {


  constructor(private http: Http) {
    console.log('Hello BaseHttpServiceProvider Provider');
  }

  public post<T extends BaseViewModel, U>(obj: T, url: string): Promise<U> {
    let form;
    if (obj && obj.ObjectToSerialize) {
      form = obj.ObjectToSerialize();
    }
    let header = new Headers();
    header.append('Content-Type', "application/x-www-form-urlencoded");
    return this.http.post(url, form, { headers: header }).toPromise().then(d => d.json());
  }

  public postJson<T extends BaseViewModel, U>(obj: T, url: string): Observable<U> {
    let form = JSON.stringify(obj);
    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http
      .post(url, form, { headers: header })
      .map(response => response.json());
    // .toPromise()
    // .then(d => d.json())
    // .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log("An error occurred: \n", error);
    return Promise.reject(error.message || error);
  }

  public get<T extends BaseViewModel>(query: QueryParmModel, url: string): Promise<T[]> {

    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http.post(url, JSON.stringify(query), { headers: header }).toPromise().then(d => d.json());
  }

}

export class BaseViewModel {

  public ObjectToSerialize() { }

}

export class QueryParmModel {
  public isGetAll: boolean = true;
  public ordeyKey: string;
  public pageSize: number;
  public pageIndex: number;
  public filter: any;

}
export class JsonResult {

  public state: boolean;
  public message: string;
}