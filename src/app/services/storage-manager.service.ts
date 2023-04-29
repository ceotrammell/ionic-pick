import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {
  
  constructor(
    private storageService: StorageService,
  ) { }

  getTheme(): Promise<any> {
    return this.storageService.getItem('theme');
  }

  saveTheme(theme): Promise<any> {
    return this.storageService.setItem('theme', theme);
  }

  deleteTheme(): Promise<any> {
    return this.storageService.removeItem('theme');
  }

}