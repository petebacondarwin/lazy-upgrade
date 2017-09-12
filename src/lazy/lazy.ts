declare var angular: angular.IAngularStatic;

import { Inject, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { downgradeComponent } from '@angular/upgrade/static';

import { AngularCComponent } from './angular-c.component';

import { ocLazyLoadToken } from '../common/ocLazyLoad';

@NgModule({
  declarations: [
    AngularCComponent,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    AngularCComponent
  ],
  providers: [
  ],
})
export class LazyModule {
  constructor(@Inject(ocLazyLoadToken) $ocLazyLoad: any, injector: Injector) {
    console.log('lazy module constructed');
    angular.module('lazy', [])
      .directive('angularC', downgradeComponent({ component: AngularCComponent }))
      .run(['$rootElement', '$compile', '$rootScope', ($rootElement, $compile, $rootScope) => {
        const newElement = angular.element('<div><angular-c></angular-c></div>');

        // This line attaches the new injector to the container that is being compiled.
        newElement.data('$$$angularInjectorController', injector);

        $rootElement.append(newElement);
        console.log('compiling angular-c element');
        $compile(newElement)($rootScope);
      }]);
    $ocLazyLoad.inject('lazy');
  }
}

