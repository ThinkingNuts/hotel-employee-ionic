import { BaseViewModel } from '../providers/base-http-service/base-http-service';
import { EmployeeViewModel } from './employee-model';

export class OrderViewModel extends BaseViewModel {
  HotelGUID: string;
  HotelId: number;
  HotelName: string;
  AreaId: number;
  AreaName: string;
  Works: EmployeeViewModel[];

}