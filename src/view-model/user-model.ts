import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class UserViewModel extends BaseViewModel {
  public name: string;
  public password: string;
  public sex: String = "男";
  public alias: String;
  public idCard: String;
  public phone: number;
  public address: String;

  toString() {
    console.log(`name:${this.name}, password:${this.password}, 
    sex:${this.sex}, alias:${this.alias}, idCard:${this.idCard},
     phone:${this.phone}, address:${this.address}`);
  }
  
  ObjectToSerialize() {
    return `name=${this.name}&password=${this.password}&sex=${this.sex}&alias=${this.alias}
    &idCard=${this.idCard}&phone=${this.phone}
    &address=${this.address}`;
  }
}