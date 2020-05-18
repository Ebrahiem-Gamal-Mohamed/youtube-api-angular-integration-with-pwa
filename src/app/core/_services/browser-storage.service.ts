import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BrowserStorageService {
  constructor() {}

  getLocal(itemName: string): any {
    const data = localStorage.getItem(itemName);
    if (!data) {
      return;
    }
    return JSON.parse(data);
  }

  setLocal(itemName: string, item: any): void {
    localStorage.setItem(itemName, JSON.stringify(item));
  }

  removeFromLocal(itemName: string): void {
    if (!this.getLocal(itemName)) return;
    localStorage.removeItem(itemName);
  }

  clearLocal(): void {
    localStorage.clear();
  }
}
