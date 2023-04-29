import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { StorageManagerService } from '../../../services/storage-manager.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit {
  theme: string;
  isDarkMode: boolean = false;

  constructor(
    private storageManagerService: StorageManagerService,
    private eventsService: EventsService,
  ) {
  }

  async ngOnInit() {
    await this.getTheme();
    await this.setThemeValues();
  }

  async getTheme() {
    const theme = await this.storageManagerService.getTheme();
    if (theme) {
    this.theme = theme;
    } else {
      this.theme = 'light';
      document.body.classList.toggle(`${this.theme}`, true);
      document.body.classList.toggle(`dark`, false);
    }
  }

  async setThemeValues() {
    if (this.theme.toLowerCase() === 'dark') {
      this.isDarkMode = true;
    }
    if (this.theme.toLowerCase() === 'light') {
      this.isDarkMode = false;
    }
  }

  toggleDarkTheme($event) {
    if ($event.detail.checked) {
      this.theme = 'dark';
      document.body.classList.toggle(`${this.theme}`, true);
      document.body.classList.toggle(`light`, false);
      this.storageManagerService.saveTheme('dark');
      this.isDarkMode = true;
    }
    if (!$event.detail.checked) {
      this.theme = 'light';
      document.body.classList.toggle(`${this.theme}`, true);
      document.body.classList.toggle(`dark`, false);
      this.storageManagerService.saveTheme('light');
      this.isDarkMode = false;
    }
    this.eventsService.setdidThemeChange(true);
  }

}
