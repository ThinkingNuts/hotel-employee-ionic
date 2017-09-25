import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class UserViewModel extends BaseViewModel {

  public Name: string;
  public Sex: string = "男";
  public Pwd: string;
  public RealName: string;
  public IdentityCard: string;
  public Phone: string;
  public Address: string;
  public Icon;
  public Status: string;
  public Id: number;
  public GUID: string;
  public TimeStr: string;

  toString() {
    console.log(`RealName:${this.RealName}, Pwd:${this.Pwd}, Sex:${this.Sex}, Name:${this.Name}, IdentityCard:${this.IdentityCard},
     Phone:${this.Phone}, Address:${this.Address}`);
  }

  // ObjectToSerialize() {
  //   return `RealName=${this.RealName}&Pwd=${this.Pwd}&Sex=${this.Sex}&Name=${this.Name}&IdentityCard=${this.IdentityCard}&Phone=${this.Phone}
  //   &Address=${this.Address}`;
  // }

  ObjectToSerialize() {
    return `phone=${this.Phone}&password=${this.Pwd}`;
  }
}