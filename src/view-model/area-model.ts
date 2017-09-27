import { BaseViewModel } from '../providers/base-http-service/base-http-service';

export class AreaViewModel extends BaseViewModel {

  public id: number;
  public text: string;

  ObjectToSerialize() {
    return `id=${this.id}&text=${this.text}`;
  }
}