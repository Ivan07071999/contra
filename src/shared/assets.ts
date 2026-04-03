import '@esotericsoftware/spine-pixi-v8';
import { Assets } from 'pixi.js';

export class AssetsManager {
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public async load(): Promise<void> {
    if (this.initialized) return;

    await Assets.load({
      alias: 'myAtlas',
      src: '/public/atlas.json',
    });

    this.initialized = true;
    console.log('Загрузили асеты');
  }
}
