import { BaseViewModel } from '../providers/base-http-service/base-http-service';
import { EmployeeViewModel } from './employee-model';

export class ApplyViewModel extends BaseViewModel {
  Order: EmployeeViewModel;
  Status: string;
  StatusStr: string;
  ApplyTime: string;
  TotalApply: number;

  ObjectToSerialize() {
    return `Order=${this.Order.ObjectToSerialize}&Status=${this.Status}&StatusStr=${this.StatusStr}&ApplyTime=${this.ApplyTime}`;
  }
}