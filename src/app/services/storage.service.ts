import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private _storage: Storage | null = null;

  constructor() { 
    this.ensureStore();
  }

  ensureStore(): Promise<Storage> {
    return new Promise<Storage>(async (resolve) => {
      if(!this._storage) {
        this._storage = new Storage({
          name: "ionicpick",
          storeName: "ionic-pick",
          driverOrder: [Drivers.LocalStorage]
        });
        resolve(this._storage.create());
        return;
      }
      resolve(this._storage);
    });
  }

  async getItem(key: string) {
    await this.ensureStore();
    return await this._storage.get(key);
  }

  async setItem(key: string, value: any): Promise<any> {
    await this.ensureStore();
    if (!value)
      return;
    return await this._storage.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    return new Promise<any>(async (resolve) => {
      await this.ensureStore();
      this._storage.remove(key).then(value => {
        resolve(value);
      }).catch(() => {
        resolve(null);
      })
    });
  }

  clearAll(): Promise<void> {
    return this._storage.clear();
  }

}
