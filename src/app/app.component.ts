import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { MobileService } from './services/mobile.service';
import { StorageManagerService } from './services/storage-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private mobileService: MobileService,
    private storageManagerService: StorageManagerService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.setTheme();
      await this.initializeNativePlugins();
    });
  }

  async initializeNativePlugins() {
    if(this.mobileService.isMobilePlatform && this.mobileService.isDevice) {
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
    }
  }

  async setTheme() {
    const theme = await this.storageManagerService.getTheme();
    if(theme) {
      document.body.classList.toggle(`${theme}`, true);
      return;
    }
    this.storageManagerService.saveTheme('light');
  }
}
