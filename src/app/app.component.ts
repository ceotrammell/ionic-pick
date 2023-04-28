import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { MobileService } from './services/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private mobileService: MobileService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.initializeNativePlugins();
    });
  }

  async initializeNativePlugins() {
    if(this.mobileService.isMobilePlatform && this.mobileService.isDevice) {
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
    }
  }
}
