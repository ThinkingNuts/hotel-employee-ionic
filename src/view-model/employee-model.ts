import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class EmployeeViewModel extends BaseViewModel {
  Id: number;
  GUID: string;
  Title: string;//标题
  Num: number;//人数
  HotelId: string;
  HotelName: string;//酒店
  ScheduleId: string;
  ScheduleName: string;//工作排班
  WorkTypeId: string;
  WorkTypeName: string;//用工类型
  Start: string;//开始时间
  End: string;//结束时间
  Billing: string;//计费方式
  Mark: string;//特殊说明
  TimeStr: string;//创建时间

  ObjectToSerialize() {
    return `Id=${this.Id}&GUID=${this.GUID}&Title=${this.Title}&Num=${this.Num}
    &HotelId=${this.HotelId}&HotelName=${this.HotelName}
    &ScheduleId=${this.ScheduleId}&ScheduleName=${this.ScheduleName}
    &WorkTypeId=${this.WorkTypeId}&WorkTypeName=${this.WorkTypeName}
    &Start=${this.Start}&End=${this.End}&Billing=${this.Billing}
    &Mark=${this.Mark}&TimeStr=${this.TimeStr}`;
  }
}