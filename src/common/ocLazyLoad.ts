import { InjectionToken } from '@angular/core';

export const ocLazyLoadToken = new InjectionToken('$ocLazyLoad');
export function getOcLazyLoad(injector: any) {
  return injector.get('$ocLazyLoad');
}
