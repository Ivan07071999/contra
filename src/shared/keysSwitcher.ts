import type { IKeys } from "./types";

export class KeysSwitcher {
  public lsKey: string;
  declare public keysController: Partial<Record<string, keyof IKeys>>;

  constructor() {
    this.lsKey = 'keysController';
    this.initKeysController();
  }

  private initKeysController(): void {
    const lsKeys = this.getKeysFromLocalStorage();

    if (lsKeys !== null && typeof lsKeys === 'object') {
      this.keys = lsKeys as Partial<Record<string, keyof IKeys>>;
    } else {
      this.keys = {
        ArrowUp: 'up',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        KeyA: 'fire',
        KeyS: 'jump',
      };
      this.setKeysToLocalStorage(this.keysController);
    }
  }

  public getKeysFromLocalStorage(): unknown {
    const lsKeys = localStorage.getItem(this.lsKey);
    if (lsKeys === null) return;
    const response: unknown = JSON.parse(lsKeys);

    return response;
  }

  private setKeysToLocalStorage(keys: Partial<Record<string, keyof IKeys>>): void {
    const keysToJSON = JSON.stringify(keys);
    localStorage.setItem(this.lsKey, keysToJSON);
  }

  public get keys(): Partial<Record<string, keyof IKeys>> {
    return this.keysController;
  }

  set keys(newKeys: Partial<Record<string, keyof IKeys>>) {
    this.keysController = newKeys;
    this.setKeysToLocalStorage(newKeys);
  }
}
