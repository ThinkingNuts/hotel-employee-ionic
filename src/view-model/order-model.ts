import { BaseViewModel } from '../providers/base-http-service/base-http-service';
import { EmployeeViewModel } from './employee-model';

export class OrderViewModel extends BaseViewModel {
  HotelId: number;
  HotelName: string;
  AreaId: string;
  AreaName: string;
  Works: EmployeeViewModel[];

  ObjectToSerialize() {
    return ``;
  }
}