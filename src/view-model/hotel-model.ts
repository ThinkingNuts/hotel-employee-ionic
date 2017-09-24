import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class HotelViewModel extends BaseViewModel {

  Id: number;
  GUID: string;
  Name: string;
  AreaId: number;
  AreaName: string;
  Type: string;
  MailingAddress: string;
  Phone: string;
  CODE: string;
  Address: string;
  Bank: string;
  BankAddress: string;
  BankAccount: string;
  Mark: string;
  Accouts;
  HotelOrders;
  TimeStr: string;

  ObjectToSerialize() {
    return `Id=${this.Id}&GUID=${this.GUID}`;
  }
}