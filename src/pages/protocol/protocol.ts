import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { BaseHttpServiceProvider } from '../../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../../providers/app-url-config/app-url-config';

/**
 * Generated class for the ProtocolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-protocol',
  templateUrl: 'protocol.html',
})
export class ProtocolPage {

  private protocol;

  constructor(
    private baseHttp: BaseHttpServiceProvider,
    private urlConfig: AppUrlConfigProvider,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  ngOnInit() {
    this.getProtocol();
  }

  getProtocol() {
    this.baseHttp.get(this.urlConfig.employeeConfig.protocolUrl)
      .then(res => {
        // console.log("ProtocolPage getProtocol res: " + JSON.stringify(res));
        this.protocol = this.sanitizer.bypassSecurityTrustHtml(res as string);
      }).catch(this.handleError);
  }

  handleError(error: any) {
    console.log("An error occurred: \n", error);
  }
}
