import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class EmployeeViewModel extends BaseViewModel {
  IsApplied: boolean = false;//just a flag, not from server
  HotelGUID: string;
  HotelId: number;
  AreaName: string;
  AreaId: number;
  DepartMentName: string;
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
  CreateTime: string;//创建时间
  AppliedNum: number;
  NewApply: number;

  ObjectToSerialize() {
    return `Id=${this.Id}&GUID=${this.GUID}`;
  }
}