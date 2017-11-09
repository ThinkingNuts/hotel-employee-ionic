import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class MessageViewModel extends BaseViewModel {

  From: string;
  To: number;
  Type: string;
  Context: string;
  Id: number;
  GUID: string;
  CreateTime: string;

}
