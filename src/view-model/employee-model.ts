import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class EmployeeViewModel extends BaseViewModel {
  HotelId: number;
  AreaName: string;
  AreaId: number;
  DepartName: string;
  HotelName: string;//酒店
  ScheduleName: string;//工作排班
  WorkTypeName: string;//用工类型
  Num: number;//人数
  Start: string;//开始时间
  End: string;//结束时间
  Billing: string;//计费方式
  Mark: string;//特殊说明
  Id: number;
  GUID: string;
  TimeStr: string;//创建时间
  AppliedNum: number;
  NewApply: number;
  Title: string = this.DepartName + "-" + this.WorkTypeName + "-招" + this.Num + "人";//TODO modify

  ObjectToSerialize() {
    return `Id=${this.Id}&GUID=${this.GUID}`;
  }
}