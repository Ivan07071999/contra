import '@esotericsoftware/spine-pixi-v8';
import { Assets } from 'pixi.js';
import type { ISpriteAtlas } from './types';

export class AssetsManager {
  private initialized: boolean;
  public atlasData: ISpriteAtlas | null = null;

  constructor() {
    this.initialized = false;
  }

  public async load(): Promise<void> {
    if (this.initialized) return;

    this.atlasData = await Assets.load<ISpriteAtlas>('/atlas.json');
    await Assets.load([
      { alias: 'startScreen', src: '/startScreen.jpg' },
      { alias: 'arrowBack', src: '/arrowBack.png' },
      { alias: 'medal', src : '/medal.png' },
    ]);

    this.initialized = true;
  }
}
