import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class UserViewModel extends BaseViewModel {
  public RealName: string;
  public Pwd: string;
  public Sex: string = "男";
  public Name: string;
  public IdentityCard: string;
  public Phone: number;
  public Address: string;
  public Icon;
  public Status: string;
  public Orders;
  public Id: string;
  public GUID: string;
  public TimeStr: string;

  toString() {
    console.log(`RealName:${this.RealName}, Pwd
:${this.Pwd
}, 
    Sex:${this.Sex}, Name:${this.Name}, IdentityCard:${this.IdentityCard},
     Phone:${this.Phone}, Address:${this.Address}`);
  }
  
  ObjectToSerialize() {
    return `RealName=${this.RealName}&Pwd=${this.Pwd}&Sex=${this.Sex}&Name=${this.Name}&IdentityCard=${this.IdentityCard}&Phone=${this.Phone}
    &Address=${this.Address}`;
  }
}