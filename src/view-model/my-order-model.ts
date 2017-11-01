import { BaseViewModel } from '../providers/base-http-service/base-http-service';
import { EmployeeViewModel } from './employee-model';

export class MyOrderViewModel extends BaseViewModel {
  PersonId: number;
  GUID: string;
  CreateTime: string;
  Order: Order;
  HotelOrderId: number;
  Status: number;
  Evaluate: number;
  HotelEvaluate: string;
  Comment: string;
  HotelComment: string;
}

class Order {
  HotelName: string;
  DepartName: string;
  ScheduleName: string;
  WorkTypeName: string;
  Num: number;
  Start: string;
  End: string;
  CreateTime: string;
  Billing: string;
}