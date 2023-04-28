import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { find } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  isMobilePlatform: boolean = false;
  isDevice: boolean = false;
  isMobile: boolean = false;

  constructor(private platform: Platform) { 
    this.isMobilePlatform = 
        (this.platform.is('ios') || 
        this.platform.is('android') || 
        this.platform.is('cordova') ||
        this.platform.is('ipad') ||
        this.platform.is('iphone') ||
        (this.platform.is('mobile') && !this.platform.is('mobileweb')) ||
        this.platform.is('phablet') ||
        this.platform.is('tablet')) && 
        !this.platform.is('desktop');

    this.isMobile =
      (this.platform.is('cordova') ||
      this.platform.is('capacitor'));
  }

  setPlatform(): void {

    const platforms: string[] = this.platform.platforms();
    const platform: string = find(platforms, (p: string) => {
        return p === 'capacitor';
    });

    this.isDevice = platform ? true : false;
}

}
