import * as angular from 'angular';
import * as ocLazyLoad from 'oclazyload';

import { InjectionToken, NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular/upgrade/static';
import { ROUTES } from '@angular/router';

import { AngularAComponent } from './angular-a.component';
import { AngularBComponent } from './angular-b.component';

import { ocLazyLoadToken, getOcLazyLoad } from '../common/ocLazyLoad';

// Main Angular module
@NgModule({
  declarations: [
    AngularAComponent,
    AngularBComponent
  ],
  entryComponents: [
    AngularAComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
    // Convince `@angular/cli` to split out the lazy chunk
    { provide: ROUTES, multi: true, useValue: [{ loadChildren: 'lazy/lazy#LazyModule' }] },
    { provide: ocLazyLoadToken, useFactory: getOcLazyLoad, deps: ['$injector'] }
  ],
})
export class MainModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    console.log('bootstrapping angularjs');
    this.upgrade.bootstrap(document.body, ['main'], { strictDi: true });
  }
}

// Main AngularJS module
angular.module('main', [ocLazyLoad])
  .directive('angularA', downgradeComponent({ component: AngularAComponent }))
  .run(['$ocLazyLoad', ($ocLazyLoad) => { console.log('angularjs bootstrapped', $ocLazyLoad); }]);
