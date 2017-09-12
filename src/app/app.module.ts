import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { EmployeeListPage } from '../pages/employee-list/employee-list';
import { MyPage } from '../pages/my/my';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BaseHttpServiceProvider } from '../providers/base-http-service/base-http-service';
import { AppUrlConfigProvider } from '../providers/app-url-config/app-url-config';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MyPage,
    EmployeeListPage,
    HomePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    EmployeeListPage,
    MyPage
  ],
  providers: [
    BaseHttpServiceProvider,
    AppUrlConfigProvider,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
