import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class ApplyViewModel extends BaseViewModel {
  Id: number;
  GUID: string;
  OrderId:string;
  OrderTitle:string;
  PersonId:string;
  PersonName:string;
  Status:string;
  StatusStr:string;
  Mark: string;//特殊说明
  TimeStr: string;//创建时间

  ObjectToSerialize() {
    return `Id=${this.Id}&GUID=${this.GUID}&OrderId=${this.OrderId}&OrderTitle=${this.OrderTitle}
    &PersonId=${this.PersonId}&PersonName=${this.PersonName}
    &Status=${this.Status}&StatusStr=${this.StatusStr}
    &Mark=${this.Mark}&TimeStr=${this.TimeStr}`;
  }
}