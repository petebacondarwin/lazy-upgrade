import { Component, Injector, NgModuleFactoryLoader } from '@angular/core';

@Component({
  // selector: 'angular-a',
  template: `(AngularA)<angular-b></angular-b><br><button (click)="loadLazyModule()">Load Lazy Module</button>`
})
export class AngularAComponent {
  constructor(private loader: NgModuleFactoryLoader, private injector: Injector) {
    console.log('constructing Angular A component');
  }
  loadLazyModule() {
    console.log('loading lazy module');
    this.loader.load('lazy/lazy#LazyModule').then(factory => {
      console.log('lazy module loaded');
      const module = factory.create(this.injector);
      console.log(module);
    });
  }
}
