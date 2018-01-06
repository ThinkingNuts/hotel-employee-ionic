import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { EmployeeListPage } from '../pages/employee-list/employee-list';
import { InfoListPage } from '../pages/info-list/info-list';
import { MyPage } from '../pages/my/my';
import { ApplyRecordsPage } from '../pages/apply-records/apply-records';
import { OrderListPage } from '../pages/order-list/order-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseHttpServiceProvider } from '../providers/base-http-service/base-http-service';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { AppNativeDeviceProvider } from '../providers/app-native-service/app-native-device';
import { AppUrlConfigProvider } from '../providers/app-url-config/app-url-config';
import { AccountProvider } from '../providers/account/account';
import { ApiService } from '../api/api-resource';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    MyPage,
    EmployeeListPage,
    ApplyRecordsPage,
    InfoListPage,
    HomePage,
    OrderListPage
  ],
  imports: [
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
      tabsHideOnSubPages: 'true'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    HomePage,
    EmployeeListPage,
    InfoListPage,
    MyPage,
    OrderListPage
  ],
  providers: [
    ApiService,
    AccountProvider,
    Device,
    AppVersion,
    AppNativeDeviceProvider,
    BaseHttpServiceProvider,
    AppUrlConfigProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
