import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storagePrefix = 'questrade.app.';

  public saveToStorage<T>(
    key: string,
    value: T,
    storage = localStorage
  ): void {
    try {
      storage.setItem(`${this.storagePrefix}.${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(value);
      throw new Error('Error while storing ' + key);
    }
  }

  public getFromStorage<T>(key: string): T | null {
    const fullKey = `${this.storagePrefix}.${key}`;
    const stringData =
      localStorage.getItem(fullKey) || sessionStorage.getItem(fullKey);
    if (!stringData) {
      return null;
    }
    try {
      return JSON.parse(stringData);
    } catch (e) {
      return null;
    }
  }

  public removeFromStorage(key: string): void {
    localStorage.removeItem(`${this.storagePrefix}.${key}`);
    sessionStorage.removeItem(`${this.storagePrefix}.${key}`);
  }
}