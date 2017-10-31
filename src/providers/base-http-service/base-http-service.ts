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
    if (obj) {
      form = objectToSerialize(obj);
    }
    let header = new Headers();
    header.append('Content-Type', "application/x-www-form-urlencoded");
    return this.http.post(url, form, { headers: header }).toPromise().then(d => d.json());
  }

  public postJson<T extends BaseViewModel, U>(obj: T, url: string): Observable<U> {
    let form;
    if (obj) {
      form = JSON.stringify(obj);
    }
    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http
      .post(url, form, { headers: header })
      .map(response => response.json());
    // .toPromise()
    // .then(d => d.json())
    // .catch(this.handleError);
  }

  public postJson2<T extends BaseViewModel, U>(obj: T, url: string): Promise<U> {
    let form;
    if (obj) {
      form = JSON.stringify(obj);
    }
    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http.post(url, form, { headers: header }).toPromise().then(d => d.json());
  }

  public putJson<T extends BaseViewModel, U>(obj: T, url: string): Promise<U> {
    let form;
    if (obj) {
      form = JSON.stringify(obj);
    }
    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http.put(url, form, { headers: header }).toPromise().then(d => d.json());
  }

  handleError(error: any): Promise<any> {
    console.log("An error occurred: \n", error);
    return Promise.reject(error.message || error);
  }

  public get<T extends BaseViewModel>(url: string): Promise<T> {

    let header = new Headers();
    header.append('Content-Type', "application/json");
    return this.http.get(url, { headers: header }).toPromise().then(d => d.json());
  }

}

export const objectToSerialize = data => {
  let formData;
  for (let index in data) {
    if (data[index]) {
      formData += `&${index}=${data[index]}`;
    }
  }
  return formData.substring(10);
}

export class BaseViewModel {
  // public ObjectToSerialize() { }
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