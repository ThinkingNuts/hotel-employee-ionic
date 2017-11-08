import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class UserViewModel extends BaseViewModel {

  public RealName: string;
  public Sex: string = "男";
  public Pwd: string;// = "123";
  public IdentityCard: string;
  public Phone: string;
  public Address: string;
  public Icon: string;
  public Status: string;
  public Id: number;
  public GUID: string;
  public CreateTime: string;
  public ICardPositive:string;
  public ICardBack:string;
  public Health:string;

}