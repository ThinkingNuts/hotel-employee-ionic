import { BaseViewModel } from '../providers/base-http-service/base-http-service';
import { EmployeeViewModel } from './employee-model';

export class ApplyViewModel extends BaseViewModel {
  Order: EmployeeViewModel;
  OrderId: number;
  Status: number;
  StatusStr: string;
  ApplyTime: string;
  TotalApply: number;
  EmployNum: number;
}