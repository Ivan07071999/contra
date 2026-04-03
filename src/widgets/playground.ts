
import { Container } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';

export class Playground {
  public view: Container;
  public platforms: Platform[] = [];

  constructor() {
    this.view = new Container();
    this.createPlatforms();
  }

  createPlatforms(): void {
    for (const platform of platforms.data) {
      const item = new Platform(platform.x, platform.y, platform.width, platform.height);
      this.view.addChild(item);
      this.platforms.push(item)
    }
  }
}
