import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class UserViewModel extends BaseViewModel {

  public Name: string;
  public RealName: string;
  public Sex: string = "男";
  public Pwd: string;// = "123";
  public IdentityCard: string;
  public Phone: string;
  public Address: string;
  public Icon;
  public Status: string;
  public Id: number;
  public GUID: string;
  public CreateTime: string;
  public ICardPositive:string;
  public ICardBack:string;
  public Health:string;

  toString() {
    return `Id:${this.Id},RealName:${this.RealName}, Pwd:${this.Pwd}, Sex:${this.Sex}, Name:${this.Name}, IdentityCard:${this.IdentityCard},
     Phone:${this.Phone}, Address:${this.Address},  ICardPositive:${this.ICardPositive},  ICardBack:${this.ICardBack},  Health:${this.Health}`;
  }

  // ObjectToSerialize() {
  //   return `RealName=${this.RealName}&Pwd=${this.Pwd}&Sex=${this.Sex}&Name=${this.Name}&IdentityCard=${this.IdentityCard}&Phone=${this.Phone}
  //   &Address=${this.Address}`;
  // }

  ObjectToSerialize() {
    return `RealName=${this.RealName}&Sex=${this.Sex}&Phone=${this.Phone}&Pwd=${this.Pwd}&IdentityCard=${this.IdentityCard}&Phone=${this.Phone}&Address=${this.Address}&Icon=${this.Icon}&Status=${this.Status}&Id=${this.Id}&GUID=${this.GUID}&CreateTime=${this.CreateTime}&ICardPositive=${this.ICardPositive}&ICardBack=${this.ICardBack}&Health=${this.Health}`;
  }
}